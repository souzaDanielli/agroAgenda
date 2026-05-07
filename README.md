# AgroAgenda - Sistema de Agendamento Rural

Sistema de agendamento para serviços do agronegócio destinado a agrônomos, técnicos agrícolas, prestadores de serviço rural e consultorias.

## Tecnologias

- **Backend:** FastAPI (Python)
- **Banco de Dados:** PostgreSQL (Hospedado na [Neon](https://neon.tech))
- **Frontend:** React.js (Vite + Tailwind CSS)
- **Hospedagem API:** [Render](https://render.com)
- **Hospedagem Frontend:** [Vercel](https://vercel.com)

## Como rodar o projeto localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/souzaDanielli/agroAgenda.git
cd agroAgenda
```

### 2. Configurar o Backend
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

# Iniciar o servidor
uvicorn app.main:app --reload
```
Acesse a documentação da API em: `http://127.0.0.1:8000/docs`

### 3. Configurar o Frontend
```bash
cd frontend

# Instalar dependências
npm install

# Iniciar o projeto
npm run dev
```

## Deploy (Produção)

### Backend (Render)

### Frontend (Vercel)

## Funcionalidades
- ✅ Cadastro e Login (Autenticação JWT)
- ✅ Gerenciamento de Clientes (Produtores Rurais)
- ✅ Gerenciamento de Catálogo de Serviços
- ✅ Agendamento com Status Editável
- ✅ Busca de Agendamentos em tempo real
- ✅ Painel de Dashboard com Timeline de visitas

## Estrutura do Projeto
- `/backend`: API FastAPI com arquitetura limpa e rotas modulares.
- `/frontend`: Interface responsiva utilizando Tailwind CSS e Lucide Icons.
