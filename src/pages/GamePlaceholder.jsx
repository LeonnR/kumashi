import { useNavigate } from 'react-router-dom'
import gamePlaceholder from '../assets/game-placeholder.webp'

function GamePlaceholder() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000'  
    }}>
      <img 
        src={gamePlaceholder}
        alt="Game Placeholder"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '40px',
          zIndex: 10
        }}
      >
        <button
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            padding: '15px 30px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            color: 'black'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
          }}
          onClick={() => {
            sessionStorage.setItem('fromChecker', 'true');
            navigate('/');
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default GamePlaceholder
