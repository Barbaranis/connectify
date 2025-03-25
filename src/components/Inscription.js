import React, { useState } from 'react';
import { auth, db } from '../firebase.config'; // Import Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Import Firestore
import { useNavigate } from 'react-router-dom';
import './Inscription.css';


function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Reset l'erreur avant chaque tentative


    try {
      // Création de l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      // Enregistrement des informations dans Firestore
      await setDoc(doc(db, "users", user.uid), {
        nom: nom,
        prenom: prenom,
        email: email,
        avatar: "https://via.placeholder.com/150" // Avatar temporaire
      });


      // Redirection vers le profil après l'inscription
      navigate("/profil");
    } catch (error) {
      console.error("Erreur d'inscription :", error.message);
      setError(error.message); // Affichage de l'erreur
    }
  };


  return (
    <div className="inscription-container">
      <div className="inscription-image"></div>
      <div className="inscription-form-container">
        <h2>Inscription</h2>
        <form className="inscription-form" onSubmit={handleSignup}>
          <label>Nom :</label>
          <input type="text" placeholder="Entrez votre nom..." value={nom} onChange={(e) => setNom(e.target.value)} required />


          <label>Prénom :</label>
          <input type="text" placeholder="Entrez votre prénom..." value={prenom} onChange={(e) => setPrenom(e.target.value)} required />


          <label>Email :</label>
          <input type="email" placeholder="Entrez votre email..." value={email} onChange={(e) => setEmail(e.target.value)} required />


          <label>Mot de passe :</label>
          <input type="password" placeholder="Entrez votre mot de passe..." value={password} onChange={(e) => setPassword(e.target.value)} required />


          <button type="submit">S'inscrire</button>


          {error && <p className="error-message">{error}</p>} {/* Affichage de l'erreur */}
        </form>
        <p>Déjà inscrit ? <a href="/connexion">Connectez-vous</a></p>
      </div>
    </div>
  );
}


export default Inscription;



