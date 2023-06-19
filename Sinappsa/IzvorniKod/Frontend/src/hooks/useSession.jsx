import { useContext } from 'react';
import SessionContext from '../contexts/SessionContext';

/**
 * session je tipa:
 * {
 *  exists: boolean | null, ako je null onda nije jos ucitano odnosno to znaci kao da je loading stranice jos i nismo provjerili credentials
 *  ...profilData,
 *  korisnik: KorisnikData
 * }
 */
const useSession = () => {
    const session = useContext(SessionContext);
    return {
        session: session.session,
        setSession: session.setSession,
    };
};

export default useSession;