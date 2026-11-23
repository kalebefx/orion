package com.kalebe.taxis.service;

import java.time.LocalTime;
import java.util.ArrayList;

import com.kalebe.taxis.model.Atributo;
import com.kalebe.taxis.model.Bloco;
import com.kalebe.taxis.model.Habito;

public class BlocoService {
    private ArrayList<Bloco> blocos = new ArrayList<>();

    public ArrayList<Bloco> getBloco() {
        return this.blocos;
    }

    public void setBloco(ArrayList<Bloco> bloco) {
        this.blocos = bloco;
    }

    public void criarBloco(String acao, LocalTime horasInicio, LocalTime horasFinal, String diaDaSemana) {
        Bloco novoBloco = new Bloco(acao, horasInicio, horasFinal, diaDaSemana);
        this.blocos.add(novoBloco);

    }

    public void criarBlocoCompleto(String acao, ArrayList<Atributo> atributo, Habito habito, LocalTime horasInicio,
        LocalTime horasFinal, String diaDaSemana, String descricao) { Bloco novoBloco = new Bloco(acao, atributo, habito, horasInicio, horasFinal, diaDaSemana, descricao);
        this.blocos.add(novoBloco);
    }

    public void excluirBloco(String acao) {
        this.blocos.removeIf(apelido -> apelido.getAcao().equalsIgnoreCase(acao));
    }

    public void editarBloco(String acao, String novaAcao) {
        if (acao == null) {
            throw new IllegalArgumentException("A ação não pode ser nula!");
        }
        if (novaAcao == null || novaAcao.isBlank()) {
            throw new IllegalArgumentException("A nova ação não pode ser nula");
        }

        for (int i = 0; i < blocos.size(); i++) {
            if (blocos.get(i).getAcao().equalsIgnoreCase(acao)) {
                blocos.get(i).setAcao(novaAcao);
            }
        }
    }
}
