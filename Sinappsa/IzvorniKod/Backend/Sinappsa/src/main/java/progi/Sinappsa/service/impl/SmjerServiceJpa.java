package progi.Sinappsa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.Sinappsa.dao.SmjerRepository;
import progi.Sinappsa.domain.Smjer;
import progi.Sinappsa.service.SmjerService;

import java.util.List;

@Service
public class SmjerServiceJpa implements SmjerService {
    @Autowired
    private SmjerRepository smjerRepository;
    @Override
    public List<Smjer> fetchAll() {
        return smjerRepository.findAll();
    }
}
