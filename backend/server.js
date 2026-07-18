const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/students', require('./routes/students'));
app.use('/api/admissions', require('./routes/admissions'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/stats', require('./routes/stats'));

app.get('/', (req, res) => res.json({ message: 'Legion College API running' }));

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Seed default admin on first run
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({ name: 'Admin', email: 'admin@legion.edu', password: hashed, role: 'admin' });
      console.log('Default admin created: admin@legion.edu / admin123');
    }
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => { console.error(err); process.exit(1); });
