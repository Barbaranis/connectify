import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from "firebase/auth";
import videoSrc from '../assets/images/videoprofil.mp4';
import './Home.css';
import './Profil.css';


export default function Profil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('all'); // Pour filtrer les blocs
  const [modalImage, setModalImage] = useState(null);



  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        navigate("/connexion");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);


  if (loading) return <p>Chargement...</p>;


  return (
    <div className="profil-container">
      {/* Bannière */}
      <section className="profil-banner">
        <div className="pas">
          <div className="avatar">
            
          </div>
          <div className="momo">
            <h2 className="nom">{userData?.nom || "Nom"}</h2>
            <h2 className="prenom">{userData?.prenom || "Prénom"}</h2>
          </div>
        </div>
      </section>


      {/* Contenu */}
      <div className="profil-content">
        {/* Menu latéral */}
        <aside className="profil-menu">
          <button className={`profil-btn ${activeSection === 'all' ? 'active-btn' : ''}`} onClick={() => setActiveSection('all')}>ALL</button>
          <button className={`profil-btn ${activeSection === 'walls' ? 'active-btn' : ''}`} onClick={() => setActiveSection('walls')}>Walls</button>
          <button className={`profil-btn ${activeSection === 'gallery' ? 'active-btn' : ''}`} onClick={() => setActiveSection('gallery')}>Gallery</button>
          <button className={`profil-btn ${activeSection === 'video' ? 'active-btn' : ''}`} onClick={() => setActiveSection('video')}>Video</button>
          <button className={`profil-btn ${activeSection === 'music' ? 'active-btn' : ''}`} onClick={() => setActiveSection('music')}>Music</button>
        </aside>


        <main className="profil-main">
          {/* W A L L S */}
          {(activeSection === 'all' || activeSection === 'walls') && (
            <>
              <h2 className="section-title">My Walls</h2>
              <section className="wall-wrapper">
                <div className="wall-post">
                  <div className="wall-header">
                    <h3>Le Rap US &gt;&gt;&gt; Rap FR</h3>
                    <span className="wall-time">8:10</span>
                  </div>
                  <div className="wall-image-section">
                    <div className="wall-image"></div>
                    <p className="wall-comment">J'aime le classique...</p>
                    <span className="wall-time">14:20</span>
                  </div>
                </div>
                <div className="message-box">
                  <input type="text" className="comment-input" placeholder="Écrivez un message..." />
                  <div className="icons">
                    <button className="btn-download"></button>
                    <button className="btn-send"></button>
                  </div>
                </div>
              </section>
            </>
          )}


          {/* G A L L E R Y */}
          {(activeSection === 'all' || activeSection === 'gallery') && (
  <>
    <h2 className="section-title">Gallery</h2>
    <div className="gallery">
      {[
        require('../assets/images/pexels-kampus-production-5935232.jpg'),
        require('../assets/images/pexels-matthias-groeneveld-4200745.jpg'),
        require('../assets/images/pexels-sound-on-3755913.jpg'),
        require('../assets/images/Quisommesnousconnectify.png')
      ].map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index}`}
          className="gallery-img-clickable"
          onClick={() => setModalImage(src)}
        />
      ))}
    </div>


    {modalImage && (
      <div className="modal-overlay" onClick={() => setModalImage(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setModalImage(null)}>×</button>
          <img src={modalImage} alt="Zoom" className="modal-image" />
        </div>
      </div>
    )}
  </>
)}
 




    {/* MODALE */}
    {modalImage && (
      <div className="modal-overlay" onClick={() => setModalImage(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setModalImage(null)}>×</button>
          <img src={`${modalImage}?w=600`} alt="Zoomed" className="modal-image" />
        </div>
      </div>
    )}





          {/* V I D E O */}
          {(activeSection === 'all' || activeSection === 'video') && (
            <>
              <h2 className="section-title">Video</h2>
              <div className="video-container">
                <video className="profil-video" controls>
                  <source src={videoSrc} type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture de vidéos.
                </video>
              </div>
            </>
          )}


          {/* M U S I C */}
          {(activeSection === 'all' || activeSection === 'music') && (
            <>
              <h2 className="section-title">Music</h2>
              <div className="music-container">
                <div className="music-item">
                  <img className="music-covern" src="https://via.placeholder.com/100x100"  />
                  <p className="music-title">RioGane - Down</p>
                  <audio controls>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
                  </audio>
                </div>
                <div className="music-item">
                  <img className="music-cover" src="https://via.placeholder.com/100x100"  />
                  <p className="music-title">Grange - WAP</p>
                  <audio controls>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mp3" />
                  </audio>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}







