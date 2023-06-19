package progi.Sinappsa.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import progi.Sinappsa.dao.*;
import progi.Sinappsa.domain.*;
import org.springframework.security.core.userdetails.User;
import javax.validation.Valid;
import progi.Sinappsa.service.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/kolegij")
public class KolegijController {

    @Autowired
    private KolegijRepository kolegijRepository;

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private SmjerRepository smjerRepository;
    @Autowired
    private KolegijService kolegijService;

    @PutMapping("/sort")
    public ResponseEntity<String> addSmjerKolegija(@AuthenticationPrincipal User u, @Valid @RequestBody SortKolegijIdDTO dto){
        Korisnik moderator = korisnikService.fetchByUsername(u.getUsername());
        if(moderator.getModerator()){
            Kolegij kolegij = kolegijRepository.findById(dto.getIdKolegij()).get();
            Smjer smjer = smjerRepository.findById(dto.getIdSmjer()).get();
            kolegij.setSmjer(smjer);
            kolegij.setNazivKolegija(dto.getNazivKolegija());
            kolegijRepository.save(kolegij);
            return ResponseEntity.ok("OK");
        }
        return ResponseEntity.ok("Korisnik nije moderator!");
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewKolegij(@AuthenticationPrincipal User u, @Valid @RequestBody CreateKolegijDTO kDTO) {
        Korisnik korisnik = korisnikService.findByUsername(u.getUsername()).get();
        if(korisnik.getModerator()){
            Smjer smjer = smjerRepository.findById(kDTO.getIdSmjera()).get();
            Kolegij kolegij = new Kolegij(kDTO.getNaziv(),smjer);
            kolegijRepository.save(kolegij);
            return ResponseEntity.ok("OK");
        }
        else{
            return ResponseEntity.ok("Ne možete dodavati kolegije ako niste moderator.");
        }
    }

    @GetMapping("/all")
    public List<Kolegij> fetchAll() {
        return kolegijService.fetchAll();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteKolegij(@Valid @RequestBody DeleteKolegijDTO kDTO) {
        Optional<Kolegij> kolegij = kolegijRepository.findById(kDTO.getIdKolegija());

        if (kolegij.isPresent()) {
            kolegijRepository.delete(kolegij.get());
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.badRequest().body("Taj kolegij ne postoji");
        }
    }

}
