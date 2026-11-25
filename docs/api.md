# Orion — Contrato da API REST

Primeira versão do contrato. Ele é definido antes do código, para que back e front sigam o mesmo combinado. Depois da S05, a referência viva passa a ser o Swagger (`/swagger-ui.html`), e este arquivo é atualizado junto com ele.

Status: **proposta alinhada ao diagrama de classes v2, validar na S04**.

## Convenções

- Base: `/api/v1`. JSON em UTF-8. Campos em camelCase.
- Autenticação: header `Authorization: Bearer <token>` em todas as rotas, exceto `/auth/*` e `/health`.
- Datas em ISO 8601: `2026-12-07`, `09:30`, `2026-12-07T19:30:00-03:00`.
- Listas grandes são paginadas: `?page=0&size=20`.
- Erros seguem o formato Problem Details (RFC 9457):

```json
{
  "type": "about:blank",
  "title": "Conflito de horário",
  "status": 409,
  "detail": "O bloco se sobrepõe a 'Estudar Java' (19:30–21:00).",
  "regra": "RN21"
}
```

| Status | Quando |
| --- | --- |
| 200 / 201 / 204 | Sucesso (leitura, criação, sem corpo) |
| 400 | Dados inválidos (validação de campos) |
| 401 | Sem token, ou token inválido ou vencido |
| 404 | Não existe, ou pertence a outro usuário (RN01) |
| 409 | Viola uma regra de negócio: nome duplicado, conflito de horário, concluir bloco que ainda não começou |

## Endpoints

### Autenticação — S06

| Método | Rota | Descrição | RF |
| --- | --- | --- | --- |
| POST | `/auth/cadastro` | Cria o usuário, o perfil e o caderno | RF01 |
| POST | `/auth/login` | Devolve `{ token, expiraEm }` | RF02, RF05 |
| GET | `/health` | Saúde da API, para o deploy e o monitor | RNF05 |

O logout (RF03) é feito no front, apagando o token (RN07).

### Perfil — S07

| Método | Rota | Descrição | RF |
| --- | --- | --- | --- |
| GET | `/perfil` | Dados e preferências do usuário logado | RF41 |
| PUT | `/perfil` | Atualiza nome, e-mail e preferências | RF42, RF45–RF49 |

### Atributos — S05

| Método | Rota | Descrição | RF |
| --- | --- | --- | --- |
| GET | `/atributos` | Lista os atributos | RF17 |
| POST | `/atributos` | Cria `{ nome, cor, metaHorasSemanais }` | RF18 |
| GET | `/atributos/{id}` | Detalhe, com a contagem de hábitos, hobbies e blocos ligados (usada na confirmação da RN12) | RF17 |
| PUT | `/atributos/{id}` | Edita, inclusive a meta | RF19, RF44 |
| DELETE | `/atributos/{id}` | Exclui e remove os vínculos (RN12). Responde 204 | RF20 |

### Hábitos — S06 · Hobbies — S07

Mesmas rotas para `/habitos` e `/hobbies`.

| Método | Rota | Descrição | RF |
| --- | --- | --- | --- |
| GET | `/habitos?ativo=true` | Lista, com filtro opcional | RF21, RF27 |
| POST | `/habitos` | Cria `{ nome, atributoIds[] }` | RF22, RF28 |
| PUT | `/habitos/{id}` | Edita nome e atributos | RF23, RF29 |
| DELETE | `/habitos/{id}` | Exclui | RF24, RF30 |
| PATCH | `/habitos/{id}/ativo` | `{ ativo: true \| false }` | RF25, RF26, RF31, RF32 |
| POST | `/hobbies/{id}/habitos` | Cria um hábito a partir do hobby `{ nome }`, copiando os atributos do hobby (RN17) | RF51 |

O hábito devolve também `hobbyOrigem: { id, nome } \| null`.

### Blocos — S08

A semana não é um recurso. O front pede os blocos do intervalo de datas que está mostrando (RN18).

| Método | Rota | Descrição | RF |
| --- | --- | --- | --- |
| GET | `/blocos?de=2026-12-07&ate=2026-12-13` | Blocos do intervalo. Filtros opcionais: `atributoId`, `habitoId` | RF06, RF10, RF12 |
| POST | `/blocos` | Cria `{ acao, data, horaInicio, horaFim, descricao, atributoIds[], habitoId }` | RF07 |
| GET | `/blocos/{id}` | Detalhe, usado no modal | RF06 |
| PUT | `/blocos/{id}` | Edita, inclusive data e horário no drag and drop | RF08, RF11 |
| DELETE | `/blocos/{id}` | Exclui | RF09 |
| PATCH | `/blocos/{id}/concluido` | `{ concluido: true \| false }` (RN37) | RF50 |

### Estatísticas — S09

| Método | Rota | Descrição | RF |
| --- | --- | --- | --- |
| GET | `/estatisticas/mes?ano=2027&mes=1` | Tempo feito e planejado (total e por atributo) e consistência (geral e por atributo) | RF14–RF16 |
| GET | `/estatisticas/atributos/{id}/semanas?de=2026-12-07&ate=2027-03-07` | Tempo feito, tempo planejado e meta, por semana | RF16, RF44 |

### Caderno — S09

| Método | Rota | Descrição | RF |
| --- | --- | --- | --- |
| GET | `/caderno/divisorias` | Lista as divisórias, em ordem | RF34, RF38 |
| POST | `/caderno/divisorias` | Cria `{ nome }` | RF37 |
| PUT | `/caderno/divisorias/{id}` | Renomeia ou muda a posição | RF37 |
| DELETE | `/caderno/divisorias/{id}` | Exclui junto com as notas (RN31) | RF39 |
| GET | `/caderno/divisorias/{id}/notas` | Lista as notas, paginada | RF38 |
| POST | `/caderno/divisorias/{id}/notas` | Cria `{ titulo, conteudo }` | RF35 |
| PUT | `/notas/{id}` | Edita | RF36 |
| DELETE | `/notas/{id}` | Exclui | RF39 |
