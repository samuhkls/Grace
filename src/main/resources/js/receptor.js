// Dados do usuário, serão carregados/salvos no Local Storage
const userData = {
    name: "",
    address: "",
    phone: "",
    email: "", // NOVO: Adicionado campo de e-mail
    familyMembers: 1,
    hasChildren: false,
    children: [],
};

// Chave para armazenar informações pessoais do usuário no Local Storage
const USER_INFO_KEY = 'currentUserInfo';

// Função para gerar uma chave única para as solicitações de um usuário
// Usaremos o nome, telefone e email como identificador único do usuário
function getUserRequestsKey(name, phone, email) {
    // Limpa o nome, telefone e email para criar uma chave válida e consistente
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const cleanEmail = email.replace(/[^a-zA-Z0-9.\-@]/g, '').toLowerCase(); // Limpa e-mail, mantendo caracteres válidos para e-mail
    return `userRequests_${cleanName}_${cleanPhone}_${cleanEmail}`; // Chave mais robusta
}

// Funções para carregar/salvar informações pessoais do usuário
function loadUserInfo() {
    try {
        const storedInfo = localStorage.getItem(USER_INFO_KEY);
        if (storedInfo) {
            Object.assign(userData, JSON.parse(storedInfo));
        }
    } catch (e) {
        console.error("Erro ao carregar informações do usuário:", e);
    }
}

function saveUserInfo() {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify({
        name: userData.name,
        address: userData.address,
        phone: userData.phone,
        email: userData.email, // NOVO: Salva o e-mail
        familyMembers: userData.familyMembers,
        hasChildren: userData.hasChildren,
        children: userData.children
    }));
}

// Funções para carregar/salvar as solicitações ESPECÍFICAS deste usuário
function loadUserSpecificRequests() {
    if (!userData.name || !userData.phone || !userData.email) { // NOVO: Verifica o email também
        return []; // Não pode carregar solicitações se não tem as infos completas do usuário
    }
    const key = getUserRequestsKey(userData.name, userData.phone, userData.email); // NOVO: Passa o email
    try {
        const storedRequests = localStorage.getItem(key);
        return storedRequests ? JSON.parse(storedRequests) : [];
    } catch (e) {
        console.error(`Erro ao carregar solicitações para ${key}:`, e);
        return [];
    }
}

function saveUserSpecificRequests(requests) {
    if (!userData.name || !userData.phone || !userData.email) { // NOVO: Verifica o email também
        console.warn("Não é possível salvar solicitações sem informações completas de nome, telefone e e-mail do usuário.");
        return;
    }
    const key = getUserRequestsKey(userData.name, userData.phone, userData.email); // NOVO: Passa o email
    localStorage.setItem(key, JSON.stringify(requests));
}


/* Sistema de abas */
function openTab(tabId, element) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    if (element) {
        element.classList.add('active');
    }
    // Ao abrir a aba de informações pessoais (tab1), carregamos os dados do usuário
    if (tabId === 'tab1') {
        loadAndPopulatePersonalInfo();
    }
}

