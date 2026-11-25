# Orion — Requisitos

Documento de apoio do Orion: o que o sistema deve fazer e sob quais condições de qualidade. A lista é viva. Os itens podem mudar conforme o produto e a implementação evoluem. O identificador de cada requisito permanece estável; o que muda é o texto, a prioridade ou o status.

| Campo | Valor |
| --- | --- |
| Projeto | Orion |
| Documento | Requisitos funcionais e não funcionais |
| Versão | 0.3 |
| Status | Base da v1.0.0 |
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

Ficam de fora até serem especificados à parte (Won't nesta versão): painel administrativo, compartilhamento de rotina entre usuários, integração com calendários externos, aplicativo nativo, aba de IA, bloco recorrente e janela flutuante do caderno.

## 3. Como ler

- **RF** — requisito funcional. Descreve uma capacidade que o usuário exerce.
- **RNF** — requisito não funcional. Descreve uma qualidade do sistema (uso, desempenho, segurança, operação).
- O identificador (RF01, RNF03) é a referência estável. Não reutilizar um identificador para outro assunto.
- Itens ainda sem regra detalhada continuam válidos como capacidade. A regra entra depois, no mesmo identificador ou num requisito novo, sem apagar o histórico.
- As regras que detalham cada requisito estão em [regras-de-negocio.md](regras-de-negocio.md) (RN01, RN02...).
- **Prioridade (MoSCoW)** para a release v1.0.0 (previsão em 22/02/2027, prazo final em 08/03/2027):
  - **Must**: sem isso o produto não é entregue.
  - **Should**: faz parte da v1.0.0, mas é o primeiro a ser cortado se o prazo apertar. O corte é registrado na review da sprint.
  - **Could**: só entra se sobrar tempo. Não tem sprint reservada.
  - **Won't (nesta versão)**: listado na seção 2, fora do escopo.
- **Back** e **Front** indicam a sprint do [cronograma](cronograma.md) em que o requisito é implementado em cada camada.

## 4. Requisitos funcionais

51 requisitos, agrupados pela área do produto. RF50 e RF51 entraram na versão 0.3 e ficam junto da sua área, sem renumerar os outros.

### 4.1 Autenticação

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF01 | Cadastrar novo usuário (nome, e-mail, senha) | Must | S06 | S10 |
| RF02 | Fazer login | Must | S06 | S10 |
| RF03 | Fazer logout | Must | S06 | S10 |
| RF04 | Recuperar senha | Could | — | — |
| RF05 | Manter usuário logado / sessão | Must | S06 | S10 |

### 4.2 Aba Minha Semana

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF06 | Acessar aba Minha Semana | Must | S08 | S12 |
| RF07 | Criar novo bloco | Must | S08 | S12 |
| RF08 | Editar bloco | Must | S08 | S12 |
| RF09 | Excluir bloco | Must | S08 | S12 |
| RF10 | Alterar semana | Must | S08 | S12 |
| RF11 | Realocar bloco arrastando com o mouse (drag and drop) para outro dia / horário | Should | S08 | S14 |
| RF12 | Filtrar visualização por atributo e por hábito | Should | S08 | S12 |
| RF50 | Marcar e desmarcar bloco como concluído | Must | S08 | S12 |

### 4.3 Aba Dashboard

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF13 | Acessar aba Dashboard | Must | S09 | S13 |
| RF14 | Alterar mês na aba Dashboard | Must | S09 | S13 |
| RF15 | Atualizar estatísticas conforme o mês selecionado | Must | S09 | S13 |
| RF16 | Visualizar tempo total, tempo por atributo e consistência | Must | S09 | S13 |

### 4.4 Aba Atributos

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF17 | Acessar aba Atributos | Must | S05 | S11 |
| RF18 | Adicionar atributo | Must | S05 | S11 |
| RF19 | Editar atributo | Must | S05 | S11 |
| RF20 | Excluir atributo | Must | S05 | S11 |

### 4.5 Aba Hábitos

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF21 | Acessar aba Hábitos | Must | S06 | S11 |
| RF22 | Adicionar hábito | Must | S06 | S11 |
| RF23 | Editar hábito | Must | S06 | S11 |
| RF24 | Excluir hábito | Must | S06 | S11 |
| RF25 | Ativar hábito | Must | S06 | S11 |
| RF26 | Desativar hábito | Must | S06 | S11 |

### 4.6 Aba Hobby

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF27 | Acessar aba Hobby | Should | S07 | S11 |
| RF28 | Adicionar hobby | Should | S07 | S11 |
| RF29 | Editar hobby | Should | S07 | S11 |
| RF30 | Excluir hobby | Should | S07 | S11 |
| RF31 | Ativar hobby | Should | S07 | S11 |
| RF32 | Desativar hobby | Should | S07 | S11 |
| RF51 | Criar hábito a partir de um hobby | Should | S07 | S11 |

### 4.7 Aba Caderno

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF33 | Acessar aba Caderno | Should | S09 | S14 |
| RF34 | Abrir caderno | Should | S09 | S14 |
| RF35 | Criar nova nota no caderno | Should | S09 | S14 |
| RF36 | Editar nota no caderno | Should | S09 | S14 |
| RF37 | Criar nova divisória no caderno | Should | S09 | S14 |
| RF38 | Navegar entre as divisórias do caderno | Should | S09 | S14 |
| RF39 | Excluir divisória / nota | Should | S09 | S14 |

### 4.8 Aba Perfil

| ID | Requisito | Prioridade | Back | Front |
| --- | --- | --- | --- | --- |
| RF40 | Acessar aba Perfil | Should | S07 | S13 |
| RF41 | Visualizar informações pessoais (nome, e-mail, foto) | Should | S07 | S13 |
| RF42 | Editar informações pessoais | Should | S07 | S13 |
| RF43 | Alterar foto de perfil | Could | — | — |
| RF44 | Definir metas semanais por atributo | Must | S07 | S13 |
| RF45 | Configurar início da semana | Should | S07 | S13 |
| RF46 | Configurar aparência (Claro / Escuro) | Should | S07 | S13 |
| RF47 | Configurar fuso horário | Should | S07 | S13 |
| RF48 | Configurar lembretes | Could | S07 (só a preferência) | S13 (só a preferência) |
| RF49 | Salvar alterações do perfil | Should | S07 | S13 |

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

### 5.1 Como cada RNF é atendido e verificado

| ID | Como atender | Como verificar | Sprint |
| --- | --- | --- | --- |
| RNF01 | Seguir o protótipo do Figma | Teste de uso ponta a ponta | S15 |
| RNF02 | Paginação nas listas grandes, índices no banco | Lighthouse e aba Network do navegador | S15 |
| RNF03 | BCrypt nas senhas, JWT, filtro por usuário em toda consulta | Testes de integração tentando acessar dado de outro usuário | S06 |
| RNF04 | Front sem APIs exclusivas de um navegador | Teste manual em Chrome, Edge, Firefox e Safari (iOS) | S15 |
| RNF05 | Hospedagem gerenciada (Railway e Cloudflare) | Monitor de uptime gratuito no endpoint de saúde | S15 |
| RNF06 | API sem estado (JWT), consultas paginadas | Revisão de código | S09 |
| RNF07 | Toda alteração salva na hora pela API | Recarregar a página após cada ação no QA | S15 |
| RNF08 | Layout responsivo desde a S10 | Teste em celular real e no modo responsivo do navegador | S15 |
| RNF09 | Camadas controller, service e repository. Componentes no front | CI verde, revisão no PR | Todas |
| RNF10 | Backup do PostgreSQL no Railway | Restaurar um backup de teste | S15 |
| RNF11 | Contraste, rótulos e navegação por teclado | Lighthouse (acessibilidade) e teste só com teclado | S15 |

## 6. Contagem

| Tipo | Quantidade |
| --- | --- |
| Requisitos funcionais | 51 (RF01–RF51) |
| Requisitos não funcionais | 11 (RNF01–RNF11) |
| Total | 62 |

## 7. Diagramas

| Diagrama | Onde está | Situação |
| --- | --- | --- |
| Fluxo do produto | [diagrama-de-fluxo.md](diagramas/diagrama-de-fluxo.md) (draw.io) | v2: inclui bloco concluído (RF50) e hábito a partir de hobby (RF51) |
| Classes | [diagrama-de-classes.md](diagramas/diagrama-de-classes.md) (draw.io) | v2: bloco com data (sem classe Semana), hábito e hobby com 0..* atributos, hobby origina hábito, bloco concluído |
| Modelo de dados | [modelo-de-dados.md](diagramas/modelo-de-dados.md) | Tabelas derivadas do diagrama de classes v2 |

## 8. Histórico

| Versão | Data | Alteração |
| --- | --- | --- |
| 0.1 | 2026-11-23 | Registro inicial da lista completa de requisitos funcionais e não funcionais. |
| 0.1 | 2026-11-23 | Ligação com o diagrama de fluxo e com o diagrama de classes. |
| 0.1 | 2026-11-23 | Situação dos diagramas: fluxo com modal do bloco e histórico do atributo; classes com ajustes manuais pendentes. |
| 0.1 | 2026-11-24 | Diagrama de classes alinhado: semanas com data, meta, perfil e bloco com zero ou mais atributos. |
| 0.2 | 2026-11-24 | Prioridade MoSCoW e sprint de back e front em cada RF. Aba de IA e bloco recorrente formalmente fora da v1.0.0. Ligação com as regras de negócio. |
| 0.3 | 2026-11-24 | RF50 (bloco concluído) e RF51 (hábito a partir de hobby). Regras validadas: semana como visualização, hábito e hobby com vários atributos. Diagramas no draw.io. |
