import React, { useState } from "react";
import axios from "axios"; // Importa axios
import '../styles/styles.css'; // Asegúrate de que la ruta del CSS esté correcta

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaNacimiento: "",
    correo: "",
    contrasena: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para mostrar errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBackClick = () => {
    window.location.href = "/"; // Redirige al inicio de sesión
  };

  const validateForm = () => {
    const newErrors = {};
    // Validar campos obligatorios
    if (!formData.nombre) newErrors.nombre = "Nombre completo es obligatorio";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Fecha de nacimiento es obligatoria";
    if (!formData.correo) newErrors.correo = "Correo electrónico es obligatorio";
    if (!formData.contrasena) newErrors.contrasena = "Contraseña es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Realiza una solicitud POST al backend para registrar al usuario
        const response = await axios.post('https://backend-video-max.vercel.app/api/register', {
          nombre: formData.nombre,
          correo: formData.correo,
          fechaNacimiento: formData.fechaNacimiento,
          contrasena: formData.contrasena,
        });

        // Si la respuesta es exitosa, mostramos el mensaje de éxito
        setSuccessMessage(response.data.message);
        setErrorMessage(""); // Limpiar mensaje de error
        setFormData({
          nombre: "",
          fechaNacimiento: "",
          correo: "",
          contrasena: "",
        });
        setErrors({});
      } catch (error) {
        // Si ocurre un error, mostramos el mensaje de error
        console.error(error);
        setErrorMessage('Hubo un error al registrar el usuario. Intenta nuevamente.');
        setSuccessMessage(""); // Limpiar mensaje de éxito
      }
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo <span className="required">*</span></label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento <span className="required">*</span></label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
          {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico <span className="required">*</span></label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errors.correo && <p className="error">{errors.correo}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contrasena">Contraseña <span className="required">*</span></label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
          />
          {errors.contrasena && <p className="error">{errors.contrasena}</p>}
        </div>

        <button type="submit">Registrar</button>
        <button type="button" className="volver" onClick={handleBackClick}>Volver</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Registro;



