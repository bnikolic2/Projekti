package progi.Sinappsa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Profil {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull @Size(min=1, max=20)
    private String ime;
    @NotNull @Size(min=1, max=20)
    private String prezime;

    private String avatar;
    private Double ocjena;

    @NotNull
    private Boolean potvrdenaRegistracija;

    @OneToOne()
    @JoinColumn(name = "idKorisnika", referencedColumnName = "id", nullable = false)
    private Korisnik korisnik;

    public Profil() {
    }

    public Profil(String ime, String prezime, String avatar, Double ocjena, Boolean potvrdenaRegistracija, Korisnik korisnik) {
        //this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.avatar = avatar;
        this.ocjena = ocjena;
        this.potvrdenaRegistracija = potvrdenaRegistracija;
        this.korisnik = korisnik;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Double getOcjena() {
        return ocjena;
    }

    public void setOcjena(Double ocjena) {
        this.ocjena = ocjena;
    }

    public Boolean getPotvrdenaRegistracija() {
        return potvrdenaRegistracija;
    }

    public void setPotvrdenaRegistracija(Boolean potvrdenaRegistracija) {
        this.potvrdenaRegistracija = potvrdenaRegistracija;
    }

    public Korisnik getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }
}
