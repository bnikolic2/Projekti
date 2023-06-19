package progi.Sinappsa.service;

import progi.Sinappsa.domain.Korisnik;
import java.util.*;
public interface KorisnikService {
    List<Korisnik> fetchAll();
    Korisnik createNewKorisnik(Korisnik korisnik);
    Optional<Korisnik> findById(long korisnikId);
    Korisnik fetchById(long korisnikId);
    Optional<Korisnik> findByUsername(String username);
    Korisnik fetchByUsername(String username);


}
