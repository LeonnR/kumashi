import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import backgroundVideo from './assets/background-video.mp4'  // Make sure this path is correct
import kumashiLogo from './assets/kumashi-logo.webp'  // Adjust path as needed        // Adjust path as needed
import kaitoImage3 from './assets/theKaito.png'
import kaitoNoGround from './assets/kaito-noground.webp'  // Make sure the path is correct
import templeImage from './assets/temple.webp'
import Games from './pages/Games'

function MainContent() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLogoVisible, setIsLogoVisible] = useState(false)  // New state for logo visibility
  const [showOutline, setShowOutline] = useState(false)  // new state for outline element
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTemple, setShowTemple] = useState(false);  // new state for temple

  useEffect(() => {
    // Show elements after 2 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
      setIsLogoVisible(true)
    }, 2000)

    // Start fading logo after 4 seconds
    const startFadeTimer = setTimeout(() => {
      setIsLogoVisible(false)
    }, 4000)

    // Remove elements after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    const handleMouseMove = (e) => {
      // Calculate mouse position as percentage of window width
      const x = (e.clientX / window.innerWidth - 0.5) * 1.5; // Will give us -1 to 1
      // Clamp the value between -1 and 0.2 (limiting right movement)
      const clampedX = Math.max(-1, Math.min(0.6, x));
      setMousePosition({ x: clampedX });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(showTimer)
      clearTimeout(startFadeTimer)
      clearTimeout(hideTimer)
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [])

  // New separate useEffect for outline element
  useEffect(() => {
    const outlineTimer = setTimeout(() => {
      setShowOutline(true);
    }, 5000);

    return () => {
      clearTimeout(outlineTimer);
    };
  }, []);

  // Add new useEffect for temple
  useEffect(() => {
    const templeTimer = setTimeout(() => {
      setShowTemple(true);
    }, 5000);  // Show at the same time as the outline

    return () => {
      clearTimeout(templeTimer);
    };
  }, []);

  console.log('Video path:', backgroundVideo)

  return (
    <div style={{ 
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>
      {/* Background video - changed z-index */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '120%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '0',
          transform: `translateX(calc(-10% + ${mousePosition.x * -10}%))`,
          transition: 'transform 0.2s ease',
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Only render when showOutline is true */}
      {showOutline && (
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
            transition: 'opacity 0.3s ease-in',
          }}>
          <img 
            onClick={() => window.open('/games', '_blank', 'noopener,noreferrer')}
            src={kaitoNoGround} 
            alt="Kaito Front Layer"
            className="kaito-outline"
          />
        </div>
      )}

      {/* Temple Layer */}
      {showTemple && (
        <div 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: '1',
            opacity: showTemple ? 1 : 0,
            transition: 'opacity 0.3s ease-in',
          }}>
          <img 
            onClick={() => navigate('/games')}
            src={templeImage} 
            alt="Temple"
            className="temple-image"
            style={{
              width: 'auto',
              height: '105vh',
              marginTop: '-2vh',
              marginLeft: '-4vw',
              cursor: 'pointer',
              transform: `translateX(${mousePosition.x * -10}%)`,
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
      )}

      {/* Background Kaito */}
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

      {/* Kumashi Logo */}
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

      {/* Foreground Kaito */}
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
