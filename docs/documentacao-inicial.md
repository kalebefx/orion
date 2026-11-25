# Orion — Documentação Inicial

Documento de entrada do projeto. Ele descreve o produto, a forma de trabalhar e o estado da engenharia. O detalhe de cada decisão fica nos documentos ligados abaixo.

| Campo | Valor |
| --- | --- |
| Projeto | Orion |
| Documento | Documentação inicial |
| Versão | 0.6 |
| Status | Em uso |
| Atualizado em | 2026-11-24 |

## Documentos do projeto

| Documento | Para quê |
| --- | --- |
| [Requisitos](requisitos.md) | O que o sistema deve fazer (RF01–RF51), com que qualidade (RNF01–RNF11), prioridade e sprint de cada um |
| [Regras de negócio](regras-de-negocio.md) | Como cada requisito se comporta (RN01–RN37) |
| [Tech Stack](tech-stack.md) | Ferramentas escolhidas, o motivo de cada uma e o registro de decisões |
| [Cronograma](cronograma.md) | 17 sprints, com previsão da release em 22/02/2027 e prazo final em 08/03/2027 |
| [Processo](processo.md) | Scrum adaptado, Trello, DoR, DoD, Git, CI/CD, ambientes e testes |
| [Contrato da API](api.md) | Endpoints REST, formato de erro e convenções |
| [Diagrama de fluxo](diagramas/diagrama-de-fluxo.md) | Caminho do usuário autenticado pelas abas (draw.io) |
| [Diagrama de classes](diagramas/diagrama-de-classes.md) | Modelo de domínio (draw.io) |
| [Modelo de dados](diagramas/modelo-de-dados.md) | Tabelas, restrições e cascatas no PostgreSQL |
| [Aprendizados](aprendizados.md) | Diário do que foi estudado |

## Regra de engenharia

A documentação manda. O código obedece.

O console em `src/` foi um ensaio feito antes da engenharia. Ele serviu para aprender modelagem e Java. Ele não é a especificação e não é a arquitetura do produto. Na S05 ele recebe a tag `console-estudo` e sai da `main`, e o projeto Spring Boot começa do zero, seguindo esta documentação. O caminho inverso não vale: achar um comportamento no console e escrever o requisito em cima dele.

Ordem de trabalho:

1. Produto e protótipo (Figma).
2. Requisitos e regras de negócio.
3. Diagramas, modelo de dados e contrato da API.
4. Só então Spring Boot, banco, testes, React e publicação.

## Sobre o projeto

Orion é um sistema de gestão de rotina pessoal baseado em atributos. A pessoa cadastra atributos (Saúde, Inteligência, Social), cria hábitos e hobbies que podem estar ligados a esses atributos, transforma hobbies em hábitos e organiza a semana em blocos de tempo. Ela marca cada bloco como cumprido ou não, e o sistema mostra o tempo feito e planejado por atributo, a consistência e oferece um caderno para anotações.

Cada pessoa autenticada vê e altera apenas os próprios dados. O uso é no navegador, no desktop e no celular.

O projeto é desenvolvido no Acelera Hub como portfólio técnico, do console ao fullstack. A release v1.0.0 está prevista para 22/02/2027, e o prazo final é 08/03/2027.

Ficam de fora da v1.0.0: aba de IA, painel administrativo, compartilhamento de rotina entre usuários, integração com calendários externos, aplicativo nativo, bloco recorrente e janela flutuante do caderno.

## Funcionalidades

Prioridade de cada requisito em [requisitos.md](requisitos.md). **Must** garante a entrega, **Should** entra na v1.0.0 mas é o primeiro a ser cortado se o prazo apertar, e **Could** só entra se sobrar tempo.

### Acesso (Must)

- Cadastro, login, logout e sessão (RF01–RF03, RF05).
- Recuperar senha (RF04) é Could: depende de serviço de e-mail.

### Atributos, hábitos e hobbies

- Cadastro, edição e exclusão de atributos pessoais, com cor e meta semanal (RF17–RF20, RF44). Must.
- Cadastro, edição, exclusão, ativação e desativação de hábitos, com zero ou vários atributos (RF21–RF26). Must.
- Cadastro, edição, exclusão, ativação e desativação de hobbies, com zero ou vários atributos (RF27–RF32). Should.
- Criar hábito a partir de um hobby, herdando os atributos dele (RF51). Should.
- Excluir um atributo é sempre permitido: ele só sai dos hábitos, hobbies e blocos (RN12).

### Minha Semana

- Criar, editar e excluir bloco com ação, data, horário, atributos, hábito e descrição. Modal de detalhes (RF06–RF09). Must. Ao escolher um hábito, os atributos dele entram no bloco.
- Marcar bloco como concluído (RF50). Must.
- A grade é sempre uma semana. Por baixo, cada bloco guarda uma data, e arrastar o bloco para outro dia troca a data.
- Trocar a semana exibida (RF10). Must.
- Filtrar por atributo e por hábito (RF12). Should.
- Arrastar bloco para outro dia ou horário (RF11). Should.

### Dashboard e metas (Must)

- Tempo feito (blocos concluídos) e planejado, total e por atributo, e consistência (concluídos ÷ blocos que já passaram), com troca de mês (RF13–RF16).
- Barra de progresso da meta semanal e histórico de horas do atributo por semana.

### Caderno (Should)

