document.addEventListener('DOMContentLoaded', function() {
    // Carrega a biblioteca Toastify dinamicamente
    const toastifyScript = document.createElement('script');
    toastifyScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
    toastifyScript.onload = initForm; // Chama initForm quando Toastify estiver carregado
    document.head.appendChild(toastifyScript);

    const toastifyStyle = document.createElement('link');
    toastifyStyle.rel = 'stylesheet';
    toastifyStyle.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
    document.head.appendChild(toastifyStyle);

    function initForm() {
        const cadastroForm = document.getElementById('cadastro-form');
        const emailInput = document.getElementById('email');
        const doadorRadio = document.getElementById('tipo-doador');
        const receptorRadio = document.getElementById('tipo-receptor');

        // --- NOVA FUNCIONALIDADE: Desabilitar/Habilitar opções de tipo de usuário para admin ---
        emailInput.addEventListener('input', function() {
            const emailValue = this.value.trim().toLowerCase();
            const isAdminEmail = emailValue.includes('admin');

            if (isAdminEmail) {
                // Se o email contiver 'admin', desabilita as opções de doador/receptor
                doadorRadio.disabled = true;
                receptorRadio.disabled = true;
                // Opcional: desmarcar se já estiverem marcados
                doadorRadio.checked = false;
                receptorRadio.checked = false;
            } else {
                // Se o email não contiver 'admin', habilita as opções
                doadorRadio.disabled = false;
                receptorRadio.disabled = false;
            }
        });
        // --- FIM DA NOVA FUNCIONALIDADE ---

//        cadastroForm.addEventListener('submit', function(event) {
//            event.preventDefault();
//
//            const nome = document.getElementById('nome').value.trim();
//            const email = document.getElementById('email').value.trim().toLowerCase();
//            const senha = document.getElementById('senha').value;
//            const confirmSenha = document.getElementById('confirm-senha').value;
//
//            // Obtém o valor do tipo de usuário selecionado (doador ou receptor)
//            // Se o email for admin, o tipo será 'admin' automaticamente
//            const tipoUsuarioElement = document.querySelector('input[name="tipo-usuario"]:checked');
//            let tipoUsuario = tipoUsuarioElement ? tipoUsuarioElement.value : null;
//
//            // Se o email for de admin, força o tipo de usuário para 'admin'
//            if (email.includes('admin')) {
//                tipoUsuario = 'admin';
//            }
//
//            // Validação dos campos
//            // Para emails 'admin', não exigimos que um tipo de usuário seja selecionado via rádio
//            if (!nome || !email || !senha || !confirmSenha || (!tipoUsuario && !email.includes('admin'))) {
//                showToast("Por favor, preencha todos os campos e selecione o tipo de usuário (se aplicável).", "error");
//                return;
//            }
//
//            // Validação do email
//            if (!validateEmail(email)) {
//                showToast("Por favor, insira um e-mail válido.", "error");
//                return;
//            }
//
//            // Validação da senha
//            if (senha !== confirmSenha) {
//                showToast("As senhas não coincidem. Tente novamente.", "error");
//                return;
//            }
//
//            if (senha.length < 6) {
//                showToast("A senha deve ter pelo menos 6 caracteres.", "error");
//                return;
//            }
//
//            // Recupera usuários do localStorage
//            const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
//
//            // Verifica se o email já existe
//            if (users.some(user => user.email === email)) {
//                showToast("Este e-mail já está cadastrado. Faça login.", "error");
//                return;
//            }
//
//            // Cria o novo usuário com o tipo de usuário
//            const newUser = {
//                id: Date.now().toString(),
//                nome,
//                email,
//                password: senha,
//                tipo: tipoUsuario, // Adicionado o tipo de usuário (doador/receptor/admin)
//                dataCadastro: new Date().toISOString()
//            };
//
//            // Salva no localStorage
//            users.push(newUser);
//            localStorage.setItem('registeredUsers', JSON.stringify(users));
//
//            // Feedback de sucesso
//            showToast("Cadastro realizado com sucesso! Redirecionando...", "success");
//
//            // Redireciona após 3 segundos
//            setTimeout(() => {
//                window.location.href = 'login.html';
//            }, 3000);
//        });
    }

    /**
     * Exibe um toast de notificação.
     * @param {string} message - A mensagem a ser exibida.
     * @param {"success" | "error"} type - O tipo de toast (success ou error).
     */
    function showToast(message, type) {
        const backgroundColor = type === "error" ? "#f44336" : "#4caf50";
        
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor,
            stopOnFocus: true,
            style: {
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }
        }).showToast();
    }

    /**
     * Valida o formato de um endereço de e-mail.
     * @param {string} email - O endereço de e-mail a ser validado.
     * @returns {boolean} - True se o e-mail for válido, false caso contrário.
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});