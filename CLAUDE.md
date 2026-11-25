# CLAUDE.md — Projeto Orion

Contexto do projeto para qualquer sessão de desenvolvimento. Atualizado em 24/11/2026.

---

## Como trabalhar neste projeto

- **Siga sempre a skill do projeto** [`.claude/skills/orion-mentor/SKILL.md`](.claude/skills/orion-mentor/SKILL.md): você é o dev sênior e mentor de Kalebe. Explique o porquê, faça junto e **não aja sem ser chamado** (código, arquivos, Trello e documentação só com pedido explícito). Ela vale em toda conversa sobre o Orion, mesmo quando não for ativada sozinha.
- **A documentação manda. O código obedece.** A fonte da verdade é `docs/`. Nunca escrever requisito a partir de comportamento de código. O código se adapta à documentação.
- **Seguir o cronograma** (`docs/cronograma.md`) e o **processo** (`docs/processo.md`): ver a sprint atual antes de propor trabalho, respeitar DoR e DoD, uma branch por card, Conventional Commits em português e PR para a `main` a partir da S05.
- **Regras de negócio têm ID (RN01–RN37).** Todo código de regra cita o RN, e todo RN tem teste (`deveRecusarBlocoSobreposto_RN21`).
- **Trello** ("Orion — Sprints", https://trello.com/b/5mydHl51/orion-sprints): cards com prefixo `[S05]`. Mover cards só quando Kalebe pedir. Ao concluir uma entrega, sugira mover o card e atualizar este arquivo.
- **Este arquivo deve refletir o estado real** (status, sprint atual e decisões). Quando algo mudar, proponha a atualização e faça só com o "sim" de Kalebe.
- Idioma: português do Brasil em domínio, documentação e commits.
- Regra de execução: sem commit, o dia não conta.

---

## O que é o Orion

Sistema de gestão de rotina pessoal baseado em atributos. A pessoa cadastra atributos (Saúde, Inteligência, Social...), cria hábitos e hobbies ligados a eles, organiza a semana em blocos de tempo, acompanha tempo e metas por atributo e usa um caderno de notas. Cada usuário vê só os próprios dados. Uso no navegador, desktop e celular.

Portfólio técnico no Acelera Hub. **Release v1.0.0: 08/03/2027.**

Fora da v1.0.0: aba de IA (decidido em 24/11), painel admin, compartilhamento, calendários externos, app nativo, bloco recorrente, janela flutuante do caderno. Could (só se sobrar tempo): recuperar senha (RF04), foto (RF43), envio de lembretes (RF48).

---

## Documentos (`docs/`)

| Arquivo | Conteúdo |
|---|---|
| `documentacao-inicial.md` | Visão geral, escopo, telas, status |
| `requisitos.md` | RF01–RF51 com prioridade MoSCoW e sprint de back e front. RNF01–RNF11 com forma de verificação |
| `regras-de-negocio.md` | RN01–RN37, todas validadas em 24/11 |
| `cronograma.md` | v2.0: 17 sprints, marcos e tags |
| `processo.md` | Scrum adaptado, Trello, DoR, DoD, Git, versões, ambientes, CI/CD, testes |
| `api.md` | Contrato REST `/api/v1`, erros em Problem Details. Validado em 25/11 |
| `tech-stack.md` | Ferramentas, motivos e registro de decisões |
| `diagramas/diagrama-de-fluxo.md` + `.drawio` + `.png` | Fluxo v2 (draw.io) |
| `diagramas/diagrama-de-classes.md` + `.drawio` + `.png` | Domínio v2 (draw.io) |
| `diagramas/modelo-de-dados.md` | ER em Mermaid, restrições, cascatas. Validado em 25/11 |
| `aprendizados.md` | Diário de estudo de Java |

---

## Stack

- **Back-end:** Java 21 (alvo; a máquina tem o JDK 26), Spring Boot, Maven, Spring Web, Data JPA, Bean Validation, Spring Security + JWT, PostgreSQL, Flyway, springdoc-openapi, JUnit 5, Mockito, Testcontainers.
- **Front-end:** React + Vite + TypeScript, React Router, TanStack Query, dnd-kit, Recharts, TipTap, Vitest, ESLint e Prettier.
- **DevOps:** Git e GitHub (`kalebefx/orion`), GitHub Actions (CI), Docker Compose (Postgres local), Railway (API e banco), Cloudflare Pages (front), monitor de uptime.
- **Engenharia:** Trello, Figma, draw.io, Mermaid, Postman.

Ambiente na máquina (24/11): Java 26, Maven 3.9, Node 24, git. **Faltam** Docker Desktop e JDK 21. O `gh` CLI também não está instalado.

---

## Estrutura do repositório

Hoje:

```
orion/
├── CLAUDE.md, README.md (mínimo), .gitignore
├── .vscode/settings.json
├── docs/                    ← ver tabela acima
├── src/com/kalebe/orion/    ← console de estudo (model, service, ui)
└── bin/                     ← compilado, fora do Git (está no .gitignore)
```

Planejada (monorepo, a partir da S05):

```
orion/
├── backend/   ← Spring Boot (S05). Pacotes: config, controller, service, repository, domain, dto, exception
├── frontend/  ← React (S10)
├── docs/
├── docker-compose.yml
└── .github/workflows/ci.yml
```

Na S05, o console recebe a tag `console-estudo` e `src/`, `bin/` e `.vscode/` saem da `main`.

---

## O console em `src/` (ensaio, não é a base do produto)

Dados só em memória. Fluxo: `Menu → OrionService → XService → model`. Não corrigir. Bugs conhecidos: excluir bloco não tira o bloco da Semana; `limparTela()` apaga a saída; `toString` padrão em Atributo e Hábito; entrada inválida derruba o programa.

---

## Modelo de domínio (resumo, v2 de 24/11/2026)

- Usuario (com as preferências do perfil) 1—1 Caderno. Usuario 1—N Atributo, Habito, Hobby, Bloco.
- **Hábito e Hobby têm 0..* atributos** (`habito_atributo`, `hobby_atributo`).
- **Hobby origina 0..* hábitos** (`habito.hobby_origem_id`). O hábito nasce com uma cópia dos atributos do hobby. **Hobby não entra no bloco.**
- **Bloco tem `data`** (não existe classe Semana: a semana é só a visualização de 7 dias a partir de `inicioSemana`). Bloco → 0..1 Hábito, 0..* Atributos (`bloco_atributo`), e `concluido`.
- Caderno 1—N Divisoria 1—N Nota. Enums: DiaSemana (`inicioSemana`) e Aparencia.

Regras-chave:
- Excluir atributo é sempre permitido e só remove os vínculos (RN12).
- Escolher um hábito no bloco adiciona os atributos dele (RN23).
- O tempo do bloco conta inteiro para cada atributo (RN25).
- Tempo feito = blocos concluídos. Tempo planejado = todos os blocos (RN26).
- Consistência = concluídos ÷ blocos que já terminaram (RN28). Só é possível concluir um bloco que já começou (RN37).
- Blocos na mesma data não se sobrepõem, mas podem encostar (RN21). Horários em passos de 15 minutos, sem atravessar a meia-noite (RN20).
- Recurso de outro usuário responde 404 (RN01).
- No front, a grade continua semanal, e arrastar um bloco troca a data dele (RN24).

---

## Cronograma (resumo)

| Sprint | Período | Entrega |
|---|---|---|
| S01–S03 | 09/11–29/11 | Engenharia ✔️ (Figma, requisitos, diagramas, Trello) |
| **S04** | 30/11–06/12 | Validar regras, dados e API. Ambiente. Retrospectiva do mês 1 |
| S05 | 07/12–13/12 | Spring Boot, Docker, Flyway, CI, Swagger, API de Atributos |
| S06 | 14/12–20/12 | JWT, isolamento por usuário, API de Hábitos |
| S07 | 21/12–27/12 | API de Hobbies e Perfil (Natal) |
| S08 | 28/12–03/01 | API de Blocos com data e concluído (Ano Novo) |
| S09 | 04/01–10/01 | Estatísticas, Caderno, deploy no Railway, `v0.1.0`, retrospectiva |
| S10 | 11/01–17/01 | React, CI/CD do front, login |
| S11 | 18/01–24/01 | Telas de Atributos, Hábitos e Hobby |
| S12 | 25/01–31/01 | Minha Semana e filtros |
| S13 | 01/02–07/02 | Dashboard e Perfil |
| S14 | 08/02–14/02 | Caderno, drag and drop, `v0.2.0`, retrospectiva |
| S15 | 15/02–21/02 | QA, backup, monitoramento, README (Carnaval) |
| S16 | 22/02–28/02 | Documentação final, apresentação, LinkedIn |
| S17 | 01/03–07/03 | Buffer, escopo congelado, retrospectiva final |
| 🎯 | 08/03/2027 | `v1.0.0` |

---

## Status atual (24/11/2026 · S03 · Fase 1)

### Concluído
- [x] Repositório, Acelera Hub, tech stack, documentação inicial (v0.5)
- [x] Figma, requisitos v0.2, diagrama de fluxo, diagrama de classes
- [x] Trello reestruturado no fluxo Scrum: Referência, Product Backlog, Sprint Backlog, Em andamento, Em revisão, Concluído, Fora da v1.0.0
- [x] Cronograma 2.0, processo, rascunhos de regras de negócio, modelo de dados e API
- [x] `.gitignore` e `bin/` fora do Git (falta commitar)

### Pendente na S04 (até 06/12)
- [x] Regras de negócio validadas (24/11). Diagramas de classes e de fluxo v2 no draw.io
- [x] Modelo de dados e contrato da API validados (25/11)
- [ ] Validar escopo MoSCoW e cronograma 2.0
- [ ] Instalar JDK 21 e Docker Desktop. Criar contas no Railway e no Cloudflare. Proteger a `main`
- [ ] Retrospectiva do mês 1 (Começar / Parar / Continuar)
- [ ] Commit e push das mudanças de documentação

---

## Decisões registradas

| Data | Decisão |
|---|---|
| 24/11/2026 | Escopo completo até 08/03, priorizado por MoSCoW. Carga horária definida pelo dev |
| 24/11/2026 | Aba de IA fora da v1.0.0 |
| 24/11/2026 | JWT, Flyway, TypeScript, TipTap, Java 21, monorepo |
| 24/11/2026 | S17 (01/03–07/03) como buffer de entrega |
| 24/11/2026 | Bloco com data (sem Semana). Hábito e hobby com 0..* atributos. Hobby origina hábito. Excluir atributo sempre permitido |
| 24/11/2026 | Consistência = blocos concluídos ÷ blocos que já terminaram. Tempo feito × planejado. RF50 e RF51 |
| 24/11/2026 | Diagramas de classes e de fluxo em draw.io (`.drawio` + PNG) |
