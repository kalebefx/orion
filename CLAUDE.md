# CLAUDE.md — Projeto Orion

Contexto do projeto para qualquer sessão de desenvolvimento. Conferido contra o repositório e a pasta `docs/` em 24/11/2026.

---

## Como trabalhar neste projeto

- **A documentação manda. O código obedece.** A fonte da verdade é `docs/` (requisitos, diagramas, cronograma). Nunca escrever requisito a partir de um comportamento do console. O caminho é o contrário: o código se adapta à documentação.
- **Seguir o cronograma** em `docs/cronograma.md`. Antes de propor trabalho, ver em que semana estamos e o que está previsto para ela.
- **Manter este arquivo atualizado.** Quando uma entrega do cronograma for concluída, uma decisão for tomada ou a estrutura do projeto mudar, atualizar as seções "Status atual" e "Decisões em aberto".
- **Idioma:** português do Brasil em código de domínio, documentação e mensagens de commit.
- **Regra de execução:** sem commit, o dia não conta.

---

## O que é o Orion

Sistema de gestão de rotina pessoal baseado em atributos. A pessoa cadastra atributos (Saúde, Inteligência, Social...), cria hábitos e hobbies ligados a esses atributos e organiza a semana em blocos de tempo. O sistema mostra quanto tempo foi dedicado a cada atributo e oferece um caderno de anotações.

Cada pessoa autenticada vê e altera apenas os próprios dados. Uso no navegador, desktop e celular.

Desenvolvido no Acelera Hub como portfólio técnico, do console ao fullstack. **Prazo de publicação: 08/03/2027.**

Fora desta versão: painel administrativo, compartilhamento de rotina entre usuários, integração com calendários externos, aplicativo nativo, bloco recorrente.

---

## Stack (conforme `docs/tech-stack.md`)

| Camada | Tecnologia |
|---|---|
| Back-end | Java + Spring Boot |
| Banco de dados | PostgreSQL + JPA |
| Testes | JUnit |
| Front-end | React |
| Hospedagem back | Railway (API + banco) |
| Hospedagem front | Cloudflare Pages |
| Versionamento | Git + GitHub (`kalebefx/orion`) |
| Teste de endpoints | Postman |
| Gestão de sprints | Trello |
| Diagramas | draw.io (classes) e Mermaid (fluxo) |
| Protótipo | Figma |

Ainda **não decidido** na documentação: mecanismo de autenticação (JWT foi citado em conversa, mas não está no tech-stack) e editor de texto do caderno (Quill ou TipTap, citados em conversa).

---

## Metodologia

Scrum simplificado, sprints semanais. **6h por semana: segunda, terça, quarta e sexta, das 19:30 às 21:00.**

- **Segunda (planning, 10 min):** meta da semana e tarefas no Trello
- **Sexta (review, 10 min):** o que foi entregue e o que ficou pendente
- **Retrospectiva:** fim de cada mês (semanas 4, 9 e 14)

---

## Estrutura atual do repositório

Projeto Java simples do VS Code (sem Maven/Gradle). Configuração em `.vscode/settings.json`: fontes em `src`, saída em `bin`, libs em `lib/**/*.jar` (pasta `lib` não existe).

```
orion/
├── .vscode/settings.json
├── bin/                         ← .class compilados (gerado)
├── docs/
│   ├── documentacao-inicial.md  ← documento de entrada, status e pendências
│   ├── requisitos.md            ← RF01–RF49, RNF01–RNF11
│   ├── tech-stack.md
│   ├── cronograma.md            ← 16 semanas
│   ├── aprendizados.md          ← diário de estudo de Java
│   └── diagramas/
│       ├── diagrama-de-classes.md + diagrama-de-classes.png  (draw.io)
│       └── diagrama-de-fluxo.md  (Mermaid, dentro do .md)
├── src/com/kalebe/orion/        ← console de estudo (ver abaixo)
│   ├── model/    Atributo, Bloco, Habito, Semana
│   ├── service/  AtributoService, BlocoService, HabitoService, OrionService (fachada)
│   └── ui/       Main, Menu (Scanner + switch, 10 opções)
├── .gitignore                   ← vazio
└── README.md                    ← ainda é o texto padrão do VS Code
```

### Estrutura planejada para o Spring Boot (semana 5 em diante)

Ainda não existe. Proposta: `src/main/java/com/kalebe/orion/` com `model/`, `repository/`, `service/`, `controller/` (e `security/` quando a autenticação entrar no escopo).

