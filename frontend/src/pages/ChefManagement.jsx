import React, { useState, useEffect } from 'react';
import { getChefs, createChef } from '../services/api';

const ChefManagement = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', specialty: '', experienceYears: '' });

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const response = await getChefs();
      setChefs(response.data);
    } catch (err) {
      setError('Failed to load chefs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createChef({
        name: formData.name,
        specialty: formData.specialty,
        experienceYears: parseInt(formData.experienceYears)
      });
      setFormData({ name: '', specialty: '', experienceYears: '' });
      fetchChefs();
    } catch (err) {
      setError('Failed to create chef');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="chef-management">
      <h2>Gestion de chefs</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
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
      <ul>
        {chefs.map(chef => (
          <li key={chef.id}>
            {chef.name} - {chef.specialty} ({chef.experienceYears} Años)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChefManagement;