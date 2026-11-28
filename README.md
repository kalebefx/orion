# Orion

Sistema de gestão de rotina pessoal baseado em atributos. A pessoa cadastra atributos (Saúde, Inteligência, Social), cria hábitos e hobbies ligados a eles, organiza a semana em blocos de tempo e acompanha quanto tempo dedicou a cada atributo.

Projeto de portfólio desenvolvido no Acelera Hub, do console ao fullstack.

> **Status:** Fase 2 — Back-end (sprint S05, desde 25/11/2026). Release v1.0.0 prevista para 22/02/2027, com prazo final em 08/03/2027.

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

## Como rodar o back-end

Pré-requisitos: JDK 21, PostgreSQL 17 com os bancos `orion` e `orion_test`, e o arquivo `backend/.env` preenchido a partir de `backend/.env.example`.

```bash
cd backend
./mvnw verify            # build e testes
./mvnw spring-boot:run   # API em http://localhost:8080/api/v1
```

Os protótipos das telas estão em [`prototipos/`](prototipos/) e abrem direto no navegador.

O projeto começou como um console em Java para estudo, arquivado na tag `console-estudo`.
