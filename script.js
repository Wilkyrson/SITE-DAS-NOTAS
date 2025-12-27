// Banco de dados simulado com CPF
const bancoDeAlunos = [
    {
        nome: "MARIA SILVA SANTOS",
        cpf: "123.456.789-00",
        matricula: "20240001",
        notas: {
            portugues: { nota: 8.5, faltas: 2 },
            matematica: { nota: 9.0, faltas: 1 },
            historia: { nota: 7.8, faltas: 3 },
            geografia: { nota: 8.2, faltas: 0 },
            ciencias: { nota: 9.5, faltas: 1 },
            ingles: { nota: 8.7, faltas: 2 }
        }
    },
    {
        nome: "JOAO PEDRO OLIVEIRA",
        cpf: "987.654.321-00",
        matricula: "20240002",
        notas: {
            portugues: { nota: 6.5, faltas: 5 },
            matematica: { nota: 5.8, faltas: 7 },
            historia: { nota: 7.0, faltas: 4 },
            geografia: { nota: 6.2, faltas: 6 },
            ciencias: { nota: 5.5, faltas: 8 },
            ingles: { nota: 6.9, faltas: 3 }
        }
    },
    {
        nome: "ANA CLARA COSTA",
        cpf: "456.789.123-00",
        matricula: "20240003",
        notas: {
            portugues: { nota: 9.2, faltas: 0 },
            matematica: { nota: 9.8, faltas: 1 },
            historia: { nota: 8.5, faltas: 2 },
            geografia: { nota: 9.0, faltas: 0 },
            ciencias: { nota: 9.7, faltas: 1 },
            ingles: { nota: 9.4, faltas: 0 }
        }
    }
];

// Máscara para CPF
document.getElementById('cpfAluno').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    
    // Formatar CPF: 000.000.000-00
    if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    
    e.target.value = value;
});

// Validação de CPF (simplificada)
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Algoritmo de validação de CPF
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

function buscarNotas() {
    const nome = document.getElementById('nomeAluno').value.trim().toUpperCase();
    const cpf = document.getElementById('cpfAluno').value.trim();
    
    // Esconder resultados anteriores
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('erro').style.display = 'none';
    
    // Validações
    if (!nome) {
        mostrarErro('Por favor, informe seu nome completo.');
        return;
    }
    
    if (!cpf) {
        mostrarErro('Por favor, informe seu CPF.');
        return;
    }
    
    // Validar formato do CPF
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        mostrarErro('CPF inválido. Use o formato: 000.000.000-00');
        return;
    }
    
    // Validar CPF (opcional - pode remover se não quiser validar o dígito)
    if (!validarCPF(cpf)) {
        mostrarErro('CPF inválido. Verifique os dígitos informados.');
        return;
    }
    
    // Mostrar loading
    document.getElementById('loading').style.display = 'block';
    
    // Simular busca
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        
        // Buscar aluno (verifica nome E CPF)
        const aluno = bancoDeAlunos.find(a => 
            a.nome === nome && a.cpf === cpf
        );
        
        if (aluno) {
            exibirNotas(aluno);
        } else {
            // Tentar encontrar com nome similar
            const alunoSimilar = bancoDeAlunos.find(a => 
                a.nome.includes(nome) && a.cpf === cpf
            );
            
            if (alunoSimilar) {
                exibirNotas(alunoSimilar);
            } else {
                mostrarErro('Credenciais inválidas. Verifique se o nome e CPF estão corretos.');
            }
        }
    }, 1500);
}

function exibirNotas(aluno) {
    // Calcular média
    const notas = Object.values(aluno.notas).map(n => n.nota);
    const media = (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1);
    
    // Calcular frequência
    const totalFaltas = Object.values(aluno.notas).reduce((total, materia) => total + materia.faltas, 0);
    const frequencia = Math.max(0, 100 - (totalFaltas * 2)).toFixed(1); // Supondo 50 aulas no semestre
    
    // Determinar status
    let status, statusClass;
    if (media >= 7 && frequencia >= 75) {
        status = "APROVADO";
        statusClass = "aprovado";
    } else if (media >= 5 && frequencia >= 75) {
        status = "RECUPERAÇÃO";
        statusClass = "recuperacao";
    } else {
        status = "REPROVADO";
        statusClass = "reprovado";
    }
    
    // Gerar HTML das notas
    let notasHTML = '';
    for (const [materia, dados] of Object.entries(aluno.notas)) {
        const materiaFormatada = materia.charAt(0).toUpperCase() + materia.slice(1);
        notasHTML += `
            <div class="nota-card">
                <h3>${materiaFormatada}</h3>
                <div class="nota-valor">${dados.nota.toFixed(1)}</div>
                <div class="nota-faltas">
                    <i class="fas fa-calendar-times"></i> ${dados.faltas} falta(s)
                </div>
            </div>
        `;
    }
    
    // Montar resultado completo
    const resultadoHTML = `
        <div class="aluno-info">
            <h2>${aluno.nome}</h2>
            <div class="aluno-details">
                <div class="detail-item">
                    <i class="fas fa-id-card"></i>
                    <span>CPF: ${aluno.cpf}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-hashtag"></i>
                    <span>Matrícula: ${aluno.matricula}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Semestre: 2024/1</span>
                </div>
            </div>
        </div>
        
        <div class="notas-grid">
            ${notasHTML}
        </div>
        
        <div class="status-container">
            <div class="media-final">
                <h3>MÉDIA GERAL</h3>
                <div class="media-final-valor">${media}</div>
                <div class="status ${statusClass}">${status}</div>
            </div>
            
            <div class="frequencia">
                <h3>FREQUÊNCIA</h3>
                <div class="frequencia-valor">${frequencia}%</div>
                <p style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">
                    ${totalFaltas} falta(s) registrada(s)
                </p>
            </div>
        </div>
        
        <div class="actions">
            <button class="btn-print" onclick="window.print()">
                <i class="fas fa-print"></i> Imprimir Boletim
            </button>
            <button class="btn-logout" onclick="limparFormulario()">
                <i class="fas fa-sign-out-alt"></i> Sair
            </button>
        </div>
    `;
    
    // Exibir resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = resultadoHTML;
    resultadoDiv.style.display = 'block';
    
    // Rolar até o resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Registrar acesso (em produção, enviaria para servidor)
    console.log(`Acesso registrado: ${aluno.nome} - ${new Date().toLocaleString()}`);
}

function mostrarErro(mensagem) {
    const erroDiv = document.getElementById('erro');
    erroDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>FALHA NA AUTENTICAÇÃO</h3>
        <p>${mensagem}</p>
        <p style="margin-top: 15px; font-size: 0.9rem;">
            <i class="fas fa-lightbulb"></i> Dicas:
        </p>
        <ul style="text-align: left; margin-top: 10px; font-size: 0.85rem;">
            <li>Use LETRAS MAIÚSCULAS no nome</li>
            <li>Verifique os pontos e traço no CPF</li>
            <li>Entre em contato se persistir: (11) 99999-9999</li>
        </ul>
    `;
    erroDiv.style.display = 'block';
}

function limparFormulario() {
    document.getElementById('nomeAluno').value = '';
    document.getElementById('cpfAluno').value = '';
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('erro').style.display = 'none';
    document.getElementById('nomeAluno').focus();
}

// Permitir busca com Enter
document.getElementById('nomeAluno').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('cpfAluno').focus();
    }
});

document.getElementById('cpfAluno').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarNotas();
    }
});

// Focar no campo de nome ao carregar
window.onload = function() {
    document.getElementById('nomeAluno').focus();
};
