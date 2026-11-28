# CLAUDE.md — Projeto Orion

Contexto do projeto para qualquer sessão de desenvolvimento. Atualizado em 28/11/2026.

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

Portfólio técnico no Acelera Hub. **Release v1.0.0: previsão em 22/02/2027, prazo final em 08/03/2027.**

Fora da v1.0.0: aba de IA (decidido em 24/11), painel admin, compartilhamento, calendários externos, app nativo, bloco recorrente, janela flutuante do caderno. Could (só se sobrar tempo): recuperar senha (RF04), foto (RF43), envio de lembretes (RF48).

---

## Documentos (`docs/`)

| Arquivo | Conteúdo |
|---|---|
| `documentacao-inicial.md` | Visão geral, escopo, telas, status |
| `requisitos.md` | RF01–RF51 com prioridade MoSCoW e sprint de back e front. RNF01–RNF11 com forma de verificação |
| `regras-de-negocio.md` | RN01–RN37, todas validadas em 24/11 |
| `cronograma.md` | v3.0: 17 sprints, previsão em 22/02/2027 e prazo final em 08/03/2027 |
| `processo.md` | Scrum adaptado, Trello, DoR, DoD, Git, versões, ambientes, CI/CD, testes |
| `api.md` | Contrato REST `/api/v1`, erros em Problem Details. Validado em 25/11 |
| `tech-stack.md` | Ferramentas, motivos e registro de decisões |
| `diagramas/diagrama-de-fluxo.md` + `.drawio` + `.png` | Fluxo v2 (draw.io) |
| `diagramas/diagrama-de-classes.md` + `.drawio` + `.png` | Domínio v2 (draw.io) |
| `diagramas/modelo-de-dados.md` | ER em Mermaid, restrições, cascatas. Validado em 25/11 |
| `aprendizados.md` | Diário de estudo de Java |
| `../prototipos/` | Protótipos navegáveis das 8 telas da v1.0.0 (HTML, CSS e JS), referência visual do front |

---

## Stack

- **Back-end:** Java 21 (alvo; a máquina tem o JDK 26), Spring Boot, Maven, Spring Web, Data JPA, Bean Validation, Spring Security + JWT, PostgreSQL, Flyway, springdoc-openapi, JUnit 5, Mockito. Testes de integração no banco `orion_test` do PostgreSQL local.
- **Front-end:** React + Vite + TypeScript, React Router, TanStack Query, dnd-kit, Recharts, TipTap, Vitest, ESLint e Prettier.
- **DevOps:** Git e GitHub (`kalebefx/orion`), GitHub Actions (CI, com serviço PostgreSQL), PostgreSQL 17 instalado no Windows (sem Docker), Railway (API e banco), Cloudflare Pages (front), monitor de uptime.
- **Engenharia:** Trello, protótipos em HTML (feitos com o Claude Code e skills de UI/UX), draw.io, Mermaid, Postman.

Ambiente na máquina (25/11): JDK 21 (Temurin) e Java 26, Maven 3.9, Node 24, git, Postman, PostgreSQL 17.12 (serviço `postgresql-x64-17`, porta padrão 5432, senha do `postgres` testada; o 18 antigo foi removido). Sem Docker, por decisão de 25/11. O `gh` CLI não está instalado.

---

## Estrutura do repositório

Monorepo:

```
orion/
├── CLAUDE.md, README.md, .gitignore
├── backend/                 ← Spring Boot 4.2 + Java 21 (Maven Wrapper)
│   ├── src/main/java/com/kalebe/orion/
│   │   └── config, controller, service, repository, domain, dto, exception
│   ├── src/main/resources/  ← application.yml (+ -dev, -prod), db/migration (Flyway)
│   ├── src/test/            ← testes (profile test, banco orion_test)
│   └── .env.example         ← modelo do .env (o .env fica fora do Git)
├── prototipos/              ← protótipos navegáveis das telas (HTML)
├── docs/                    ← ver tabela acima
├── frontend/                ← React (a partir da S10)
└── .github/workflows/ci.yml ← CI (card da S05, ainda não criado)
```

O console de estudo foi arquivado na tag `console-estudo` (25/11). Ele não é a base do produto e não deve ser corrigido.

---

## Como rodar o back-end

Pré-requisitos: PostgreSQL 17 rodando, bancos `orion` e `orion_test` criados e `backend/.env` preenchido a partir do `.env.example`. Use o JDK 21 (`JAVA_HOME` apontando para o Temurin 21).

