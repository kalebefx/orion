# Orion — Regras de negócio

Detalha o comportamento dos [requisitos](requisitos.md). Cada regra tem um identificador estável (RN01, RN02...). Os testes automáticos do back-end citam o RN que verificam, por exemplo `deveRecusarBlocoSobreposto_RN21`.

| Campo | Valor |
| --- | --- |
| Versão | 0.2 |
| Status | **Validado em 24/11/2026** |
| Atualizado em | 2026-11-24 |

Se uma decisão mudar, o texto é corrigido aqui antes de virar código, e o histórico registra a mudança.

## 1. Gerais

| ID | Regra | RF |
| --- | --- | --- |
| RN01 | Todo dado pertence a um usuário. Uma pessoa só lê e altera os próprios dados. Pedir um recurso de outro usuário responde **404**, como se ele não existisse. | RNF03 |
| RN02 | Textos obrigatórios não aceitam vazio nem só espaços. Espaços no começo e no fim são removidos antes de salvar. | Todos |
| RN03 | Unicidade de nome é sempre por usuário e ignora maiúsculas e minúsculas ("Saúde" = "saúde"). | RF18, RF22, RF28, RF37 |

## 2. Conta e sessão

| ID | Regra | RF |
| --- | --- | --- |
| RN04 | Cadastro exige nome (2 a 80 caracteres), e-mail válido e senha. O e-mail é único no sistema. | RF01 |
| RN05 | Senha com no mínimo 8 caracteres, contendo pelo menos uma letra e um número. É guardada só como hash BCrypt. | RF01, RNF03 |
| RN06 | Login devolve um token JWT válido por 24 horas. Erro de login sempre responde "e-mail ou senha inválidos", sem dizer qual dos dois errou. | RF02, RF05 |
| RN07 | Logout apaga o token no navegador. Token vencido leva de volta à tela de login. | RF03, RF05 |
| RN08 | Ao cadastrar, o sistema cria junto o perfil com valores padrão (RN33) e o caderno com a divisória "Geral" (RN29). | RF01 |

## 3. Atributos

| ID | Regra | RF |
| --- | --- | --- |
| RN09 | Nome obrigatório, de 1 a 40 caracteres, único por usuário. | RF18, RF19 |
| RN10 | Cor no formato `#RRGGBB`. Se não for informada, o sistema escolhe uma da paleta padrão. | RF18 |
| RN11 | Meta semanal opcional, de 0 a 168 horas, em passos de 30 minutos. Meta 0 ou vazia significa "sem meta". | RF44 |
| RN12 | Um atributo pode ser excluído **a qualquer momento**. Ele é removido dos hábitos, dos hobbies e dos blocos que o usavam, e nenhum desses é apagado. Antes de excluir, o front mostra quantos hábitos, hobbies e blocos perdem o vínculo e pede confirmação. | RF20 |

## 4. Hábitos e hobbies

| ID | Regra | RF |
| --- | --- | --- |
| RN13 | Hábito e hobby têm nome obrigatório (1 a 60 caracteres), único por usuário dentro do tipo, e **zero ou vários atributos**. | RF22, RF23, RF28, RF29 |
| RN14 | Todo hábito e hobby nasce ativo. | RF22, RF28 |
| RN15 | Hábito desativado não aparece na lista para novos blocos. Blocos antigos mantêm o vínculo e continuam contando nas estatísticas. Hobby desativado não pode originar hábitos novos. | RF25, RF26, RF31, RF32 |
| RN16 | Excluir um hábito remove o vínculo dos blocos que o usavam. Os blocos e os atributos deles continuam existindo. | RF24 |
| RN17 | Hobby **não entra no bloco**. Um hobby pode **originar vários hábitos** (ex.: "Violão" → "Praticar violão" e "Aula de violão"). O hábito criado a partir de um hobby nasce com **uma cópia dos atributos do hobby**, que podem ser editados depois, e guarda o hobby de origem. Excluir o hobby mantém os hábitos, que só perdem a referência de origem. | RF51, RF30 |

## 5. Blocos e semana

