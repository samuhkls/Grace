package br.com.grace.service;

import br.com.grace.model.EstoqueDoacoes;
import br.com.grace.repository.EstoqueDoacoesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstoqueDoacoesService {
    private final EstoqueDoacoesRepository repo;
    public EstoqueDoacoesService(EstoqueDoacoesRepository repo) { this.repo = repo; }
    public List<EstoqueDoacoes> listarEstoque() {
        return repo.findAll();
    }
    public EstoqueDoacoes porTipo(Long tipoId) {
        return repo.findByTipoDoacaoId(tipoId);
    }
    public void atualizar(EstoqueDoacoes estoque) {
        repo.save(estoque);
    }
}
