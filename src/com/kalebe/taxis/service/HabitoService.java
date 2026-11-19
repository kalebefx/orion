package com.kalebe.taxis.service;

import java.util.ArrayList;

import com.kalebe.taxis.model.Habito;

public class HabitoService {
    private ArrayList<Habito> habitos = new ArrayList<>();

    public ArrayList<Habito> getHabitos() {
        return this.habitos;
    }

    public void criarHabito(String nome) {
        if (nome.isBlank()) {
            return;
        }
        Habito novoHabito = new Habito(nome);
        this.habitos.add(novoHabito);
    }

    public void excluirHabito(String nome) {
        if (nome == null || nome.isBlank()) {
            return;
        }
        this.habitos.removeIf(apelido -> apelido.getNome().equalsIgnoreCase(nome));
    }

}
