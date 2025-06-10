import { useState } from 'react';
import axios from 'axios';

function TrialForm({ setTrials }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Recruiting',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/trials', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTrials(prev => [...prev, response.data]);
      setFormData({ title: '', description: '', status: 'Recruiting', startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error creating trial:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Trial</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Trial Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Recruiting">Recruiting</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Trial</button>
      </form>
    </div>
  );
}

export default TrialForm;