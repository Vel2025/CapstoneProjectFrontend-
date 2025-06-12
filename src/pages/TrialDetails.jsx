import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TrialDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trial, setTrial] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Recruiting',
    startDate: '',
    endDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTrial = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/trials/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTrial(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          startDate: response.data.startDate.slice(0, 10), // Format for input type="date"
          endDate: response.data.endDate.slice(0, 10)
        });
      } catch (error) {
        console.error('Error fetching trial:', error.response?.data, error.response?.status, error.message);
      }
    };
    fetchTrial();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/trials/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTrial(response.data);
      setIsEditing(false);
      alert('Trial updated successfully!');
    } catch (error) {
      console.error('Error updating trial:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/trials/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Trial deleted');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting trial:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  };

  if (!trial) return <div>Loading...</div>;

  return (
    <div className="trial-card">
      {isEditing ? (
        <div className="form-container">
          <h2>Update Trial</h2>
          <form onSubmit={handleUpdate}>
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
            <button type="submit">Update Trial</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <>
          <h2>{trial.title}</h2>
          <p>Description: {trial.description}</p>
          <p>Status: {trial.status}</p>
          <p>Start Date: {new Date(trial.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(trial.endDate).toLocaleDateString()}</p>
          <button onClick={() => setIsEditing(true)}>Edit Trial</button>
          <button onClick={handleDelete}>Delete Trial</button>
        </>
      )}
    </div>
  );
}

export default TrialDetails;