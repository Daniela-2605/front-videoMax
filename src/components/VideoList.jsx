import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId"); // Obtener el ID del usuario del localStorage

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");
        const userVideos = response.data.filter(video => video.uploadedBy === userId); // Filtrar por el ID del usuario
        setVideos(userVideos);
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [userId]);

  return (
    <div className="video-list">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        videos.map((video) => (
          <div key={video._id} className="video-item">
            <h3>{video.title}</h3>
            <p>Subido por: {video.uploadedBy}</p> {/* Nombre del usuario que subió el video */}
            <video controls>
              <source src={`http://localhost:5000/videos/${video.videoFile}`} type="video/mp4" />
            </video>
          </div>
        ))
      )}
    </div>
  );
};

export default VideoList;
