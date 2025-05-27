package br.com.grace.service;

import br.com.grace.model.Culto;
import br.com.grace.repository.CultoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CultoService {
    private final CultoRepository repo;

    public CultoService(CultoRepository repo) {
        this.repo = repo;
    }

    public void salvar(Culto culto) {
        repo.save(culto); }
    public List<Culto> listar() {
        return repo.findAll(); }
}
