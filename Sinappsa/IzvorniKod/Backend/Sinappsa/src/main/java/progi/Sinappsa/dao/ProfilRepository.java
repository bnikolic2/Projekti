package progi.Sinappsa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import progi.Sinappsa.domain.Profil;

import java.util.Optional;

@Repository
public interface ProfilRepository extends JpaRepository<Profil, Long>{

    @Query(value = "SELECT * FROM Profil WHERE profil.id_korisnika = :id", nativeQuery = true)
    Optional<Profil> findByidKorisnika(@Param("id") Long idKorisnika);

    @Modifying
    @Query(value = "UPDATE Profil SET potvrdena_registracija = TRUE WHERE Profil.id_korisnika = (SELECT id FROM Korisnik WHERE Korisnik.username = :username LIMIT 1)", nativeQuery = true)
    int potvrdiRegistraciju(@Param("username") String username);
}
