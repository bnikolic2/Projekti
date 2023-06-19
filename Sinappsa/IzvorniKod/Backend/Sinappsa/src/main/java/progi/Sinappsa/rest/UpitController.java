package progi.Sinappsa.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import progi.Sinappsa.dao.*;
import progi.Sinappsa.domain.*;
import progi.Sinappsa.mail.MailService;
import progi.Sinappsa.service.KorisnikService;
import progi.Sinappsa.service.OglasService;
import progi.Sinappsa.service.ProfilService;
import progi.Sinappsa.service.UpitService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/upiti")
public class UpitController {

    @Autowired
    UpitService upitService;

    @Autowired
    KorisnikService korisnikService;

    @Autowired
    ProfilService profilService;

    @Autowired
    OglasService oglasService;

    @Autowired
    MailService mailService;

    @Autowired
    UpitRepository upitRepository;

    @GetMapping("")
    List<Upit> fetchAllForKorisnik(@AuthenticationPrincipal User u) {
        Profil profil = profilService.fetchByKorisnikUsername(u.getUsername());
        return upitService.fetchAllForKorisnik(profil);
    }

    @GetMapping("/objavljac")
    List<Upit> fetchAllForObjavljac(@AuthenticationPrincipal User u) {
        Profil profil = profilService.fetchByKorisnikUsername(u.getUsername());
        return upitService.fetchAllForObjavljac(profil);
    }

    @PostMapping("")
    ResponseEntity<String> createNewUpit(@AuthenticationPrincipal User u, @Valid @RequestBody CreateUpitDTO dto) {
        Profil posiljatelj = profilService.fetchByKorisnikUsername(u.getUsername());
        Korisnik korisnik = korisnikService.fetchByUsername(u.getUsername());
        Optional<Oglas> oglas = oglasService.findById(dto.getIdOglasa());
        if (oglas.isEmpty()) {
            return ResponseEntity.badRequest().body("Ne postoji oglas pod tim id");
        }

        Upit upit = new Upit(dto.getPoruka(), posiljatelj, oglas.get());

        Upit newUpit = upitService.createNewUpit(upit);

        // Slanje maila objavljaču oglasa s upitom
        String to = newUpit.getOglas().getProfil().getKorisnik().getEmail();
        System.out.println(to);
        String body = "Korisnik: " + u.getUsername() + " šalje upit s porukom:\n" + newUpit.getPoruka() + ". Korisnikov mail: " + korisnik.getEmail();
        mailService.sendMail(to, "[Sinappsa] Novi upit na oglas: " + oglas.get().getNaslov(), body);

        return (newUpit == null) ? ResponseEntity.badRequest().body("Greška kod stvaranja upita!") : ResponseEntity.ok().body("OK");
    }

    @GetMapping("/status")
    ResponseEntity<String> getStatusUpita(@Valid @RequestBody GetStatusUpitaDTO uDTO) {
        Upit upit = upitService.findById(uDTO.getId()).get();
        String status = String.valueOf(upit.getStatus());
        return ResponseEntity.ok(status);
    }

    @PutMapping("/edit")
    public ResponseEntity<String> updateStatus(@AuthenticationPrincipal User u,@Valid @RequestBody UpdateStatusDTO uDTO) {
        //provjeriti je li korisnik onaj koji je objavio oglas za taj upit i je li upit u tijeku
        Upit upit = upitService.findById(uDTO.getIdUpita()).get();
        if (upit.getStatus().equals(StatusUpita.U_TIJEKU)) {
            Oglas oglas = upit.getOglas();
            Profil profil = profilService.fetchByKorisnikUsername(u.getUsername());
            List<Oglas> oglasiPomagaca = oglasService.findAllKorisnik(profil.getId());
            if(oglasiPomagaca.contains(oglas)) {
                StatusUpita statusUpita = StatusUpita.valueOf(uDTO.getNoviStatus());
                upit.setStatus(statusUpita);
                upitRepository.save(upit);
                return ResponseEntity.ok("Novi status je " + statusUpita);
            } else {
                return ResponseEntity.ok("Niste korisnik koji je objavio oglas");
            }
        } else {
            return ResponseEntity.ok("Status upita nije 'U_TIJEKU'");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUpit(@AuthenticationPrincipal User u, @Valid @RequestBody DeleteUpitDTO uDTO) {
        Optional<Upit> upit = upitService.findById(uDTO.getId());
        Profil profil = profilService.fetchByKorisnikUsername(u.getUsername());

        if (upit.isPresent()) {
            upitRepository.delete(upit.get());
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.badRequest().body("Taj upit ne postoji");
        }
    }
}
