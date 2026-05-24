# Gym Competition App

Aplicativo mobile de competição fitness gamificado com React Native, Expo e TypeScript.

## 🚀 Stack Tecnológica

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Expo Router** - Navegação baseada em arquivos
- **TypeScript** - Tipagem estática
- **NativeWind** - Tailwind CSS para React Native
- **Zustand** - Gerenciamento de estado
- **TanStack Query** - Gerenciamento de dados e cache
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP
- **Lucide React Native** - Ícones
- **React Native Reanimated** - Animações

## 📁 Estrutura do Projeto

```
app/
├── (auth)/          # Rotas de autenticação
│   ├── onboarding.tsx
│   ├── login.tsx
│   └── register.tsx
├── (tabs)/          # Rotas com tabs de navegação
│   ├── dashboard/
│   ├── events/
│   ├── register/
│   ├── feed/
│   ├── profile/
│   └── notifications/
├── _layout.tsx      # Layout raiz
└── +not-found.tsx   # Página 404

src/
├── components/      # Componentes reutilizáveis
│   ├── ui/         # Componentes base (Button, Card, Input, etc.)
│   ├── cards/      # Cards específicos
│   ├── forms/      # Componentes de formulário
│   ├── feed/       # Componentes do feed
│   ├── hydration/  # Componentes de hidratação
│   ├── ranking/    # Componentes de ranking
│   ├── badges/     # Componentes de badges
│   └── events/     # Componentes de eventos
├── hooks/          # Hooks customizados
├── services/       # Camada de serviços (API)
├── store/          # Stores Zustand
├── utils/          # Funções utilitárias
├── constants/      # Constantes da aplicação
├── theme/          # Configuração de tema
├── types/          # Tipos TypeScript
└── lib/            # Bibliotecas auxiliares
```

## 🛠️ Instalação

1. **Instale as dependências:**
```bash
npm install
```

2. **Inicie o projeto:**
```bash
npm start
```

3. **Rode no iOS:**
```bash
npm run ios
```

4. **Rode no Android:**
```bash
npm run android
```

## 🎨 Design System

### Cores
- **Background:** zinc-950 (#09090b)
- **Cards:** zinc-900 (#18181b)
- **Primary:** emerald-500 (#10b981)
- **Secondary:** blue-500 (#3b82f6)
- **Accent:** yellow-400 (#facc15)
- **Error:** red-500 (#ef4444)

### Tipografia
- **Títulos:** font-extrabold
- **Subtítulos:** font-bold
- **Texto UI:** font-semibold
- **Dados:** font-medium
- **Pontuações:** font-black

### Componentes
- **Border Radius:** rounded-2xl, rounded-3xl
- **Shadows:** shadow-lg
- **Cards:** Grandes com glassmorphism leve
- **Animações:** Micro animações com Reanimated

## 📱 Funcionalidades

### Autenticação
- ✅ Onboarding interativo
- ✅ Login com email e senha
- ✅ Registro completo (nome, email, senha, altura, peso, data de nascimento, meta de hidratação)
- ✅ Persistência de sessão

### Dashboard
- ✅ Resumo diário (treino, água, pontos, ranking)
- ✅ Card de evento atual
- ✅ Alerta de recuperação no fim de semana
- ✅ Feed resumido
- ✅ Ações rápidas

### Eventos
- ✅ Listagem de eventos (ativos, pendentes, finalizados)
- ✅ Criação de eventos
- ✅ Detalhes do evento
- ✅ Gerenciamento de participantes

### Registro de Treino
- ✅ Seleção de tipo de treino
- ✅ Duração e observações
- ✅ Foto opcional
- ✅ Validação de 1 treino por dia

### Hidratação
- ✅ Acompanhamento diário
- ✅ Meta automática baseada no peso
- ✅ Registro progressivo
- ✅ Pontos por meta batida

### Feed Social
- ✅ Posts de treinos
- ✅ Posts de hidratação
- ✅ Conquistas desbloqueadas
- ✅ Curtidas e comentários

### Perfil
- ✅ Informações pessoais
- ✅ Estatísticas (dias treinados, metas de água)
- ✅ Grid de conquistas
- ✅ Progresso de badges bloqueadas

### Notificações
- ✅ Lembretes de treino
- ✅ Alertas de ranking
- ✅ Convites de eventos
- ✅ Recuperação de fim de semana

## 🔧 Configuração

### TypeScript
O projeto usa TypeScript strict mode com path aliases configurados no `tsconfig.json`.

### Tailwind/NativeWind
Configurado em `tailwind.config.js` com cores customizadas seguindo o design system.

### Expo Router
Navegação baseada em arquivos com route groups para autenticação e tabs.

## 📝 Regras de Negócio

### Sistema de Pontos
- **Segunda:** 2 pontos
- **Terça a Quinta:** 1 ponto
- **Sexta:** 3 pontos
- **Fim de semana:** 1 ponto (apenas para usuários abaixo da média)
- **Meta de água:** 1 ponto
- **Bônus:** Treino + água = ponto extra

### Regras Gerais
- Apenas 1 treino válido por dia
- Evento só inicia quando todos confirmarem
- Todos admins possuem mesma permissão
- Fim de semana só recupera quem está abaixo da média

## 🚀 Próximos Passos

- [ ] Integrar com backend real
- [ ] Adicionar testes
- [ ] Implementar push notifications
- [ ] Adicionar mais animações
- [ ] Otimizar performance
- [ ] Adicionar dark/light mode toggle

## 📄 Licença

Este projeto foi criado para fins de demonstração.
