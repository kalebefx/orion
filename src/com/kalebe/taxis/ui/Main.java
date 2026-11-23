package com.kalebe.taxis.ui;

import com.kalebe.taxis.service.TaxisService;

public class Main {

    public static void main(String[] args) {
        TaxisService service = new TaxisService();
        Menu menu = new Menu(service);
        menu.exibirMenu();
    }
}