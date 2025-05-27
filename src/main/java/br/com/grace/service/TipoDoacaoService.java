package br.com.grace.service;

import br.com.grace.model.TipoDoacao;
import br.com.grace.repository.TipoDoacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoDoacaoService {
    private final TipoDoacaoRepository repo;
    public TipoDoacaoService(TipoDoacaoRepository repo) { this.repo = repo; }
    public List<TipoDoacao> listarCategorias() {
        return repo.findAll();
    }
}
