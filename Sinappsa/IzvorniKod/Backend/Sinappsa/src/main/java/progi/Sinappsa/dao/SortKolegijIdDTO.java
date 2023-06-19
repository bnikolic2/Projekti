package progi.Sinappsa.dao;

public class SortKolegijIdDTO {
    private Long idKolegij;
    private Long idSmjer;

    private String nazivKolegija;
    public void setIdKolegij(Long idKolegij) {
        this.idKolegij = idKolegij;
    }

    public void setIdSmjer(Long idSmjer) {
        this.idSmjer = idSmjer;
    }

    public String getNazivKolegija() {
        return nazivKolegija;
    }

    public void setNazivKolegij(String nazivKolegija) {
        this.nazivKolegija = nazivKolegija;
    }

    public Long getIdKolegij() {
        return idKolegij;
    }

    public Long getIdSmjer() {
        return idSmjer;
    }

}
