import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapIcon from '../icons/map.webp'

const BasePage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToMap = () => {
    navigate('/test-two/'); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Home Base</h1>
      <p>This is your base overview page.</p>
      <button
        onClick={handleReturnToMap}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#FFD700',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          src={mapIcon}
          style={{ width: '32px', height: '32px' }}
        />
      </button>
    </div>
  );
};

export default BasePage;
