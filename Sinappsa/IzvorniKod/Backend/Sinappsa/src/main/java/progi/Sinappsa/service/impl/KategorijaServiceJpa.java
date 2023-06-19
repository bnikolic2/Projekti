package progi.Sinappsa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.Sinappsa.dao.KategorijaRepository;
import progi.Sinappsa.domain.Kategorija;
import progi.Sinappsa.service.KategorijaService;

import java.util.List;

@Service
public class KategorijaServiceJpa implements KategorijaService {
    @Autowired
    private KategorijaRepository kategorijaRepository;
    @Override
    public List<Kategorija> fetchAll() {
        return kategorijaRepository.findAll();
    }
}
