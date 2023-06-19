package progi.Sinappsa.dao;

public class CreateKolegijDTO {
    String naziv;
    Long idSmjera;

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Long getIdSmjera() {
        return idSmjera;
    }

    public void setIdSmjera(Long idSmjera) {
        this.idSmjera = idSmjera;
    }
}
