import { useState } from 'react'
import './App.css'
import RandomQuote from './components/RandomQuote';
import GetSaved from './components/GetSaved';

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleQuoteSaved = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="background">
      <div>
        <h1>Cool Quotes!</h1>
      </div>
      <RandomQuote onQuoteSaved={handleQuoteSaved} />
      <div>
        <h1>Saved Quotes</h1>
        <GetSaved refreshTrigger={refreshTrigger} />
      </div>
    </div>
  )
}

export default App;
