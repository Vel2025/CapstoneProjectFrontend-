import TrialList from '../components/TrialList';
import TrialForm from '../components/TrialForm';
import { useState } from 'react';

function Dashboard() {
  const [trials, setTrials] = useState([]);

  return (
    <div>
      <h1>Dashboard</h1>
      <TrialForm setTrials={setTrials} />
      <TrialList />
    </div>
  );
}

export default Dashboard;