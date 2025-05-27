package br.com.grace.repository;

import br.com.grace.model.Doacao;
import br.com.grace.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoacaoRepository extends JpaRepository<Doacao, Long> {

}
