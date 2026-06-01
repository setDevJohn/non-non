# UI/UX DESIGN SYSTEM + MAPA VISUAL COMPLETO
## React Native + Expo + Tailwind + Expo Router

---

# OBJETIVO DESTE DOCUMENTO

Este documento serve como:

- Base visual oficial do projeto
- Prompt visual para IAs de codegen
- Guia de UI/UX para desenvolvimento
- Mapeamento de telas
- Padrão visual do app
- Contexto técnico para manutenção futura

---

# VISÃO DO PRODUTO

Aplicativo fitness gamificado com:

- Eventos competitivos
- Ranking
- Feed social
- Hidratação
- Conquistas
- Gamificação social
- Sistema de pontos

O produto deve transmitir:

- Competição saudável
- Motivação
- Consistência
- Sensação de progresso
- Socialização
- Visual premium

---

# DIREÇÃO VISUAL

## Referências principais

Mistura visual entre:

- Duolingo
- Strava
- Instagram
- Fantasy League
- Apps fitness premium

---

# TEMA

## Dark Mode principal

### Paleta:

#### Backgrounds
- bg-zinc-950
- bg-neutral-950

#### Cards
- bg-zinc-900
- border-zinc-800

#### Destaques
- emerald-500 → progresso
- blue-500 → hidratação
- yellow-400 → ranking
- red-500 → alertas

#### Badges
- bronze → amber-700
- prata → slate-300
- ouro → yellow-300

---

# TIPOGRAFIA

## Estilo:

- Títulos: font-extrabold
- Subtítulos: font-bold
- Texto UI: font-semibold
- Dados e métricas: font-medium
- Pontuações: font-black

---

# PADRÃO VISUAL GLOBAL

## Componentes:

- rounded-2xl
- rounded-3xl
- shadow-lg
- cards grandes
- glassmorphism leve
- bordas suaves
- progress bars animadas
- micro animações

---

# EXPERIÊNCIA DO USUÁRIO

O usuário deve sentir:

- Que está em uma arena fitness social
- Que ainda pode subir no ranking
- Que está evoluindo constantemente
- Que o app é vivo e competitivo

---

# NAVEGAÇÃO PRINCIPAL

## Bottom Tabs

1. Dashboard
2. Eventos
3. Registrar
4. Feed
5. Perfil

---

# ESTRUTURA DE PASTAS (EXPO ROUTER)

```txt
app/
 ┣ (auth)/
 ┃ ┣ login.tsx
 ┃ ┣ register.tsx
 ┃ ┗ onboarding.tsx
 ┣ (tabs)/
 ┃ ┣ dashboard/
 ┃ ┃ ┗ index.tsx
 ┃ ┣ events/
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┣ create.tsx
 ┃ ┃ ┗ [id].tsx
 ┃ ┣ register/
 ┃ ┃ ┗ index.tsx
 ┃ ┣ feed/
 ┃ ┃ ┗ index.tsx
 ┃ ┣ profile/
 ┃ ┃ ┗ index.tsx
 ┃ ┗ notifications/
 ┃ ┃ ┗ index.tsx
 ┣ _layout.tsx
 ┗ +not-found.tsx

src/
 ┣ components/
 ┃ ┣ ui/
 ┃ ┣ cards/
 ┃ ┣ forms/
 ┃ ┣ feed/
 ┃ ┣ hydration/
 ┃ ┣ ranking/
 ┃ ┣ badges/
 ┃ ┗ events/
 ┣ hooks/
 ┣ services/
 ┣ store/
 ┣ theme/
 ┣ constants/
 ┣ types/
 ┣ utils/
 ┗ lib/
```

---

# TELA — ONBOARDING

## Objetivo

Explicar:

- Como o app funciona
- Sistema de pontuação
- Eventos
- Recuperação no fim de semana
- Meta de água
- Feed social
- Conquistas

---

## Layout

### Slide 1

Hero:

- Ilustração fitness social
- Headline:
  “Treine. Compita. Vença.”
- CTA grande

---

### Slide 2

Sistema de pontos:

- Segunda: +2
- Ter–Qui: +1
- Sexta: +2
- Água: +1
- Bônus semanais
- Recuperação

Visual:

- Timeline gamificada
- Ícones grandes
- Cards explicativos

---

### Slide 3

Conquistas + feed social

Mostrar:

- Badges
- Ranking
- Feed
- Interações

---

## UX

- Swiper horizontal
- Indicadores de página
- CTA fixo inferior
- Animações suaves

---

# TELA — CADASTRO

## Layout

### Header

“Crie seu perfil de atleta”

---

## Inputs

- Nome
- Email
- Senha
- Altura
- Peso
- Data nascimento

