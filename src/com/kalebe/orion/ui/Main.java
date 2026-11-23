package com.kalebe.orion.ui;

import com.kalebe.orion.service.OrionService;

public class Main {

    public static void main(String[] args) {
        OrionService service = new OrionService();
        Menu menu = new Menu(service);
        menu.exibirMenu();
    }
}