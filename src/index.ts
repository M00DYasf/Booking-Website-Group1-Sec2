import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Booking Website API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;