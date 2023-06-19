package progi.Sinappsa.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Upit {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String poruka;

    @OneToOne
    @JoinColumn(name = "idPosiljatelja")
    private Profil profil;

    private StatusUpita status;

    @OneToOne
    @JoinColumn(name="idOglasa")
    private Oglas oglas;

    public Upit() {
    }

    public Upit(String poruka, Profil profil, Oglas oglas) {
        this.poruka = poruka;
        this.profil = profil;
        this.status = StatusUpita.U_TIJEKU;
        this.oglas = oglas;
    }

    public StatusUpita getStatus() {
        return status;
    }

    public void setStatus(StatusUpita status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPoruka() {
        return poruka;
    }

    public void setPoruka(String poruka) {
        this.poruka = poruka;
    }

    public Profil getProfil() {
        return profil;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Oglas getOglas() {
        return oglas;
    }

    public void setOglas(Oglas oglas) {
        this.oglas = oglas;
    }
}
