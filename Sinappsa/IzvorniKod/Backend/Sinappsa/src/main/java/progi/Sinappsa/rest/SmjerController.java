package progi.Sinappsa.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import progi.Sinappsa.domain.Smjer;
import progi.Sinappsa.service.SmjerService;

import java.util.List;

@RestController
@RequestMapping("/smjer")
public class SmjerController {
    @Autowired
    private SmjerService smjerService;
    @GetMapping("/all")
    public List<Smjer> fetchAll() {
        return smjerService.fetchAll();
    }
}
