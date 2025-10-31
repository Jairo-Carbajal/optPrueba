import React, { useState } from "react";
import axios from "axios";
import "./editar.css";
import { Link, useNavigate } from "react-router-dom";

function Editar() {
  const [form, setForm] = useState({
    cliente: "",
    modelo: "",
    patente: "",
    telefono: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/registros", form);

      // ✅ Ahora solo pasamos un estado al volver
      navigate("/registro_autos", { state: { nuevo: true, mensaje: "✅ Registro agregado correctamente" } });

    } catch (error) {
      console.error("Error al agregar registro:", error);
      navigate("/registro_autos", { state: { error: "❌ Error al agregar registro" } });
    }
  };

  return (
    <div className="overlay">
      <div className="ventana-form">
        <h2>Añadir Registro</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre del Cliente</label>
          <input
            type="text"
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            required
          />

          <label>Modelo del Vehículo</label>
          <input
            type="text"
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            required
          />

          <label>Patente</label>
          <input
            type="text"
            name="patente"
            value={form.patente}
            onChange={handleChange}
            required
          />

          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
          />

          <div className="botones">
            <Link to="/registro_autos" style={{ textDecoration: "none" }}>
              <button type="button" className="cancelar">
                Cancelar
              </button>
            </Link>
            <button type="submit" className="confirmar">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editar;
