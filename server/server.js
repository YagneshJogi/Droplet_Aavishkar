const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Get the local IP address
const os = require('os');
const interfaces = os.networkInterfaces();
let localIP = 'localhost';

// Find the IP address of the mobile hotspot interface
for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      localIP = iface.address;
      break;
    }
  }
}

// Middleware
app.use(cors({
  origin: [`http://localhost:3000`, `http://${localIP}:3000`], // Allow both localhost and local IP
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Static ESP32 IP address
const ESP32_IP = '10.223.116.202'; // ESP32's IP on the mobile hotspot

// Proxy endpoint for ESP32 data
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(`http://${ESP32_IP}/data`, {
      timeout: 5000, // 5 second timeout
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    
    // Validate the response data
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid data format from ESP32');
    }

    // Ensure all required fields are present and are numbers
    const requiredFields = ['temp', 'tds', 'do', 'ntu', 'ntu_lin'];
    const data = {};
    
    requiredFields.forEach(field => {
      const value = parseFloat(response.data[field]);
      if (isNaN(value)) {
        throw new Error(`Invalid ${field} value from ESP32`);
      }
      data[field] = value;
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from ESP32:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch data from ESP32',
      details: error.message
    });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`ESP32 IP: ${ESP32_IP}`);
  console.log(`Local IP: ${localIP}`);
  console.log(`Access the app at: http://${localIP}:3000`);
}); 