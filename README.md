# Orion

Sistema de gestão de rotina pessoal baseado em atributos. A pessoa cadastra atributos (Saúde, Inteligência, Social), cria hábitos e hobbies ligados a eles, organiza a semana em blocos de tempo e acompanha quanto tempo dedicou a cada atributo.

Projeto de portfólio desenvolvido no Acelera Hub, do console ao fullstack.

> **Status:** Fase 1 — Engenharia (sprint S04). O back-end em Spring Boot começa em 07/12/2026. Release v1.0.0 prevista para 08/03/2027.

## Stack

- **Back-end:** Java 21, Spring Boot, Spring Security + JWT, PostgreSQL, JPA, Flyway, JUnit
- **Front-end:** React, Vite, TypeScript
- **DevOps:** GitHub Actions, Railway (API e banco), Cloudflare Pages (front)

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [Documentação inicial](docs/documentacao-inicial.md) | Visão geral, escopo e status |
| [Requisitos](docs/requisitos.md) | RF, RNF, prioridade e sprint |
| [Regras de negócio](docs/regras-de-negocio.md) | Comportamento detalhado (RN) |
| [Cronograma](docs/cronograma.md) | Sprints até a release |
| [Processo](docs/processo.md) | Scrum, Git, CI/CD e testes |
| [Contrato da API](docs/api.md) | Endpoints REST |
| [Tech Stack](docs/tech-stack.md) | Ferramentas e decisões |
| [Diagramas](docs/diagramas/) | Fluxo, classes e modelo de dados |

O código em `src/` é um ensaio de aprendizado em Java de console. Ele será arquivado com a tag `console-estudo` na S05.
