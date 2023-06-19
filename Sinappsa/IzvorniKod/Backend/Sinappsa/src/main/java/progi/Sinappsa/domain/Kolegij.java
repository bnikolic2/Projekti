package progi.Sinappsa.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Kolegij {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 1, max = 40)
    private String nazivKolegija;

    @OneToOne
    @JoinColumn(name = "smjerId")
    private Smjer smjer;

    public Kolegij() {
    }

    public Kolegij(String nazivKolegija, Smjer smjer) {
        this.nazivKolegija = nazivKolegija;
        this.smjer = smjer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazivKolegija() {
        return nazivKolegija;
    }

    public void setNazivKolegija(String nazivKolegija) {
        this.nazivKolegija = nazivKolegija;
    }

    public Smjer getSmjer() {
        return smjer;
    }

    public void setSmjer(Smjer smjer) {
        this.smjer = smjer;
    }
}
