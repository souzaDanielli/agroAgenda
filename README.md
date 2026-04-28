# AgroAgenda - Sistema de Agendamento Rural

Sistema de agendamento para serviços do agronegócio destinado a agrônomos, técnicos agrícolas, prestadores de serviço rural e consultorias.

## Tecnologias

- **Backend:** FastAPI (Python)
- **Banco de Dados:** PostgreSQL
- **Frontend:** React.js (JavaScript)

## Como rodar o projeto localmente

### 1. Clonar o repositório

### 2. Configurar o Backend
Certifique-se de estar na pasta raíz do projeto.

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual (Windows)
.\venv\Scripts\Activate.ps1
# Ativar ambiente virtual (Linux/macOS)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt
```

### 3. Variáveis de Ambiente

### 4. Executar o Servidor
Com o ambiente virtual ativado:
```bash
uvicorn app.main:app --reload
```
Acesse a documentação da API em: `http://127.0.0.1:8000/docs`

## Funcionalidades
- Cadastro e Login (JWT)
- Gerenciamento de Clientes (Produtores)
- Gerenciamento de Serviços
- Agendamento de Horários com Filtro por Data

## Estrutura do Projeto
- `/backend`: API FastAPI integrada ao PostgreSQL.
- `/frontend`: Interface em React.