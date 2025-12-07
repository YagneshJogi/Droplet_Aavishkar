# Water Quality Monitoring App

A full-stack web application for monitoring water quality parameters using ESP32 sensors and Firebase Realtime Database.

## Features

- Real-time display of sensor data (temperature, TDS, DO, turbidity)
- Custom water source naming
- Data storage in Firebase Realtime Database
- Historical data viewing with source filtering
- Android app support via Capacitor

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account
- ESP32 with water quality sensors
- Android Studio (for Android app)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Realtime Database
   - Copy your Firebase config to `client/src/firebase.js`

4. Configure ESP32:
   - Update the IP address in `server/server.js` to match your ESP32's IP
   - Ensure ESP32 is serving data at `/data` endpoint

5. Start the development server:
   ```bash
   npm start
   ```

## Building for Android

1. Build the React app:
   ```bash
   npm run build
   ```

2. Initialize Capacitor:
   ```bash
   cd client
   npx cap add android
   npx cap copy
   npx cap sync
   npx cap open android
   ```

3. In Android Studio:
   - Add internet permission to `AndroidManifest.xml`:
     ```xml
     <uses-permission android:name="android.permission.INTERNET" />
     ```
   - Add cleartext traffic permission:
     ```xml
     <application android:usesCleartextTraffic="true" ...>
     ```

## Usage

1. Ensure ESP32 is connected to the same WiFi network
2. Open the web app or Android app
3. View real-time sensor data on the Dashboard
4. Enter a source name and save readings
5. View historical data on the History page

## Troubleshooting

- If sensor data is not displaying:
  - Check ESP32 connection
  - Verify IP address in server.js
  - Check browser console for errors

- If Firebase operations fail:
  - Verify Firebase configuration
  - Check Firebase rules
  - Ensure internet connection

## License

MIT 