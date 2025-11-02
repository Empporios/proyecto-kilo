// Importaciones necesarias para el componente ChefManagement
// React y hooks para manejar estado y efectos secundarios
import React, { useState, useEffect } from 'react';
// Funciones de la API para obtener y crear chefs
import { getChefs, createChef } from '../services/api';

// Componente funcional para gestionar chefs
// Maneja el estado de la lista de chefs, carga y errores
const ChefManagement = () => {
  // Estado para almacenar la lista de chefs obtenidos de la API
  const [chefs, setChefs] = useState([]);
  // Estado para mostrar indicador de carga mientras se obtienen datos
  const [loading, setLoading] = useState(true);
  // Estado para manejar mensajes de error
  const [error, setError] = useState('');
  // Estado para los datos del formulario de creación de chef
  const [formData, setFormData] = useState({ name: '', specialty: '', experienceYears: '' });

  // Hook useEffect para cargar chefs al montar el componente
  // Se ejecuta solo una vez cuando el componente se monta
  useEffect(() => {
    fetchChefs();
  }, []);

  // Función asíncrona para obtener la lista de chefs desde la API
  // Maneja errores y actualiza el estado correspondiente
  const fetchChefs = async () => {
    try {
      // Llama a la función de la API para obtener chefs
      const response = await getChefs();
      // Actualiza el estado con los datos obtenidos
      setChefs(response.data);
    } catch (err) {
      // En caso de error, establece mensaje de error
      setError('Failed to load chefs');
    } finally {
      // Siempre oculta el indicador de carga al finalizar
      setLoading(false);
    }
  };

  // Función para manejar el envío del formulario de creación de chef
  // Previene recarga de página y maneja la creación asíncronamente
  const handleSubmit = async (e) => {
    // Previene el comportamiento por defecto del formulario
    e.preventDefault();
    try {
      // Llama a la API para crear un nuevo chef con los datos del formulario
      await createChef({
        name: formData.name,
        specialty: formData.specialty,
        // Convierte años de experiencia a número entero
        experienceYears: parseInt(formData.experienceYears)
      });
      // Limpia el formulario después de crear exitosamente
      setFormData({ name: '', specialty: '', experienceYears: '' });
      // Recarga la lista de chefs para mostrar el nuevo
      fetchChefs();
    } catch (err) {
      // Establece mensaje de error si falla la creación
      setError('Failed to create chef');
    }
  };

  // Renderizado condicional: muestra indicador de carga mientras se obtienen datos
  if (loading) return <div>Loading...</div>;
  // Renderizado condicional: muestra mensaje de error si ocurrió algún problema
  if (error) return <div className="error">{error}</div>;

  // Renderizado del componente principal
  return (
    // Contenedor principal con clase CSS para estilos
    <div className="chef-management">
      // Título de la página de gestión de chefs
      <h2>Gestion de chefs</h2>
      // Formulario para crear nuevos chefs
      <form onSubmit={handleSubmit}>
        // Campo de entrada para el nombre del chef
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          // Actualiza el estado del formulario al cambiar el valor
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        // Campo de entrada para la especialidad del chef
        <input
          type="text"
          placeholder="Especialidad"
          value={formData.specialty}
          // Actualiza el estado del formulario al cambiar el valor
          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
          required
        />
        // Campo numérico para años de experiencia
        <input
          type="number"
          placeholder="Años de experiencia "
          value={formData.experienceYears}
          // Actualiza el estado del formulario al cambiar el valor
          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
          required
          min="0"
        />
        // Botón para enviar el formulario y crear el chef
        <button type="submit">Crear registro</button>
      </form>
      // Título de la sección de chefs existentes
      <h3>Chefs existentes</h3>
      // Lista no ordenada para mostrar los chefs
      <ul>
        // Mapea cada chef a un elemento de lista
        {chefs.map(chef => (
          // Cada elemento debe tener una key única para React
          <li key={chef.id}>
            // Muestra nombre, especialidad y años de experiencia del chef
            {chef.name} - {chef.specialty} ({chef.experienceYears} Años)
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exportación por defecto del componente ChefManagement
// Permite que este componente sea importado en App.jsx para el enrutamiento
export default ChefManagement;