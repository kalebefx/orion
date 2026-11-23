# Orion — Requisitos

Documento de apoio do Orion: o que o sistema deve fazer e sob quais condições de qualidade. A lista é viva. Os itens podem mudar conforme o produto e a implementação evoluem. O identificador de cada requisito permanece estável; o que muda é o texto, a prioridade ou o status.

| Campo | Valor |
| --- | --- |
| Projeto | Orion |
| Documento | Requisitos funcionais e não funcionais |
| Versão | 0.1 |
| Status | Rascunho de apoio |
| Origem | Lista elaborada a partir do produto pretendido (semana com blocos, atributos, hábitos, hobbies, caderno e uso por várias pessoas) |

## 1. Objetivo

Registrar, de forma rastreável, o comportamento esperado do Orion e as qualidades que esse comportamento precisa sustentar. Este documento orienta modelagem, implementação e testes. Ele não substitui regras de negócio ainda não escritas (campos obrigatórios, conflitos de horário, cálculo de consistência e efeitos de exclusão).

## 2. Escopo

O Orion é um sistema de gestão de rotina pessoal. Cada pessoa autenticada organiza a própria semana em blocos, acompanha o mês no dashboard e mantém atributos, hábitos, hobbies, caderno e perfil.

Entram neste escopo:

- autenticação e sessão;
- abas Minha Semana, Dashboard, Atributos, Hábitos, Hobby, Caderno e Perfil;
- isolamento dos dados por usuário;
- uso em navegador, em desktop e em tela pequena.

Ficam de fora até serem especificados à parte: painel administrativo, compartilhamento de rotina entre usuários, integração com calendários externos e aplicativo nativo.

## 3. Como ler

- **RF** — requisito funcional. Descreve uma capacidade que o usuário exerce.
- **RNF** — requisito não funcional. Descreve uma qualidade do sistema (uso, desempenho, segurança, operação).
- O identificador (RF01, RNF03) é a referência estável. Não reutilizar um identificador para outro assunto.
- Itens ainda sem regra detalhada continuam válidos como capacidade. A regra entra depois, no mesmo identificador ou num requisito novo, sem apagar o histórico.

## 4. Requisitos funcionais

49 requisitos, agrupados pela área do produto.

### 4.1 Autenticação

| ID | Requisito |
| --- | --- |
| RF01 | Cadastrar novo usuário (nome, e-mail, senha) |
| RF02 | Fazer login |
| RF03 | Fazer logout |
| RF04 | Recuperar senha |
| RF05 | Manter usuário logado / sessão |

### 4.2 Aba Minha Semana

| ID | Requisito |
| --- | --- |
| RF06 | Acessar aba Minha Semana |
| RF07 | Criar novo bloco |
| RF08 | Editar bloco |
| RF09 | Excluir bloco |
| RF10 | Alterar semana |
| RF11 | Realocar bloco arrastando com o mouse (drag and drop) para outro dia / horário |
| RF12 | Filtrar visualização por atributo e por hábito |

### 4.3 Aba Dashboard

| ID | Requisito |
| --- | --- |
| RF13 | Acessar aba Dashboard |
| RF14 | Alterar mês na aba Dashboard |
| RF15 | Atualizar estatísticas conforme o mês selecionado |
| RF16 | Visualizar tempo total, tempo por atributo e consistência |

### 4.4 Aba Atributos

| ID | Requisito |
| --- | --- |
| RF17 | Acessar aba Atributos |
| RF18 | Adicionar atributo |
| RF19 | Editar atributo |
| RF20 | Excluir atributo |

### 4.5 Aba Hábitos

| ID | Requisito |
| --- | --- |
| RF21 | Acessar aba Hábitos |
| RF22 | Adicionar hábito |
| RF23 | Editar hábito |
| RF24 | Excluir hábito |
| RF25 | Ativar hábito |
| RF26 | Desativar hábito |

### 4.6 Aba Hobby

| ID | Requisito |
| --- | --- |
| RF27 | Acessar aba Hobby |
| RF28 | Adicionar hobby |
| RF29 | Editar hobby |
| RF30 | Excluir hobby |
| RF31 | Ativar hobby |
| RF32 | Desativar hobby |

### 4.7 Aba Caderno

