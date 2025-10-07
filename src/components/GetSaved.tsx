import { useState, useEffect } from 'react';
import '../styles/GetSaved.styles.css';
import { API_URL } from '../config';

interface SavedQuote {
  _id: string;
  quote: string;
  author: string;
  savedAt: string;
}

interface GetSavedProps {
  refreshTrigger?: number; //the refresh trigger is for automatic refreshing for the display
}

const GetSaved = ({ refreshTrigger }: GetSavedProps) => {
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchSaved();
  }, []);

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      handleFetchSaved();
    }
  }, [refreshTrigger]);

  const handleFetchSaved = async() => {
    setLoading(true);
    try {
        const response = await fetch(`${API_URL}/api/quotes`, {
            //does not need to explicity state the body because it's fetching a currently existing object
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            setSavedQuotes(data);
        } else {
            console.log('Failed to fetch quotes');
        }
    } catch(error){
        console.log('Error fetching quotes:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    try {
        const response = await fetch(`${API_URL}/api/quotes/${quoteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            // Remove the quote from the local state immediately
            setSavedQuotes(prevQuotes => prevQuotes.filter(quote => quote._id !== quoteId));
            //alert('Quote deleted successfully!');
        } else {
            alert('Failed to delete quote');
        }
    } catch(error) {
        console.log('Error deleting quote:', error);
        alert('Error deleting quote');
    }
  };

  //essentially creating card components for each quotes
  return (
    <div className="get-saved-container">
      <div className="header-section">
        <h2 className="page-title">Saved Quotes</h2>
        <button className="refresh-button" onClick={handleFetchSaved}>
          Refresh
        </button>
      </div>

      <div className="quotes-grid">
        {savedQuotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No saved quotes yet</h3>
            <p>Generate and save some quotes to see them here!</p>
          </div>
        ) : (
          savedQuotes.map((quote) => (
            <div key={quote._id} className="quote-card">
              <div className="quote-content">
                <p className="quote-text">"{quote.quote}"</p>
                <p className="quote-author">- {quote.author}</p>
              </div>
              <div className="quote-meta">
                <span className="saved-date">
                  {new Date(quote.savedAt).toLocaleDateString()}
                </span>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteQuote(quote._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading quotes...</p>
        </div>
      )}
    </div>
  );
};

export default GetSaved;
