



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headervideo from '../assets/images/headervideo.mp4';
import './Home.css';




export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);




  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };




  return (
    <div className="home-container">
      {/* HEADER */}
      <header>
        <video autoPlay muted loop className="background-video">
          <source src={headervideo} type="video/mp4" />
        </video>




        <h1 className="logo">Connectify</h1>




        {/* MENU BURGER */}
        <div className={`menu-burger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>




        <nav className={`menu ${menuOpen ? "menu-open" : ""}`}>
          <Link to="/" className="accueil">Accueil</Link>
          <Link to="/connexion" className="connexion">Connexion</Link>
          <Link to="/inscription" className="inscription">Inscription</Link>
        </nav>






        <section className="Baba">
       <strong> <p> Connectify</p></strong>
       
      </section>






      </header>

<main>
    
     





      {/* Bienvenue */}
     
      
         <div className="hero-section">
        
        
         <div className="LOL">
          <video autoPlay muted loop className="background-video">
          <source src={headervideo} type="video/mp4" />
        </video>
        </div>
         
        <h2>Bienvenue</h2>
        <p>"Harmonisez vos passions, partagez vos émotions avec Connectify !"</p>
       
        
         </div>
     


      {/* Actualité */}
      <section className="actualite-section">
        <div className='aca'>
        <div className="actualite-text">
          <h2>Actualité</h2>
          <p>
          Le lieu où vous pouvez vous connecter avec vos amis, partager des moments spéciaux et explorer de nouvelles rencontres.Exprimez-vous à travers des photos, des vidéos et des messages, et découvrez le monde passionnant de la communauté Connectify.  
          
          Rejoignez-nous dès maintenant et commencez à créer des liens, à inspirer et à être inspiré. Connectify est là pour vous aider à rester connecté et à célébrer les moments de la vie, ensemble.
          </p>
        </div>
        </div>
      </section>


      {/* Qui sommes-nous */}
      <section className="about-section">
        <div className="about-text">
          
          <h2>Qui sommes-nous ?</h2>
          <p className='Babo'>
            Chez Connectify, nous sommes une plateforme sociale dynamique et inclusive, dédiée à connecter les individus du monde entier.
            Notre objectif est de créer un espace numérique où chacun peut se sentir libre d'exprimer sa véritable identité, de partager ses passions et de tisser des liens authentiques.
          </p>
          <p className='D'>
            Chez Connectify, nous sommes une plateforme sociale dynamique et inclusive, dédiée à connecter les individus du monde entier.
            Notre objectif est de créer un espace numérique où chacun peut se sentir libre d'exprimer sa véritable identité, de partager ses passions et de tisser des liens authentiques.
          </p>

        </div>
       
      </section>


      {/* Nous contacter */}
      <section className="contact-newsletter-section">

      <section class="contact-section">
  <div class="contact-image">
  
  </div>
  <div class="contact-form">
    <h2>Nous Contacter</h2>
    <form>
      <input type="email" placeholder="Entrez votre email..." required />
      <input type="text" placeholder="Sujet de votre message..." required />
      <textarea placeholder="Écrivez votre message..." rows="4" required></textarea>
      <button type="submit">Valider</button>
    </form>
  </div>
</section>


<div className="newsletter">
    
<video autoPlay muted loop className="background-video">
          <source src={headervideo} type="video/mp4" />
        </video>

  <div className='newsletter-content'>
  <video autoPlay muted loop className="background-video">
          <source src={headervideo} type="video/mp4" />
        </video>

 

  <h2>Newsletter</h2>
  
  <p>Inscrivez-vous à notre newsletter pour rester informé(e) et connecté(e) avec Connectify !</p>
  <div className="newsletter-input">
    <input type="email" placeholder="Entrez votre email..." />
    <button type="submit">Valider</button>
   
  </div>
</div>
</div>

</section>






      </main>

     
    </div>
  );
}

