# Orion — Documentação Inicial

Documento de entrada do projeto. Ele descreve o produto, a forma de trabalhar e o estado da engenharia. O detalhe de cada decisão fica nos documentos ligados abaixo.

| Campo | Valor |
| --- | --- |
| Projeto | Orion |
| Documento | Documentação inicial |
| Versão | 0.3 |
| Status | Em uso |
| Atualizado em | 2026-11-23 |

## Documentos do projeto

| Documento | Para quê |
| --- | --- |
| [Requisitos](requisitos.md) | O que o sistema deve fazer (RF01–RF49) e com que qualidade (RNF01–RNF11) |
| [Tech Stack](tech-stack.md) | Ferramentas escolhidas e o motivo de cada uma |
| [Cronograma](cronograma.md) | 16 sprints, de 09/11/2026 a 08/03/2027 |
| [Diagrama de fluxo](diagramas/diagrama-de-fluxo.md) | Caminho do usuário autenticado pelas abas |
| [Diagrama de classes](diagramas/diagrama-de-classes.md) | Modelo de domínio. O draw.io tem o núcleo; ainda faltam semana identificada, meta e preferências de perfil |
| [Aprendizados](aprendizados.md) | Diário do que foi estudado no código exploratório |

## Regra de engenharia

A documentação manda. O código obedece.

O console em `src/` foi um ensaio feito antes da engenharia. Ele serviu para aprender modelagem e Java. Ele não é a especificação e não é a arquitetura do produto. Quando a fase de back-end começar, o código muda para caber nesta documentação, nos requisitos e nos diagramas. O caminho inverso não vale: achar um comportamento no console e escrever o requisito em cima dele.

Ordem de trabalho:

1. Produto e protótipo (Figma).
2. Requisitos.
3. Diagramas.
4. Só então Spring Boot, banco, testes, React e publicação.

## Sobre o projeto

Orion é um sistema de gestão de rotina pessoal baseado em atributos. A pessoa cadastra atributos (Saúde, Inteligência, Social), cria hábitos e hobbies ligados a esses atributos e organiza a semana em blocos de tempo. O sistema mostra quanto tempo foi dedicado a cada atributo e oferece um caderno para anotações.

Cada pessoa autenticada vê e altera apenas os próprios dados. O uso é no navegador, no desktop e no celular.

O projeto é desenvolvido no Acelera Hub como portfólio técnico, do console ao fullstack. O prazo de publicação é 08/03/2027.

Ficam de fora desta versão, até serem especificados à parte: painel administrativo, compartilhamento de rotina entre usuários, integração com calendários externos e aplicativo nativo.

## Funcionalidades

### Acesso

- Cadastro, login, logout, recuperação de senha e sessão (RF01–RF05).

### Atributos, hábitos e hobbies

- Cadastro, edição e exclusão de atributos pessoais (RF17–RF20).
- Cadastro, edição, exclusão, ativação e desativação de hábitos ligados a atributos (RF21–RF26).
- Cadastro, edição, exclusão, ativação e desativação de hobbies ligados a atributos (RF27–RF32).

### Blocos semanais

- Criar bloco com ação, horário, dia da semana, atributo, hábito e descrição (RF07).
- Editar e excluir bloco (RF08, RF09).
- Trocar a semana exibida (RF10).
- Realocar bloco arrastando para outro dia ou horário (RF11).
- Filtrar a visualização por atributo e por hábito (RF12).
- Bloco recorrente, que reaparece toda semana, está na visão do produto e ainda não tem requisito próprio.
- Modal de detalhes ao clicar num bloco está na visão do produto, como complemento de RF06–RF09.

### Tempo e metas

- Meta semanal de horas por atributo (RF44).
- Tempo total, tempo por atributo e consistência no mês, com atualização ao trocar o mês (RF14–RF16).
- Barra de progresso da meta semanal está na visão do produto e se apoia em RF16 e RF44.

### Caderno

- Divisórias criadas pela pessoa (por exemplo Ideias, Java, Inglês) (RF37, RF38).
- Criar, editar e excluir notas dentro das divisórias (RF35, RF36, RF39).
- Acesso pela aba Caderno (RF33, RF34).
- Tela cheia está na visão do produto.
- Janela flutuante fica para uma versão futura e não entra nesta entrega.

### Perfil

- Nome, e-mail e foto (RF41–RF43).
- Metas semanais por atributo (RF44).
- Início da semana, aparência claro/escuro, fuso horário e lembretes (RF45–RF48).
- Salvar as alterações (RF49).

### IA

- A aba de IA aparece na visão do produto desde o início.
- Ela não está nos requisitos funcionais. A decisão em aberto é se a primeira versão leva só a aba vazia ou se a aba fica fora até haver requisito.

## Telas

