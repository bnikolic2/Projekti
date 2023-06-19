package progi.Sinappsa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import progi.Sinappsa.domain.Korisnik;
import progi.Sinappsa.service.KorisnikService;

import java.util.Optional;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

@Service
public class KorisnikUserDetailsService implements UserDetailsService {

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) {

        Optional<Korisnik> optionalKorisnik = korisnikService.findByUsername(username);

        if (optionalKorisnik.isPresent()) {
            Korisnik korisnik = optionalKorisnik.get();
            return new User(
                    korisnik.getUsername(),
                    passwordEncoder.encode(korisnik.getPassword()),
                    commaSeparatedStringToAuthorityList(((korisnik.getModerator()) ? "ROLE_MODERATOR," : "") + "ROLE_KORISNIK")
            );
        } else throw new UsernameNotFoundException("No user " + username);
    }
}
