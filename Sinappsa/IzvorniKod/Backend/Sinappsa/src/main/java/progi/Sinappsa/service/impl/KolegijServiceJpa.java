package progi.Sinappsa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.Sinappsa.dao.KolegijRepository;
import progi.Sinappsa.domain.Kolegij;
import progi.Sinappsa.service.KolegijService;

import java.util.List;

@Service
public class KolegijServiceJpa implements KolegijService {
    @Autowired
    private KolegijRepository kolegijRepository;
    @Override
    public List<Kolegij> fetchAll() {
        return kolegijRepository.findAll();
    }
}
