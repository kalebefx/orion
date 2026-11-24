# Diagrama de classes

Modelo do Orion alinhado aos [requisitos](../requisitos.md). A imagem é a exportação do draw.io. Quando o desenho mudar, a exportação substitui este arquivo e o texto abaixo acompanha.

![Diagrama de classes do Orion](diagrama-de-classes.png)

## Classes

| Classe | Atributos |
| --- | --- |
| Usuario | nome, email, senha, foto, inicioSemana, aparencia, fusoHorario, lembretesAtivos |
| Semana | listaBlocos, dataInicio, dataFim |
| Bloco | acao, horaInicio, horaFim, diaSemana, descricao |
| Atributo | nome, cor, metasHorasSemanais |
| Habito | nome, ativo |
| Hobby | nome, ativo |
| Caderno | divisorias |
| Divisoria | nome, notas |
| Nota | titulo, conteudo, dataCriacao |

`DiaSemana` é a enumeração segunda, terça, quarta, quinta, sexta, sábado e domingo. `Aparencia` é claro ou escuro.

## Relações

- Um usuário possui zero ou mais hobbies, hábitos, atributos e semanas, e possui um caderno.
- Uma semana organiza zero ou mais blocos e tem data de início e de fim.
- Um bloco usa zero ou mais atributos e referencia no máximo um hábito.
- Hábito e hobby se vinculam a um atributo. Hobby não entra no bloco.
- Um caderno contém uma ou mais divisórias. Cada divisória contém zero ou mais notas.

O tempo do bloco conta inteiro para cada atributo ligado a ele. Um bloco de uma hora com Social e Físico soma uma hora em Social e uma hora em Físico.

O dashboard não é classe. Tempo total, tempo por atributo e consistência são contas em cima dos blocos e da meta do atributo.

Bloco recorrente ficou de fora desta versão do desenho.
