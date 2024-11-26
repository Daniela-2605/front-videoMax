import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importa useNavigate
import SubirVideo from "./SubirVideo"; // Importa el componente para subir video

const Home = () => {
  const [activeSection, setActiveSection] = useState("videos");
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reproducedVideos, setReproducedVideos] = useState([]);
  const navigate = useNavigate();  // Inicializa useNavigate

  // Obtener videos del backend al cargar la página
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };
    fetchVideos();
  }, []);

  // Filtra los videos según la búsqueda
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Muestra las diferentes secciones de acuerdo a la opción seleccionada
  const renderSection = () => {
    switch (activeSection) {
      case "subir":
        return <SubirVideo setActiveSection={setActiveSection} />;
      case "historial":
        return (
          <div className="videos-section">
            <h1 className="title">VideoMax - Historial</h1>
            <input
              type="text"
              placeholder="Buscar video..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="video-list">
              {reproducedVideos.length > 0 ? (
                reproducedVideos.map((video, index) => (
                  <div key={index} className="video-item">
                    <h3>{video.title}</h3>
                    <video width="320" height="240" controls>
                      <source src={video.url} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                ))
              ) : (
                <p>No se han reproducido videos aún.</p>
              )}
            </div>
          </div>
        );
      case "videos":
      default:
        return (
          <div className="videos-section">
            <h1 className="title">VideoMax</h1>
            <input
              type="text"
              placeholder="Buscar video..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="video-list">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video, index) => (
                  <div key={index} className="video-item">
                    <h3>{video.title}</h3>
                    <video
                      width="320"
                      height="240"
                      controls
                      onPlay={() => handleVideoPlayed(video)}
                    >
                      <source src={video.url} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                    <button
                      onClick={() => handleDeleteVideo(video._id)} 
                      className="delete-button"
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <p>No se encontraron videos.</p>
              )}
            </div>
          </div>
        );
    }
  };

  // Función que maneja la reproducción de un video
  const handleVideoPlayed = (video) => {
    setReproducedVideos((prev) => [...prev, video]);
  };

  // Función para eliminar un video
  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
      setReproducedVideos(reproducedVideos.filter((video) => video._id !== videoId));
      alert("Video eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el video:", error);
      alert("Hubo un error al eliminar el video.");
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina cualquier dato de sesión (por ejemplo, el token)
    localStorage.removeItem("token"); // o sessionStorage, dependiendo de cómo manejes el token

    // Redirige al login
    navigate("/");
  };

  return (
    <div className="home">
      <div className="sidebar">
        <button className="sidebar-button" onClick={() => setActiveSection("videos")}>
          Página Principal
        </button>
        <button className="sidebar-button" onClick={() => setActiveSection("subir")}>
          Subir Video
        </button>
        <button className="sidebar-button" onClick={() => setActiveSection("historial")}>
          Historial
        </button>
        <button className="sidebar-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className="main-section">{renderSection()}</div>
    </div>
  );
};

export default Home;










