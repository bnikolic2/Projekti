package progi.Sinappsa.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Oglas {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 10, max = 60)
    private String naslov;

    @NotNull
    @Size(min =1, max = 200)
    private String opis;


    @OneToOne
    @JoinColumn(name="idPomagaca")
    private Profil profil;

    @OneToOne
    @JoinColumn(name="idKolegija")
    private Kolegij kolegij;

    @OneToOne
    @JoinColumn(name="idKategorije")
    private Kategorija kategorija;

    public Oglas() {
    }

    public Oglas(String naslov, String opis, Profil profil, Kolegij kolegij, Kategorija kategorija) {
        this.naslov = naslov;
        this.opis = opis;
        this.profil = profil;
        this.kolegij = kolegij;
        this.kategorija = kategorija;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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


    public Profil getProfil() {
        return profil;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Kolegij getKolegij() {
        return kolegij;
    }

    public void setKolegij(Kolegij kolegij) {
        this.kolegij = kolegij;
    }

    public Kategorija getKategorija() {
        return kategorija;
    }

    public void setKategorija(Kategorija kategorija) {
        this.kategorija = kategorija;
    }
}
