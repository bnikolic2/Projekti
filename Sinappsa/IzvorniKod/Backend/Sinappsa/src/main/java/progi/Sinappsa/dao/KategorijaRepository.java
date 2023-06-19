package progi.Sinappsa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.Sinappsa.domain.Kategorija;

@Repository
public interface KategorijaRepository extends JpaRepository<Kategorija, Long> {
}
