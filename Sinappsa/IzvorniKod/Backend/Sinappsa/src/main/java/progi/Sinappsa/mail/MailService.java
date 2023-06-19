package progi.Sinappsa.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(MailConfiguration.SinappsaMail);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);

        mailSender.send(simpleMailMessage);

        System.out.printf("Uspješno poslan mail to: %s", to);
    }
}
