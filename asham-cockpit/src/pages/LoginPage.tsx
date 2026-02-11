import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { isMockMode } from '../api/ApiClient';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/inbox', { replace: true });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Anmeldung fehlgeschlagen');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="centered-page">
      <form className="login-card" onSubmit={onSubmit}>
        <h1>ASHAM Cockpit</h1>
        <p className="muted">Anmeldung für Bestatter</p>
        {isMockMode ? <p className="muted">Mock-Modus aktiv: beliebige Zugangsdaten möglich.</p> : null}

        <label htmlFor="email">E-Mail</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Passwort</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error ? <p className="error-message">{error}</p> : null}

        <button className="luci-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Anmeldung läuft…' : 'Anmelden'}
        </button>
      </form>
    </div>
  );
};
