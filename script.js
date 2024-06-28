document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('funcionario-form');
    const funcionariosLista = document.getElementById('funcionarios-lista');
    const removerTodosBtn = document.getElementById('remover-todos');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const salario = document.getElementById('salario').value;
        const sexo = document.getElementById('sexo').value;

        const novoFuncionario = { nome, salario, sexo };

        fetch('http://localhost:5000/funcionarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoFuncionario),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar funcionário');
                }
                return response.json();
            })
            .then(data => {
                console.log('Funcionário cadastrado:', data);
                carregarFuncionarios(); // Após cadastrar, recarrega a lista de funcionários
                form.reset(); // Limpa o formulário após o cadastro
            })
            .catch(error => console.error('Erro ao cadastrar funcionário:', error));
    });

    function carregarFuncionarios() {
        fetch('http://localhost:5000/funcionarios')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar funcionários');
                }
                return response.json();
            })
            .then(data => {
                funcionariosLista.innerHTML = ''; // Limpa a lista atual de funcionários
                data.forEach(funcionario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${funcionario.id}</td>
                        <td>${funcionario.nome}</td>
                        <td>${funcionario.salario}</td>
                        <td>${funcionario.sexo}</td>
                    `;
                    funcionariosLista.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao carregar funcionários:', error));
    }

    // Função para remover todos os funcionários
    function removerTodosFuncionarios() {
        fetch('http://localhost:5000/funcionarios/remover-todos', {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao remover todos os funcionários');
                }
                return response.json();
            })
            .then(data => {
                console.log('Todos os funcionários foram removidos:', data);
                carregarFuncionarios(); // Após remover, recarrega a lista de funcionários
            })
            .catch(error => console.error('Erro ao remover todos os funcionários:', error));
    }

    // Event listener para o botão "Remover Todos os Funcionários"
    removerTodosBtn.addEventListener('click', removerTodosFuncionarios);

    carregarFuncionarios(); // Carrega os funcionários ao carregar a página
});
