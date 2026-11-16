package com.kalebe.taxis.service;

import java.time.temporal.ChronoUnit;

import com.kalebe.taxis.model.Atributo;
import com.kalebe.taxis.model.Bloco;
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

    public Semana getSemana(){
        return this.semana;
    }

    public String visualizarSemana(){
        StringBuilder sb = new StringBuilder();

        for(Bloco bloco : semana.getListaBlocos()){

            sb.append("Dia: " + bloco.getDiaDaSemana() + "\n");
            sb.append("Ação: " + bloco.getAcao() + "\n");
            sb.append("Início: " + bloco.getHorasInicio() + "\n");
            sb.append("Fim: " + bloco.getHorasFinal() + "\n");

            if(bloco.getAtributo() != null){
                sb.append("Atributo: " + bloco.getAtributo() + "\n");
            }

            if(bloco.getHabito() != null){
                sb.append("Habito: " + bloco.getHabito() + "\n");
            }
        }
              return sb.toString();
    }

    public long verTempoPorAtributo(Atributo atributo){
        if(atributo == null){
            return 0 ;
        }
            long totalMinutos = 0;

        for(Bloco bloco : semana.getListaBlocos()){
            if(bloco.getAtributo() != null && bloco.getAtributo().contains(atributo)){
                totalMinutos += bloco.getHorasInicio().until(bloco.getHorasFinal(), ChronoUnit.MINUTES);
            }
        }
        return totalMinutos;
    }

    // RF01
    public void cadastrarAtributo(String nome) {
    atributoService.cadastrarAtributo(nome);
}

// RF02
    public void excluirAtributo(String nome) {
    atributoService.excluirAtributo(nome);
}
}
