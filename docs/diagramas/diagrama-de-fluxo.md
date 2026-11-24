# Diagrama de fluxo

Fluxo do produto descrito em [requisitos.md](../requisitos.md) e nas telas da [documentação inicial](../documentacao-inicial.md). Cada pessoa autenticada só percorre o próprio conjunto de dados.

```mermaid
flowchart TD
  inicio([Abrir o Orion]) --> sessao{Sessão ativa?}
  sessao -->|Não| entrada[Cadastrar, entrar ou recuperar senha]
  entrada --> area[Área do usuário]
  sessao -->|Sim| area
  area --> escolha{Aba}
  escolha --> semana[Minha Semana]
  escolha --> dashboard[Dashboard]
  escolha --> atributos[Atributos]
  escolha --> habitos[Hábitos]
  escolha --> hobby[Hobby]
  escolha --> caderno[Caderno]
  escolha --> perfil[Perfil]
  escolha --> sair([Logout])

  semana --> semanaAcoes[Criar, editar, excluir ou arrastar bloco]
  semana --> semanaVista[Trocar a semana e filtrar por atributo ou hábito]
  semana --> detalheBloco[Abrir o modal de detalhes do bloco]
  dashboard --> mes[Trocar o mês]
  mes --> stats[Tempo total, tempo por atributo e consistência]
  stats --> detalheAtributo[Histórico de horas do atributo por semana]
  atributos --> atributosAcoes[Adicionar, editar ou excluir atributo]
  atributos --> detalheAtributo
  habitos --> habitosAcoes[Adicionar, editar, excluir, ativar ou desativar hábito]
  hobby --> hobbyAcoes[Adicionar, editar, excluir, ativar ou desativar hobby]
  caderno --> cadernoNav[Abrir o caderno e navegar nas divisórias]
  cadernoNav --> cadernoNotas[Criar, editar ou excluir nota e divisória]
  perfil --> perfilDados[Ver e editar nome, e-mail, foto e metas]
  perfilDados --> perfilPrefs[Início da semana, aparência, fuso e lembretes]
  perfilPrefs --> perfilSalvar[Salvar o perfil]
```

A aba de IA não entra neste fluxo. Ela ainda não tem requisito funcional.

| Trecho | Requisitos |
| --- | --- |
| Entrada e sessão | RF01–RF05 |
| Minha Semana | RF06–RF12 |
| Modal de detalhes do bloco | RF06–RF09 |
| Dashboard | RF13–RF16 |
| Histórico do atributo | RF16, RF44 |
| Atributos | RF17–RF20 |
| Hábitos | RF21–RF26 |
| Hobby | RF27–RF32 |
| Caderno | RF33–RF39 |
| Perfil | RF40–RF49 |
