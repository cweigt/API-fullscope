import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

//mongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quotes';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

//quote Schema
const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
});

const Quote = mongoose.model('Quote', quoteSchema);

//routes
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ savedAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

app.post('/api/quotes', async (req, res) => {
  try {
    const { quote, author } = req.body;
    
    if (!quote || !author) {
      return res.status(400).json({ error: 'Quote and author are required' });
    }

    const newQuote = new Quote({
      quote,
      author,
      savedAt: new Date()
    });

    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    console.error('Error saving quote:', error);
    res.status(500).json({ error: 'Failed to save quote' });
  }
});

app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedQuote = await Quote.findByIdAndDelete(id);
    
    if (!deletedQuote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.json({ message: 'Quote deleted successfully', deletedQuote });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
