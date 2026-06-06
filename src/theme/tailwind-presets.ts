// Tailwind CSS presets reutilizáveis inspirados no Shadcn/UI

export const presets = {
  // Fundo principal
  background: 'bg-background',

  // Card padrão
  card: 'bg-card border border-border rounded-xl p-4',

  // Card elevado
  cardElevated: 'bg-card border border-border rounded-xl shadow-sm p-4',

  // Container de tela
  screen: 'flex-1 bg-background px-4 pt-6',

  // Seção
  section: 'mb-6 gap-4',

  // Item de lista
  listItem: 'rounded-xl border border-border bg-card p-4',

  // Header
  header: 'border-b border-border bg-background',

  // Input
  input: 'h-12 rounded-xl border border-border bg-background px-4',

  // Select
  select: 'h-12 rounded-xl border border-border bg-background px-4',

  // Botão primário
  button: 'h-12 rounded-xl',

  // Skeleton
  skeleton: 'rounded-xl',

  // Badge
  badge: 'px-2 py-1 rounded-full text-xs font-semibold',

  // Avatar
  avatar: 'w-10 h-10 rounded-full bg-secondary',

  // Divider
  divider: 'h-px bg-border',

  // Container com scroll
  scrollContainer: 'flex-1 bg-background',
} as const;

export default presets;
