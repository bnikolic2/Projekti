package progi.Sinappsa.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.util.Assert;

@Entity
public class Korisnik {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    private String email;

    @Column(unique=true, nullable=false)
    @NotNull
    @Size(min=1, max=50)
    private String username;

    @NotNull
    @Size(min=10, max=100)
    private String password;

    @NotNull
    private Boolean moderator;

    public Korisnik() {
    }

    public Korisnik(String email, String username, String password, Boolean moderator) {
        Assert.hasText(username, "Username mora biti unesen");
        Assert.hasText(password, "Sifra mora biti unesena");
        Assert.hasText(email, "E-mail mora biti unesen");
        this.email = email;
        this.username = username;
        this.password = password;
        this.moderator = moderator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getModerator() {
        return moderator;
    }

    public void setModerator(Boolean moderator) {
        this.moderator = moderator;
    }
}
