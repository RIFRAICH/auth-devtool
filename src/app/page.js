"use client";

import styles from "@/styles/pages/HomePage.module.scss";
import { useState } from "react";
import InputLabel from "@/components/pures/InputLabel";
import RoundedButton from "@/components/pures/RoundedButton";
import { login } from "@/lib/auth-client";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const token = await login(email, password);
      setToken(token);
    } catch (e) {
      setErr("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Authentification</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <InputLabel
          className={styles.input}
          id="email"
          type="email"
          placeholder="Email"
          example="jpierre.dupont@email.com"
          required
          value={email}
          onChange={setEmail}
        />
        <InputLabel
          className={`${styles.input} ${styles.inputSpacer}`}
          id="password"
          type="password"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={setPassword}
        />
        <RoundedButton
          className={styles.loginButton}
          text={loading ? "Connexion..." : "Se connecter"}
          buttonColor="#1F2BA6"
          textColor="#FFF"
          type="submit"
          disabled={loading}
        />
      </form>
      {err && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{err}</p>
        </div>
      )}
      {token && (
        <div className={styles.tokenContainer}>
          <h2 className={styles.tokenTitle}>Token généré avec succès ✓</h2>
          <div className={styles.tokenBox}>
            <code className={styles.tokenText}>{token}</code>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
