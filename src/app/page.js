"use client";

import styles from "@/styles/pages/HomePage.module.scss";
import { useState } from "react";
import InputLabel from "@/components/pures/InputLabel";
import RoundedButton from "@/components/pures/RoundedButton";
import { login, loginWithGoogle, logout, signup } from "@/lib/auth-client";
import { GoogleIcon } from "@/utils/icons";
import { createCurrentUser } from "@/infra/api/endpoints/users";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [token, setToken] = useState(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const token = await signup(email, password);
      await createCurrentUser();
      await logout();
      setToken(token);
    } catch (e) {
      setErr("Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isRegisterMode ? handleRegister : handleLogin;

  const handleToggle = () => {
    setIsRegisterMode(!isRegisterMode);
    setErr(null);
    setToken(null);
  };

  const handleGoogleLogin = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { token, isNewUser } = await loginWithGoogle();
      setToken(token);

      if (isNewUser) {
        await createCurrentUser();
        await logout();
      }
    } catch (e) {
      console.error(e);
      setErr("Erreur lors de la connexion avec Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        {isRegisterMode ? "Créer un compte" : "Authentification"}
      </h1>

      <div className={styles.toggleWrapper}>
        <span
          className={`${styles.toggleLabel} ${!isRegisterMode ? styles.activeLabel : ""}`}
        >
          Connexion
        </span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isRegisterMode}
            onChange={handleToggle}
          />
          <span className={styles.slider}></span>
        </label>
        <span
          className={`${styles.toggleLabel} ${isRegisterMode ? styles.activeLabel : ""}`}
        >
          Inscription
        </span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
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
          text={
            loading
              ? isRegisterMode
                ? "Création..."
                : "Connexion..."
              : isRegisterMode
                ? "Créer mon compte"
                : "Se connecter"
          }
          buttonColor="#1F2BA6"
          textColor="#FFF"
          type="submit"
          disabled={loading}
        />
      </form>
      <div className={styles.providerLoginContainer}>
        <p className={styles.providerLoginText}>ou se connecter avec</p>
        <button
          className={styles.providerLoginButton}
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
        </button>
      </div>
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
