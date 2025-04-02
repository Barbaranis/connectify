import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import videoSrc from '../assets/images/videoprofil.mp4';
import './Profil.css';


export default function Profil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('all');
  const [newCover, setNewCover] = useState(null);

  const [modalImage, setModalImage] = useState(null);
  const [wallPosts, setWallPosts] = useState([
    {
      titre: "Le Rap US >>> Rap FR",
      texte: "",
      heure: "8:10",
      fileUrl: null,
      fileType: null
    },
    {
     
      texte: "J'aime le classique...",
      heure: "14:20",
      fileUrl: require('../assets/images/homer.jpeg'),
      fileType: "image"
    }
  ]);
  

  const [gallery, setGallery] = useState([
    require('../assets/images/pexels-kampus-production-5935232.jpg'),
    require('../assets/images/pexels-matthias-groeneveld-4200745.jpg'),
    require('../assets/images/pexels-sound-on-3755913.jpg'),
    require('../assets/images/Quisommesnousconnectify.png')
  ]);
  
  
  const [videos, setVideos] = useState([
      require('../assets/images/videoprofil.mp4'),
      
    ]);
    
    
    const [musics, setMusics] = useState([
      {
        title: "RioGane - Down",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: require("../assets/images/album-hip-hop.png")
      },
      {
        title: "Grange - WAP",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: require("../assets/images/album-hop.png")
      }
    ]);
    


  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newFile, setNewFile] = useState(null);


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
    if (!newFile && !newMessage) return;


    let fileUrl = null;
    let fileType = null;


    if (newFile) {
      const fileRef = ref(storage, `uploads/${Date.now()}_${newFile.name}`);
      await uploadBytes(fileRef, newFile);
      fileUrl = await getDownloadURL(fileRef);


      if (newFile.type.startsWith("image")) fileType = "image";
      else if (newFile.type.startsWith("video")) fileType = "video";
      else if (newFile.type.startsWith("audio")) fileType = "music";
    }


    const newPost = {
      titre: newTitle || "Nouvelle publication",
      texte: newMessage,
      heure: getCurrentTime(),
      fileUrl,
      fileType
    };


    setWallPosts(prev => [...prev, newPost]);


    if (fileType === "image") {
      setGallery(prev => [fileUrl, ...prev]);
    } else if (fileType === "video") {
      setVideos(prev => [fileUrl, ...prev]);
    } else if (fileType === "music") {
      setMusics(prev => [fileUrl, ...prev]);
    }





    if (fileType === "music") {
      let coverUrl = "https://via.placeholder.com/100x100";
    
    
      if (newCover) {
        const coverRef = ref(storage, `covers/${Date.now()}_${newCover.name}`);
        await uploadBytes(coverRef, newCover);
        coverUrl = await getDownloadURL(coverRef);
      }
    
    
      setMusics(prev => [
        {
          title: newTitle || `Musique ${prev.length + 1}`,
          src: fileUrl,
          cover: coverUrl
        },
        ...prev
      ]);
    }
    
    
    





    setNewTitle('');
    setNewMessage('');
    setNewFile(null);
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
                   
                    </div>
                    <div className="wall-image-section">
                      {post.fileType === "image" && <img src={post.fileUrl} alt="media" className="wall-image" />}
                      {post.fileType === "video" && <video src={post.fileUrl} controls className="wall-image" />}
                      {post.fileType === "music" && <audio src={post.fileUrl} controls className="wall-audio" />}
                      <p className="wall-comment">{post.texte}</p>
                      <span className="wall-time">{post.heure}</span>
                    </div>
                  </div>
                ))}
                <div className="message-box">
                
                  <input
                    type="text"
                    placeholder="Message..."
                    className="comment-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*,video/*,audio/*"
                    onChange={(e) => setNewFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="file-input"
                  />
                 
                


                  <input
  type="file"
  accept="image/*"
  onChange={(e) => setNewCover(e.target.files[0])}
  style={{ display: 'none' }}
  id="cover-input"
/>
<label htmlFor="cover-input" className="btn-download" />
<button className="btn-send" onClick={handlePublish}></button>

                </div>
              </section>
            </>

            
          )}


          {(activeSection === 'all' || activeSection === 'gallery') && (
            <>
              <h2 className="section-title">Gallery</h2>
              <div className="gallery">
                {gallery.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`image-${index}`}
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


                   {/* V I D E O */}
                   {(activeSection === 'all' || activeSection === 'video') && (
  <>
    <h2 className="section-title">Video</h2>
    <div className="video-container">
      {videos.map((src, i) => (
        <video key={i} className="profil-video" controls>
          <source src={typeof src === 'string' ? src : src.default} type="video/mp4" />
        </video>
      ))}
    </div>
  </>
)}


          {(activeSection === 'all' || activeSection === 'music') && (
            <>
              <h2 className="section-title">Music</h2>
              <div className="music-container">
              {[

  ...musics
]
.filter(music => music.src) // NE GARDE QUE les musiques valides
.map((music, i) => (

                  <div key={i} className="music-item">
                    <img className="music-cover" src={music.cover || "https://via.placeholder.com/100x100"} alt="cover" />
                    <p className="music-title">{music.title}</p>
                    <audio controls>
                      <source src={music.src} type="audio/mp3" />
                    </audio>
                  </div>
                ))}
              </div>
  
            </>
          )}
        </main>
      </div>
    </div>
  );
}


