// import Login from '@/Components/Login'

// export default function Home() {
  
//   const Styles = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     width: '100vw',
//     backgroundColor: '#0f0f0f',
//     color: 'white', 
//     flexDirection: 'column',
//     overflow: 'hidden',
//     backgroundImage: 'radial-gradient(circle, #1f1f1f, #0f0f0f)', // Subtle dark gradient
//     background: `url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png"), linear-gradient(to bottom right, #0d0d0d, #1a1a1a)`, // Pattern overlay with subtle gradient
//     backgroundSize: 'cover',
//   };

//   return (
//     <div style={Styles}>
//       <h1>OTP Verification Cyber Security 21BIT0662</h1>
//       <Login />
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import Login from '@/Components/Login'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"
        style={{
          backgroundSize: '4px 4px',
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent"
        style={{
          backgroundPosition: `${mousePosition.x}px ${mousePosition.y}px`,
          backgroundSize: '600px 600px',
        }}
      />
      <div className="z-10 space-y-8 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Secure Auth System with OTP and timeout
        </h1>
        <Login />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] w-[100px] animate-pulse bg-blue-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}


// 2A7EZU7J77BDLLKBQXYFLVET