```powershell
cd backend
.\mvnw.cmd verify            # build + testes
.\mvnw.cmd spring-boot:run   # sobe a API em http://localhost:8080/api/v1 (profile dev)
```

A segurança está liberada (`config/SecurityConfig`) até a S06, quando entra o JWT.

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

## Cronograma (resumo · v3.0 de 25/11/2026)

A engenharia terminou antes. A S05 começou em 25/11, e as sprints seguintes foram antecipadas em 2 semanas. As datas são **previsão**. O **prazo final (08/03/2027) não muda**.

| Sprint | Período | Entrega |
|---|---|---|
| S01–S04 | 09/11–25/11 | Engenharia ✔️ (protótipos, requisitos, regras, diagramas, dados, API, processo, Trello, ambiente, retrospectiva) |
| **S05** | 25/11–29/11 (curta) | Spring Boot, PostgreSQL local, Flyway, CI, proteção da `main`, Swagger, API de Atributos |
| S06 | 30/11–06/12 | JWT, isolamento por usuário, API de Hábitos |
| S07 | 07/12–13/12 | API de Hobbies (e hábito a partir do hobby) e Perfil |
| S08 | 14/12–20/12 | API de Blocos com data e concluído |
| S09 | 21/12–27/12 (Natal) | Estatísticas, Caderno, conta e deploy no Railway, `v0.1.0`, retrospectiva |
| S10 | 28/12–03/01 (Ano Novo) | React, conta e CI/CD no Cloudflare, login |
| S11 | 04/01–10/01 | Telas de Atributos, Hábitos e Hobby |
| S12 | 11/01–17/01 | Minha Semana, concluído e filtros |
| S13 | 18/01–24/01 | Dashboard e Perfil |
| S14 | 25/01–31/01 | Caderno, drag and drop, `v0.2.0`, retrospectiva |
| S15 | 01/02–07/02 | QA, backup, monitoramento, README |
| S16 | 08/02–14/02 (Carnaval) | Documentação final, apresentação, LinkedIn |
| S17 | 15/02–21/02 | Buffer, escopo congelado, retrospectiva final |
| 🎯 Previsão | 22/02/2027 | `v1.0.0` |
| ⏰ Prazo final | 08/03/2027 | Limite fixo |

---

## Status atual (25/11/2026 · S05 · Fase 2 — Back-end)

### Fase 1 concluída (S01–S04)
- [x] Repositório, Acelera Hub, tech stack, documentação inicial
- [x] Protótipos navegáveis em `prototipos/`, requisitos v0.3 (RF01–RF51), regras RN01–RN37 validadas
- [x] Diagramas de classes e de fluxo v2 no draw.io. Modelo de dados e API validados (25/11)
- [x] Trello no fluxo Scrum. Cronograma v3.0. Processo (DoR, DoD, Git, CI/CD)
- [x] Ambiente: JDK 21, PostgreSQL 17 (porta 5432), Postman, Extension Pack for Java no VS Code. Docker fora do projeto
- [x] Retrospectiva do mês 1 (respostas a registrar no card do Trello)

### Movido para mais tarde
- Contas no Railway (S09) e no Cloudflare (S10)
- Proteção da `main` no GitHub (S05, junto com o CI)

### S05 em andamento (25/11–29/11)
- [x] Tag `console-estudo` e console removido da `main` (25/11)
- [x] Projeto Spring Boot 4.2 em `backend/` (25/11)
- [x] PostgreSQL local (`orion` e `orion_test`), profiles e Flyway configurado (25/11). A primeira migration entra com a API de Atributos
- [x] Protótipos navegáveis em `prototipos/` (27/11)
- [ ] Swagger, erros globais e `/health` (em andamento)
- [ ] API de Atributos
- [ ] CI no GitHub Actions e proteção da `main` (adiados por decisão do Kalebe)

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
| 25/11/2026 | Sem Docker: PostgreSQL instalado no Windows e banco `orion_test` para testes de integração |
| 25/11/2026 | Engenharia concluída antes. S05 começa em 25/11, sprints antecipadas em 2 semanas. Previsão da release em 22/02/2027, prazo final mantido em 08/03/2027 |
| 27/11/2026 | Protótipos das telas feitos em HTML, CSS e JS (`prototipos/`) com o Claude Code e skills de UI/UX, no lugar do Figma |
