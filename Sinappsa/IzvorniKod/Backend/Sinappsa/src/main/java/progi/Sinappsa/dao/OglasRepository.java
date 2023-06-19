package progi.Sinappsa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.Sinappsa.domain.Oglas;

import java.util.List;
import java.util.Optional;

@Repository
public interface OglasRepository extends JpaRepository<Oglas, Long> {
    Optional<Oglas> findById(Long id);

    List<Oglas> findByKolegijId(Long kolegijId);

    List<Oglas> findByKategorijaId(Long kategorijaId);

    @Query(value = "SELECT * FROM Oglas WHERE oglas.id_kolegija = :idKolegij AND oglas.id_kategorije = :idKategorija", nativeQuery = true)
    List<Oglas> findByKolegijIdAndKategorijaId(@Param("idKolegij") Long idKolegij, @Param("idKategorija") Long idKategorija);

    @Query(value = "SELECT * FROM Oglas WHERE oglas.id_pomagaca = :idPomagaca", nativeQuery = true)
    List<Oglas> findByIdPomagaca(@Param("idPomagaca") Long idPomagaca);
}
