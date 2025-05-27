package br.com.grace.repository;

import br.com.grace.model.TipoDoacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoDoacaoRepository extends JpaRepository<TipoDoacao, Long> {
}
