package br.com.grace.controller;

import br.com.grace.service.CultoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cultos")
public class CultoController {
    private final CultoService service;

    public CultoController(CultoService service) { this.service = service; }

    @GetMapping("/listar")
    public String listar(Model model) {
        model.addAttribute("cultos", service.listar());
        return "cultos";
    }
}
