package com.kalebe.orion.ui;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Scanner;

import com.kalebe.orion.model.Atributo;
import com.kalebe.orion.model.Habito;
import com.kalebe.orion.service.OrionService;

public class Menu {
    private Scanner scanner = new Scanner(System.in);
    private OrionService orionService;

    public Menu(OrionService orionService) {
        this.orionService = orionService;
        this.scanner = new Scanner(System.in);
    }

    public OrionService getOrionService() {
        return this.orionService;
    }

    private void limparTela() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }

    boolean rodando = true;

    public void exibirMenu() {

        while (rodando) {
            limparTela();
            int escolha;
            System.out.println("""
                        1 : CRIAR ATRIBUTO
                        2 : EXCLUIR ATRIBUTO
                        3 : CRIAR HABITO
                        4 : EXCLUIR HABITO
                        5 : CRIAR BLOCO
                        6 : EXCLUIR BLOCO
                        7 : EDITAR BLOCO
                        8 : VER SEMANA
                        9 : VER TEMPO POR ATRIBUTO
                        10: SAIR

                    """);
            System.out.println("ESCOLHA UMA OPÇÃO");
            escolha = scanner.nextInt();
            scanner.nextLine();

            switch (escolha) {
                case 1:
                    System.out.println("Digite o nome do atributo: ");
                    String nomeAtributo = scanner.nextLine();
                    orionService.cadastrarAtributo(nomeAtributo);
                    break;

                case 2:
                    System.out.println(orionService.listarAtributos());
                    System.out.println("Digite o nome do atributo que quer excluir: ");
                    String exAtributo = scanner.nextLine();
                    orionService.excluirAtributo(exAtributo);
                    break;

                case 3:
                    System.out.println("Digite o nome do novo habito: ");
                    String nomeHabito = scanner.nextLine();
                    orionService.criarHabito(nomeHabito);
                    break;

                case 4:
                    System.out.println(orionService.listaHabito());
                    System.out.println("Digite o nome do habito para excluir: ");
                    String exHabito = scanner.nextLine();
                    orionService.excluirHabito(exHabito);
                    break;

                case 5:
                    System.out.println("Digite a nova ação: ");
                    String acao = scanner.nextLine();
                    System.out.println("Digite um atributo que queira adicionar: ");
                    String atributo = scanner.nextLine();
                    Atributo atributoObj = orionService.buscarAtributo(atributo);
                    ArrayList<Atributo> atributos = new ArrayList<>();
                    if(atributoObj != null) atributos.add(atributoObj);
                    System.out.println("Digite um habito que queira adicionar: ");
                    String habito = scanner.nextLine();
                    Habito habitoObj = orionService.buscarHabito(habito);
                    System.out.println("Digite as hora de inicio: ");
                    LocalTime horasInicio = LocalTime.parse(scanner.nextLine());
                    System.out.println("Digite as hora do fim: ");
                    LocalTime horasFinal = LocalTime.parse(scanner.nextLine());
                    System.out.println("Digite o dia da semana: ");
                    String diaDaSemana = scanner.nextLine();
                    System.out.println("Digite algo na descrição: ");
                    String descricao = scanner.nextLine();
                    orionService.criarBlocoCompleto(acao, atributos, habitoObj, horasInicio, horasFinal, diaDaSemana, descricao);
                    break;

                case 6:
                    System.out.println(orionService.visualizarSemana());
                    System.out.println("Digite o nome do bloco para excluir: ");
                    String exBloco = scanner.nextLine();
                    orionService.excluirBloco(exBloco);

                    break;

                case 7:
                    System.out.println(orionService.visualizarSemana());
                    System.out.println("Digite a ação do bloco que quer editar: ");
                    String blocoAtual = scanner.nextLine();
                    System.out.println("Digite o novo nome: ");
                    String blocoNovo = scanner.nextLine();
                    orionService.editarBloco(blocoAtual, blocoNovo);
                    break;

                case 8:
                    System.out.println(orionService.visualizarSemana());
                    break;

                case 9:
                    System.out.println(orionService.listarAtributos());
                    System.out.println("Digite o nome do atributo: ");
                    String verAtributo = scanner.nextLine();
                    Atributo aatributo = orionService.buscarAtributo(verAtributo);
                    System.out.println(orionService.verTempoPorAtributo(aatributo));
                    break;

                case 10:
                    System.out.println("Encerrando programa...");
                    rodando = false;
                    break;

            }

        }

    }
    
}
