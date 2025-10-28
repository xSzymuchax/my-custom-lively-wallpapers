import { useState } from 'react'
import Background from './components/Background.jsx'
import WeatherCard from './components/WeatherCard.jsx'

function App() {
  return (
    <>
      <Background>
        <WeatherCard />
      </ Background>  
    </>
  )
}

export default App
