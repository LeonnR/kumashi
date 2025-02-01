import { useState, useEffect } from 'react'
import './App.css'
import backgroundVideo from './assets/background-video.mp4'  // Make sure this path is correct
import kumashiLogo from './assets/kumashi-logo.webp'  // Adjust path as needed
import kaitoImage from './assets/kaito.webp'          // Adjust path as needed

function App() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show elements after 2 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    // Hide elements after 5 seconds (2s initial delay + 3s visible time)
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    // Cleanup timeouts on component unmount
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

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
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '0'  // Changed from -1 to 0
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Background Kaito */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1'
      }}>
        <img 
          src={kaitoImage} 
          alt="Kaito Background"
          style={{
            // opacity: '0.3',
            maxHeight: '80vh',
            width: 'auto',
            bottom: '0',
            position: 'absolute'
          }}
        />
      </div>

      {/* Kumashi Logo with fade-in/out */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '2',
        opacity: isVisible ? 1 : 0,
        // Only apply transition when disappearing
        transition: isVisible ? 'none' : 'opacity 1s ease-in-out',
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

      {/* Foreground Kaito with fade-in/out */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '5%',
        zIndex: '3',
        opacity: isVisible ? 1 : 0,
        transition: isVisible ? 'none' : 'opacity 5s ease-in-out',
      }}>
        <img 
          src={kaitoImage} 
          alt="Kaito Foreground"
          style={{
            maxHeight: '80vh',
            width: 'auto',
            bottom: '0',
            position: 'absolute'
          }}
        />
      </div>
    </div>
  )
}

export default App
