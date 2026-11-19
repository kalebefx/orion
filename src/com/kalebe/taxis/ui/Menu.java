package com.kalebe.taxis.ui;

import java.time.LocalTime;
import java.util.Scanner;

import com.kalebe.taxis.model.Atributo;
import com.kalebe.taxis.service.TaxisService;

public class Menu {
    private Scanner scanner = new Scanner(System.in);
    private TaxisService taxisService;

    public Menu(TaxisService taxisService) {
        this.taxisService = taxisService;
        this.scanner = new Scanner(System.in);
    }

    public TaxisService getTaxisService() {
        return this.taxisService;
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
                    taxisService.cadastrarAtributo(nomeAtributo);
                    break;

                case 2:
                    System.out.println(taxisService.listarAtributos());
                    System.out.println("Digite o nome do atributo que quer excluir: ");
                    String exAtributo = scanner.nextLine();
                    taxisService.excluirAtributo(exAtributo);
                    break;

                case 3:
                    System.out.println("Digite o nome do novo habito: ");
                    String nomeHabito = scanner.nextLine();
                    taxisService.criarHabito(nomeHabito);
                    break;

                case 4:
                    System.out.println(taxisService.listaHabito());
                    System.out.println("Digite o nome do habito para excluir: ");
                    String exHabito = scanner.nextLine();
                    taxisService.excluirHabito(exHabito);
                    break;

                case 5:
                    System.out.println("Digite o nome do novo bloco: ");
                    String nomeBloco = scanner.nextLine();
                    System.out.println("Digite as hora de inicio: ");
                    LocalTime horasInicio = LocalTime.parse(scanner.nextLine());
                    System.out.println("Digite as hora do fim: ");
                    LocalTime horasFinal = LocalTime.parse(scanner.nextLine());
                    System.out.println("Digite o dia da semana: ");
                    String diaDaSemana = scanner.nextLine();
                    taxisService.criarBloco(nomeBloco, horasInicio, horasFinal, diaDaSemana);
                    break;

                case 6:
                    System.out.println(taxisService.visualizarSemana());
                    System.out.println("Digite o nome do bloco para excluir: ");
                    String exBloco = scanner.nextLine();
                    taxisService.excluirBloco(exBloco);

                    break;

                case 7:
                    System.out.println(taxisService.visualizarSemana());
                    System.out.println("Digite a ação do bloco que quer editar: ");
                    String blocoAtual = scanner.nextLine();
                    System.out.println("Digite o novo nome: ");
                    String blocoNovo = scanner.nextLine();
                    taxisService.editarBloco(blocoAtual, blocoNovo);
                    break;

                case 8:
                    System.out.println(taxisService.visualizarSemana());
                    break;

                case 9:
                    System.out.println(taxisService.listarAtributos());
                    System.out.println("Digite o nome do atributo: ");
                    String verAtributo = scanner.nextLine();
                    Atributo atributo = taxisService.buscarAtributo(verAtributo);
                    System.out.println(taxisService.verTempoPorAtributo(atributo));
                    break;

                case 10:
                    System.out.println("Encerrando programa...");
                    rodando = false;
                    break;

            }

        }

    }

}