| Tela | Papel | Requisitos |
| --- | --- | --- |
| Minha Semana | Quadro semanal, tela principal | RF06–RF12 |
| Dashboard | Visão mensal, tempo e consistência | RF13–RF16 |
| Atributos | Listar, cadastrar, editar, excluir | RF17–RF20 |
| Hábitos | Listar, cadastrar, editar, excluir, ativar, desativar | RF21–RF26 |
| Hobby | Listar, cadastrar, editar, excluir, ativar, desativar | RF27–RF32 |
| Detalhe do atributo | Histórico de horas por semana. Apoia o dashboard e as metas | RF16, RF44 |
| Perfil | Dados pessoais, metas e preferências | RF40–RF49 |
| Caderno | Divisórias e editor de texto | RF33–RF39 |
| IA | Aba prevista. Sem requisito ainda | — |

Os protótipos dessas telas estão no Figma. A implementação segue o protótipo e os requisitos, não o menu de console.

## Metodologia

Scrum simplificado, com sprints semanais. Carga de 6 horas por semana: segunda, terça, quarta e sexta, das 19:30 às 21:00.

- **Segunda, planning (10 min).** Meta da semana e tarefas da sprint no Trello.
- **Sexta, review (10 min).** O que foi entregue e o que ficou pendente.
- **Retrospectiva.** No fim de cada mês: o que travou e o que muda na fase seguinte.
- **Regra de execução.** Sem commit, o dia não conta.

O quadro das 16 semanas está no [cronograma](cronograma.md).

## Stack

Decisões e motivos em [Tech Stack](tech-stack.md).

- **Engenharia:** Trello, draw.io, Figma, Postman.
- **Back-end:** Java, Spring Boot, PostgreSQL, JPA, JUnit. Publicação no Railway.
- **Front-end:** React. Publicação no Cloudflare Pages.
- **Versionamento:** Git e GitHub.

## Status atual

Data de referência: 23/11/2026. Semana 3 de 16. Fase atual: Engenharia.

| Entrega | Situação |
| --- | --- |
| Tema, repositório e entrada no Acelera Hub | Feito (semana 1) |
| Tech stack | Feito (semana 2) |
| Console em Java | Ensaio de aprendizado. Não é a base do produto |
| Protótipo no Figma | Feito |
| Requisitos funcionais e não funcionais | Feito, versão 0.1, 49 RF e 11 RNF |
| Diagrama de fluxo | Feito. Inclui modal do bloco e histórico de horas do atributo |
| Cronograma de 4 meses | Feito. Semanas 1 e 2 fechadas. Na semana 3 faltam os ajustes do diagrama de classes |
| Diário de aprendizados | Em uso |
| Documentação inicial | Esta versão |
| Diagrama de classes no draw.io | Base feita: usuário, semana, bloco, atributo, hábito, hobby, caderno, divisória e nota. Ajustes ainda no draw.io |
| Trello com as sprints | Pendente (semana 4) |
| Retrospectiva do mês 1 | Pendente (semana 4) |
| README do repositório | Ainda é o texto padrão do Java no VS Code. A versão com o projeto entra na fase de finalização |

## Antes de codar o Spring Boot

A fase 2 começa em 07/12/2026. Até lá, a engenharia que ainda falta é esta:

1. Ajustar o diagrama de classes no draw.io. O núcleo já está desenhado. Falta: várias semanas com data de início e fim, meta semanal no atributo, preferências de perfil no usuário, um atributo por bloco, um atributo por hábito e por hobby, e um caderno por usuário.
2. Escrever as regras de negócio que os requisitos ainda não detalham: campos obrigatórios, conflito de horário, cálculo de consistência, o que acontece ao excluir um atributo que já tem hábitos ou blocos, e se bloco recorrente entra nesta entrega.
3. Decidir a aba de IA: casca vazia nesta versão ou fora do escopo.
4. Marcar no cronograma o que é entrega de 08/03 e o que é backlog. Os requisitos descrevem o produto inteiro. As sprints 5 a 14, como estão hoje, cobrem atributo, hábito, bloco e semana. Autenticação, hobby, caderno, dashboard e perfil precisam de um corte explícito: entram no prazo ou ficam para depois.
5. Montar o Trello com as sprints e fechar a retrospectiva do mês 1.

Sem o diagrama de classes alinhado e sem esse corte de escopo, migrar o console para Spring Boot repete o problema de codar antes de arquitetar.

## Histórico

| Versão | Data | Alteração |
| --- | --- | --- |
| 0.2 | 2026-11-23 | Documento completo: produto, metodologia, stack, status da semana 3 e pendências antes do back-end. |
| 0.3 | 2026-11-23 | Status do fluxo, do cronograma e do diagrama de classes alinhado ao que já foi feito. |
