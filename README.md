# Quote API Fullscope

A full-stack web application for generating, saving, and managing random quotes. Built with React, TypeScript, Express, and MongoDB.

## Features

- 🎲 Generate random quotes from an external API
- 💾 Save your favorite quotes to a MongoDB database
- 🗑️ Delete saved quotes
- 📱 Responsive design with beautiful gradients
- 🔄 Real-time updates when saving/deleting quotes

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Vite for build tooling
- CSS with modern gradients and animations

**Backend:**
- Express.js
- MongoDB with Mongoose
- CORS enabled for cross-origin requests

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or MongoDB Atlas account

### Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```
VITE_API_URL=http://localhost:3001
```

4. Create a `.env` file for the backend (if using MongoDB Atlas):
```
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

5. Run both frontend and backend:
```bash
npm run dev:full
```

Or run them separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

## Deployment to AWS Amplify

### Backend Deployment
Your backend needs to be deployed separately (e.g., on Heroku, Railway, AWS EC2, or AWS Elastic Beanstalk).

### Frontend Deployment on AWS Amplify

1. **Push your code to GitHub**

2. **Set Environment Variable in AWS Amplify:**
   - Go to AWS Amplify Console
   - Select your app
   - Go to "Environment variables"
   - Add a new variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-backend-url.com` (your deployed backend URL)

3. **Build Settings:**
   AWS Amplify should auto-detect your build settings, but you can verify:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Deploy:**
   - Connect your GitHub repository
   - Amplify will automatically build and deploy your app
   - Every push to your main branch will trigger a new deployment

## Environment Variables

- `VITE_API_URL`: The URL of your backend API (required for production)
- `MONGODB_URI`: MongoDB connection string (backend)
- `PORT`: Port for the backend server (default: 3001)

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── RandomQuote.tsx    # Component for generating/saving quotes
│   │   └── GetSaved.tsx        # Component for displaying saved quotes
│   ├── styles/
│   │   ├── RandomQuote.styles.css
│   │   └── GetSaved.styles.css
│   ├── config.ts               # API configuration
│   ├── App.tsx
│   └── main.tsx
├── server.js                   # Express backend server
├── package.json
└── vite.config.ts
```

## API Endpoints

- `GET /api/quotes` - Fetch all saved quotes
- `POST /api/quotes` - Save a new quote
- `DELETE /api/quotes/:id` - Delete a quote by ID
- `GET /api/health` - Health check endpoint

---

## Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
