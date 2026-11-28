# Orion — Cronograma

| Campo | Valor |
| --- | --- |
| Início | 09/11/2026 |
| Previsão de entrega (release v1.0.0) | **22/02/2027**, pelo cronograma adiantado |
| Prazo final | **08/03/2027**. Não muda. A diferença até a previsão é reserva |
| Formato | 17 sprints semanais (segunda a domingo). A S05 é uma semana curta (quarta a domingo) e a S17 é o buffer de entrega |
| Versão | 3.0 |
| Atualizado em | 2026-11-25 |

A carga horária de cada semana é definida pelo dev. O cronograma fixa **o que** precisa estar pronto no fim de cada sprint, não quantas horas serão gastas.

**Adiantamento de 25/11/2026:** a engenharia (S01–S04) terminou antes do previsto. A S05 começou em 25/11, e todas as sprints seguintes foram antecipadas em 2 semanas. As datas abaixo são a **previsão atual**. O **prazo final de 08/03/2027 continua fixo**: se alguma sprint atrasar, o cronograma é recalculado e a previsão anda, mas não passa do prazo final.

O quadro executável está no Trello ("Orion — Sprints"). Cada entrega abaixo é um card com o prefixo da sprint (`[S05]`, `[S06]`...). Prioridades e regras de trabalho em [processo.md](processo.md).

## Visão geral

| Fase | Sprints | Período | Marco no fim da fase |
| --- | --- | --- | --- |
| 1 — Engenharia | S01–S04 | 09/11 → 25/11 ✔️ | Documentação pronta para codar (regras, dados, API, processo) |
| 2 — Back-end | S05–S09 | 25/11 → 27/12 | API completa publicada no Railway · tag `v0.1.0` |
| 3 — Front-end | S10–S14 | 28/12 → 31/01 | Front completo publicado no Cloudflare Pages · tag `v0.2.0` |
| 4 — Qualidade e entrega | S15–S17 | 01/02 → 21/02 | Produto testado, documentado e apresentável |
| 🎯 Release (previsão) | — | 22/02/2027 | `v1.0.0` publicada e acessível pelo celular |
| ⏰ Prazo final | — | 08/03/2027 | Limite que não pode ser ultrapassado |

Princípios do plano:

- **Fatia vertical antes de largura.** Cada sprint de back-end entrega o recurso completo: entidade, migration, regra, endpoint e teste.
- **Deploy contínuo desde cedo.** A API vai para produção na S09 e o front na S10. A partir daí, toda sprint termina com o que foi feito já publicado.
- **O mais arriscado primeiro dentro de cada fase.** Autenticação e Bloco (regras de conflito) vêm antes das telas simples. Drag and drop fica na S14, mas a Minha Semana funciona sem ele desde a S12.
- **Prioridade MoSCoW** (ver [requisitos](requisitos.md)). Se uma sprint atrasar, o que sai primeiro são os itens **Could**, e isso é registrado na review.

---

## Fase 1 — Engenharia (S01–S04)

### S01 — 09/11 → 15/11 ✔️

- Definir tema e criar repositório no GitHub
- README inicial
- Entrar no Acelera Hub

### S02 — 16/11 → 22/11 ✔️

- Modelagem inicial (console em Java, ensaio de aprendizado)
- Tech stack
- Documentação inicial

### S03 — 23/11 → 25/11 ✔️

- Protótipos navegáveis das telas em HTML (`prototipos/`), feitos com o Claude Code usando skills de UI/UX
- Requisitos funcionais e não funcionais
- Diagrama de classes (draw.io)
- Diagrama de fluxo
- Trello com as sprints

### S04 — feita junto com a S03, até 25/11 ✔️

- Validar as [regras de negócio](regras-de-negocio.md) ✔️ (24/11)
- Validar o [modelo de dados](diagramas/modelo-de-dados.md) e o [contrato da API](api.md) ✔️ (25/11)
- Validar prioridades e corte por sprint nos [requisitos](requisitos.md) ✔️
- Adotar o [processo](processo.md): DoR, DoD, fluxo Git, Conventional Commits ✔️
- Repositório limpo: `.gitignore`, `bin/` fora do Git, README mínimo ✔️
- Ambiente instalado: JDK 21, PostgreSQL 17, Postman e Extension Pack for Java no VS Code ✔️ (25/11)
- Retrospectiva do mês 1 ✔️ (25/11)
- Contas no Railway e no Cloudflare: movidas para quando forem usadas (S09 e S10)
- Proteção da `main` no GitHub: movida para a S05, junto com o CI

---

## Fase 2 — Back-end (S05–S09)

Objetivo: API REST completa, segura, testada e publicada.

### S05 — 25/11 → 29/11 · Fundação (semana curta, começou adiantada)

- Marcar o console com a tag `console-estudo` e remover `src/` antigo da `main`
- Projeto Spring Boot (Maven, Java 21) com estrutura em camadas
- PostgreSQL local (bancos `orion` e `orion_test`), profiles `dev` e `prod`, Flyway
- CI no GitHub Actions: build e testes em todo push e PR
- Proteção da `main` no GitHub (exige PR e CI verde)
- Swagger (springdoc-openapi) e tratamento global de erros
- Entidades `Usuario` e `Atributo` com migration
- CRUD de Atributo com testes (RF17–RF20)

### S06 — 30/11 → 06/12 · Autenticação

