package com.kalebe.taxis.ui;

import java.util.Scanner;

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

    boolean rodando = true;


    public void exibirMenu() {
        while (rodando) {
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
                    break;

                case 6:
                    break;

                case 7:
                    break;
                    
                case 8:
                    System.out.println(taxisService.visualizarSemana());
                    break;

                case 9:
                    System.out.println(taxisService.listarAtributos());
                    System.out.println("Digite o nome do atributo que quer ver o tempo: ");
                    String verAtributo = scanner.nextLine();
                    break;

                case 10:
                    System.out.println("Encerrando programa...");
                    rodando = false;
                    break;
            }

        }

    }

}
