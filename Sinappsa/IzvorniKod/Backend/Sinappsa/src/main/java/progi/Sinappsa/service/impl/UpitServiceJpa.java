package progi.Sinappsa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.Sinappsa.dao.UpitRepository;
import progi.Sinappsa.domain.Oglas;
import progi.Sinappsa.domain.Profil;
import progi.Sinappsa.domain.Upit;
import progi.Sinappsa.service.UpitService;

import java.util.List;
import java.util.Optional;

@Service
public class UpitServiceJpa implements UpitService {

    @Autowired
    UpitRepository upitRepository;

    @Override
    public List<Upit> fetchAllForKorisnik(Profil profil) {
        return upitRepository.fetchAllForKorisnik(profil.getId());
    }

    @Override
    public List<Upit> fetchAllForObjavljac(Profil profil) {
        return upitRepository.fetchAllForObjavljac(profil.getId());
    }

    @Override
    public List<Upit> fetchAllForOglas(Oglas oglas) {
        return upitRepository.fetchAllForOglas(oglas.getId());
    }

    @Override
    public Upit createNewUpit(Upit upit) {
        Assert.notNull(upit.getPoruka(), "Upit nema poruku!");
        Assert.notNull(upit.getOglas(), "Upit nema id oglasa!");
        Assert.notNull(upit.getProfil(), "Upit nema id profila!");
        Assert.notNull(upit.getStatus(), "Upit nema status!");

        return upitRepository.save(upit);
    }

    @Override
    public Optional<Upit> findById(Long id) {
        return upitRepository.findById(id);
    }
}
