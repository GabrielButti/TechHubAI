# TechHubAI Frontend

Front-end moderno e responsivo para o TechHubAI - seu assistente de carreira com Inteligência Artificial.

## 🚀 Features

- ✨ Interface moderna com design gradiente e glassmorphism
- 🎯 Seleção interativa de candidatos e vagas
- 📊 Avaliação automática de candidaturas com IA
- 🎤 Geração de perguntas de entrevista personalizadas
- 📱 Design totalmente responsivo (mobile-first)
- ⚡ Performance otimizada com Vite e React
- 🎨 UI/UX profissional com Tailwind CSS
- 🔄 Estado global com Zustand
- 📦 Componentes reutilizáveis

## 📋 Requisitos

- Node.js 18+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório (se aplicável)
2. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Crie um arquivo `.env` baseado em `.env.example`:
   ```bash
   cp .env.example .env
   ```

## 🏃 Como Executar

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
frontend/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/        # Componentes React reutilizáveis
│   │   ├── Alert.tsx
│   │   ├── CurriculoSelector.tsx
│   │   ├── CurriculoView.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ResultadosAvaliacao.tsx
│   │   ├── ResultadosEntrevista.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── VagaSelector.tsx
│   │   └── index.ts
│   ├── hooks/             # Custom hooks
│   │   └── useAppStore.ts
│   ├── pages/             # Páginas da aplicação
│   │   └── Dashboard.tsx
│   ├── services/          # Serviços de API
│   │   ├── api.ts
│   │   ├── mockData.ts
│   │   └── models.ts
│   ├── types/             # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Entrada principal
│   └── index.css          # Estilos globais
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.cjs
└── postcss.config.cjs
```

## 🎨 Design System

A aplicação utiliza um design system moderno com:

- **Paleta de Cores**: Gradientes de cyan/blue com tons de cinza
- **Componentes**: Cards, Buttons, Inputs, Alerts, Spinners
- **Animações**: Transições suaves e efeitos glassmorphism
- **Tipografia**: Inter sans-serif

## 🔌 Integração com API

O frontend está configurado para se conectar com:

1. **Backend Python** (porta 5000) - Modelos de IA
   - Geração de currículo
   - Avaliação de candidaturas
   - Geração de perguntas de entrevista

2. **Backend Node.js/Express** (porta 3000) - Dados de usuários
   - Gerenciamento de usuários
   - Persistência de dados

## 📊 Dados de Exemplo

O frontend inclui dados de exemplo (mock data) para:

- 3 candidatos com perfis diferentes
- 5 vagas de tecnologia
- Exemplos de avaliações e perguntas

Esses dados são carregados automaticamente e podem ser usados sem conexão com o servidor.

## 🔐 Variáveis de Ambiente

```
VITE_API_URL=http://localhost:5000
VITE_API_BASE_PATH=/api
```

## 📦 Dependências Principais

- **React 18**: Framework UI
- **Vite**: Build tool rápido
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Zustand**: Gerenciamento de estado
- **Axios**: Cliente HTTP
- **Lucide React**: Ícones SVG

## 🚀 Performance

- ⚡ Vite oferece hot module replacement instantâneo
- 📦 Tree-shaking automático
- 🎯 Otimização de imagens
- 🔄 Lazy loading de componentes

## 🤝 Contribuição

Para contribuir:

1. Faça um fork
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob licença ISC.

## 👨‍💻 Autor

Desenvolvido como parte do projeto TechHubAI

## 🆘 Suporte

Para suporte, entre em contato ou abra uma issue no repositório.

---

Desenvolvido com ❤️ para ajudar em sua jornada de carreira!
