package progi.Sinappsa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.Sinappsa.domain.Smjer;

import java.util.Optional;

@Repository
public interface SmjerRepository extends JpaRepository<Smjer, Long> {
    Optional<Smjer> findById(Long id);
}
