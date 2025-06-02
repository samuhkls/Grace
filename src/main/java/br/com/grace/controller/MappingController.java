package br.com.grace.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@Controller
public class MappingController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/adm")
    public String adm() {
        return "adm";
    }

    @GetMapping("/cadastro")
    public String cadastro() {
        return "cadastro";
    }

    @GetMapping("/cultos")
    public String cultos() {
        return "cultos";
    }

    @GetMapping("/doacoes")
    public String doacoes() {
        return "doacoes";
    }

    @GetMapping("/nossosprojetos")
    public String nossosProjetos() {
        return "nossosprojetos";
    }

    @GetMapping("/receptor")
    public String receptor() {
        return "receptor";
    }

    @GetMapping("/redefinirSenha")
    public String redefinirSenha() {
        return "redefinirSenha";
    }

    @GetMapping("/sobrenos")
    public String sobreNos() {
        return "sobrenos";
    }
}