/* Adiciona campo para idades das crianças */
let childCount = 0;
function addChildField(age = '') {
    childCount++;
    const container = document.getElementById('childrenContainer');
    const childDiv = document.createElement('div');
    childDiv.className = 'child-item';
    childDiv.innerHTML = `
        <label class="form-label">Criança ${childCount}</label>
        <input type="number" class="form-control" name="child_age[]" min="0" max="18"
                placeholder="Idade da criança" value="${age}" required>
        <button type="button" class="remove-child" title="Remover criança" aria-label="Remover criança">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(childDiv);

    const removeBtn = childDiv.querySelector('button.remove-child');
    removeBtn.addEventListener('click', function() {
        childDiv.remove();
    });
}

/* Valida formulário informações pessoais */
function validatePersonalInfo() {
    const form = document.getElementById('personalInfoForm');
    // Adiciona o campo 'email' à lista de inputs obrigatórios
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required], #email'); 
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--error-color)';
        } else {
            input.style.borderColor = '';
        }
    });

    // Adição da validação de formato de e-mail
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value.trim() !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.style.borderColor = 'var(--error-color)';
            alert('Por favor, insira um endereço de e-mail válido.');
            return; // Sai da função para não mostrar o alerta genérico
        } else {
            emailInput.style.borderColor = '';
        }
    }


    if (isValid) {
        userData.name = document.getElementById('nome').value.trim();
        userData.address = document.getElementById('endereco').value.trim();
        userData.phone = document.getElementById('celular').value.trim();
        userData.email = document.getElementById('email').value.trim(); // NOVO: Pega o valor do e-mail
        userData.familyMembers = parseInt(document.getElementById('integrantes').value, 10);
        userData.hasChildren = document.getElementById('tem_criancas').checked;

        if (userData.hasChildren) {
            userData.children = [];
            const childAgeInputs = document.querySelectorAll('input[name="child_age[]"]');
            let allChildrenAgesValid = true;
            if (childAgeInputs.length === 0) {
                allChildrenAgesValid = false;
            }
            childAgeInputs.forEach(input => {
                const age = parseInt(input.value, 10);
                if (isNaN(age) || age < 0 || age > 18 || input.value.trim() === '') {
                    allChildrenAgesValid = false;
                    input.style.borderColor = 'var(--error-color)';
                } else {
                    input.style.borderColor = '';
                    userData.children.push({ age: age });
                }
            });

            if (!allChildrenAgesValid) {
                isValid = false;
                alert('Por favor, insira idades válidas para todas as crianças (0-18 anos) ou adicione campos de crianças.');
            }
        } else {
            userData.children = [];
        }

        if (isValid) {
            saveUserInfo(); // Salva as informações pessoais do usuário
            const tabButtons = document.querySelectorAll('.tab-btn');
            openTab('tab2', tabButtons[1]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

/* Função para salvar solicitação no admin */
function saveRequestToAdmin(newRequest) {
    let adminRequests = JSON.parse(localStorage.getItem('donationRequestsAdmin')) || [];

    adminRequests.unshift({
        ...newRequest,
        userName: userData.name,
        userEmail: userData.email, // NOVO: Inclui o e-mail para o admin
        userAddress: userData.address,
        userPhone: userData.phone,
        familyMembers: userData.familyMembers,
        hasChildren: userData.hasChildren,
        children: userData.children
    });

    localStorage.setItem('donationRequestsAdmin', JSON.stringify(adminRequests));
}

// Função para carregar e pré-preencher informações pessoais (chamada ao carregar e ao voltar para a aba 1)
function loadAndPopulatePersonalInfo() {
    loadUserInfo(); // Carrega os dados do Local Storage para userData

    document.getElementById('nome').value = userData.name;
    document.getElementById('endereco').value = userData.address;
    document.getElementById('celular').value = userData.phone;
    document.getElementById('email').value = userData.email; // NOVO: Preenche o campo de e-mail
    document.getElementById('integrantes').value = userData.familyMembers;

    document.getElementById('tem_criancas').checked = userData.hasChildren;
    const childrenFields = document.getElementById('childrenFields');
    const childrenContainer = document.getElementById('childrenContainer');
    childrenContainer.innerHTML = '';
    childCount = 0;

    if (userData.hasChildren) {
        childrenFields.style.display = 'block';
        if (userData.children && userData.children.length > 0) {
            userData.children.forEach(child => {
                addChildField(child.age);
            });
        } else {
            addChildField();
        }
    } else {
        childrenFields.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadAndPopulatePersonalInfo();

    document.getElementById('tem_criancas').addEventListener('change', function() {
        const childrenFields = document.getElementById('childrenFields');
        const childrenContainer = document.getElementById('childrenContainer');
        if (this.checked) {
            childrenFields.style.display = 'block';
            if (childrenContainer.children.length === 0) {
                addChildField();
            }
        } else {
            childrenFields.style.display = 'none';
            childrenContainer.innerHTML = '';
            childCount = 0;
        }
    });

    document.getElementById('donationRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const tipo = document.getElementById('tipo').value;
        const descricao = document.getElementById('descricao').value.trim();
        const urgencia = document.getElementById('urgencia').value;

        if (!tipo) {
            Toastify({ text: "Por favor, selecione o tipo de doação.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#ffc371" }).showToast();
            return;
        }
        if (!descricao) {
            Toastify({ text: "Por favor, preencha a descrição detalhada.", duration: 3000, gravity: "top", position: "right", backgroundColor: "#ffc371" }).showToast();
            return;
        }

        // Verifica se as informações pessoais foram preenchidas (incluindo o e-mail)
        if (!userData.name || !userData.address || !userData.phone || !userData.email) { // NOVO: Verifica o email
            Toastify({ text: "Por favor, preencha todas as suas informações pessoais na primeira aba antes de enviar a solicitação.", duration: 5000, gravity: "top", position: "right", backgroundColor: "#ffc371" }).showToast();
            openTab('tab1', document.querySelectorAll('.tab-btn')[0]);
            return;
        }

        const newId = Date.now();

        const newRequest = {
            id: newId,
            type: tipo,
            description: descricao,
            date: new Date().toLocaleDateString('pt-BR'),
            status: 'pending',
            urgency: urgencia
        };

        const userSpecificRequests = loadUserSpecificRequests();
        userSpecificRequests.unshift(newRequest);
        saveUserSpecificRequests(userSpecificRequests);

        saveRequestToAdmin(newRequest);

        Toastify({
            text: "Solicitação enviada com sucesso!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true,
        }).showToast();

        this.reset();
        document.getElementById('childrenContainer').innerHTML = '';
        document.getElementById('tem_criancas').checked = false;
        document.getElementById('childrenFields').style.display = 'none';
        childCount = 0;

        openTab('tab1', document.querySelector('.tab-btn'));
        window.scrollTo({ top: 0, behavior: 'smooth' });

        updateRequestsList();
    });

    document.getElementById('viewProfileLink').addEventListener('click', e => {
        e.preventDefault();
        showProfileSection();
    });

    document.getElementById('profileBtn').addEventListener('click', e => {
        const dropdownContent = document.getElementById('dropdownContent');
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.profile-btn') && !event.target.closest('.profile-btn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });

    const newRequestBtn = document.querySelector('.btn-new-request');
    if (newRequestBtn) {
        newRequestBtn.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById('profileSection').style.display = 'none';
            document.getElementById('donationSection').style.display = 'block';
            openTab('tab1', document.querySelectorAll('.tab-btn')[0]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const addChildButton = document.getElementById('addChild');
    if (addChildButton) {
        addChildButton.addEventListener('click', addChildField);
    }
});


function showProfileSection() {
    document.getElementById('donationSection').style.display = 'none';
    const profileSection = document.getElementById('profileSection');
    profileSection.style.display = 'block';

    document.getElementById('profileName').textContent = userData.name || "Não preenchido";
    document.getElementById('profileAddress').textContent = userData.address || "Não preenchido";
    document.getElementById('profilePhone').textContent = userData.phone || "Não preenchido";

    // NOVO: Exibe o e-mail no perfil se o elemento existir
    const profileEmailElement = document.getElementById('profileEmail');
    if (profileEmailElement) {
        profileEmailElement.textContent = userData.email || "Não preenchido";
    }

    updateRequestsList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteRequest(requestId) {
    if (confirm('Tem certeza que deseja excluir esta solicitação?')) {
        let userSpecificRequests = loadUserSpecificRequests();
        userSpecificRequests = userSpecificRequests.filter(request => request.id !== requestId);
        saveUserSpecificRequests(userSpecificRequests);

        let adminRequests = JSON.parse(localStorage.getItem('donationRequestsAdmin')) || [];
        adminRequests = adminRequests.filter(request => request.id !== requestId);
        localStorage.setItem('donationRequestsAdmin', JSON.stringify(adminRequests));

        updateRequestsList();

        Toastify({
            text: "Solicitação excluída com sucesso!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            stopOnFocus: true,
        }).showToast();
    }
}

function updateRequestsList() {
    const requestsContainer = document.querySelector('.requests-list');
    if (!requestsContainer) return;

    requestsContainer.querySelectorAll('.request-card').forEach(card => card.remove());

    const newRequestBtnElement = requestsContainer.querySelector('.btn-new-request-container');

    const userSpecificRequests = loadUserSpecificRequests();

    let noRequestsMessage = requestsContainer.querySelector('.no-requests-message');
    if (userSpecificRequests.length === 0) {
        if (!noRequestsMessage) {
            const msgDiv = document.createElement('p');
            msgDiv.className = 'no-requests-message';
            msgDiv.textContent = 'Você ainda não possui nenhuma solicitação.';
            if (newRequestBtnElement) {
                requestsContainer.insertBefore(msgDiv, newRequestBtnElement);
            } else {
                requestsContainer.appendChild(msgDiv);
            }
        }
    } else {
        if (noRequestsMessage) {
            noRequestsMessage.remove();
        }

        userSpecificRequests.forEach(request => {
            let requestDate = request.date;
            if (typeof request.date === 'string' && request.date.includes('-') && request.date.split('-').length === 3) {
                const parts = request.date.split('-');
                requestDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            }

            const card = document.createElement('div');
            card.className = 'request-card';
            card.innerHTML = `
                <div class="request-header">
                    <span class="request-type">${request.type.charAt(0).toUpperCase() + request.type.slice(1)}</span>
                    <span class="request-date">${requestDate}</span>
                </div>
                <p style="margin-bottom: 10px;">${request.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="request-status status-${request.status}">
                        ${request.status === 'approved' ? 'Aprovada' :
                          request.status === 'pending' ? 'Pendente' : 'Rejeitada'}
                    </span>
                    <div style="display: flex; gap: 5px;">
                        <button class="btn btn-secondary btn-details" data-id="${request.id}" style="padding: 5px 10px; font-size: 0.9rem;">
                            <i class="fas fa-eye"></i> Detalhes
                        </button>
                        <button class="btn btn-danger btn-delete" data-id="${request.id}" style="padding: 5px 10px; font-size: 0.9rem;">
                            <i class="fas fa-trash-alt"></i> Excluir
                        </button>
                    </div>
                </div>
            `;
            if (newRequestBtnElement) {
                requestsContainer.insertBefore(card, newRequestBtnElement);
            } else {
                requestsContainer.appendChild(card);
            }

            const detailsBtn = card.querySelector('.btn-details');
            detailsBtn.addEventListener('click', () => {
                const urgencyText = request.urgency ? `\nUrgência: ${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}` : '';

                const userName = userData.name || 'N/A';
                const userPhone = userData.phone || 'N/A';
                const userAddress = userData.address || 'N/A';
                const userEmail = userData.email || 'N/A'; // NOVO: Pega o email
                const familyMembers = userData.familyMembers || 1;

                let childrenDetails = '';
                if (userData.hasChildren && userData.children && userData.children.length > 0) {
                    childrenDetails = `\nCrianças: ${userData.children.map(c => `${c.age} anos`).join(', ')}`;
                }

                alert(`Detalhes da Solicitação:
Nome do Solicitante: ${userName}
Telefone: ${userPhone}
E-mail: ${userEmail}
Endereço: ${userAddress}
Membros na família: ${familyMembers}${childrenDetails}
Tipo: ${request.type.charAt(0).toUpperCase() + request.type.slice(1)}
Descrição: ${request.description}
Data da Solicitação: ${requestDate}
Status: ${request.status === 'approved' ? 'Aprovada' : request.status === 'pending' ? 'Pendente' : 'Rejeitada'}${urgencyText}`);
            });

            const deleteBtn = card.querySelector('.btn-delete');
            deleteBtn.addEventListener('click', () => {
                deleteRequest(request.id);
            });
        });
    }
}