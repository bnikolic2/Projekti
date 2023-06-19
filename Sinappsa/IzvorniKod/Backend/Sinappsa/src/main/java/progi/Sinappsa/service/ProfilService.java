package progi.Sinappsa.service;

import progi.Sinappsa.domain.Profil;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface ProfilService {
    List<Profil> listAll();
    Profil createNewProfil(Profil profil);

    Optional<Profil> findByKorisnikUsername(String username);

    Profil fetchByKorisnikUsername(String username);

    boolean potvrdiRegistraciju(String username);

}
