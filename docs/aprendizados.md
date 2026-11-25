# Diário de Aprendizados — Projeto Orion

## String.isBlank()
Retorna `true` se a String for vazia ou só tiver espaços em branco.
Diferente de `.isEmpty()`, que não considera espaços.

```java
if (nome.isBlank()) // "   " → true
```

---

## throw new IllegalArgumentException
Lança uma exceção quando um argumento passado é inválido.
Usado para validar entradas de métodos.

```java
throw new IllegalArgumentException("Nome não pode ser vazio.");
```

---

## .equalsIgnoreCase()
Compara duas Strings ignorando diferença entre maiúsculas e minúsculas.

```java
"Java".equalsIgnoreCase("java") // → true
```

---

## .size()
Retorna o número de elementos de uma `List`.
Equivalente ao `.length` de arrays.

```java
lista.size() // → int com total de elementos
```

---

## removeIf() com lambda
Remove da lista todos os elementos que atendam a uma condição.

```java
this.habitos.removeIf(h -> h.getNome().equalsIgnoreCase(nome));
```

---

## .add()
Adiciona um elemento ao final de uma `List`.

```java
this.habitos.add(novoHabito);
```

---

## for-each com objeto próprio
Itera sobre uma lista de objetos de uma classe que você criou.

```java
for (Bloco bloco : semana.getListaBlocos()) {
    // bloco = cada elemento da lista
}
```

---

## StringBuilder + sb.append()
Monta Strings de forma eficiente, especialmente dentro de loops.
Mais performático do que concatenar com `+` repetidamente.
Sempre finalizar com `.toString()` para converter de volta para String.

```java
StringBuilder sb = new StringBuilder();
sb.append("Dia: " + bloco.getDiaDaSemana() + "\n");
sb.append("Ação: " + bloco.getAcao() + "\n");
return sb.toString();
```

---

## Expressão Lambda ( e -> )
O nome antes do `->` representa cada elemento da coleção sendo processada.
É um atalho para escrever lógica inline sem criar um método separado.
O nome pode ser qualquer coisa: `e`, `h`, `item`, `bloco` — só representa o elemento atual.

```java
lista.removeIf(item -> item.getNome().equals("x"));
//             ^^^^    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//          parâmetro         condição (corpo)
```
