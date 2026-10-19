# Site — Yasmin Ferreira, versão 2 (melhorada)

Mesma paleta de cores do site atual. Textos, fontes e ordem revisados para
converter mais visitas do Google Ads em conversas no WhatsApp.

```
site-yasmin-v2/
├── index.html                  → página inicial
├── politica-de-privacidade.html
├── css/style.css
├── js/main.js
└── Imagens/                    → imagens já otimizadas (≈ 380 KB no total)
```

## O que mudou em relação ao site atual

**Topo**
- Título curto com as palavras que as pessoas buscam: "Terapia para burnout e ansiedade".
- Diz logo de cara: online para todo o Brasil, presencial em BH, 50 minutos por sessão.
- Nome e CRP no topo (exigência do CFP para publicidade).
- No celular, título e botão aparecem antes da foto, sem precisar rolar.

**Seção nova: "Alguma destas frases parece com você?"**
- Duas abas: *No trabalho* (burnout) e *Na ansiedade*. Quem chega pelo anúncio de
  ansiedade agora encontra conteúdo sobre ansiedade.
- A pessoa marca as frases em que se reconhece; o site conta e convida para conversar.
  Nada é salvo nem enviado, e há um aviso de que não é diagnóstico.

**Seção nova: "Como começar"** — os 3 passos até a primeira sessão, para tirar o medo
de mandar a primeira mensagem.

**Textos ajustados para o Código de Ética**
- Saiu "Especialista em Burnout" (o título exige registro no CFP).
- "Você percebe mudanças significativas" virou "a psicoterapia pode ajudar".
- A seção de depoimentos foi retirada até confirmar com o CRP (instrução no HTML para voltar).

**Dúvidas** — 3 perguntas novas: terapia online, outras cidades, primeira sessão.

**Celular** — barra fixa "Agendar pelo WhatsApp" aparece depois do topo.

**Velocidade** — imagens recomprimidas (de ~6 MB para ~380 KB), vídeo e mapa só
carregam ao clicar, foto do topo com prioridade de carregamento.

**SEO** — título e descrição novos, dados estruturados (schema.org), Open Graph.

**Medição** — cada botão de WhatsApp manda um evento com o local
(`topo`, `sinais`, `passos`, `sobre`, `final`, `barra`, `flutuante`, `menu`).
No Clarity aparece como `whatsapp_topo`, `whatsapp_sinais` etc.

## Antes de publicar
1. Colar a tag do Google Ads no `<head>` e preencher `GOOGLE_ADS_SEND_TO` em `js/main.js`.
2. Colar o script do Microsoft Clarity no `<head>`.
3. Conferir o `og:image` e o `canonical` se o endereço final das imagens mudar.

## Sugestão de teste
Publique e compare 2 a 3 semanas com as anteriores: taxa de cliques no WhatsApp
(conversões ÷ cliques do anúncio), contatos reais e pacientes. Mude uma coisa por vez
depois disso.
