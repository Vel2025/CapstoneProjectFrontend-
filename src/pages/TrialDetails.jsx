import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TrialDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trial, setTrial] = useState(null);

  useEffect(() => {
    const fetchTrial = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trials/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTrial(response.data);
      } catch (error) {
        console.error('Error fetching trial:', error);
      }
    };
    fetchTrial();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/trials/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting trial:', error);
    }
  };

  if (!trial) return <div>Loading...</div>;

  return (
    <div className="trial-card">
      <h2>{trial.title}</h2>
      <p>Description: {trial.description}</p>
      <p>Status: {trial.status}</p>
      <p>Start Date: {new Date(trial.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(trial.endDate).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete Trial</button>
    </div>
  );
}

export default TrialDetails;