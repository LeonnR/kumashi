import { useNavigate } from 'react-router-dom'
import kaitoVideo from '../assets/kaito-vid.mp4'  // Adjust the path based on your folder structure

function Games() {
  const navigate = useNavigate();
  const handleVideoLoad = (e) => {
    const video = e.target;
    video.play().catch(err => console.log('Playback failed:', err));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000', overflow: 'hidden' }}>
      <a href={kaitoVideo} target="_blank" rel="noopener noreferrer">
        <video
          autoPlay
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          style={{
            minWidth: '100vw',
            minHeight: '100vh',
            objectFit: 'cover',
            position: 'fixed',
            top: 0,
            left: 0,
            cursor: 'pointer'
          }}
        >
          <source src={kaitoVideo} type="video/mp4" />
        </video>
      </a>

      <div 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '40px',
          zIndex: 10
        }}
      >
        <button
          style={{
            background: 'rgba(255, 255, 255, 0.7)',  // Semi-transparent white background
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
            color: 'black'  // Text stays fully opaque
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
            e.target.style.background = 'rgba(255, 255, 255, 1)';  // Fully opaque on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            e.target.style.background = 'rgba(255, 255, 255, 0.6)';  // Back to semi-transparent
          }}
        >
          ← Back
        </button>
      </div>
    </div>
    
  )
}

export default Games 