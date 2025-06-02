package br.com.grace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import br.com.grace.model.Doacao;
import br.com.grace.model.EstoqueDoacoes; // Supondo que EstoqueDoacoesService retorne List<EstoqueDoacoes>
import br.com.grace.model.TipoDoacao;
import br.com.grace.service.DoacaoService;
import br.com.grace.service.EstoqueDoacoesService;
import br.com.grace.repository.TipoDoacaoRepository;

import java.util.Collections;
import java.util.List;

@Controller
public class AdminController {

    @Autowired
    private DoacaoService doacaoService;

    @Autowired
    private EstoqueDoacoesService estoqueService;

    @Autowired
    private TipoDoacaoRepository tipoDoacaoRepository;

    @GetMapping("/admin")
    public String exibirPainelAdmin(Model model) {

        // 1. Doacoes (para o card de resumo e para a tabela "Entradas de Estoque")
        try {
            if (doacaoService == null) {
                model.addAttribute("doacoes", Collections.emptyList());
            } else {
                List<Doacao> doacoesList = doacaoService.listar();
                if (doacoesList == null) {
                    model.addAttribute("doacoes", Collections.emptyList());
                } else {
                    System.out.println("doacaoService.listar() retornou " + doacoesList.size() + " doações.");
                    model.addAttribute("doacoes", doacoesList);
                }
            }
        } catch (Exception e) {
            System.err.println("Exceção ao buscar 'doacoes': " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("doacoes", Collections.emptyList());
        }

        try {
            if (estoqueService == null) {
                System.err.println("ERRO - estoqueService está NULL!");
                model.addAttribute("estoque", Collections.emptyList());
            } else {
                List<?> estoqueAgregadoList = estoqueService.listarEstoque();
                if (estoqueAgregadoList == null) {
                    model.addAttribute("estoque", Collections.emptyList());
                } else {
                    System.out.println("--- AdminController: estoqueService.listarEstoque() retornou " + estoqueAgregadoList.size() + " itens de saldo de estoque.");
                    model.addAttribute("estoque", estoqueAgregadoList);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("estoque", Collections.emptyList());
        }

        try {
            if (tipoDoacaoRepository == null) {
                model.addAttribute("tipos", Collections.emptyList());
            } else {
                List<TipoDoacao> tiposList = tipoDoacaoRepository.findAll();
                if (tiposList == null) {
                    model.addAttribute("tipos", Collections.emptyList());
                } else {
                    model.addAttribute("tipos", tiposList);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("tipos", Collections.emptyList());
        }

        // 4. Nova Doacao (para o formulário)
        Doacao novaDoacaoObj = new Doacao();
        novaDoacaoObj.setTipoDoacao(new TipoDoacao());
        model.addAttribute("novaDoacao", novaDoacaoObj);
        return "adm";
    }

    @PostMapping("/doacoes/adicionar")
    public String adicionarDoacao(@ModelAttribute("novaDoacao") Doacao doacao) {
        if (doacao == null || doacao.getTipoDoacao() == null || doacao.getTipoDoacao().getId() == null) {
            return "redirect:/admin?error=dados_incompletos";
        }

        try {
            TipoDoacao tipoSelecionado = tipoDoacaoRepository.findById(doacao.getTipoDoacao().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Tipo de Doação inválido ID: " + doacao.getTipoDoacao().getId()));
            doacao.setTipoDoacao(tipoSelecionado);

            if (doacaoService == null) {
                return "redirect:/admin?error=servico_indisponivel";
            }
            doacaoService.salvar(doacao);

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return "redirect:/admin?error=tipo_doacao_invalido";
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/admin?error=salvar_doacao_exception";
        }
        return "redirect:/admin";
    }
}