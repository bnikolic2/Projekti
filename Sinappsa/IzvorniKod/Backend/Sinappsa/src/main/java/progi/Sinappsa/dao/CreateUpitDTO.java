package progi.Sinappsa.dao;

import progi.Sinappsa.domain.Oglas;
import progi.Sinappsa.domain.Profil;

public class CreateUpitDTO {

    private String poruka;

    private Long idPosiljatelja;

    private Long idOglasa;

    public String getPoruka() {
        return poruka;
    }

    public Long getIdPosiljatelja() {
        return idPosiljatelja;
    }

    public Long getIdOglasa() {
        return idOglasa;
    }
}
