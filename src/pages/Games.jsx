import kaitoVideo from '../assets/kaito-vid.mp4'  // Adjust the path based on your folder structure

function Games() {
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
    </div>
  )
}

export default Games 