---

## O console em `src/`

É um **ensaio de aprendizado**, não a base do produto. Dados só em memória. Fluxo: `Menu → OrionService → XService → model`.

Diferenças em relação ao diagrama de classes: não tem Usuario, Hobby, Caderno, meta nem datas na Semana. `Habito` tem um atributo, mas o menu não o usa.

Bugs conhecidos (não corrigidos, por decisão):
1. `excluirBloco` remove do `BlocoService` mas não da `Semana`, então o bloco excluído continua aparecendo.
2. `limparTela()` no início do laço apaga a saída de "Ver semana" e "Tempo por atributo" antes de dar para ler.
3. `visualizarSemana` imprime os objetos Atributo/Habito com `toString()` padrão, em vez de `getNome()`.
4. Entrada inválida (`nextInt`, `LocalTime.parse`) derruba o programa.

---

## Modelo de domínio (conforme `docs/diagramas/diagrama-de-classes.md`)

| Classe | Atributos |
|---|---|
| Usuario | nome, email, senha, foto, inicioSemana, aparencia, fusoHorario, lembretesAtivos |
| Semana | listaBlocos, dataInicio, dataFim |
| Bloco | acao, horaInicio, horaFim, diaSemana, descricao |
| Atributo | nome, cor, metasHorasSemanais |
| Habito | nome, ativo |
| Hobby | nome, ativo |
| Caderno | divisorias |
| Divisoria | nome, notas |
| Nota | titulo, conteudo, dataCriacao |

- `enum DiaSemana`: SEGUNDA a DOMINGO. `enum Aparencia`: CLARO, ESCURO.

Relações:
- Usuario possui 0..* hobbies, hábitos, atributos e semanas, e 1 caderno.
- Semana organiza 0..* blocos.
- **Bloco usa 0..\* atributos** e referencia **no máximo 1 hábito**.
- Hábito e hobby se ligam a 1 atributo. **Hobby não entra no bloco.**
- Caderno tem 1..* divisórias. Divisória tem 0..* notas.

Regras já fixadas:
- O tempo do bloco conta **inteiro para cada atributo** ligado a ele (1h com Social e Físico = 1h em cada).
- Dashboard não é classe: tempo total, tempo por atributo e consistência são cálculos sobre blocos e metas.
- **Bloco recorrente está fora desta versão.**

---

## Funcionalidades (conforme `docs/documentacao-inicial.md`)

| Área / Tela | Requisitos | Observações |
|---|---|---|
| Autenticação | RF01–RF05 | Cadastro, login, logout, recuperar senha, sessão |
| Minha Semana (tela principal) | RF06–RF12 | Criar/editar/excluir bloco, trocar semana, drag and drop (RF11), filtro por atributo e hábito. Modal de detalhes do bloco |
| Dashboard | RF13–RF16 | Visão mensal: tempo total, por atributo, consistência. Barra de progresso da meta (RF16 + RF44) |
| Detalhe do atributo | RF16, RF44 | Histórico de horas por semana |
| Atributos | RF17–RF20 | CRUD |
| Hábitos | RF21–RF26 | CRUD + ativar/desativar |
| Hobby | RF27–RF32 | CRUD + ativar/desativar |
| Caderno | RF33–RF39 | Divisórias e notas. Tela cheia na visão do produto. Janela flutuante: versão futura |
| Perfil | RF40–RF49 | Nome, e-mail, foto, metas semanais, início da semana, aparência, fuso, lembretes |
| IA | — | Aparece no Figma, **sem requisito**. Decisão em aberto |

Requisitos não funcionais: RNF01 Usabilidade · RNF02 Desempenho (telas em até 2s) · RNF03 Segurança (senha criptografada, dados isolados por usuário) · RNF04 Compatibilidade (Chrome, Edge, Firefox, Safari) · RNF05 Disponibilidade 24/7 · RNF06 Escalabilidade · RNF07 Persistência automática · RNF08 Responsividade · RNF09 Manutenibilidade · RNF10 Backup · RNF11 Acessibilidade.

---

## Cronograma (09/11/2026 → 08/03/2027)