---

## Meta hídrica

Radio group:

- 28ml/kg
- 35ml/kg recomendado

---

## Feedback dinâmico

Ao digitar peso:

“Meta diária estimada: X litros”

---

## Foto de perfil

Opcional.

---

## UX

- Stepper progressivo
- Keyboard safe
- Scroll seguro
- CTA destacado

---

# TELA — DASHBOARD

## Objetivo

Ser a central diária do usuário.

---

## Seções

### Header

- Avatar
- Nome
- Sino notificações

---

### Card principal

“Seu dia”

Mostrar:

- Treino concluído?
- Água atual
- Pontos do dia
- Status ranking

---

### Card evento atual

- Nome
- Dias restantes
- Colocação
- Pool acumulado

---

### Card recuperação

Mostrar apenas se:

- Usuário abaixo da média
- Final de semana

Texto:

“Você ainda pode recuperar pontos neste fim de semana.”

---

### Feed resumido

Últimos posts do evento.

---

### FAB

Botão flutuante:

“Registrar treino”

---

# TELA — EVENTOS

## Tabs internas

- Ativos
- Convites
- Criar
- Finalizados

---

## Criar evento

### Inputs

- Nome
- Descrição
- Data início
- Data fim
- Valor entrada
- Público/Privado
- Limite participantes

---

## Gerenciamento

Lista:

- Participantes
- Admins
- Remover
- Promover admin

Todos admins possuem mesmo nível.

---

## Visual

- Banner do evento
- Cards premium
- Destaque do prêmio acumulado

---

## Tela final do evento

### Modal fullscreen

- Fundo escuro opacity
- Pódio central 3D
- Ouro / prata / bronze
- Confete
- Destaque visual forte

---

# TELA — REGISTRO DE TREINO

## UX

Fluxo extremamente rápido.

---

## Campos

- Foto
- Tipo treino
- Duração
- Observação

---

## Tipos

- Academia
- Corrida
- Caminhada
- Casa
- Bike
- Outro

---

## Regras visuais

Se já treinou:

- Bloquear formulário
- Mostrar feedback:
  “Treino de hoje já registrado.”

---

## Feedback

- Animação de pontos
- Confirmação visual

---

# TELA — ÁGUA

## Layout

Grande progress ring.

---

## Mostrar

- Meta diária
- Quantidade consumida
- Quantidade restante

---

## Ações rápidas

- +250ml
- +500ml
- +1L

---

## Feedback

Ao concluir:

“Meta concluída! +1 ponto”

---

# TELA — FEED SOCIAL

## Referência

Instagram + Strava.

---

## Card do post

Mostrar:

- Foto
- Nome
- Evento
- Tipo treino
- Duração
- Água
- Curtidas
- Comentários
- Conquista desbloqueada

---

## Extras

- Reações rápidas
- Destaque:
  “Ultrapassou você”
- Feed por evento

---

# TELA — PERFIL

## Header

- Foto
- Nome
- Altura
- Peso
- Dias treinados mês
- Dias treinados total

---

## Seções

### Conquistas

Grid visual premium.

---

## Badges bloqueadas

- Cinza
- Barra de progresso
- Critério

---

## Sensação visual

Coleção MMO.

---

# TELA — CONQUISTAS

## Categorias

- Água
- Treino
- Social
- Eventos

---

## Cada badge

Mostrar:

- Nome
- Tier
- Critério
- Barra progresso
- Descrição

---

## Exemplo

### Água

- Peixinho Fora D’Água I
- Guardião das Marés II
- Último Dobrador de Água III

---

# TELA — NOTIFICAÇÕES

## Categorias

- Sistema
- Social
- Evento
- Recuperação

---

## Exemplos

- “Você caiu para 4º lugar”
- “Última chance de recuperação hoje”
- “Fulano ultrapassou você”
- “Convite para novo evento”

---

# COMPONENTES GLOBAIS

## Base UI

### Cards

```tsx
rounded-3xl bg-zinc-900 border border-zinc-800 p-4
```

---

### Botões

Primário:

```tsx
bg-emerald-500
```

Secundário:

```tsx
bg-zinc-800
```

---

### Progress

Usado para:

- Água
- Conquistas
- Eventos

---

# ANIMAÇÕES

## Recomendado

- React Native Reanimated
- Moti
- Count-up
- Reveal badges
- Pulse CTA

---

# RESPONSIVIDADE

## Prioridades

- Android first
- iPhone safe areas
- Scroll otimizado
- Thumb zone

---

# EXPERIÊNCIA FINAL

O app deve parecer:

- Premium
- Competitivo
- Social
- Viciante
- Moderno
- Fitness

---


