import { useNavigate } from 'react-router-dom'
import kaitoVideo from '../assets/kaito-vid.mp4'  // Adjust the path based on your folder structure

function Checker() {
  const navigate = useNavigate();
//   const handleVideoLoad = (e) => {
//     const video = e.target;
//     video.play().catch(err => console.log('Playback failed:', err));
//   };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: `url('/src/assets/checker-bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '64px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          CHECK YOUR WALLET!
        </h1>
        <p style={{
          fontSize: '24px',
          marginBottom: '40px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          Join the fight against Onikuma! Prove your worth with this wallet checker
        </p>
        <input 
          type="text"
          placeholder="Enter wallet address..."
          style={{
            width: '60%',
            padding: '15px',
            fontSize: '18px',
            borderRadius: '30px',
            border: 'none',
            marginBottom: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        />
        <div>
          <button style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '15px 40px',
            fontSize: '20px',
            borderRadius: '30px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
          >
            CHECK YOUR WALLET
          </button>
        </div>
      </div>

      <div 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          bottom: '130px',
          left: '200px',
          zIndex: 10
        }}
      >
        <button
          style={{
            background: 'white',
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
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default Checker 