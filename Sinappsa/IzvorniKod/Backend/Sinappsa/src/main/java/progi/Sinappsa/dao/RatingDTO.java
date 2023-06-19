package progi.Sinappsa.dao;

public class RatingDTO {

    public Long getIdObjavljaca() {
        return idObjavljaca;
    }

    public void setIdObjavljaca(Long idObjavljaca) {
        this.idObjavljaca = idObjavljaca;
    }

    private Long idObjavljaca;
    private Double rating;

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
