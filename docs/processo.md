# Orion — Processo de trabalho

Como o projeto é planejado, codado, revisado e publicado. Vale do primeiro commit da S05 até a release v1.0.0.

## 1. Scrum adaptado para uma pessoa

| Evento | Quando | Duração | Saída |
| --- | --- | --- | --- |
| Planning | Segunda, início da sprint | 15 min | Cards da sprint movidos do Product Backlog para o Sprint Backlog, com a meta da semana escrita no card "Meta da sprint" |
| Daily | Todo dia trabalhado | 2 min | Comentário curto no card em andamento: o que fiz, o que farei, o que está travando |
| Review | Sexta ou domingo | 15 min | O que está publicado. O que não terminou volta ao topo do Product Backlog, e cortes de escopo são anotados |
| Retrospectiva | Fim de cada mês (S04, S09, S14, S17) | 30 min | Card com Começar / Parar / Continuar e no máximo 3 ações para o próximo mês |

Regra de execução: **sem commit, o dia não conta.**

## 2. Quadro no Trello

Fluxo das listas, da esquerda para a direita:

| Lista | O que fica nela |
| --- | --- |
| 📌 Referência | Como trabalhamos, links da documentação e marcos |
| 📋 Product Backlog | Tudo que ainda não entrou numa sprint, ordenado pela sprint prevista (`[S05]`, `[S06]`...) |
| 🎯 Sprint Backlog | Só os cards da sprint atual |
| 🔧 Em andamento | No máximo **2 cards** ao mesmo tempo (limite de WIP) |
| 👀 Em revisão | PR aberto, aguardando CI e autorrevisão, ou documento aguardando validação |
| ✅ Concluído | Atende a Definição de Pronto |
| 🧊 Fora da v1.0.0 | Itens Could e Won't, para depois da release |

Cada card tem: prefixo da sprint no título, prioridade (Must, Should ou Could), referência aos RF e RN, critérios de aceite na descrição e prazo no domingo do fim da sprint.

O repositório é um monorepo: `backend/` (Spring Boot, a partir da S05) e `frontend/` (React, a partir da S10), com `docs/` na raiz.

## 3. Definição de Preparado (DoR)

Um card só entra no Sprint Backlog quando:

- [ ] Cita os RF que atende e as RN que se aplicam
- [ ] Tem critérios de aceite verificáveis
- [ ] O endpoint está no [contrato da API](api.md), se for back-end
- [ ] A tela está no Figma, se for front-end
- [ ] Cabe em uma sprint. Se não couber, é dividido

## 4. Definição de Pronto (DoD)

Um card só vai para Concluído quando:

- [ ] O código está na `main`, via Pull Request
- [ ] O CI está verde (build e testes)
- [ ] As regras de negócio do card têm teste automático (back-end)
- [ ] O endpoint aparece no Swagger e na coleção do Postman (back-end)
- [ ] A tela segue o Figma e funciona no celular (front-end)
- [ ] Está publicado em produção (a partir da S09 no back e da S10 no front)
- [ ] A documentação afetada foi atualizada (requisitos, regras, API, CLAUDE.md)

## 5. Git e GitHub

### Branches

- `main` está sempre funcionando e publicável. Nunca se faz commit direto nela a partir da S05.
- Uma branch por card: `feat/s05-crud-atributo`, `fix/s08-conflito-meia-noite`, `docs/s04-regras-de-negocio`.
- Merge por **squash** no PR, e a branch é apagada depois.
- Proteção da `main` no GitHub: exigir PR e CI verde.

### Commits (Conventional Commits, em português)

```
feat(atributo): cria endpoint de cadastro de atributo
fix(bloco): recusa bloco que atravessa a meia-noite (RN20)
test(bloco): cobre sobreposição de horários (RN21)
docs(regras): define cálculo de consistência
refactor(habito): extrai validação de nome
ci: adiciona build do front no GitHub Actions
chore: atualiza dependências
```

### Pull Request

Mesmo trabalhando sozinho, todo código passa por PR. O PR é a revisão e o histórico do porquê.

Modelo de descrição:

```
## O que muda
## RF / RN atendidos
## Como testar
## Checklist
- [ ] CI verde
- [ ] Testes das regras
- [ ] Docs atualizadas
```

### Versões

Versionamento semântico, com tags no GitHub e notas de release:

| Tag | Quando |
| --- | --- |
| `console-estudo` | S05, antes de remover o console |
| `v0.1.0` | Fim da S09: API completa em produção |
| `v0.2.0` | Fim da S14: front completo em produção |
| `v1.0.0` | 08/03/2027 |

## 6. Ambientes e DevOps

| Ambiente | Back-end | Banco | Front-end | Deploy |
| --- | --- | --- | --- | --- |
| Local (`dev`) | `mvn spring-boot:run` | PostgreSQL 17 instalado no Windows (banco `orion`) | `npm run dev` | — |
| Produção (`prod`) | Railway | PostgreSQL do Railway | Cloudflare Pages | Automático a cada merge na `main` |

- **CI (GitHub Actions):** em todo push e PR, roda o build e os testes do back e, a partir da S10, o build e o lint do front. PR com CI vermelho não entra.
- **CD:** o Railway e o Cloudflare Pages publicam sozinhos a partir da `main`. O Cloudflare também gera um preview para cada PR.
- **Banco:** o esquema só muda via migration do Flyway. Nunca se altera tabela à mão em produção.
- **Segredos:** URL do banco, senha e chave do JWT ficam só em variáveis de ambiente (Railway e GitHub Secrets). O arquivo `.env` nunca vai para o Git, e o `.env.example` documenta as variáveis.
- **Saúde:** endpoint `/api/v1/health` para o Railway e para um monitor de uptime gratuito (S15).
- **Backup:** backup do PostgreSQL do Railway configurado e testado com uma restauração (S15).

## 7. Testes

| Tipo | Ferramenta | O que cobre | Desde |
| --- | --- | --- | --- |
| Unidade | JUnit 5 + Mockito | Regras de negócio nos services. Cada RN tem pelo menos um teste | S05 |
| Integração | Spring Boot Test + PostgreSQL (`orion_test` local; serviço PostgreSQL no GitHub Actions) | Endpoints com banco real, segurança e isolamento por usuário | S06 |
| API manual | Postman | Coleção com todos os endpoints, versionada em `docs/postman/` | S05 |
| Front | Vitest + Testing Library | Componentes com lógica (grade da semana, formulários) | S12 |
| Ponta a ponta | Roteiro manual de QA | Fluxos do [diagrama de fluxo](diagramas/diagrama-de-fluxo.md) em desktop e celular | S15 |

Meta: as regras de negócio (RN) 100% cobertas por testes. Não há meta de porcentagem de linhas.
