package progi.Sinappsa.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Smjer {
    @Id
    @GeneratedValue
    private Long smjerId;

    @NotNull
    @Size(min = 1, max=20)
    private String nazivSmjera;

    public Long getSmjerId() {
        return smjerId;
    }

    public void setSmjerId(Long smjerId) {
        this.smjerId = smjerId;
    }

    public String getNazivSmjera() {
        return nazivSmjera;
    }

    public void setNazivSmjera(String nazivSmjera) {
        this.nazivSmjera = nazivSmjera;
    }

    public Smjer(Long smjerId, String nazivSmjera) {
        this.smjerId = smjerId;
        this.nazivSmjera = nazivSmjera;
    }

    public Smjer() {
    }
}
