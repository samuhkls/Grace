package br.com.grace.service;

import br.com.grace.model.Grupo;
import br.com.grace.model.Usuario;
import br.com.grace.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    public Usuario cadastrarMembro(String nome, String email, String senha) {
        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha);
        usuario.setTipo(Grupo.MEMBRO);
        return usuarioRepository.save(usuario);
    }

}
