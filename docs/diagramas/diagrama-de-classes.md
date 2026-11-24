# Diagrama de classes

Modelo do Orion alinhado aos [requisitos](../requisitos.md): usuário, semana, bloco, atributo, hábito, hobby e caderno. A imagem é a exportação do draw.io.

![Diagrama de classes do Orion](diagrama-de-classes.png)

## Classes

| Classe | Atributos |
| --- | --- |
| Usuario | nome, email, senha, foto |
| Semana | listaBlocos |
| Bloco | acao, atributos, horaInicio, horaFim, diaSemana, descricao, recorrente |
| Atributo | nome, cor |
| Habito | nome, ativo |
| Hobby | nome, ativo |
| Caderno | divisorias |
| Divisoria | nome, notas |
| Nota | titulo, conteudo, dataCriacao |

`DiaSemana` é uma enumeração: segunda, terça, quarta, quinta, sexta, sábado e domingo.

## Relações

- Um usuário possui vários hobbies, vários hábitos, um ou mais atributos e um ou mais cadernos.
- Um usuário possui uma semana. A semana organiza os blocos.
- Um bloco referencia no máximo um hábito e usa atributos.
- Hábito e hobby se vinculam a atributos.
- Um caderno contém uma ou mais divisórias. Cada divisória contém as suas notas.

O dashboard não é classe. Tempo total, tempo por atributo e consistência são contas em cima dos blocos.

Meta semanal, início da semana, aparência, fuso horário e lembretes estão nos requisitos de perfil e ainda não aparecem neste desenho.
