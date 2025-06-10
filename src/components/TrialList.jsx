import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TrialList() {
  const [trials, setTrials] = useState([]);

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trials', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTrials(response.data);
      } catch (error) {
        console.error('Error fetching trials:', error);
      }
    };
    fetchTrials();
  }, []);

  return (
    <div>
      <h2>Clinical Trials</h2>
      {trials.map(trial => (
        <div key={trial._id} className="trial-card">
          <h3>{trial.title}</h3>
          <p>Status: {trial.status}</p>
          <Link to={`/trial/${trial._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default TrialList;