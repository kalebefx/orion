# Orion — Tech Stack

Decisões técnicas do Orion e o motivo de cada uma. Uma decisão nova ou uma troca de ferramenta entra na tabela de decisões no fim do documento, com a data.

## Gestão e planejamento

- **Trello**: quadro de sprints. Visual, gratuito e muito usado no mercado para organizar tarefas em metodologia ágil. O fluxo está em [processo.md](processo.md).
- **draw.io**: diagrama de classes e diagrama de fluxo. Gratuito e profissional. O arquivo `.drawio` fica no repositório, junto com o PNG exportado para o GitHub mostrar.
- **Mermaid**: modelo de dados (ER), escrito em texto dentro do Markdown. O GitHub desenha sozinho e as mudanças aparecem no diff.
- **Protótipos navegáveis em HTML** (`prototipos/`): as telas foram prototipadas antes de construir o front, feitas com o Claude Code usando skills de UI/UX. Substituem o Figma: dá para clicar, testar o tema e o celular no navegador, e evitam retrabalho, como aconteceu no projeto do salão.

## Back-end

| Ferramenta | Para quê | Motivo |
| --- | --- | --- |
| **Java 21 (LTS)** | Linguagem | Foco de carreira em back-end. É a versão LTS mais suportada por Railway, bibliotecas e vagas |
| **Spring Boot** (última versão estável do Initializr) | Framework da API REST | O framework Java mais usado no mercado |
| **Maven** | Build e dependências | Padrão do Spring Initializr e o mais comum em vagas Java |
| **Spring Web** | Controllers REST | — |
| **Spring Data JPA (Hibernate)** | Acesso ao banco | Repositórios sem SQL repetitivo |
| **Bean Validation** | Validar entrada (`@NotBlank`, `@Size`) | Regras de campo (RN02, RN09...) declaradas no DTO |
| **Spring Security + JWT** | Cadastro, login e isolamento por usuário | API sem estado, que funciona bem com front separado (RNF03) |
| **PostgreSQL** | Banco relacional | Gratuito, robusto e muito usado em produção. Combina com JPA |
| **Flyway** | Versionar o esquema do banco | Toda mudança de tabela vira uma migration revisável. Padrão de mercado |
| **springdoc-openapi (Swagger)** | Documentação viva da API | Front e Postman sempre batem com o código |
| **Lombok** (opcional) | Menos getters e setters | Usar com moderação. Records do Java para DTOs |
| **JUnit 5 + Mockito** | Testes de unidade das regras | Garante que as regras continuam funcionando a cada mudança |
| **Banco `orion_test`** | Testes de integração com PostgreSQL real | Testa o mesmo banco da produção, sem Docker. No CI, o GitHub Actions sobe um serviço PostgreSQL |
| **Postman** | Testar endpoints durante o desenvolvimento | Coleção versionada no repositório |

## Front-end

| Ferramenta | Para quê | Motivo |
| --- | --- | --- |
| **React + Vite** | Interface web | Experiência numa segunda ferramenta além do Angular (projeto do salão). É a mais pedida nas vagas júnior |
| **TypeScript** | Tipagem | Padrão de mercado em React. Pega erros de contrato com a API antes de rodar |
| **React Router** | Navegação entre abas | — |
| **TanStack Query** | Chamadas à API e cache | Loading, erro e recarregamento sem código repetido |
| **dnd-kit** | Drag and drop dos blocos (RF11) | Acessível por teclado (RNF11) e mantido |
| **Recharts** | Gráficos do dashboard | Simples de usar com React |
| **TipTap** | Editor de notas do caderno | Editor rico, moderno e com boa documentação |
| **Vitest + Testing Library** | Testes do front | Integrado ao Vite |
| **ESLint + Prettier** | Padrão de código | Roda no CI |

## DevOps e versionamento

| Ferramenta | Para quê |
| --- | --- |
| **Git + GitHub** | Versionamento, PRs, tags e releases. Portfólio público |
| **GitHub Actions** | CI: build, testes e lint em todo push e PR |
| **PostgreSQL 17 (instalado no Windows)** | Banco local na mesma versão principal da produção |
| **Railway** | Hospedagem da API e do PostgreSQL, com deploy automático a partir da `main` |
| **Cloudflare Pages** | Hospedagem do front, gratuita e já usada no projeto do salão. Preview por PR |
| **Monitor de uptime** (UptimeRobot ou similar, gratuito) | Aviso se a API cair (RNF05) |

## Ambiente de desenvolvimento

- JDK 21 instalado. Se a máquina tiver um JDK mais novo, o projeto continua compilando para Java 21 via `maven.compiler.release`.
- PostgreSQL 17
- IntelliJ IDEA Community ou VS Code com o Extension Pack for Java
- Node.js LTS
- Postman

## Decisões

| Data | Decisão | Alternativas consideradas |
| --- | --- | --- |
| 2026-11-16 | Java + Spring Boot, PostgreSQL, React, Railway, Cloudflare Pages | — |
| 2026-11-24 | Autenticação com Spring Security + JWT | Sessão com cookie (exige mais cuidado com CORS entre domínios) |
| 2026-11-24 | Flyway para o esquema do banco | `ddl-auto=update` do Hibernate (não versiona e é arriscado em produção) |
| 2026-11-24 | TypeScript no front | JavaScript puro |
| 2026-11-24 | TipTap no caderno | Quill |
| 2026-11-24 | Java 21 LTS como alvo | Java 25 LTS (suporte mais recente, mas menos testado nos serviços de hospedagem) |
| 2026-11-24 | Aba de IA fora da v1.0.0 | Casca vazia |
| 2026-11-25 | Sem Docker: PostgreSQL instalado localmente e banco `orion_test` para os testes de integração | Docker Compose + Testcontainers (mais uma ferramenta para aprender num prazo apertado) |
| 2026-11-24 | Bloco com data em vez de entidade Semana | Classe Semana com data de início (trocar o início da semana bagunçava semanas antigas) |
| 2026-11-24 | Diagramas de classes e de fluxo no draw.io | Mermaid |
| 2026-11-24 | Monorepo com `backend/` e `frontend/` | Dois repositórios (mais trabalho para manter CI, versões e docs em sincronia) |
