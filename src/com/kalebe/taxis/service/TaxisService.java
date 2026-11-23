package com.kalebe.taxis.service;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

import com.kalebe.taxis.model.Atributo;
import com.kalebe.taxis.model.Bloco;
import com.kalebe.taxis.model.Habito;
import com.kalebe.taxis.model.Semana;

public class TaxisService {
    private AtributoService atributoService;
    private BlocoService blocoService;
    private HabitoService habitoService;
    private Semana semana;

    public TaxisService() {
        this.atributoService = new AtributoService();
        this.blocoService = new BlocoService();
        this.habitoService = new HabitoService();
        this.semana = new Semana();
    }

    public Semana getSemana() {
        return this.semana;
    }

    public String visualizarSemana() {
        StringBuilder sb = new StringBuilder();

        for (Bloco bloco : semana.getListaBlocos()) {
            sb.append("Dia: " + bloco.getDiaDaSemana() + "\n");
            sb.append("Ação: " + bloco.getAcao() + "\n");
            sb.append("Início: " + bloco.getHorasInicio() + "\n");
            sb.append("Fim: " + bloco.getHorasFinal() + "\n");
            if (bloco.getAtributo() != null) {
                sb.append("Atributo: " + bloco.getAtributo() + "\n");
            }
            if (bloco.getHabito() != null) {
                sb.append("Habito: " + bloco.getHabito() + "\n");
            }
        }
        return sb.toString();
    }

    public long verTempoPorAtributo(Atributo atributo) {
        if (atributo == null) {
            return 0;
        }
        long totalMinutos = 0;

        for (Bloco bloco : semana.getListaBlocos()) {
            if (bloco.getAtributo() != null && bloco.getAtributo().contains(atributo)) {
                totalMinutos += bloco.getHorasInicio().until(bloco.getHorasFinal(), ChronoUnit.MINUTES);
            }
        }
        return totalMinutos;
    }

    public String listarAtributos() {
        StringBuilder sb = new StringBuilder();
        for (Atributo a : atributoService.getAtributos()) {
            sb.append("- " + a.getNome() + "\n");
        }
        return sb.toString();
    }

    public String listaHabito() {
        StringBuilder sh = new StringBuilder();
        for (Habito a : habitoService.getHabitos()) {
            sh.append("- " + a.getNome() + "\n");
        }
        return sh.toString();
    }

    public Atributo buscarAtributo(String nome) {
        for (Atributo a : atributoService.getAtributos()) {
            if (a.getNome().equalsIgnoreCase(nome)) {
                return a;
            }
        }
        return null;
    }

    public Habito buscarHabito(String nome) {
        for (Habito b : habitoService.getHabitos()) {
            if (b.getNome().equalsIgnoreCase(nome)) {
                return b;
            }
        }
        return null;
    }

    public void cadastrarAtributo(String nome) {
        atributoService.cadastrarAtributo(nome);
    }

    public void excluirAtributo(String nome) {
        atributoService.excluirAtributo(nome);
    }

    public void criarHabito(String nome) {
        habitoService.criarHabito(nome);
    }

    public void excluirHabito(String nome) {
        habitoService.excluirHabito(nome);
    }

    public void criarBloco(String acao, LocalTime horasInicio, LocalTime horasFinal, String diaDaSemana) {
        blocoService.criarBloco(acao, horasInicio, horasFinal, diaDaSemana);
        ArrayList<Bloco> blocos = blocoService.getBloco();
        semana.getListaBlocos().add(blocos.get(blocos.size() - 1));

    }

    public void criarBlocoCompleto(String acao, ArrayList<Atributo> atributo, Habito habito, LocalTime horasInicio,
            LocalTime horasFinal, String diaDaSemana, String descricao) {
        blocoService.criarBlocoCompleto(acao, atributo, habito, horasInicio, horasFinal, diaDaSemana, descricao);
        ArrayList<Bloco> blocos = blocoService.getBloco();
        semana.getListaBlocos().add(blocos.get(blocos.size() - 1));
    }

    public void excluirBloco(String acao) {
        blocoService.excluirBloco(acao);
    }

    public void editarBloco(String acao, String novaAcao) {
        blocoService.editarBloco(acao, novaAcao);
    }
}
