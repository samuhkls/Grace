
if (!localStorage.getItem('registeredUsers')) {
    const demoUsers = [
        { 
            id: '1',
            nome: 'Usuário Demo',
            email: 'usuario@exemplo.com', 
            password: '123456',
            dataCadastro: new Date().toISOString(),
            tipo: 'doador'
        },
        { 
            id: '2',
            nome: 'Teste Demo',
            email: 'teste@exemplo.com', 
            password: 'senha123',
            dataCadastro: new Date().toISOString(),
            tipo: 'receptor'
        },
        {
            id: '3',
            nome: 'Admin Demo',
            email: 'admin@exemplo.com',
            password: 'admin123',
            dataCadastro: new Date().toISOString(),
            tipo: 'doador'
        }
    ];
    localStorage.setItem('registeredUsers', JSON.stringify(demoUsers));
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

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
                localStorage.setItem('loggedInUser', JSON.stringify(userFound));
                
                let redirectPage = '';

                if (email.includes('admin')) {
                    redirectPage = 'adm.html'; 
                }
                else if (userFound.tipo === 'doador') {
                    redirectPage = 'doacoes.html'; 
                } else if (userFound.tipo === 'receptor') {
                    redirectPage = 'receptor.html';
                } else {
                    redirectPage = 'doacoes.html'; 
                }
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

                setTimeout(() => {
                    window.location.href = redirectPage;
                }, 2000);
            } else {
                Toastify({
                    text: "Usuário não cadastrado. Clique aqui para cadastrar",
                    duration: 4000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#f44336",
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