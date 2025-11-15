# Feedback App

A simple, clean static website for collecting user feedback. Built with HTML, CSS, and JavaScript, designed to be hosted on Netlify with Neon PostgreSQL database integration.

## Features

- 📝 Simple and intuitive feedback form
- ⭐ Star rating system (1-5 stars)
- 🎨 Clean, modern UI with responsive design
- 💾 Automatic storage in Neon PostgreSQL database
- ⚡ Serverless function integration via Netlify

## Setup Instructions

### Prerequisites

- A [Netlify](https://www.netlify.com/) account
- A [Neon](https://neon.tech/) database account

### Neon Database Setup

1. Create a free account at [neon.tech](https://neon.tech/)
2. Create a new project
3. Copy your database connection string (it looks like `postgresql://user:password@host/database?sslmode=require`)

### Netlify Deployment

1. **Deploy to Netlify:**
   - Fork this repository or push it to your GitHub account
   - Connect your repository to Netlify
   - Or use the Netlify CLI: `netlify deploy`

2. **Set Environment Variables:**
   - Go to your Netlify site dashboard
   - Navigate to Site settings → Environment variables
   - Add a new variable:
     - Key: `DATABASE_URL`
     - Value: Your Neon database connection string

3. **Deploy:**
   - Your site will automatically deploy
   - The database table will be created automatically on first feedback submission

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
3. **Add your database connection string to `.env`:**
   ```
   DATABASE_URL=your_neon_database_connection_string_here
   ```

4. **Run locally with Netlify Dev:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:8888`

## File Structure

```
feedback-app/
├── index.html              # Main HTML file with feedback form
├── styles.css              # CSS styling
├── script.js               # Frontend JavaScript
├── netlify.toml            # Netlify configuration
├── package.json            # Node.js dependencies
├── .env.example            # Environment variables template
├── netlify/
│   └── functions/
│       └── submitFeedback.js   # Serverless function for database operations
└── README.md
```

## Database Schema

The feedback table is automatically created with the following structure:

```sql
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL,
    feedback TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## How It Works

1. User fills out the feedback form
2. JavaScript captures the form submission
3. Data is sent to the Netlify serverless function
4. Function connects to Neon PostgreSQL database
5. Feedback is stored in the database
6. User receives a confirmation message

## Customization

- **Colors:** Edit the gradient colors in `styles.css` (search for `#667eea` and `#764ba2`)
- **Form Fields:** Modify `index.html` to add/remove fields
- **Database:** Update `submitFeedback.js` to change the database schema

## License

MIT

## Support

For issues or questions, please open an issue in the repository.