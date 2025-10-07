import { useState } from 'react';
import '../styles/RandomQuote.styles.css';
import { API_URL } from '../config';

interface RandomQuoteProps {
  onQuoteSaved?: () => void;
}

const RandomQuote = ({ onQuoteSaved }: RandomQuoteProps) => {
  const [quote, setQuote] = useState('Click the button to generate a random quote!');
  const [author, setAuthor] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerateQuote = async() => {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
        
        console.log(data);
    } catch(error) {
        console.log(error); //failed to load resource
    }
  };

  const handleSaveQuote = async () => {
    if (!quote || quote === 'Click the button to generate a random quote!') {
      alert('Please generate a quote first!');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/quotes`, {
        //need specific body because you are creating a new object with specific fields
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quote: quote,
          author: author,
          savedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        //alert('Quote saved successfully!');
        onQuoteSaved?.(); //trigger refresh of saved quotes
      } else {
        alert('Failed to save quote');
      }
    } catch (error) {
      console.log('Error saving quote:', error);
      alert('Error saving quote');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="random-quote-container">
      <div className="quote-display-box">
        <p className="quote-text">"{quote}"</p>
        {author && <p className="quote-author">- {author}</p>}
      </div>
      <div className="button-container">
        <button className="generate-button" onClick={handleGenerateQuote}>
          Generate Quote
        </button>
        <button 
          className="save-button" 
          onClick={handleSaveQuote}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Quote'}
        </button>
      </div>
    </div>
  );
};

export default RandomQuote;

