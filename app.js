const form = document.getElementById('form');
const alunosDiv = document.getElementById('alunos');

// Carregar alunos
function carregarAlunos() {
    alunosDiv.innerHTML = 'Carregando...';
    
    db.collection('alunos').get()
        .then((snapshot) => {
            alunosDiv.innerHTML = '';
            
            snapshot.forEach((doc) => {
                const aluno = doc.data();
                const div = document.createElement('div');
                div.className = 'aluno';
                
                div.innerHTML = `
                    <button class="excluir" onclick="excluirAluno('${doc.id}', this)">X</button>
                    <p><strong>Código:</strong> ${aluno.cod_aluno}</p>
                    <p><strong>Turma:</strong> ${aluno.cod_turma}</p>
                    <p><strong>Nome:</strong> ${aluno.nome}</p>
                    <p><strong>CPF:</strong> ${aluno.cpf}</p>
                    <p><strong>RG:</strong> ${aluno.rg}</p>
                    <p><strong>Telefone:</strong> ${aluno.telefone_aluno}</p>
                    <p><strong>Tel. Responsável:</strong> ${aluno.telefone_responsavel}</p>
                    <p><strong>Email:</strong> ${aluno.email}</p>
                    <p><strong>Data Nasc.:</strong> ${aluno.data_nascimento}</p>
                `;
                
                alunosDiv.appendChild(div);
            });
            
            if (alunosDiv.innerHTML === '') {
                alunosDiv.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
            }
        })
        .catch((error) => {
            console.error('Erro ao carregar alunos:', error);
            alunosDiv.innerHTML = '<p>Erro ao carregar alunos. Tente novamente.</p>';
        });
}

// Adicionar aluno
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const aluno = {
        cod_aluno: form.cod_aluno.value,
        cod_turma: form.cod_turma.value,
        nome: form.nome.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        telefone_aluno: form.telefone_aluno.value,
        telefone_responsavel: form.telefone_responsavel.value,
        email: form.email.value,
        data_nascimento: form.data_nascimento.value
    };
    
    db.collection('alunos').add(aluno)
        .then(() => {
            alert('Aluno cadastrado com sucesso!');
            form.reset();
            carregarAlunos();
        })
        .catch((error) => {
            console.error('Erro ao cadastrar aluno:', error);
            alert('Erro ao cadastrar aluno. Tente novamente.');
        });
});

// Excluir aluno
function excluirAluno(id, button) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        db.collection('alunos').doc(id).delete()
            .then(() => {
                button.parentElement.remove();
                if (alunosDiv.children.length === 0) {
                    alunosDiv.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
                }
            })
            .catch((error) => {
                console.error('Erro ao excluir aluno:', error);
                alert('Erro ao excluir aluno. Tente novamente.');
            });
    }
}

// Carregar alunos ao iniciar
carregarAlunos();
