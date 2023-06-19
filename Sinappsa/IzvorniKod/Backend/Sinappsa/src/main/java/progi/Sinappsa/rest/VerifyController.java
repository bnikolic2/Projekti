package progi.Sinappsa.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import progi.Sinappsa.service.ProfilService;

import java.util.Base64;

@RestController
@RequestMapping("/")
public class VerifyController {

    @Autowired
    ProfilService profilService;

    @GetMapping("/verify/{enkodiranUsername}")
    public ResponseEntity<String> verifyKorisnik(@PathVariable("enkodiranUsername") String enkodiranUsername) {
        try {
            String dekodiranUsername = new String(Base64.getDecoder().decode(enkodiranUsername));
            var uspjeh = profilService.potvrdiRegistraciju(dekodiranUsername);
            return (!uspjeh) ? ResponseEntity.badRequest().body("Korisnik s tim verifikacijskim kodom ne postoji!") : ResponseEntity.ok().body("OK");
        } catch(Exception ex) {
            return ResponseEntity.badRequest().body("Krivi format verifikacijskog koda!");
        }
    }
}
