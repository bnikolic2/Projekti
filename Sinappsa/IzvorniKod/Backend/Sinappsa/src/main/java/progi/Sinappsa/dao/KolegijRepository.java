package progi.Sinappsa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.Sinappsa.domain.Kolegij;

import java.util.*;

@Repository
public interface KolegijRepository extends JpaRepository<Kolegij, Long> {
    @Query(value = "SELECT * FROM Kolegij WHERE kolegij.smjer_id = :id", nativeQuery = true)
    List<Kolegij> findBySmjerId(@Param("id") Long idSmjer);

}
