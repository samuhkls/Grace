package br.com.grace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import br.com.grace.model.Doacao;
import br.com.grace.service.DoacaoService;
import br.com.grace.service.EstoqueDoacoesService;
import br.com.grace.repository.TipoDoacaoRepository;

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
        model.addAttribute("doacoes", doacaoService.listar());
        model.addAttribute("estoque", estoqueService.listarEstoque());
        model.addAttribute("novaDoacao", new Doacao());
        model.addAttribute("tipos", tipoDoacaoRepository.findAll());
        return "adm";
    }

    @PostMapping("/doacoes/adicionar")
    public String adicionarDoacao(@ModelAttribute("novaDoacao") Doacao doacao) {
        doacaoService.salvar(doacao);
        return "redirect:/admin";
    }
}