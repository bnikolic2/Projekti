package progi.Sinappsa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.Sinappsa.domain.Oglas;
import progi.Sinappsa.domain.Upit;

import java.util.List;

@Repository
public interface UpitRepository extends JpaRepository<Upit, Long> {

    @Query(value = "SELECT * FROM Upit WHERE Upit.id_posiljatelja = :id", nativeQuery = true)
    List<Upit> fetchAllForKorisnik(@Param("id") Long idProfila);

    @Query(value = "SELECT * FROM Upit JOIN Oglas ON Upit.id_oglasa = Oglas.id WHERE Oglas.id_pomagaca = :id", nativeQuery = true)
    List<Upit> fetchAllForObjavljac(@Param("id") Long idProfila);

    @Query(value = "SELECT * FROM Upit WHERE Upit.id_oglasa = :id", nativeQuery = true)
    List<Upit> fetchAllForOglas(@Param("id") Long idOglasa);

    @Query(value = "SELECT * FROM Upit WHERE upit.id_posiljatelja = :idProfil AND upit.id_oglasa = :idOglas ", nativeQuery = true)
    List<Upit> findUpitList(@Param("idProfil") Long idProfil, @Param("idOglas") Long idOglas);

}
