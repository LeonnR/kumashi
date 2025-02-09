import { useNavigate } from 'react-router-dom'
import kaitoVideo from '../assets/kaito-vid.mp4'  // Adjust the path based on your folder structure
import checkerBg from '../assets/checker-bg.png'  // Add this import
import { useState } from 'react'

function Checker() {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  
  const checkWallet = async () => {
    try {
      // Replace this URL with your published Google Sheets CSV URL
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTYwXYHNOUZP7QWlXkeA-8vmT0lH08aBIRNbwH7qpwRJL7o6h2BSujvsSi0xAVvsvNP2XE2mQsBru4I/pub?gid=0&single=true&output=csv');
      const csvText = await response.text();
      
      // Parse CSV and check if wallet exists
      const rows = csvText.split('\n').slice(1); // Skip header row
      const wallets = rows
        .filter(row => row.trim() !== '') // Skip empty rows
        .map(row => {
          const columns = row.split(',');
          // Check if column exists before accessing it
          if (columns.length >= 3 && columns[2]) {
            return columns[2].trim().toLowerCase();
          }
          return null;
        })
        .filter(wallet => wallet !== null); // Remove any null values
      
      const exists = wallets.includes(walletAddress.toLowerCase());
      setCheckResult(exists ? 'You are eligible' : 'Oops.. Warrior not recognized');
      
      // For debugging
      // console.log('Wallets:', wallets);
      // console.log('Checking wallet:', walletAddress.toLowerCase());
      // console.log('Result:', exists);
    } catch (error) {
      // console.error('Error checking wallet:', error);
      setCheckResult('Error checking wallet');
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <img 
        src={checkerBg}
        alt="Checker Background"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />
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
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address..."
          style={{
            width: '60%',
            padding: '15px',
            fontSize: '18px',
            borderRadius: '30px',
            border: 'none',
            marginBottom: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: 'black'
          }}
        />
        
        {checkResult && (
          <div style={{
            fontSize: '24px',
            marginBottom: '40px',
            color: checkResult === 'You are eligible' ? '#4CAF50' : '#f44336',
            fontWeight: 'bold'
          }}>
            {checkResult}
          </div>
        )}

        <div>
          <button 
            onClick={checkWallet}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            CHECK YOUR WALLET
          </button>
        </div>
      </div>

      <div 
        onClick={() => {
          sessionStorage.setItem('fromChecker', 'true');
          navigate('/');
        }}
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
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default Checker 