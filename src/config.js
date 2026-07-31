// ═══════════════════════════════════════════════════════════════════
//  CONFIGURAÇÃO DO CLIENTE — FK Digital
//  Este é o ÚNICO arquivo que você precisa editar para um cliente novo.
// ═══════════════════════════════════════════════════════════════════

export const config = {
  // ─── Identificação ───────────────────────────────────────────────
  clientName:      'OKEM Store',                       // nome completo (título, login)
  clientShortName: 'OKEM',                             // nome curto (ícone do celular, máx ~12 chars)
  appDescription:  'Gestão de produtos da OKEM Store', // descrição na instalação do PWA
  appSlug:         'okemstore',                        // identificador interno (localStorage, tags)

  // ─── WordPress ───────────────────────────────────────────────────
  siteUrl: 'https://okemstore.com.br',                 // SEM barra no final

  // ─── Logos ───────────────────────────────────────────────────────
  logos: {
    full: '/okem-store-logo.png',   // login, header das telas e etiquetas
    icon: '/okem-store-icon.png',   // ícone quadrado — notificações push
    fallbackLetter: 'O',            // letra caso a logo não carregue
  },

  // ─── Cores da marca / TEMA DARK ──────────────────────────────────
  colors: {
    // — marca (identidade preto & prata) —
    primary:   '#EAEAEA',   // prata claro — botões, destaques, itens ativos
    secondary: '#A0A0A0',   // detalhes secundários
    dark:      '#0D0D0D',   // preto de fundo
    action:    '#EAEAEA',   // ações / links (prata)

    // — neutros do tema dark —
    canvas:    '#0D0D0D',   // fundo geral do app
    surface:   '#1A1A1A',   // cards, modais, barras
    elevated:  '#242424',   // hover / superfície elevada
    line:      '#2E2E2E',   // bordas e divisórias
    ink:       '#F5F5F0',   // texto principal (branco creme)
    muted:     '#9A9A9A',   // texto secundário / labels
  },

  // ─── Paleta dos gráficos do Dashboard (tons de prata/cinza) ──────
  chartColors: ['#EAEAEA', '#B8B8B8', '#8A8A8A', '#6E6E6E', '#CFCFCF', '#4A4A4A'],
  metricColors: {
    vendas:  '#EAEAEA',
    receita: '#B8B8B8',
    ticket:  '#8A8A8A',
  },

  // ─── Web Push (notificações) ─────────────────────────────────────
  // Esta chave PÚBLICA tem que ser EXATAMENTE a mesma do plugin fk-webpush.
  // A chave PRIVADA vai SÓ no plugin, nunca aqui.
  vapidPublicKey: 'BIZzofXyEaB8XM6oxNQD3XK_OA2NJJneodRutTg4-bawyiu_jeH0uDH_xKEK7u_WwzsEtBvIiNzlGAkPItcNpCQ',

  // ─── Rodapé ──────────────────────────────────────────────────────
  agencyLogo: '/logo%20azul%20escuro.png',
  agencyName: 'FK Digital',
}

export default config
