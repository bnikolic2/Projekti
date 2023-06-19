package progi.Sinappsa.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import progi.Sinappsa.dao.CreateKorisnickiRacunDTO;
import progi.Sinappsa.domain.Korisnik;
import progi.Sinappsa.domain.Profil;
import progi.Sinappsa.mail.MailService;
import progi.Sinappsa.service.KorisnikService;
import progi.Sinappsa.service.ProfilService;
import progi.Sinappsa.service.RequestRejectedException;

import javax.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/korisnici")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;
    @Autowired
    private ProfilService profilService;

    @Autowired
    private MailService mailService;

    @GetMapping("/login")
    public Profil loginKorisnik(@AuthenticationPrincipal User u) {
        if (u == null) throw new RequestRejectedException("Invalid login");;

        System.out.printf("User: %s logged in!", u.getUsername());
        return profilService.fetchByKorisnikUsername(u.getUsername());
    }

    @PostMapping("/register")
    public ResponseEntity<String> addNewKorisnik(@Valid @RequestBody CreateKorisnickiRacunDTO dto) {
        Korisnik korisnik = new Korisnik(dto.getEmail(), dto.getUsername(), dto.getPassword(), dto.getModerator());
        Korisnik noviKorisnik = korisnikService.createNewKorisnik(korisnik);
        Profil profil = new Profil(dto.getIme(), dto.getPrezime(), dto.getAvatar(), dto.getOcjena(), dto.getPotvrdenaRegistracija(), noviKorisnik);
        profilService.createNewProfil(profil);

        // Posalji email potvrdu za verifikaciju
        String enkodiranUsername = Base64.getEncoder().encodeToString(noviKorisnik.getUsername().getBytes(StandardCharsets.UTF_8));
        mailService.sendMail(noviKorisnik.getEmail(), "[SINAPPSA] Potvrdi korisnički račun", "https://sinappsa.netlify.app/verify/" + enkodiranUsername);

        return ResponseEntity.ok("OK");
    }

    @GetMapping("")
    public List<Korisnik> fetchAll() {
        return korisnikService.fetchAll();
    }

    @GetMapping("/test-mail/{email}")
    public void sendMail(@PathVariable("email") String email) {
        mailService.sendMail(email, "Moj najači test", "Pozdrav svijete");
    }
}
