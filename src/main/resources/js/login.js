// Ensure there is a registeredUsers array in localStorage for testing
// Este bloco pode ser removido em produção, é apenas para fins de teste
if (!localStorage.getItem('registeredUsers')) {
    const demoUsers = [
        { 
            id: '1',
            nome: 'Usuário Demo',
            email: 'usuario@exemplo.com', 
            password: '123456',
            dataCadastro: new Date().toISOString(),
            tipo: 'doador' // Exemplo: este será redirecionado para doacoes.html
        },
        { 
            id: '2',
            nome: 'Teste Demo',
            email: 'teste@exemplo.com', 
            password: 'senha123',
            dataCadastro: new Date().toISOString(),
            tipo: 'receptor' // Exemplo: este será redirecionado para receptor.html
        },
        { // Adicionando um usuário admin de demonstração
            id: '3',
            nome: 'Admin Demo',
            email: 'admin@exemplo.com', // Este email será redirecionado para admin.html
            password: 'admin123',
            dataCadastro: new Date().toISOString(),
            tipo: 'doador' // **Mesmo que seja 'doador' aqui, o email 'admin@exemplo.com' vai para admin.html**
        }
    ];
    localStorage.setItem('registeredUsers', JSON.stringify(demoUsers));
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    // Carrega Toastify dinamicamente (caso não esteja no HTML)
    if (typeof Toastify === 'undefined') {
        const toastifyScript = document.createElement('script');
        toastifyScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
        toastifyScript.onload = initLoginForm;
        document.head.appendChild(toastifyScript);

        const toastifyStyle = document.createElement('link');
        toastifyStyle.rel = 'stylesheet';
        toastifyStyle.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
        document.head.appendChild(toastifyStyle);
    } else {
        initLoginForm();
    }

    function initLoginForm() {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
        
            const email = this.email.value.trim().toLowerCase();
            const password = this.password.value;
        
            const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        
            const userFound = users.find(u => u.email === email && u.password === password);
        
            if (userFound) {
                // Login bem-sucedido
                localStorage.setItem('loggedInUser', JSON.stringify(userFound));
                
                let redirectPage = '';

                // --- AQUI ESTÁ A ÚNICA ADIÇÃO NECESSÁRIA PARA O REDIRECIONAMENTO DE ADMIN ---
                // Se o email digitado no login contiver "admin", redireciona para a página do administrador
                if (email.includes('admin')) { // Usamos .includes() para ser mais flexível (ex: "meuadmin@email.com")
                    redirectPage = 'adm.html'; 
                } 
                // Se não for um email "admin", mantém a lógica existente baseada no tipo salvo
                else if (userFound.tipo === 'doador') {
                    redirectPage = 'doacoes.html'; 
                } else if (userFound.tipo === 'receptor') {
                    redirectPage = 'receptor.html';
                } else {
                    // Redirecionamento padrão se o tipo não for especificado ou for desconhecido
                    // Isso só aconteceria para usuários não-admin que não têm 'doador'/'receptor'
                    redirectPage = 'doacoes.html'; 
                }
                // --- FIM DA ADIÇÃO/MODIFICAÇÃO PONTUAL ---

                // Toastify de sucesso (mesmo estilo do cadastro)
                Toastify({
                    text: "Login realizado com sucesso! Redirecionando...",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#4caf50",
                    stopOnFocus: true,
                    style: {
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }
                }).showToast();
                
                // Redireciona após 2 segundos
                setTimeout(() => {
                    window.location.href = redirectPage;
                }, 2000);
            } else {
                // Usuário não encontrado
                Toastify({
                    text: "Usuário não cadastrado. Clique aqui para cadastrar",
                    duration: 4000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#f44336", // Vermelho consistente com o cadastro
                    stopOnFocus: true,
                    style: {
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer"
                    },
                    onClick: function() {
                        window.location.href = 'cadastro.html';
                    }
                }).showToast();
            }
        });
    }
});