| ID | Requisito |
| --- | --- |
| RF33 | Acessar aba Caderno |
| RF34 | Abrir caderno |
| RF35 | Criar nova nota no caderno |
| RF36 | Editar nota no caderno |
| RF37 | Criar nova divisória no caderno |
| RF38 | Navegar entre as divisórias do caderno |
| RF39 | Excluir divisória / nota |

### 4.8 Aba Perfil

| ID | Requisito |
| --- | --- |
| RF40 | Acessar aba Perfil |
| RF41 | Visualizar informações pessoais (nome, e-mail, foto) |
| RF42 | Editar informações pessoais |
| RF43 | Alterar foto de perfil |
| RF44 | Definir metas semanais por atributo |
| RF45 | Configurar início da semana |
| RF46 | Configurar aparência (Claro / Escuro) |
| RF47 | Configurar fuso horário |
| RF48 | Configurar lembretes |
| RF49 | Salvar alterações do perfil |

## 5. Requisitos não funcionais

11 requisitos. Onde a lista original não fixa número, meta ou ferramenta, o texto permanece como está. Detalhar a métrica é decisão posterior, não parte desta versão.

| ID | Categoria | Requisito |
| --- | --- | --- |
| RNF01 | Usabilidade | A interface deve ser intuitiva e fácil de usar, permitindo que o usuário crie, edite e arraste blocos na semana sem precisar de treinamento. |
| RNF02 | Desempenho | O sistema deve carregar as telas em até 2 segundos e responder às ações do usuário (criar bloco, trocar de mês, trocar de divisória) sem travamentos, mesmo com grande quantidade de blocos e notas. |
| RNF03 | Segurança | As senhas dos usuários devem ser armazenadas de forma criptografada e cada usuário só deve ter acesso aos seus próprios dados (seus blocos, hábitos, hobbies e caderno). |
| RNF04 | Compatibilidade | O sistema deve funcionar nos principais navegadores (Chrome, Edge, Firefox e Safari), tanto em desktop quanto em dispositivos móveis. |
| RNF05 | Disponibilidade | O sistema deve estar disponível 24 horas por dia, 7 dias por semana, com o mínimo de tempo de inatividade possível. |
| RNF06 | Escalabilidade | O sistema deve suportar o aumento no número de usuários e na quantidade de dados (blocos, notas, hábitos) sem perda de desempenho. |
| RNF07 | Confiabilidade / persistência | Os dados do usuário devem ser salvos automaticamente e não podem ser perdidos ao atualizar a página, fechar a aba ou em caso de falha momentânea. |
| RNF08 | Responsividade | A interface deve se adaptar automaticamente a diferentes tamanhos de tela, funcionando corretamente em desktop, tablet e celular. |
| RNF09 | Manutenibilidade | O código deve ser organizado em componentes e seguir uma arquitetura limpa, facilitando futuras manutenções, correções e adição de novas funcionalidades. |
| RNF10 | Backup | O sistema deve realizar backup periódico dos dados para evitar perda de informações em caso de falha no servidor ou no banco de dados. |
| RNF11 | Acessibilidade | A interface deve possuir contraste adequado, tamanhos de fonte legíveis e permitir navegação por teclado, facilitando o uso por pessoas com diferentes necessidades. |

## 6. Contagem

| Tipo | Quantidade |
| --- | --- |
| Requisitos funcionais | 49 (RF01–RF49) |
| Requisitos não funcionais | 11 (RNF01–RNF11) |
| Total | 60 |

## 7. Diagramas

| Diagrama | Onde está | Situação |
| --- | --- | --- |
| Fluxo do produto | [diagrama-de-fluxo.md](diagramas/diagrama-de-fluxo.md) | Desenhado a partir desta lista de requisitos |
| Classes | [diagrama-de-classes.md](diagramas/diagrama-de-classes.md) | Desenho do draw.io desatualizado; a correção é manual |

## 8. Histórico

| Versão | Data | Alteração |
| --- | --- | --- |
| 0.1 | 2026-11-23 | Registro inicial da lista completa de requisitos funcionais e não funcionais. |
| 0.1 | 2026-11-23 | Ligação com o diagrama de fluxo e com o diagrama de classes. |
