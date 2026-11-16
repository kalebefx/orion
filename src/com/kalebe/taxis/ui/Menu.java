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

    public void exibirMenu() {
        while (true) {
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
            }

        }

    }

}
