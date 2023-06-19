package progi.Sinappsa.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import progi.Sinappsa.dao.*;
import progi.Sinappsa.domain.*;
import progi.Sinappsa.mail.MailService;
import progi.Sinappsa.service.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/oglasi")
public class OglasController { ;
    @Autowired
    private OglasService oglasService;
    @Autowired
    private OglasRepository oglasRepository;
    @Autowired
    private ProfilService profilService;
    @Autowired
    private ProfilRepository profilRepository;
    @Autowired
    private KolegijRepository kolegijRepository;
    @Autowired
    private KategorijaRepository kategorijaRepository;
    @Autowired
    private KorisnikService korisnikService;
    @Autowired
    private UpitService upitService;
    @Autowired
    private UpitRepository upitRepository;
    @Autowired
    MailService mailService;


    @PutMapping("/edit")
    public ResponseEntity<Oglas> updateOglas(@Valid @RequestBody EditOglasDTO oglasDetails) {
        Oglas updateOglas = oglasRepository.findById(oglasDetails.getId())
                .orElseThrow(() -> new EntityMissingException(Oglas.class, oglasDetails.getId()));

        Profil profil = profilRepository.findById(oglasDetails.getIdPomagaca()).get();
        Kategorija kategorija = kategorijaRepository.findById(oglasDetails.getIdKategorije()).get();
        Kolegij kolegij = kolegijRepository.findById(oglasDetails.getIdKolegija()).get();
        updateOglas.setKategorija(kategorija);
        updateOglas.setKolegij(kolegij);
        updateOglas.setOpis(oglasDetails.getOpis());
        updateOglas.setNaslov(oglasDetails.getNaslov());
        updateOglas.setProfil(profil);

        oglasRepository.save(updateOglas);

        return ResponseEntity.ok(updateOglas);
    }


    @PostMapping("/create")
    public ResponseEntity<String> addNewOglas(@Valid @RequestBody CreateOglasDTO oDTO) {
        Profil pomagac = profilRepository.findById(oDTO.getIdPomagaca()).get();
        Kategorija kategorija = kategorijaRepository.findById(oDTO.getIdKategorije()).get();
        Kolegij kolegij = kolegijRepository.findById(oDTO.getIdKolegija()).get();
        Oglas oglas = new Oglas(oDTO.getNaslov(), oDTO.getOpis(),pomagac, kolegij,kategorija);
        oglasRepository.save(oglas);
        return ResponseEntity.ok("OK");
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteOglas(@AuthenticationPrincipal User u, @Valid @RequestBody CreateOglasIdDTO oDTO) {
        //provjerava se je li korisnik moderator ili nije
        //ako je moderator može obrisati sve oglase,ako nije moderator može obrisati samo svoje oglase
        Oglas oglas = oglasService.findById(oDTO.getId()).get();
        Korisnik korisnik = korisnikService.findByUsername(u.getUsername()).get();
        Profil profil = profilService.fetchByKorisnikUsername(u.getUsername());
        List<Upit> upiti = upitService.fetchAllForOglas(oglas);
        if (korisnik.getModerator()) {
            if (upiti != null) {
                upitRepository.deleteAll(upiti);
            }
            //slanje maila prije brisanja
            String to = oglas.getProfil().getKorisnik().getEmail();
            System.out.println("Nasao sam email:" + to);
            String body = "Moderator je obrisao vaš oglas " + oglas.getNaslov() + " s porukom:\n" + oDTO.getPoruka();
            mailService.sendMail(to, "[Sinappsa] Obrisali smo Vaš oglas", body);
            oglasRepository.delete(oglas);
            return ResponseEntity.ok("OK");
        } else {
            List<Oglas> oglasiKorisnika = oglasService.findAllKorisnik(profil.getId());
            if(oglasiKorisnika.contains(oglas)){
                if (upiti != null) {
                    upitRepository.deleteAll(upiti);
                }
                oglasRepository.delete(oglas);
                return ResponseEntity.ok("OK");
            } else {
                return ResponseEntity.ok("Ne možete obrisati tuđi oglas");
            }
        }
    }

    @GetMapping("")
    public List<Oglas> fetchAll() {
        return oglasService.fetchAll();
    }

    @PostMapping("/dohvati")
    public List<Oglas> findAllKolegij(@RequestBody DohvatiOglasIdDTO filtri) {
        return oglasService.findAllFiltri(filtri.getIdKolegij(), filtri.getIdKategorija(), filtri.getIdSmjer());
    }

    @GetMapping("/dohvati/korisnik")
    public List<Oglas> findAllKorisnik(@AuthenticationPrincipal User u) {
        Profil profil = profilService.fetchByKorisnikUsername(u.getUsername());
        return oglasService.findAllKorisnik(profil.getId());
    }
    @PostMapping("/upit")
    public boolean findUpit(@Valid @RequestBody GetUpitDTO upitDTO) {
        return oglasService.findUpit(upitDTO.getIdProfil(), upitDTO.getIdOglas());
    }



}
