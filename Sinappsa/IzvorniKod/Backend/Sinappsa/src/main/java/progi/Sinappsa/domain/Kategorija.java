package progi.Sinappsa.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Kategorija {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    private String nazivKategorije;

    public Kategorija() {
    }

    public Kategorija(Long id, String nazivKategorije) {
        this.id = id;
        this.nazivKategorije = nazivKategorije;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazivKategorije() {
        return nazivKategorije;
    }

    public void setNazivKategorije(String nazivKategorije) {
        this.nazivKategorije = nazivKategorije;
    }
}

