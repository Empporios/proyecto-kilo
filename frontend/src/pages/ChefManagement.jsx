import React, { useState, useEffect } from 'react';
// Importa las funciones que van a hablar con la API (la base de datos)
import { getChefs, createChef } from '../services/api';

const ChefManagement = () => {
  // --- 1. ESTADO DEL COMPONENTE ---
  // 'useState' es la "memoria" de este componente.
  // 'chefs' guarda la lista de chefs que traemos de la API.
  const [chefs, setChefs] = useState([]);
  // 'loading' y 'error' son para controlar lo que ve el usuario (si está cargando o si falló algo).
  const [loading, setLoading] = useState(true); // Empieza en 'true' para que muestre "Loading..."
  const [error, setError] = useState('');
  // 'formData' es un objeto que guarda lo que el usuario escribe en el formulario.
  const [formData, setFormData] = useState({ name: '', specialty: '', experienceYears: '' });

  // --- 2. EFECTO DE CARGA ---
  // 'useEffect' se usa para hacer algo cuando el componente carga.
  // Como tiene '[]' al final, esto se ejecuta SÓLO UNA VEZ,
  // justo cuando el componente aparece en pantalla.
  useEffect(() => {
    // Llama a la función para traer los datos de la API.
    fetchChefs();
  }, []);

  // Función que trae los datos de la API
  const fetchChefs = async () => {
    try {
      const response = await getChefs();
      setChefs(response.data); // Guarda los chefs en el estado
    } catch (err) {
      setError('Failed to load chefs'); // Guarda el error si algo falla
    } finally {
      setLoading(false); // Quita el "Loading..." (haya funcionado o no)
    }
  };

  // --- 3. MANEJO DEL FORMULARIO (SUBMIT) ---
  // Esta función se llama cuando el usuario le da "submit" al formulario.
  const handleSubmit = async (e) => {
    // ¡Súper importante! Evita que la página se recargue sola.
    e.preventDefault();
    try {
      // Llama a la API para crear el chef nuevo
      await createChef({
        name: formData.name,
        specialty: formData.specialty,
        experienceYears: parseInt(formData.experienceYears) // Convierte a número
      });
      // Limpia el formulario
      setFormData({ name: '', specialty: '', experienceYears: '' });
      // ¡Vuelve a cargar la lista de chefs para que se vea el nuevo!
      fetchChefs();
    } catch (err) {
      setError('Failed to create chef');
    }
  };

  // --- 4. RENDERIZADO CONDICIONAL ---
  // Esto decide qué mostrar. Si está cargando, muestra "Loading...".
  if (loading) return <div>Loading...</div>;
  // Si hay un error, muestra el error.
  if (error) return <div className="error">{error}</div>;

  // Si no está cargando y no hay error, muestra la página completa:
  return (
    <div className="chef-management">
      <h2>Gestion de chefs</h2>
      {/* El 'onSubmit' llama a nuestra función 'handleSubmit' */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          // --- 5. INPUTS CONTROLADOS (CLAVE) ---
          // 'value' conecta el valor del input al estado 'formData'
          value={formData.name}
          // 'onChange' actualiza el estado 'formData' CADA VEZ que el usuario escribe.
          // '...formData' es para copiar lo que ya había (specialty, etc.)
          // y solo cambiar el 'name'.
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Especialidad"
          value={formData.specialty}
          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Años de experiencia "
          value={formData.experienceYears}
          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
          required
          min="0"
        />
        <button type="submit">Crear registro</button>
      </form>
      <h3>Chefs existentes</h3>
      {/* --- 6. RENDERIZADO DE LA LISTA --- */}
      <ul>
        {/* '.map()' recorre el array 'chefs' del estado y crea un <li> por cada uno. */}
        {chefs.map(chef => (
          // 'key' es obligatorio para que React sepa cuál es cuál.
          <li key={chef.id}>
            {chef.name} - {chef.specialty} ({chef.experienceYears} Años)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChefManagement;