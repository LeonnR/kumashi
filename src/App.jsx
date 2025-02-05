import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import backgroundVideo from './assets/background-video.mp4'  // Make sure this path is correct
import kumashiLogo from './assets/kumashi-logo.webp'  // Adjust path as needed        // Adjust path as needed
import kaitoImage3 from './assets/theKaito.png'
import kaitoNoGround from './assets/kaito-noground.webp'  // Make sure the path is correct
import templeImage from './assets/temple.png'
import Games from './pages/Games'
import xLogo from './assets/x-logo.webp'
import discordLogo from './assets/discord-logo.webp'
import miniKumashi from './assets/mini-kumashi.png'

function MainContent() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLogoVisible, setIsLogoVisible] = useState(false)  // New state for logo visibility
  const [showOutline, setShowOutline] = useState(false)  // new state for outline element
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTemple, setShowTemple] = useState(false);  // new state for temple
  const [showWatchMV, setShowWatchMV] = useState(false);  // Add this new state
  const [isHovered, setIsHovered] = useState(false);
  const [isTempleHovered, setIsTempleHovered] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  useEffect(() => {
    const timers = {
      show: setTimeout(() => {
        setIsVisible(true);
        setIsLogoVisible(true);
      }, 700),
      
      fadeLogoAndShow: setTimeout(() => {
        setIsLogoVisible(false);
        setShowOutline(true);
        setShowTemple(true);
        setShowWatchMV(true);
      }, 2000),
      
      hide: setTimeout(() => {
        setIsVisible(false);
      }, 5000),

      showSocials: setTimeout(() => {
        setShowSocials(true);
      }, 2000)
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      Object.values(timers).forEach(timer => clearTimeout(timer));
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ 
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '300px',
        alignItems: 'center',
        zIndex: 10,
        opacity: showSocials ? 1 : 0,
        transition: 'opacity 1s ease-in',
        pointerEvents: showSocials ? 'auto' : 'none'
      }}>
        <img 
          src={xLogo} 
          alt="X (Twitter)"
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            filter: 'brightness(0.8)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.filter = 'brightness(1.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(0.8)';
          }}
          onClick={() => window.open('https://x.com/KumashiBera?t=eYJ4zY8AAoMnxMRfSJ1buw&s=09', '_blank')}
        />
        <img 
          src={miniKumashi} 
          alt="Mini Kumashi"
          style={{
            width: '80px',
            height: '80px',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          onClick={() => window.location.reload()}
        />
        <img 
          src={discordLogo} 
          alt="Discord"
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            filter: 'brightness(0.8)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.filter = 'brightness(1.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(0.8)';
          }}
          onClick={() => window.open('https://discord.gg/kumashi', '_blank')}
        />
      </div>

      <div 
        style={{
          position: 'absolute',
          left: '35%',
          bottom: '40%',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          opacity: showWatchMV ? 1 : 0,
          transition: 'all 0.5s ease-in',
          pointerEvents: showWatchMV ? 'auto' : 'none',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
        onMouseEnter={() => {
          const kaitoOutline = document.querySelector('.kaito-outline');
          if (kaitoOutline) {
            kaitoOutline.style.filter = 'brightness(1.2) drop-shadow(0 0 8px white)';
          }
        }}
        onMouseLeave={() => {
          const kaitoOutline = document.querySelector('.kaito-outline');
          if (kaitoOutline) {
            kaitoOutline.style.filter = 'none';
          }
        }}
      >
        <div style={{
          background: 'white',
          padding: '10px 20px',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'black',
          boxShadow: isHovered ? '0 0 15px rgba(255,255,255,0.5)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          WATCH MV
          <div style={{
            width: '80px',
            height: '2px',
            background: 'black',
            position: 'absolute',
            left: '100%',
            transform: 'rotate(0deg)'
          }}/>
        </div>
      </div>

      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '110%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '0',
          transform: `translateX(calc(-4% + ${mousePosition.x * -2}%))`,
          transition: 'transform 0.2s ease',
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '5',
          opacity: showOutline ? 1 : 0,
          transition: 'opacity 1s ease-in',
          pointerEvents: showOutline ? 'auto' : 'none'
        }}>
        <img 
          onClick={() => window.open('/games', '_blank', 'noopener,noreferrer')}
          onMouseEnter={() => {
            const kaitoOutline = document.querySelector('.kaito-outline');
            if (kaitoOutline) {
              kaitoOutline.style.filter = 'brightness(1.2) drop-shadow(0 0 8px white)';
            }
          }}
          onMouseLeave={() => {
            const kaitoOutline = document.querySelector('.kaito-outline');
            if (kaitoOutline) {
              kaitoOutline.style.filter = 'none';
            }
          }}
          src={kaitoNoGround} 
          alt="Kaito Front Layer"
          className="kaito-outline"
        />
      </div>

      <div 
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          zIndex: '8',
          opacity: showTemple ? 1 : 0,
          transition: 'opacity 1s ease-in',
          pointerEvents: showTemple ? 'auto' : 'none'
        }}>
        <img 
          onClick={() => navigate('/games')}
          onMouseEnter={() => {
            console.log('Mouse entered temple');
            setIsTempleHovered(true);
          }}
          onMouseLeave={() => {
            console.log('Mouse left temple');
            setIsTempleHovered(false);
          }}
          src={templeImage} 
          alt="Temple"
          style={{
            width: 'auto',
            height: '35vh',
            marginTop: '3.5vh',
            marginLeft: '44.2vw',
            cursor: 'pointer',
            transform: `translateX(calc(-10% + ${mousePosition.x * -10}%))`,
            transition: 'all 0.2s ease',
            filter: isTempleHovered 
              ? 'brightness(1) drop-shadow(0 0 8px white)'
              : 'brightness(0.5) drop-shadow(0 0 10px rgba(0, 162, 255, 0.5))',
            opacity: isTempleHovered ? 0.8 : 1,
            pointerEvents: showTemple ? 'auto' : 'none',
          }}
        />
      </div>

      <div 
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '1',
      }}>
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '20vh',
            height: '45vh',
            cursor: 'pointer',
            zIndex: 10,
          }}
        />
        <img 
          src={kaitoImage3} 
          alt="Kaito Background"
          style={{
            maxHeight: '55vh',
            width: 'auto',
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {isVisible && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '2',
          opacity: isLogoVisible ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }}>
          <img 
            src={kumashiLogo} 
            alt="Kumashi Logo"
            style={{
              maxWidth: '90%',
              height: 'auto',
            }}
          />
        </div>
      )}

      {isVisible && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: '5%',
          zIndex: '3',
        }}>
          <img 
            src={kaitoImage3} 
            alt="Kaito Foreground"
            style={{
              maxHeight: '55vh',
              width: 'auto',
              bottom: '0',
              position: 'absolute'
            }}
          />
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </Router>
  )
}

export default App
