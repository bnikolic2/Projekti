package progi.Sinappsa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.Sinappsa.domain.Korisnik;

import java.util.*;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {
    Optional<Korisnik> findByUsername(String username);

    int countByUsername(String username);
    int countByEmail(String email);

    Optional<Korisnik> findById(Long id);
}
