# SITE-DAS-NOTAS
Sistema Web Simples para Consulta de Notas
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de Notas - Escola</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <i class="fas fa-graduation-cap"></i>
                <h1>Sistema de Consulta de Notas</h1>
            </div>
            <p class="subtitle">Digite seu nome completo para visualizar suas notas</p>
        </header>

        <main>
            <div class="search-box">
                <div class="input-group">
                    <i class="fas fa-user"></i>
                    <input type="text" 
                           id="nomeAluno" 
                           placeholder="Ex: Maria Silva Santos"
                           autocomplete="off">
                    <button id="buscarBtn" onclick="buscarNotas()">
                        <i class="fas fa-search"></i> Buscar Notas
                    </button>
                </div>
                <div class="hint">
                    <i class="fas fa-info-circle"></i>
                    Digite seu nome completo como está no sistema acadêmico
                </div>
            </div>

            <div id="loading" class="loading" style="display: none;">
                <div class="spinner"></div>
                <p>Buscando suas notas...</p>
            </div>

            <div id="resultado" class="resultado" style="display: none;">
                <!-- As notas serão exibidas aqui -->
            </div>

            <div id="erro" class="erro" style="display: none;">
                <!-- Mensagens de erro serão exibidas aqui -->
            </div>
        </main>

        <footer>
            <p><i class="fas fa-shield-alt"></i> Suas notas são informações privadas. Não compartilhe este link.</p>
            <p class="copyright">© 2024 Escola XYZ - Sistema de Consulta de Notas</p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>
