import React, { useState } from "react";
import axios from "axios";

const SubirVideo = ({ setActiveSection }) => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video || !title) {
      alert("Por favor, ingresa un título y selecciona un archivo.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:5000/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Video subido con éxito");
      setVideo(null); // Limpiar formulario
      setTitle("");
      setActiveSection("videos"); // Redirigir a la sección de videos
    } catch (error) {
      console.error("Error al subir el video:", error);
      alert("Hubo un error al subir el video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2>Subir Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título del video"
          value={title}
          onChange={handleTitleChange}
        />
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Subir Video"}
        </button>
      </form>
      <button onClick={() => setActiveSection("videos")}>Volver</button>
    </div>
  );
};

export default SubirVideo;






