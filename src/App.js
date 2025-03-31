import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config';
import Home from './components/Home';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import Contact from './components/Contact';
import Profil from './components/Profil';
import './App.css';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isProfileOrContact = location.pathname.startsWith("/profil") || location.pathname === "/contact";


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };


  useEffect(() => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');


    const openMenu = () => {
      navMenu.classList.add('show');
      menuToggle.classList.add('active');
    };


    const closeMenu = () => {
      navMenu.classList.remove('show');
      menuToggle.classList.remove('active');
    };


    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', openMenu);
      navMenu.addEventListener('click', (event) => {
        if (event.target.classList.contains('close-btn') || event.target.classList.contains('nav-menu-link')) {
          closeMenu();
        }
      });


      return () => {
        menuToggle.removeEventListener('click', openMenu);
        navMenu.removeEventListener('click', closeMenu);
      };
    }
  }, []);


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
              <Link to="/connexion" className="nav-item">Connexion</Link>
              <Link to="/inscription" className="nav-item inscription-btn">Inscription</Link>
            </>
          )}
        </div>
      </nav>


      {/* Menu burger responsive */}
      <div className="pepe responsive-only">
        <div className="menu-toggle" id="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="nav-menu" id="nav-menu">
          <span className="close-btn">×</span>
          {isProfileOrContact ? (
            <>
              <Link to="/profil" className="nav-menu-link">Profil</Link>
              <Link to="/contact" className="nav-menu-link">Contact</Link>
              <button onClick={handleLogout} className="deco">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-menu-link">Accueil</Link>
              <Link to="/connexion" className="nav-menu-link">Connexion</Link>
              <Link to="/inscription" className="nav-menu-link">Inscription</Link>
            </>
          )}
        </nav>
      </div>


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


