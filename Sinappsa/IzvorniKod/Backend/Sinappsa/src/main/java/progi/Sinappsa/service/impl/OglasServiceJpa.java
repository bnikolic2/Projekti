package progi.Sinappsa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.Sinappsa.dao.KolegijRepository;
import progi.Sinappsa.dao.OglasRepository;
import progi.Sinappsa.dao.UpitRepository;
import progi.Sinappsa.domain.Kolegij;
import progi.Sinappsa.domain.Oglas;
import progi.Sinappsa.service.OglasService;

import java.util.*;

@Service
public class OglasServiceJpa implements OglasService {

    @Autowired
    private OglasRepository oglasRepository;
    @Autowired
    private KolegijRepository kolegijRepository;
    @Autowired
    private UpitRepository upitRepository;


    @Override
    public List<Oglas> fetchAll() {
        return oglasRepository.findAll();
    }

    @Override
    public List<Oglas> findAllKolegij(Long kolegijId) {
        return oglasRepository.findByKolegijId(kolegijId);
    }

    @Override
    public List<Oglas> findAllKategorija(Long kategorijaId) {
        return oglasRepository.findByKategorijaId(kategorijaId);
    }

    @Override
    public List<Oglas> findAllKorisnik(Long idPomagaca) {
        return oglasRepository.findByIdPomagaca(idPomagaca);
    }

    @Override
    public Optional<Oglas> findById(Long oglasId) {
        return oglasRepository.findById(oglasId);
    }

    @Override
    public Oglas createNewOglas(Oglas oglas) {
        Assert.notNull(oglas.getNaslov(),"Naslov ne smije biti null");
        Assert.notNull(oglas.getOpis(),"Opis ne smije biti null");
        return oglasRepository.save(oglas);
    }

    @Override
    public void deleteOglas(Oglas oglas) {
        oglasRepository.delete(oglas);
    }

    @Override
    public List<Oglas> findAllFiltri(Long idKolegij, Long idKategorija, Long idSmjer) {
        List<Oglas> oglasi = new ArrayList<>();
        List<Oglas> oglasiNew = new ArrayList<>();
        if((idKategorija != null) && (idKolegij != null) && (idSmjer != null)){
            List<Kolegij> kolegiji = kolegijRepository.findBySmjerId(idSmjer);

            for (Kolegij kolegij:kolegiji) {
                oglasi.addAll(oglasRepository.findByKolegijIdAndKategorijaId(kolegij.getId(), idKategorija));
            }
            for(Oglas oglas:oglasi){
                if(oglas.getKolegij().getId() != idKolegij){
                    oglasiNew.add(oglas);
                }
            }
            oglasi.removeAll(oglasiNew);
            return oglasi;

        }
        if((idKategorija == null) && (idKolegij != null) && (idSmjer!=null)){
            List<Kolegij> kolegiji = kolegijRepository.findBySmjerId(idSmjer);
            for (Kolegij kolegij:kolegiji) {
                oglasi.addAll(oglasRepository.findByKolegijId(kolegij.getId()));
            }
            for(Oglas oglas:oglasi){
                if(oglas.getKolegij().getId() != idKolegij){
                    oglasiNew.add(oglas);
                }
            }
            oglasi.removeAll(oglasiNew);
            return oglasi;
        }
        if((idKategorija != null && idKolegij !=null && idSmjer == null)){
            return oglasRepository.findByKolegijIdAndKategorijaId(idKolegij, idKategorija);
        }
        if(idKategorija == null && idKolegij == null && idSmjer!= null){
            List<Kolegij> kolegiji = kolegijRepository.findBySmjerId(idSmjer);
            for (Kolegij kolegij:kolegiji) {
                oglasi.addAll(oglasRepository.findByKolegijId(kolegij.getId()));
            }
            return oglasi;
        }
        if(idKategorija != null && idKolegij ==null && idSmjer == null) {
            return oglasRepository.findByKategorijaId(idKategorija);
        }
        if((idKolegij != null && idKategorija == null && idSmjer == null)) {
            return oglasRepository.findByKolegijId(idKolegij);
        }
        if(idKategorija != null && idKolegij == null && idSmjer!= null){
            List<Kolegij> kolegiji = kolegijRepository.findBySmjerId(idSmjer);
            for (Kolegij kolegij:kolegiji) {
                oglasi.addAll(oglasRepository.findByKolegijIdAndKategorijaId(kolegij.getId(), idKategorija));
            }
            return oglasi;
        }


        // if(idKategorija == null && idKolegij != null && idSmjer!= null){
        //    List<Kolegij> kolegiji = kolegijRepository.findBySmjerId(idSmjer);
        //     for (Kolegij kolegij:kolegiji) {
        //         oglasi.addAll(oglasRepository.findByKolegijId(kolegij.getId()));
        //     }
        //     return oglasi;
        // }
        return oglasRepository.findAll();
    }

    @Override
    public boolean findUpit(Long idProfil, Long idOglas) {
        if(upitRepository.findUpitList(idProfil, idOglas).size()>=1)
            return true;
        else
            return false;
    }

}
