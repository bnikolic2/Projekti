package progi.Sinappsa.service;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import progi.Sinappsa.domain.Oglas;
import progi.Sinappsa.domain.Profil;
import progi.Sinappsa.domain.Upit;

import java.util.List;
import java.util.Optional;

public interface UpitService {

    List<Upit> fetchAllForKorisnik(Profil profil);

    List<Upit> fetchAllForObjavljac(Profil profil);

    List<Upit> fetchAllForOglas(Oglas oglas);


    Upit createNewUpit(Upit upit);

    Optional<Upit> findById(Long id);

}
