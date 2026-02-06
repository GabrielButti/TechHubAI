# 🚀 Guia Rápido de Instalação e Setup

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior (ou yarn)
- Python 3.8+ (para o backend)

## 📥 Instalação Passo a Passo

### 1️⃣ Instalação do Frontend

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie o arquivo .env (copie do exemplo)
copy .env.example .env
```

### 2️⃣ Executar o Frontend em Desenvolvimento

```bash
# Ainda na pasta frontend/
npm run dev
```

O Frontend estará disponível em: **http://localhost:5173**

### 3️⃣ Instalar o Backend Python (Opcional - para funcionalidade completa)

```bash
# Na pasta raiz do projeto
cd ..

# Instale as dependências Python
pip install -r requirements.txt

# Configure as variáveis de ambiente
# Crie um arquivo .env com sua chave do Gemini AI
echo GEMINI_API_KEY=sua_chave_aqui > .env
```

### 4️⃣ Executar o Backend Python

```bash
# Na pasta raiz
python main.py
```

### 5️⃣ Instalar o Backend API (Node.js/TypeScript)

```bash
# Na pasta api/
cd api

# Instale as dependências
npm install

# Configure o banco de dados (Prisma)
npx prisma migrate dev

# Ou apenas gere o cliente Prisma
npx prisma generate
```

### 6️⃣ Executar o Backend API

```bash
# Na pasta api/
npm run dev
```

O Backend API estará disponível em: **http://localhost:3000**

## 🎯 Portas Utilizadas

| Serviço | Porta | URL |
|---------|-------|-----|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| Backend API (Node) | 3000 | http://localhost:3000 |
| Backend Python | 5000 | http://localhost:5000 |
| Prisma Studio | 5555 | http://localhost:5555 |

## ✨ Funcionalidades Disponíveis

### ✅ Frontend (100% Funcional)

- ✨ Interface bonita e moderna
- 🎯 Seleção de candidatos
- 💼 Seleção de vagas
- 🔄 Fluxo visual intuitivo com indicadores de progresso
- 📊 Visualização de currículos
- ⚠️ Dados de exemplo (mock data) para testes

### ⏳ Backend (Integração)

O frontend está preparado para se conectar com os serviços backend quando disponíveis:

- Chamadas de API configuradas em `src/services/models.ts`
- Mock data incluído para usar sem servidor
- Tratamento de erros robusto com fallback para exemplos

## 🧪 Testando o Frontend

1. Abra http://localhost:5173
2. Selecione um candidato (ex: Lucas Andrade)
3. Clique em "Próximo"
4. Selecione uma vaga
5. Clique em "Próximo" para ver a avaliação (com dados de exemplo)
6. Clique em "Próximo" para ver as perguntas de entrevista

## 🛠️ Customização

### Adicionar Novos Candidatos

Edite `src/services/mockData.ts` e adicione novos objetos na array `candidatosExemplo`.

### Adicionar Novas Vagas

Edite `src/services/mockData.ts` e adicione novos objetos na array `vagasExemplo`.

### Mudar Estilo da Aplicação

Os estilos estão em:
- `src/index.css` - CSS Global
- `tailwind.config.cjs` - Configuração do Tailwind

## 📦 Scripts Disponíveis

### Frontend

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Faz build para produção
npm run preview  # Preview da build
npm run lint     # Executa linter
```

### Backend API

```bash
npm run dev                  # Inicia com hot reload
npm run start               # Inicia em produção
npm run prisma:generate    # Gera cliente Prisma
npm run prisma:migrate     # Executa migrações
npm run prisma:studio      # Abre interface visual do Prisma
```

## 🐛 Troubleshooting

### Porta 5173 já está em uso

```bash
# Use outra porta
npm run dev -- --port 5174
```

### Erro de módulos não encontrados

```bash
# Limpe e reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro no Prisma

```bash
# Regenere o cliente Prisma
npx prisma generate

# Ou faça reset completo (cuidado - deleta dados!)
npx prisma migrate reset
```

## 📚 Documentação Adicional

- [Frontend README](./README.md)
- [Componentes](./src/components/)
- [Tipos TypeScript](./src/types/)
- [Serviços de API](./src/services/)

## 🚀 Pronto para Produção?

Para fazer deploy:

```bash
# Build
npm run build

# O resultado estará em dist/
# Upload para seu servidor/CDN
```

## 💡 Dicas

1. **Desenvolvimento**: Use `npm run dev` para hot-reload instantâneo
2. **Debug**: Abra DevTools (F12) para ver logs e erros
3. **Estado**: A aplicação usa Zustand para gerenciar estado global
4. **Mock Data**: Dados de exemplo facilitam testes sem servidor

## 📞 Suporte

Se encontrar problemas:

1. Verifique se as portas estão livres
2. Verifique se Node.js está instalado (`node --version`)
3. Tente limpar cache (`npm cache clean --force`)
4. Verifique os logs de erro no terminal

---

**Pronto! 🎉 A aplicação deve estar funcionando em http://localhost:5173**
