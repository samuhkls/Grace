package br.com.grace.repository;

import br.com.grace.model.EstoqueDoacoes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstoqueDoacoesRepository extends JpaRepository<EstoqueDoacoes, Long> {
    EstoqueDoacoes findByTipoDoacaoId(Long tipoId);
}
