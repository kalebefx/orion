# Diagrama de classes

Modelo de domínio do Orion, alinhado aos [requisitos](../requisitos.md) e às [regras de negócio](../regras-de-negocio.md).

- **Fonte editável:** [diagrama-de-classes.drawio](diagrama-de-classes.drawio). Abra em [app.diagrams.net](https://app.diagrams.net) com Arquivo → Abrir de → Dispositivo, ou no draw.io desktop.
- **Imagem:** exportada do `.drawio`. Quando o desenho mudar, exportar de novo em PNG e substituir o arquivo abaixo.

![Diagrama de classes do Orion](diagrama-de-classes.png)

## Classes

| Classe | Atributos |
| --- | --- |
| Usuario | nome, email, senha, foto, inicioSemana, aparencia, fusoHorario, lembretesAtivos |
| Atributo | nome, cor, metaHorasSemanais |
| Habito | nome, ativo |
| Hobby | nome, ativo |
| Bloco | acao, data, horaInicio, horaFim, descricao, concluido |
| Caderno | (agrupa as divisórias) |
| Divisoria | nome, posicao |
| Nota | titulo, conteudo, dataCriacao, dataAtualizacao |

`DiaSemana` é a enumeração SEGUNDA a DOMINGO, usada em `Usuario.inicioSemana`. `Aparencia` é CLARO ou ESCURO.

## Relações

| Relação | Multiplicidade | Regra |
| --- | --- | --- |
| Usuario possui Atributo, Habito, Hobby e Bloco | 1 → 0..* | RN01 |
| Usuario possui Caderno (composição) | 1 → 1 | RN29 |
| Habito ↔ Atributo | 0..* ↔ 0..* | RN13 |
| Hobby ↔ Atributo | 0..* ↔ 0..* | RN13 |
| Hobby origina Habito | 0..1 → 0..* | RN17 |
| Bloco → Habito | 0..* → 0..1 | RN22 |
| Bloco ↔ Atributo | 0..* ↔ 0..* | RN22, RN23 |
| Caderno contém Divisoria (composição) | 1 → 1..* | RN30 |
| Divisoria contém Nota (composição) | 1 → 0..* | RN31 |

## Decisões de modelagem

- **Não existe classe Semana.** O bloco tem uma **data**. A semana é só a forma de mostrar 7 dias a partir do dia de início escolhido no perfil. No front, a grade semanal continua igual: arrastar um bloco para outro dia troca a data dele (RN18, RN24).
- **Hobby não entra no bloco.** Ele vira hábito ("Violão" → "Praticar violão"), e o hábito vai para a semana (RN17).
- **Ao escolher um hábito no bloco, os atributos do hábito entram no bloco** automaticamente, e a pessoa pode adicionar outros (RN23).
- **`concluido` no bloco** alimenta o tempo feito e a consistência do dashboard (RN25–RN28, RN37).
- **O tempo do bloco conta inteiro para cada atributo dele.** Um bloco de 1h com Social e Físico soma 1h em cada um (RN25).
- O dashboard não é classe: tempo e consistência são cálculos sobre os blocos.
- Bloco recorrente fica fora desta versão.

A tradução para tabelas está em [modelo-de-dados.md](modelo-de-dados.md).

## Histórico

| Versão | Data | Alteração |
| --- | --- | --- |
| 1 | 2026-11-24 | Primeira versão no draw.io, com Semana, hábito e hobby ligados a um atributo só |
| 2 | 2026-11-24 | Semana removida e data no bloco. Hábito e hobby com 0..* atributos. Hobby origina hábito. `concluido` no bloco. Divisória com posição. Nota com data de atualização |
