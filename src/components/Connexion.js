import React, { useState } from 'react';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Connexion.css';

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profil");  // Redirection vers le profil après connexion réussie
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
    }
  };

  return (
    <div className="connexion-container">
      <div className="connexion-image"></div>
      <div className="connexion-form-container">
        <h2>Connexion</h2>
        <form className="connexion-form" onSubmit={handleLogin}>
          <label>Email :</label>
          <input type="email" placeholder="Entrez votre email..." value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Mot de passe :</label>
          <input type="password" placeholder="Entrez votre mot de passe..." value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Se Connecter</button>
        </form>
        <p>Pas de compte ? <a href="/inscription">Inscrivez-vous</a></p>
      </div>
    </div>
  );
}

export default Connexion;