| ID | Regra | RF |
| --- | --- | --- |
| RN18 | O bloco tem uma **data**. A semana não é guardada: ela é a visualização de 7 dias a partir do dia de início configurado no perfil (padrão: segunda). Trocar de semana é só mudar o intervalo de datas exibido. | RF06, RF10 |
| RN19 | Ação obrigatória, de 1 a 80 caracteres. Descrição opcional, até 500 caracteres. Data obrigatória. | RF07, RF08 |
| RN20 | Horário em passos de 15 minutos. `horaFim` maior que `horaInicio`, na mesma data. Bloco não atravessa a meia-noite. | RF07, RF08 |
| RN21 | Blocos na mesma data não podem se sobrepor. Encostar é permitido: um termina às 10:00 e o outro começa às 10:00. Sobreposição responde **409**. | RF07, RF08, RF11 |
| RN22 | Um bloco tem zero ou mais atributos e no máximo um hábito. Só hábitos ativos podem ser escolhidos. | RF07 |
| RN23 | Ao escolher um hábito, **os atributos do hábito são adicionados** aos atributos do bloco. A pessoa pode adicionar outros ou tirar algum. | RF07 |
| RN24 | Arrastar um bloco na grade semanal (drag and drop) é uma edição de **data** e horário: valem RN20 e RN21. Se a nova posição for inválida, o bloco volta para onde estava e o motivo aparece na tela. | RF11 |
| RN37 | Todo bloco nasce **não concluído**. A pessoa marca ou desmarca "concluído" a qualquer momento, desde que o bloco **já tenha começado** (data e hora de início no passado, no fuso do perfil). | RF50 |

## 6. Estatísticas e metas

| ID | Regra | RF |
| --- | --- | --- |
| RN25 | A duração de um bloco conta **inteira para cada atributo** ligado a ele. Um bloco de 1h com Social e Físico soma 1h em Social e 1h em Físico. | RF16 |
| RN26 | **Tempo feito** é a soma das durações dos blocos **concluídos**. **Tempo planejado** é a soma das durações de **todos** os blocos. Os dois aparecem no total do período (contando cada bloco uma vez só, mesmo com vários atributos) e por atributo (aplicando a RN25). | RF15, RF16 |
| RN27 | Meta da semana atingida quando o **tempo feito** do atributo na semana é maior ou igual à meta. | RF44 |
| RN28 | **Consistência** = blocos concluídos ÷ blocos que já terminaram, no período, em porcentagem. Blocos futuros não entram. Aparece no geral e por atributo. Sem nenhum bloco terminado no período, mostra "sem dados" em vez de 0%. | RF15, RF16 |

## 7. Caderno

| ID | Regra | RF |
| --- | --- | --- |
| RN29 | Cada usuário tem exatamente um caderno, criado no cadastro, com a divisória "Geral". | RF33, RF34 |
| RN30 | Nome da divisória de 1 a 40 caracteres, único no caderno. A última divisória não pode ser excluída. | RF37, RF39 |
| RN31 | Excluir uma divisória exclui as notas dela. O front pede confirmação antes. | RF39 |
| RN32 | Nota com título obrigatório (até 120 caracteres) e conteúdo de até 50.000 caracteres. `dataCriacao` é preenchida pelo sistema, e `dataAtualizacao` muda a cada edição. | RF35, RF36 |

## 8. Perfil

| ID | Regra | RF |
| --- | --- | --- |
| RN33 | Perfil padrão: início da semana na segunda, aparência clara, fuso `America/Sao_Paulo`, lembretes desligados. | RF45–RF48 |
| RN34 | O e-mail pode ser trocado, desde que continue único (RN04). | RF42 |
| RN35 | Trocar o início da semana só muda a visualização da grade e o agrupamento por semana nas estatísticas. Nenhum bloco é alterado (RN18). | RF45 |
| RN36 | Aparência e fuso horário são aplicados assim que o perfil é salvo. | RF46, RF47, RF49 |

## Histórico

| Versão | Data | Alteração |
| --- | --- | --- |
| 0.1 | 2026-11-24 | Primeira proposta: campos obrigatórios, conflito de horário, consistência e efeitos de exclusão. |
| 0.2 | 2026-11-24 | Validação com o dono do produto. Atributo pode ser excluído sempre (RN12). Hábito e hobby com 0..* atributos (RN13). Hobby origina hábitos (RN17). Bloco com data no lugar de Semana (RN18, RN24, RN35). Bloco concluído só depois de começar (RN37). Tempo feito × planejado e consistência por blocos concluídos (RN26–RN28). |
