import { useState } from 'react'
import './App.css'

function App() {
  const [contador, setContador] = useState(0)

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1>¡Mi App en Azure! 🚀</h1>
      <p>Esta app está desplegada en Azure Static Web Apps</p>

      <div style={{ marginTop: '40px' }}>
        <p>Contador: <strong>{contador}</strong></p>
        <button
          onClick={() => setContador(contador + 1)}
          style={{
            padding: '10px 24px',
            fontSize: '16px',
            backgroundColor: '#0078d4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Sumar +1
        </button>
        <button
          onClick={() => setContador(0)}
          style={{
            padding: '10px 24px',
            fontSize: '16px',
            backgroundColor: '#d40000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  )
}

export default App