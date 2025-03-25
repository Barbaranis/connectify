import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config';
import Home from './components/Home';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import Contact from './components/Contact';
import Profil from './components/Profil';
import './App.css';



function App() {
  const location = useLocation(); // Récupération de l'URL actuelle
  const navigate = useNavigate(); // Pour rediriger après déconnexion


  // Vérifie si on est sur une page de profil OU sur la page contact
  const isProfileOrContact = location.pathname.startsWith("/profil") || location.pathname === "/contact";


  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige vers l'accueil après déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };


  return (
    <div className="App">
      {/* Navbar */}
      <nav className={`navbar ${isProfileOrContact ? 'navbar-profil' : ''}`}>
        <Link to="/" className="logo">Connectify</Link>
        <div className="nav-links">
          {isProfileOrContact ? (
            <>
              <Link to="/profil" className={`nav-item ${location.pathname.startsWith("/profil") ? "active" : ""}`}>Profil</Link>
              <Link to="/contact" className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link>
              <button onClick={handleLogout} className="nav-item deco">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-item">Accueil</Link>
              <Link to="/connexion" className="nav-item c">Connexion</Link>
              <Link to="/inscription" className="nav-item inscription-btn">Inscription</Link>
            </>
          )}
        </div>
      </nav>
 

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>


      {/* Footer */}
      <footer className="footer">
        <p>© 2023 Connectify. Tous Droits Réservés.</p>
      </footer>
    </div>
  );
}


export default App;