- Cadastro e login com Spring Security + JWT (RF01, RF02, RF05)
- Isolamento de dados por usuário em todos os endpoints (RNF03)
- CRUD de Hábito com ativar e desativar, com testes (RF21–RF26)

### S07 — 07/12 → 13/12 · Hobby e Perfil

- CRUD de Hobby com ativar e desativar, e criar hábito a partir do hobby (RF27–RF32, RF51)
- Perfil: dados pessoais e preferências (RF40–RF42, RF44–RF47, RF49)

### S08 — 14/12 → 20/12 · Blocos

- Bloco com data: CRUD, busca por intervalo de datas, regras de horário e conflito, marcar concluído (RF06–RF10, RF12, RF50)
- Testes das regras de bloco

### S09 — 21/12 → 27/12 · Fecho do back-end · Natal (semana reduzida)

- Estatísticas: tempo feito e planejado, por atributo, consistência por blocos concluídos e meta (RF14–RF16)
- Caderno: divisórias e notas (RF33–RF39)
- Criar a conta no Railway e fazer o deploy da API e do banco, com deploy automático a partir da `main`
- Coleção do Postman versionada em `docs/postman/`
- Tag `v0.1.0`
- Retrospectiva do mês 2

---

## Fase 3 — Front-end (S10–S14)

Objetivo: interface React fiel aos protótipos (`prototipos/`), conectada à API e publicada.

### S10 — 28/12 → 03/01 · Fundação do front · Ano Novo (semana reduzida)

- Projeto React (Vite + TypeScript), rotas e layout com as abas
- Criar a conta no Cloudflare. CI do front e deploy contínuo no Cloudflare Pages
- Telas de cadastro e login, sessão com JWT e logout (RF01–RF03, RF05)

### S11 — 04/01 → 10/01 · Cadastros

- Tela Atributos (RF17–RF20)
- Telas Hábitos e Hobby, com "criar hábito a partir do hobby" (RF21–RF32, RF51)

### S12 — 11/01 → 17/01 · Minha Semana

- Grade semanal com criar, editar e excluir bloco, modal de detalhes e marcar concluído (RF06–RF09, RF50)
- Trocar semana e filtrar por atributo e hábito (RF10, RF12)

### S13 — 18/01 → 24/01 · Dashboard e Perfil

- Dashboard mensal e detalhe do atributo (RF13–RF16)
- Tela Perfil com metas e preferências (RF40–RF42, RF44–RF47, RF49)

### S14 — 25/01 → 31/01 · Caderno e drag and drop

- Caderno com divisórias, notas e tela cheia (RF33–RF39)
- Drag and drop de blocos (RF11)
- Tag `v0.2.0`
- Retrospectiva do mês 3

---

## Fase 4 — Qualidade e entrega (S15–S17)

### S15 — 01/02 → 07/02 · QA e infraestrutura

- QA ponta a ponta nos navegadores do RNF04, no desktop e no celular
- Responsividade e acessibilidade (RNF08, RNF11)
- Backup do banco e monitoramento básico (RNF05, RNF10)
- README completo com prints, arquitetura e instruções

### S16 — 08/02 → 14/02 · Apresentação · Carnaval (semana reduzida)

- Documentação final e diagramas conferidos com o código
- Apresentação do projeto em 2 minutos, sem ler o código
- Post no LinkedIn sobre o processo, perfil e Acelera Hub atualizados

### S17 — 15/02 → 21/02 · Buffer de entrega

- Correções que sobraram das sprints anteriores
- Congelar escopo: nada novo entra nesta semana
- Retrospectiva final do projeto

### 🎯 Previsão: 22/02/2027 — Release `v1.0.0`

Projeto fullstack publicado, acessível pelo celular, com README e documentação final.

**Prazo final: 08/03/2027.** As duas semanas entre a previsão e o prazo (22/02 → 08/03) são reserva para atrasos. Se não forem usadas, a release sai antes.

---

## Fora da v1.0.0 (backlog)

| Item | Motivo |
| --- | --- |
| Aba de IA | Sem requisito. Decisão de 24/11/2026 |
| Recuperar senha por e-mail (RF04) | Depende de serviço de e-mail. Entra se sobrar tempo na S15 |
| Foto de perfil (RF43) | Depende de armazenamento de arquivos |
| Lembretes (RF48) | Depende de notificações. A v1 só guarda a preferência |
| Janela flutuante do caderno | Versão futura |
| Bloco recorrente | Fora do diagrama de classes |

## Histórico

| Versão | Data | Alteração |
| --- | --- | --- |
| 1.0 | 2026-11-09 | Cronograma de 16 semanas, 6h por semana |
| 2.1 | 2026-11-24 | Bloco com data (sem Semana), RF50 e RF51 encaixados nas sprints S07, S08, S11 e S12 |
| 2.0 | 2026-11-24 | Escopo completo até 08/03 (sem IA), sprint de buffer S17, deploy contínuo, fases ordenadas por risco, prioridades MoSCoW |
| 3.0 | 2026-11-25 | Engenharia terminada antes: S05 começa em 25/11 e as sprints seguintes são antecipadas em 2 semanas. Previsão da release em 22/02/2027, prazo final mantido em 08/03/2027. Feriados recalculados (Natal na S09, Ano Novo na S10, Carnaval na S16). Contas de hospedagem movidas para S09 e S10. Proteção da `main` na S05 |
