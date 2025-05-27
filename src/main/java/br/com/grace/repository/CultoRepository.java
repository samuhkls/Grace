package br.com.grace.repository;

import br.com.grace.model.Culto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CultoRepository  extends JpaRepository<Culto, Long> {
}
