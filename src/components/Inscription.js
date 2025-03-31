import React, { useState } from 'react';
import { auth, db } from '../firebase.config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './Inscription.css';

function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nom,
        prenom,
        email,
        genre,
        avatar: "https://via.placeholder.com/150"
      });

      navigate("/profil");
    } catch (error) {
      console.error("Erreur d'inscription :", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="inscription-container">
      <div className="inscription-image"></div>
      <div className="inscription-form-container">
        <h2>Inscription</h2>
        <form className="inscription-form" onSubmit={handleSignup}>
          <div className="inline-fields">
            <input type="text" placeholder="Entrez votre nom..." value={nom} onChange={(e) => setNom(e.target.value)} required />
            <input type="text" placeholder="Entrez votre prénom..." value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
          </div>

          <input type="email" placeholder="Entrez votre email..." value={email} onChange={(e) => setEmail(e.target.value)} required />

          <div className="gender">
            <label>Genre :   </label>
            <label>
              <input type="radio" value="Homme" checked={genre === "Homme"} onChange={(e) => setGenre(e.target.value)} required />
              Homme
            </label>
            <label>
              <input type="radio" value="Femme" checked={genre === "Femme"} onChange={(e) => setGenre(e.target.value)} required />
              Femme
            </label>
          </div>

          <input type="password" placeholder="Entrez votre mot de passe..." value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Vérifiez votre mot de passe..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit">Valider</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>Déjà Inscrit ? <a href="/connexion">Connectez-vous</a></p>
      </div>
    </div>
  );
}

export default Inscription;
