package progi.Sinappsa.dao;

public class EditOglasDTO {
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getIdKolegija() {
        return idKolegija;
    }

    public Long getIdKategorije() {
        return idKategorije;
    }

}