- Divisórias criadas pela pessoa (por exemplo Ideias, Java, Inglês), com notas dentro delas, e tela cheia (RF33–RF39).

### Perfil

- Nome, e-mail, metas, início da semana, aparência e fuso horário (RF40–RF42, RF44–RF47, RF49). Should, exceto metas (Must).
- Foto (RF43) e lembretes (RF48) são Could. A v1.0.0 só guarda a preferência de lembrete.

## Telas

| Tela | Papel | Requisitos | Sprint (front) |
| --- | --- | --- | --- |
| Cadastro e login | Entrada | RF01–RF05 | S10 |
| Atributos | Listar, cadastrar, editar, excluir | RF17–RF20 | S11 |
| Hábitos | Listar, cadastrar, editar, excluir, ativar, desativar | RF21–RF26 | S11 |
| Hobby | Listar, cadastrar, editar, excluir, ativar, desativar | RF27–RF32 | S11 |
| Minha Semana | Quadro semanal, tela principal | RF06–RF12 | S12 (drag and drop na S14) |
| Dashboard | Visão mensal, tempo e consistência | RF13–RF16 | S13 |
| Detalhe do atributo | Histórico de horas por semana | RF16, RF44 | S13 |
| Perfil | Dados pessoais, metas e preferências | RF40–RF49 | S13 |
| Caderno | Divisórias e editor de texto | RF33–RF39 | S14 |

Os protótipos dessas telas estão no Figma. A aba de IA aparece no protótipo, mas não entra na v1.0.0.

## Metodologia

Scrum adaptado para uma pessoa, com sprints semanais de segunda a domingo. A carga horária de cada semana é definida pelo dev.

- **Planning** na segunda, **daily** como comentário no card, **review** no fim da semana e **retrospectiva** no fim de cada mês.
- Quadro no Trello: Product Backlog → Sprint Backlog → Em andamento → Em revisão → Concluído.
- Definição de Preparado e Definição de Pronto, fluxo de branches, Pull Requests, Conventional Commits e versionamento semântico.
- **Regra de execução:** sem commit, o dia não conta.

Detalhes em [processo.md](processo.md).

## Stack

Decisões e motivos em [Tech Stack](tech-stack.md).

- **Engenharia:** Trello, draw.io (classes e fluxo), Mermaid (modelo de dados), Figma, Postman.
- **Back-end:** Java 21, Spring Boot, Spring Security + JWT, PostgreSQL, JPA, Flyway, JUnit. Publicação no Railway.
- **Front-end:** React, Vite, TypeScript. Publicação no Cloudflare Pages.
- **DevOps:** Git, GitHub, GitHub Actions (CI), deploy contínuo, PostgreSQL instalado localmente (sem Docker).

## Status atual

Data de referência: 25/11/2026. Sprint S05. Fase atual: Back-end. A engenharia terminou antes do previsto, e o cronograma foi antecipado em 2 semanas.

| Entrega | Situação |
| --- | --- |
| Tema, repositório e entrada no Acelera Hub | Feito (S01) |
| Tech stack | Feito (S02). Revisada em 24/11 com versões, ferramentas e decisões |
| Console em Java | Ensaio de aprendizado. Sai da `main` na S05 |
| Protótipo no Figma | Feito |
| Requisitos | Versão 0.3, 51 RF com prioridade e sprint |
| Diagrama de fluxo | v2 no draw.io (24/11) |
| Diagrama de classes no draw.io | v2 (24/11): bloco com data, hábito e hobby com vários atributos, hobby origina hábito |
| Trello com as sprints | Feito, no fluxo de Product Backlog e Sprint Backlog |
| Cronograma | Versão 3.0, antecipado em 2 semanas |
| Regras de negócio | Validadas em 24/11 (RN01–RN37) |
| Modelo de dados e contrato da API | Validados em 25/11 |
| Processo (DoR, DoD, Git, CI/CD) | Em uso a partir da S05 |
| Retrospectiva do mês 1 | Feita (25/11) |
| README do repositório | Versão mínima. A versão completa, com prints, entra na S15 |

## Próximo passo

A engenharia está concluída, e o ambiente está pronto (JDK 21, PostgreSQL 17, Postman e VS Code com o Extension Pack for Java). A S05 começou em 25/11: arquivar o console e criar o projeto Spring Boot em `backend/`. As contas no Railway e no Cloudflare ficam para a S09 e a S10.

## Histórico

| Versão | Data | Alteração |
| --- | --- | --- |
| 0.2 | 2026-11-23 | Documento completo: produto, metodologia, stack, status da semana 3 e pendências antes do back-end. |
| 0.3 | 2026-11-23 | Status do fluxo, do cronograma e do diagrama de classes alinhado ao que já foi feito. |
| 0.4 | 2026-11-24 | Diagrama de classes fechado: semanas com data, meta, perfil e bloco com zero ou mais atributos. |
| 0.5 | 2026-11-24 | Escopo da v1.0.0 com prioridades, aba de IA fora, novos documentos (regras, processo, API, modelo de dados), cronograma 2.0 e Trello em fluxo Scrum. |
| 0.6 | 2026-11-24 | Regras validadas, RF50 e RF51, bloco com data, diagramas v2 no draw.io. |
| 0.7 | 2026-11-25 | Fase 1 concluída, cronograma v3.0 antecipado, previsão em 22/02/2027 e prazo final em 08/03/2027. |
