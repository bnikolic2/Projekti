package progi.Sinappsa.service;

import progi.Sinappsa.domain.Oglas;

import java.util.List;
import java.util.Optional;

public interface OglasService {
    List<Oglas> fetchAll();

    List<Oglas> findAllKolegij(Long kolegijId);

    Optional<Oglas> findById(Long id);
    Oglas createNewOglas(Oglas oglas);

    void deleteOglas(Oglas oglas);

    List<Oglas> findAllKategorija(Long id);
    List<Oglas> findAllKorisnik(Long idPomagaca);

    List<Oglas> findAllFiltri(Long idKolegij, Long idKategorija, Long idSmjer);

    boolean findUpit(Long idProfil, Long idOglas);
}
