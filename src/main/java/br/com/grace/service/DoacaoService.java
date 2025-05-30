package br.com.grace.service;

import br.com.grace.model.Doacao;
import br.com.grace.model.EstoqueDoacoes;
import br.com.grace.model.TipoDoacao;
import br.com.grace.model.Usuario;
import br.com.grace.repository.DoacaoRepository;
import br.com.grace.repository.EstoqueDoacoesRepository;
import br.com.grace.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.grace.repository.TipoDoacaoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DoacaoService {
    private final DoacaoRepository repo;
    private final TipoDoacaoRepository tipoDoacaoRepository;
    private final EstoqueDoacoesRepository estoqueRepository;

    public DoacaoService(DoacaoRepository repo, TipoDoacaoRepository tipoDoacaoRepository, EstoqueDoacoesRepository estoqueRepository) {
        this.repo = repo;
        this.tipoDoacaoRepository = tipoDoacaoRepository;
        this.estoqueRepository = estoqueRepository;
    }


    public void salvar(Doacao doacao) { repo.save(doacao); }
    public List<Doacao> listar() { return repo.findAll(); }
    public void realizarDoacao(Usuario usuario, Long tipoId, int quantidade) {
        Doacao doacao = new Doacao();
        doacao.setUsuario(usuario);
        doacao.setDataHora(LocalDateTime.now());

        TipoDoacao tipo = tipoDoacaoRepository.findById(tipoId)
                .orElseThrow(() -> new IllegalArgumentException("Tipo de doação inválido"));

        doacao.setTipoDoacao(tipo);
        doacao.setQuantidade(quantidade);
        repo.save(doacao);

        EstoqueDoacoes estoque = estoqueRepository.findByTipoDoacaoId(tipoId);
        if (estoque == null) {
            estoque = new EstoqueDoacoes();
            estoque.setTipoDoacao(tipo);
            estoque.setQuantidade(quantidade);
        } else {
            estoque.setQuantidade(estoque.getQuantidade() + quantidade);
        }
        estoqueRepository.save(estoque);
    }

}