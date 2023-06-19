package progi.Sinappsa.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import progi.Sinappsa.domain.*;
import progi.Sinappsa.dao.*;
import progi.Sinappsa.service.EntityMissingException;
import progi.Sinappsa.service.*;


import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/profil")
public class ProfilController {

    @Autowired
    private ProfilService profilService;
    @Autowired
    private ProfilRepository profilRepository;

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Autowired
    private KorisnikService korisnikService;

    @GetMapping("/list")
    public List<Profil> listProfiles(){
        return profilService.listAll();
    }

    @GetMapping("")
    public Profil findProfilByKorisnikUsername(@AuthenticationPrincipal User u) {
        return profilService.fetchByKorisnikUsername(u.getUsername());
    }

    @PutMapping("/rejting")
    public ResponseEntity<HashMap<String, Double>> getProfilRatings(@Valid @RequestBody RatingDTO dto){
        Profil profil = profilRepository.findById(dto.getIdObjavljaca()).get();
        Double ocjena = profil.getOcjena();
        if(ocjena == 0){
            profil.setOcjena(dto.getRating());
        }
        else{
            profil.setOcjena((ocjena + dto.getRating()) / 2);
        }
        HashMap<String, Double> userRating = new HashMap<>();
        userRating.put(profil.getKorisnik().getUsername(), profil.getOcjena());
        profilRepository.save(profil);
        return ResponseEntity.ok(userRating);
    }

    @PutMapping("/avatar")
    public ResponseEntity<Profil> updateAvatar(@AuthenticationPrincipal User u, @Valid @RequestBody EditAvatarDTO dto){
        Profil updateProfil = profilService.fetchByKorisnikUsername(u.getUsername());

        updateProfil.setAvatar(dto.getAvatar());
        profilRepository.save(updateProfil);
        return ResponseEntity.ok(updateProfil);
    }

    @PutMapping("/username")
    public ResponseEntity<Profil> updateUsername(@AuthenticationPrincipal User u, @Valid @RequestBody EditUsernameDTO dto){
        Profil updateProfil = profilService.fetchByKorisnikUsername(u.getUsername());
        Korisnik korisnik = korisnikService.fetchByUsername(u.getUsername());

        korisnik.setUsername(dto.getUsername());
        updateProfil.setKorisnik(korisnik);
        profilRepository.save(updateProfil);
        return ResponseEntity.ok(updateProfil);
    }

    @PutMapping("/password")
    public ResponseEntity<Profil> updatePassword(@AuthenticationPrincipal User u, @Valid @RequestBody EditPasswordDTO dto){
        Profil updateProfil = profilService.fetchByKorisnikUsername(u.getUsername());
        Korisnik korisnik = korisnikService.fetchByUsername(u.getUsername());

        korisnik.setPassword(dto.getPassword());
        updateProfil.setKorisnik(korisnik);
        profilRepository.save(updateProfil);
        return ResponseEntity.ok(updateProfil);
    }


}

