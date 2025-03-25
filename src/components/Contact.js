import React, { useState } from 'react';
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import './Contact.css';


export default function Contact() {
  const [email, setEmail] = useState('');
  const [sujet, setSujet] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "messages"), {
        email,
        sujet,
        message,
        date: new Date().toISOString()
      });
      alert("Message envoyé avec succès !");
      setEmail('');
      setSujet('');
      setMessage('');
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur est survenue.");
    }
  };


  return (
    <div className="contactus-page">
      <div className="contactus-left">
        <img
          src={require('../assets/images/Nouscontacteerconnectify.png')}
          alt="Personne avec casque"
          className="contactus-img"
        />
      </div>


      <div className="contactus-right">
        <h2 className="contactus-title">Nous Contacter</h2>
        <div className="contactus-form-box">
          <form className="contactus-form" onSubmit={handleSubmit}>
            <label>Email :</label>
            <input
              type="email"
              placeholder="Entrez votre email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Sujet :</label>
            <input
              type="text"
              placeholder="Sujet de votre message..."
              value={sujet}
              onChange={(e) => setSujet(e.target.value)}
              required
            />
            <label>Message :</label>
            <textarea
              placeholder="Écrivez votre message..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="contactus-btn">Valider</button>
          </form>
        </div>
      </div>
    </div>
  );
}









