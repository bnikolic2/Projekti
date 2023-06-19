package progi.Sinappsa.dao;

public class CreateOglasDTO {

    private String naslov;
    private String opis;

    private Long idPomagaca;
    private Long idKolegija;
    private Long idKategorije;

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Long getIdPomagaca() {
        return idPomagaca;
    }

    public void setIdPomagaca(Long idPomagaca) {
        this.idPomagaca = idPomagaca;
    }

    public Long getIdKolegija() {
        return idKolegija;
    }

    public void setIdKolegija(Long idKolegija) {
        this.idKolegija = idKolegija;
    }

    public Long getIdKategorije() {
        return idKategorije;
    }

    public void setIdKategorije(Long idKategorije) {
        this.idKategorije = idKategorije;
    }
}
