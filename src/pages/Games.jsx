import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import kaitoVideo from '../assets/kaito-vid.mp4';

function Games() {
  const navigate = useNavigate();

  useEffect(() => {
    // Access the global audio instance directly from window
    const globalAudio = window.globalAudio;
    if (globalAudio) {
      globalAudio.pause();  // Pause the background music
    }

    // Cleanup function to resume audio when leaving the page
    return () => {
      if (globalAudio && !globalAudio.paused) {  // Only play if it wasn't paused by the sound toggle
        globalAudio.play().catch(error => console.log('Play failed:', error));
      }
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      backgroundColor: 'black',
      overflow: 'hidden'
    }}>
      <button
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
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
          zIndex: 10,
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

      <video
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      >
        <source src={kaitoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Games; 