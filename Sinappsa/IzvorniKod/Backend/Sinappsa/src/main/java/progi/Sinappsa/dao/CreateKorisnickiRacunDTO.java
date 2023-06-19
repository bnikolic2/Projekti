package progi.Sinappsa.dao;

public class CreateKorisnickiRacunDTO {
    private String email;
    private String username;
    private String password;
    private Boolean moderator;
    private String ime;
    private String prezime;
    private String avatar;
    private Double ocjena;
    private Boolean potvrdenaRegistracija;

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
}

