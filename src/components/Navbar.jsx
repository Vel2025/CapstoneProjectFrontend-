import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  console.log('isAuthenticated:', isAuthenticated); // Debug log

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link> {/* Add Register link */}
        </>
      )}
    </nav>
  );
}

export default Navbar;