package br.com.grace.service;

import br.com.grace.model.Grupo;
import br.com.grace.model.Usuario;
import br.com.grace.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repo;
    public Usuario cadastrarMembro(Usuario user) {
        user.setTipo(Grupo.MEMBRO);
        return repo.save(user);
    }
    public Optional<Usuario> autenticar(String email, String senha) {
        return repo.findByEmail(email)
                .filter(user -> user.getSenha().equals(senha));
    }

    public void salvar(Usuario user) { repo.save(user); }

}
