package br.com.grace.service;

import br.com.grace.model.Doacao;
import br.com.grace.model.Usuario;
import br.com.grace.repository.DoacaoRepository;
import br.com.grace.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoacaoService {
    private final DoacaoRepository repo;

    public DoacaoService(DoacaoRepository repo) { this.repo = repo; }

    public void salvar(Doacao doacao) { repo.save(doacao); }
    public List<Doacao> listar() { return repo.findAll(); }
}