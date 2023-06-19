package progi.Sinappsa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import progi.Sinappsa.dao.ProfilRepository;
import progi.Sinappsa.domain.Korisnik;
import progi.Sinappsa.domain.Profil;
import progi.Sinappsa.service.EntityMissingException;
import progi.Sinappsa.service.KorisnikService;
import progi.Sinappsa.service.ProfilService;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class ProfilServiceJpa implements ProfilService{

    @Autowired
    private ProfilRepository profilRepository;

    @Autowired
    private KorisnikService korisnikService;

    @Override
    public List<Profil> listAll(){
        return profilRepository.findAll();
    }
    @Override
    public Profil createNewProfil(Profil profil){
        Korisnik korisnik = profil.getKorisnik();
        profil.setPotvrdenaRegistracija(false);
        if (korisnik == null){
            throw new RequestRejectedException("Ne postoji taj korisnik.");
        }
        return profilRepository.save(profil);
    }

    @Override
    public Optional<Profil> findByKorisnikUsername(String username) {
        Korisnik korisnik = korisnikService.fetchByUsername(username);
        return profilRepository.findByidKorisnika(korisnik.getId());
    }
    @Override
    public Profil fetchByKorisnikUsername(String username) {
        return findByKorisnikUsername(username).orElseThrow(
                () -> new EntityMissingException(Profil.class, username)
        );
    }

    @Transactional
    @Override
    public boolean potvrdiRegistraciju(String username) {
        int response = profilRepository.potvrdiRegistraciju(username);
        return (response > 0) ? true : false;
    }

}