| Sem. | Período | Entregas |
|---|---|---|
| **Fase 1 — Engenharia** | | |
| 1 | 09/11–15/11 | Tema, repo, README inicial, Acelera Hub ✔️ |
| 2 | 16/11–22/11 | Modelagem console, tech stack, documentação inicial ✔️ |
| 3 | 23/11–29/11 | Figma ✔️, requisitos ✔️, diagrama de classes ✔️ |
| 4 | 30/11–06/12 | Diagrama de fluxo ✔️, Trello com as sprints, retrospectiva do mês 1 |
| **Fase 2 — Back-end** | | |
| 5 | 07/12–13/12 | Migrar para Spring Boot, estrutura de pastas |
| 6 | 14/12–20/12 | PostgreSQL + JPA, models como `@Entity`, repositórios |
| 7 | 21/12–27/12 (Natal) | Controllers REST: Atributo e Hábito |
| 8 | 28/12–03/01 (Ano Novo) | Controllers REST: Bloco e Semana |
| 9 | 04/01–10/01 | 5 testes JUnit, Postman, publicar no Railway, retrospectiva do mês 2 |
| **Fase 3 — Front-end** | | |
| 10 | 11/01–17/01 | Projeto React, tela de Atributos |
| 11 | 18/01–24/01 | Telas de Hábitos e Blocos |
| 12 | 25/01–31/01 | Tela da Semana, tela de Tempo por Atributo |
| 13 | 01/02–07/02 | Conectar telas à API, teste ponta a ponta |
| 14 | 08/02–14/02 | Ajustes, publicar no Cloudflare Pages, retrospectiva do mês 3 |
| **Fase 4 — Finalização** | | |
| 15 | 15/02–21/02 (Carnaval) | README completo com prints, documentação final |
| 16 | 22/02–28/02 | Apresentação de 2 min, post e perfil no LinkedIn, Acelera Hub |
| 🎯 | 08/03/2027 | Projeto fullstack publicado e acessível pelo celular |

**Atenção:** as fases 2 e 3, como estão hoje, cobrem só atributo, hábito, bloco e semana. Autenticação, hobby, caderno, dashboard e perfil ainda não têm sprint. Falta o corte de escopo (ver abaixo).

---

## Status atual (semana 3 · 24/11/2026 · Fase 1 — Engenharia)

### Concluído
- [x] Repositório no GitHub, entrada no Acelera Hub
- [x] Tech stack
- [x] Console em Java (ensaio: Atributo, Bloco, Habito, Semana + services + Menu + Main)
- [x] Documentação inicial (v0.4)
- [x] Protótipo no Figma
- [x] Requisitos v0.1 (RF01–RF49, RNF01–RNF11)
- [x] Diagrama de classes no draw.io (alinhado em 24/11)
- [x] Diagrama de fluxo (Mermaid)
- [x] Diário de aprendizados (em uso)

### Pendente na Fase 1 (até 06/12)
- [ ] Configurar Trello com as sprints (semana 4)
- [ ] Retrospectiva do mês 1 (semana 4)
- [ ] Escrever as regras de negócio que faltam: campos obrigatórios, conflito de horário, cálculo de consistência, efeito de excluir atributo com hábitos/blocos
- [ ] Decidir a aba de IA
- [ ] Corte de escopo: marcar no cronograma o que entra até 08/03 e o que vira backlog

Sem as regras de negócio e o corte de escopo, migrar para Spring Boot (07/12) começa cedo demais.

### Próximo na Fase 2
- [ ] Semana 5: migrar para Spring Boot
- [ ] Semana 6: PostgreSQL + JPA
- [ ] Semanas 7–8: controllers REST
- [ ] Semana 9: JUnit, Postman, Railway

---

## Decisões em aberto

| Decisão | Opções |
|---|---|
| Aba de IA | Só a aba vazia nesta versão, ou fora do escopo até ter requisito |
| Escopo de 08/03 | Autenticação, hobby, caderno, dashboard e perfil: entram no prazo ou vão para o backlog? |
| Autenticação | JWT (citado em conversa) ou outra. Não está no tech-stack |
| Editor do caderno | Quill ou TipTap (citados em conversa) |

---

## Observações

- Drag and drop (RF11) é a funcionalidade mais complexa do front: reservar tempo extra.
- Janela flutuante do caderno fica para versão futura.
- O README é o padrão do VS Code e só será reescrito na semana 15.
- `docs/aprendizados.md` tem trechos de código soltos no fim do arquivo, sem formatação.
- Projeto disponibilizado gratuitamente para a comunidade Acelera Hub.
