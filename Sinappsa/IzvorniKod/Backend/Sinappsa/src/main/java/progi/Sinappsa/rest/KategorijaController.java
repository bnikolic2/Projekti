package progi.Sinappsa.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import progi.Sinappsa.domain.Kategorija;
import progi.Sinappsa.service.KategorijaService;

import java.util.List;

@RestController
@RequestMapping("/kategorija")
public class KategorijaController {
    @Autowired
    private KategorijaService kategorijaService;

    @GetMapping("/all")
    public List<Kategorija> fetchAll() {
        return kategorijaService.fetchAll();
    }
}
