import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage as firebaseStorage } from '../firebase.config';
import videoSrc from '../assets/images/videoprofil.mp4';
import './Profil.css';








export default function Profil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('all');
  const [modalImage, setModalImage] = useState(null);


  const [wallPosts, setWallPosts] = useState([
    {
      texte: "J'aime le classique...",
      image: require('../assets/images/homer.jpeg'),
      heure: "14:20",
      titre: "Le Rap US >>> Rap FR"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [dynamicGallery, setDynamicGallery] = useState([]);


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


  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const handlePublish = async () => {
    let imageUrl = null;


    if (newImage) {
      const imageRef = ref(storage, `images/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      imageUrl = await getDownloadURL(imageRef);
      setDynamicGallery(prev => [...prev, imageUrl]);
    }


    setWallPosts(prev => [
      ...prev,
      {
        texte: newMessage,
        image: imageUrl,
        heure: getCurrentTime(),
        titre: "Nouvelle publication"
      }
    ]);


    setNewMessage('');
    setNewImage(null);
  };


  if (loading) return <p>Chargement...</p>;


  return (
    <div className="profil-container">
      <section className="profil-banner">
        <div className="pas">
          <div className="avatar"></div>
          <div className="momo">
            <h2 className="nom">{userData?.nom || "Nom"}</h2>
            <h2 className="prenom">{userData?.prenom || "Prénom"}</h2>
          </div>
        </div>
      </section>


      <div className="profil-content">
        <aside className="profil-menu">
          <button className={`profil-btn ${activeSection === 'all' ? 'active-btn' : ''}`} onClick={() => setActiveSection('all')}>ALL</button>
          <button className={`profil-btn ${activeSection === 'walls' ? 'active-btn' : ''}`} onClick={() => setActiveSection('walls')}>Walls</button>
          <button className={`profil-btn ${activeSection === 'gallery' ? 'active-btn' : ''}`} onClick={() => setActiveSection('gallery')}>Gallery</button>
          <button className={`profil-btn ${activeSection === 'video' ? 'active-btn' : ''}`} onClick={() => setActiveSection('video')}>Video</button>
          <button className={`profil-btn ${activeSection === 'music' ? 'active-btn' : ''}`} onClick={() => setActiveSection('music')}>Music</button>
        </aside>


        <main className="profil-main">
          {(activeSection === 'all' || activeSection === 'walls') && (
            <>
              <h2 className="section-title">My Walls</h2>
              <section className="wall-wrapper">
                {wallPosts.map((post, index) => (
                  <div className="wall-post" key={index}>
                    <div className="wall-header">
                      <h3>{post.titre}</h3>
                      <span className="wall-time">{post.heure}</span>
                    </div>
                    <div className="wall-image-section">
                    {post.image && <img src={'${post.image}?${Date.now()}'} alt="post" className="wall-image" />}
                      <p className="wall-comment">{post.texte}</p>
                      <span className="wall-time">{post.heure}</span>
                    </div>
                  </div>
                ))}
                <div className="message-box">
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="Écrivez un message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                  />
                  <div className="icons">
                    <button className="btn-send" onClick={handlePublish}></button>
                  </div>
                </div>
              </section>
            </>
          )}


          {(activeSection === 'all' || activeSection === 'gallery') && (
            <>
              <h2 className="section-title">Gallery</h2>
              <div className="gallery">
                {[
                  require('../assets/images/pexels-kampus-production-5935232.jpg'),
                  require('../assets/images/pexels-matthias-groeneveld-4200745.jpg'),
                  require('../assets/images/pexels-sound-on-3755913.jpg'),
                  require('../assets/images/Quisommesnousconnectify.png'),
                  ...dynamicGallery
                ].map((src, index) => (
                  <img
                    key={index}
                    src={typeof src === 'string' ?  '${src}?${Date.now()}' : src.default}
                    alt={`Image ${index}`}
                    className="gallery-img-clickable"
                    onClick={() => setModalImage(typeof src === 'string' ? src : src.default)}
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


          {(activeSection === 'all' || activeSection === 'music') && (
            <>
              <h2 className="section-title">Music</h2>
              <div className="music-container">
                <div className="music-item">
                  <img className="music-covern" src="https://via.placeholder.com/100x100" alt="cover" />
                  <p className="music-title">RioGane - Down</p>
                  <audio controls>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
                  </audio>
                </div>
                <div className="music-item">
                  <img className="music-cover" src="https://via.placeholder.com/100x100" alt="cover" />
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


