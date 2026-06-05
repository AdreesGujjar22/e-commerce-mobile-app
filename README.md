# E-Commerce WebView App

A production-ready, high-performance mobile application wrapper designed for modern e-commerce stores. Built using React Native and Expo SDK 54, it delivers a seamless, native app experience for your existing web storefront with a clean, neutral theme (White, Black, and Grey) inspired by high-end Shopify layouts.

## 🚀 Key Features

*   **Native Edge-to-Edge Display**: Auto-calculates status bar spacing to eliminate overlapping layout issues with phone battery and Wi-Fi icons.
*   **Custom Offline State**: Real-time network monitoring swaps the web canvas for a premium, minimalist offline screen with an active "Retry" anchor.
*   **Smart WebView Refresh**: Utilizes a dynamic remounting mechanism (`refreshKey`) to force browser cache clears upon reconnection.
*   **Android Hardware Back Support**: Integrates device navigation hooks so users swipe back through web history instead of closing the application.
*   **Minimalist Visuals**: Optimized dark loader indicator centered beautifully over an off-white background mask.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### 2. Clone and Install Dependencies
Navigate to your project directory and clear historical system configurations:
```bash
# Install core and specialized package modules
npm install --legacy-peer-deps

# Ensure all Expo alignment dependencies match SDK 54 perfectly
npx expo install react-native-webview @react-native-community/netinfo
```

### 3. Environment Configuration
Create a file named `.env` in the root folder of your project and configure your target URL:
```env
EXPO_PUBLIC_APP_URL=https://store-domain.com
```

## 💻 Development Commands

Run the local development framework server with a clean cache profile:
```bash
npx expo start -c
```
*Scan the generated terminal QR code with your mobile device running the Expo Go App.*

---

## 📦 Production Build Guidelines

This application uses **EAS (Expo Application Services)** to compile native bundles securely in the cloud.

### 1. Setup EAS CLI Tool Globally
```bash
npm install -g eas-cli
eas login
```

### 2. Initialize Build Profile Matrix
```bash
eas build:configure
```

### 3. Generate Installable Standalone Android APK File
To build a downloadable, physical `.apk` file instantly for manual device testing, run:
```bash
eas build --platform android --profile preview
```

### 4. Compile Google Play Submission App Bundle (.aab)
```bash
eas build --platform android --profile production
```

---

## 📂 Project Structure Snapshot
```text
├── assets/
│   ├── icon.png               # Native App Icon
│   ├── adaptive-icon.png      # Android Adaptive Foreground Graphic
│   └── splash-icon.png        # Loading Launch Visual Asset
├── App.js                     # Core Application Component & Routing Logic
├── app.json                   # Expo SDK System Compilation Map Metadata
├── .env                       # Target Store Environment Pointer Link
└── README.md                  # System Documentation Context File
```
