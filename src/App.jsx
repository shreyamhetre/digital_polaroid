import { useState } from 'react'
import Header from './components/layout/Header.jsx'
import Hero from './components/home/Hero.jsx'
import CaptureScreen from './components/capture/CaptureScreen.jsx'
import EditorScreen from './components/editor/EditorScreen.jsx'

function App() {
  const [step, setStep] = useState('home')
  const [captureMode, setCaptureMode] = useState('camera')
  const [photo, setPhoto] = useState(null)

  const handleStart = (mode) => {
    setCaptureMode(mode)
    setStep('capture')
  }

  const handleCapture = (result) => {
    setPhoto(result)
    setStep('editor')
  }

  const handleStartOver = () => {
    setPhoto(null)
    setStep('home')
  }

  return (
    <>
      <Header />
      {step === 'home' && <Hero onStart={handleStart} />}
      {step === 'capture' && (
        <CaptureScreen
          initialMode={captureMode}
          onCapture={handleCapture}
          onBack={() => setStep('home')}
        />
      )}
      {step === 'editor' && photo && (
        <EditorScreen photo={photo} onStartOver={handleStartOver} />
      )}
    </>
  )
}

export default App
