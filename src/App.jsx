import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './App.css'
import backgroundVideo from './assets/new-infinite-loop.mp4'  // Make sure this path is correct
// import backgroundVideo from './assets/background-video.mp4'  
import kumashiLogo from './assets/kumashi-logo.webp'  // Adjust path as needed        // Adjust path as needed
import kaitoImage3 from './assets/theKaito.png'
import kaitoNoGround from './assets/kaito-noground.webp'  // Make sure the path is correct
import templeImage from './assets/temple.png'
import Games from './pages/Games'
import xLogo from './assets/x-logo.webp'
import discordLogo from './assets/discord-logo.webp'
import miniKumashi from './assets/mini-kumashi.png'
import Checker from './pages/Checker'
import kumashiAudio from './assets/kumashi-audio.mp3'
import GamePlaceholder from './pages/GamePlaceholder'
// Initialize audio outside component
const globalAudio = new Audio(kumashiAudio);
globalAudio.loop = true;
// Add this line to make the audio instance globally accessible
window.globalAudio = globalAudio;

// Try to play immediately
globalAudio.play().catch(error => console.log('Initial autoplay prevented:', error));

function MainContent() {
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
  const [showChecker, setShowChecker] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [templeZIndex, setTempleZIndex] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const location = useLocation();
  const [skipIntro, setSkipIntro] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Add these SVG data URLs inside your component
  const soundOnIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z'/%3E%3C/svg%3E";
  
  const soundOffIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z'/%3E%3C/svg%3E";

  useEffect(() => {
    // Check if we're returning from Checker
    const fromChecker = sessionStorage.getItem('fromChecker') === 'true';
    if (fromChecker) {
      setSkipIntro(true);
      setHasStarted(true);
      setIsVisible(false);
      setIsLogoVisible(false);
      setShowOutline(true);
      setShowTemple(true);
      setShowWatchMV(true);
      setShowSocials(true);
      setShowChecker(true);
      sessionStorage.removeItem('fromChecker');  // Clear the flag after using it
    }
  }, []); // Run only on mount

  useEffect(() => {
    // Only set up timers after Enter is pressed
    if (hasStarted) {
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
        }, 2000),

        showChecker: setTimeout(() => {
          setShowChecker(true);
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
    }
  }, [hasStarted]); // Now depends on hasStarted

  useEffect(() => {
    // Try to play on component mount if it's not already playing
    if (isSoundOn && globalAudio.paused) {
      globalAudio.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }

    // Add click event listener for browsers that block autoplay
    const handleUserInteraction = async () => {
      if (isSoundOn && globalAudio.paused) {
        try {
          await globalAudio.play();
        } catch (error) {
          console.log('Play failed:', error);
        }
      }
    };

    document.addEventListener('click', handleUserInteraction);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [isSoundOn]); // Add isSoundOn as dependency

  const toggleSound = () => {
    if (isSoundOn) {
      globalAudio.pause();
    } else {
      globalAudio.play().catch(console.error);
    }
    setIsSoundOn(!isSoundOn);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTempleZIndex(8);
    }, 2700);
    return () => clearTimeout(timer);
  }, []);

  // Change keyboard event to click event
  useEffect(() => {
    const handleClick = () => {
      if (!hasStarted) {
        setHasStarted(true);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [hasStarted]);

  // Add this useEffect to detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Check on initial load
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ 
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>
      {/* Add mobile warning overlay */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: '24px',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            Please Open on Desktop
          </h2>
          <p style={{ 
            fontSize: '16px',
            lineHeight: '1.5',
            maxWidth: '80%'
          }}>
            This experience is designed for desktop viewing. Please visit us on your laptop or computer for the best experience.
          </p>
        </div>
      )}

      {/* Show if not started and not skipping intro */}
      {!hasStarted && !skipIntro && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 11,
          opacity: hasStarted ? 0 : 1,
          transition: 'opacity 1.5s ease',
          pointerEvents: hasStarted ? 'none' : 'auto'
        }} />
      )}

      {/* Show if not started and not skipping intro */}
      {!hasStarted && !skipIntro && (
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '0',
          right: '0',
          margin: '0 auto',
          color: 'white',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontFamily: 'Bold Ink, sans-serif',
          fontWeight: 'bold',
          textAlign: 'center',
          zIndex: 12,
          textShadow: '0 0 10px rgba(0,0,0,0.5)',
          animation: 'pulse 2s infinite',
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{
            width: 'fit-content'
          }}>
            Press anywhere on the screen to start
          </span>
        </div>
      )}

      <div style={{
        position: 'absolute',
        top: 'clamp(17px, 3.4vh, 34px)',  // Reduced these values even further
        right: 'clamp(10px, 2vw, 20px)',
        zIndex: 11,
        opacity: showSocials ? 1 : 0,
        transition: 'opacity 1s ease-in',
        pointerEvents: showSocials ? 'auto' : 'none'
      }}>
        <button
          onClick={toggleSound}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '15px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.querySelector('img').style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.querySelector('img').style.opacity = '0.6';
          }}
        >
          <img
            src={isSoundOn ? soundOnIcon : soundOffIcon}
            alt={isSoundOn ? "Sound On" : "Sound Off"}
            style={{
              width: '45px',
              height: '45px',
              filter: 'brightness(0.8) invert(1)',
              opacity: '0.6',  // Default opacity
              transition: 'opacity 0.3s ease'  // Smooth opacity transition
            }}
          />
        </button>
      </div>

      <div style={{
        position: 'absolute',
        top: 'clamp(20px, 4vh, 40px)',
        left: 'clamp(5%, 10%, 15%)',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(20px, 4vw, 80px)',
        alignItems: 'center',
        zIndex: 10,
        opacity: showSocials ? 1 : 0,
        transition: 'opacity 1s ease-in',
        pointerEvents: showSocials ? 'auto' : 'none'
      }}>
        <img 
          src={miniKumashi} 
          alt="Mini Kumashi"
          style={{
            width: 'clamp(40px, 6vw, 80px)',
            height: 'clamp(40px, 6vw, 80px)',
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
          onClick={() => window.location.reload()}
        />
        <img 
          src={xLogo} 
          alt="X (Twitter)"
          style={{
            width: 'clamp(20px, 3vw, 40px)',
            height: 'clamp(20px, 3vw, 40px)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          onClick={() => window.open('https://x.com/KumashiBera?t=eYJ4zY8AAoMnxMRfSJ1buw&s=09', '_blank')}
        />
        <img 
          src={discordLogo} 
          alt="Discord"
          style={{
            width: 'clamp(25px, 3.5vw, 50px)',
            height: 'clamp(20px, 3vw, 40px)',
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
          bottom: 'clamp(30%, 40%, 50%)',
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
            kaitoOutline.style.filter = 'brightness(0.5) drop-shadow(0 0 8px white)';
          }
        }}
      >
        <div 
        onClick={() => navigate('/games')}
        style={{
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

      <div 
        style={{
          position: 'absolute',
          right: '30%',
          top: 'clamp(20%, 25%, 30%)',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          opacity: showWatchMV ? 1 : 0,  // Controls fade in
          pointerEvents: showWatchMV ? 'auto' : 'none',
          transform: `translateX(calc(-3% + ${mousePosition.x * -35}%))`,
          transition: 'all 0.2s ease, opacity 1s ease-in',  // Added opacity transition
        }}
        onMouseEnter={() => setIsTempleHovered(true)}
        onMouseLeave={() => setIsTempleHovered(false)}
      >
        <div style={{
          width: '120px',
          height: '2px',
          background: 'black',
          position: 'absolute',
          right: '100%',
          transform: 'rotate(0deg)',
          opacity: showWatchMV ? 1 : 0,  // Added fade in for line
          transition: 'opacity 1s ease-in'  // Added transition for line
        }}/>
        <div 
          onClick={() => navigate('/game-placeholder')}
          style={{
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
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}>
          BATTLE
        </div>
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: 'min(110vw, 110%)',
          height: '100%',
          objectFit: 'cover',
          zIndex: '0',
          transform: `translateX(calc(-4% + ${mousePosition.x * -2}%))`,
          transition: 'transform 0.2s ease',
          willChange: 'transform',
        }}
        onError={(e) => {
          console.error('Video error:', e);
          // Attempt to recover by reloading the video
          e.target.load();
        }}
      >
        <source src={backgroundVideo} type="video/webm" />
        <source src={backgroundVideo.replace('.webm', '.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
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
          onClick={() => navigate('/games')}
          onMouseEnter={() => {
            const kaitoOutline = document.querySelector('.kaito-outline');
            if (kaitoOutline) {
              kaitoOutline.style.filter = 'brightness(1.2) drop-shadow(0 0 8px white)';
            }
          }}
          onMouseLeave={() => {
            const kaitoOutline = document.querySelector('.kaito-outline');
            if (kaitoOutline) {
              kaitoOutline.style.filter = 'brightness(0.5) drop-shadow(0 0 8px white)';
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
          top: '3%',
          right: '37%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: templeZIndex,
          transition: 'opacity 1s ease-in',
          pointerEvents: showTemple ? 'auto' : 'none'
        }}>
        <img 
          onClick={() => navigate('/game-placeholder')}
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
            cursor: 'pointer',
            height: '35vh',  // Viewport-based height
            width: 'auto',
            transform: `translateX(calc(-3% + ${mousePosition.x * -10}%))`,
            transition: 'all 0.2s ease',
            filter: isTempleHovered 
              ? 'brightness(1) drop-shadow(0 0 8px white)'
              : 'brightness(0.7) drop-shadow(0 0 10px rgba(0, 162, 255, 0.5))',
            opacity: 1,
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

      {isVisible && !skipIntro && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '9',
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

      {isVisible && !skipIntro && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: '5%',
          zIndex: '10',
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

      <div style={{
        position: 'absolute',
        top: 'clamp(15px, 3vh, 30px)',  // Reduced these values even further
        right: 'clamp(100px, 15vw, 200px)',
        zIndex: 10,
        opacity: showChecker ? 1 : 0,
        transition: 'opacity 1s ease-in',
        pointerEvents: showChecker ? 'auto' : 'none'
      }}>
        <button
          style={{
            position: 'relative',
            padding: 'clamp(10px, 2vh, 15px) clamp(20px, 3vw, 30px)',
            border: 'none',
            fontSize: 'clamp(30px, 4vw, 40px)',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            color: 'rgba(255, 255, 255, 0.6)',
            background: 'none',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.color = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.color = 'rgba(255, 255, 255, 0.6)';
          }}
          onClick={() => {
            console.log('Checker clicked');
            navigate('/checker');
          }}
        >
          CHECKER ➤
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames="page"
      >
        <Routes location={location}>
          <Route path="/" element={<MainContent />} />
          <Route path="/games" element={<Games />} />
          <Route path="/checker" element={<Checker />} />
          <Route path="/game-placeholder" element={<GamePlaceholder />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App
