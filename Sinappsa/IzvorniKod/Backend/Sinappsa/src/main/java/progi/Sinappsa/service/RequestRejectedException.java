package progi.Sinappsa.service;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ResponseStatus(BAD_REQUEST)
public class RequestRejectedException extends RuntimeException{
    public RequestRejectedException(String message) {
        super(message);
    }
}
