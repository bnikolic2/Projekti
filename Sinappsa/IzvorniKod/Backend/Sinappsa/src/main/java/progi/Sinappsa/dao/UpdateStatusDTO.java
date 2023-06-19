package progi.Sinappsa.dao;

public class UpdateStatusDTO {
    private Long idUpita;
    private String noviStatus;

    public Long getIdUpita() {
        return idUpita;
    }

    public void setIdUpita(Long idUpita) {
        this.idUpita = idUpita;
    }

    public String getNoviStatus() {
        return noviStatus;
    }

    public void setNoviStatus(String noviStatus) {
        this.noviStatus = noviStatus;
    }
}