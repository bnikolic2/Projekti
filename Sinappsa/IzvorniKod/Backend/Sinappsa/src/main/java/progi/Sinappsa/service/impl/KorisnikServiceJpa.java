package progi.Sinappsa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.Sinappsa.dao.KorisnikRepository;
import progi.Sinappsa.domain.Korisnik;
import progi.Sinappsa.service.*;
import java.util.*;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Override
    public List<Korisnik> fetchAll() {
        return korisnikRepository.findAll();
    }

    @Override
    public Korisnik createNewKorisnik(Korisnik korisnik) {
        Assert.notNull(korisnik, "Korisnik ne smije biti null");
        Assert.notNull(korisnik.getPassword().length() < 10 || korisnik.getPassword().length() > 100, "Password mora biti [10, 100]");
        Assert.isNull(korisnik.getId(),
                "Korisnik Id mora biti null, a ne" + korisnik.getId());
        int numUsers = korisnikRepository.countByUsername(korisnik.getUsername());
        int numEmails = korisnikRepository.countByEmail(korisnik.getEmail());
        if(numEmails > 0 )
        throw new RequestRejectedException(
            "Korisnik s tom e-mail adresom vec postoji."
            );
        if ( numUsers > 0 )
            throw new RequestRejectedException(
                    "Korisnik s tim usernameom vec postoji."
            );
        return korisnikRepository.save(korisnik);
    }

    @Override
    public Optional<Korisnik> findById(long korisnikId) {
        return korisnikRepository.findById(korisnikId);
    }

    @Override
    public Optional<Korisnik> findByUsername(String korisnikUsername) {
        return korisnikRepository.findByUsername(korisnikUsername);
    }

    @Override
    public Korisnik fetchById(long korisnikId) {
        return findById(korisnikId).orElseThrow(
            () -> new EntityMissingException(Korisnik.class, korisnikId)
        );
    }

    @Override
    public Korisnik fetchByUsername(String username) {
        return findByUsername(username).orElseThrow(
                () -> new EntityMissingException(Korisnik.class, username)
        );
    }
}
