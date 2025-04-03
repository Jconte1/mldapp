// 🛠️ Put this at the VERY top — above everything
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const jobDbRoutes = require('./routes/jobDb');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/jobDb', require('./routes/jobDb'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
