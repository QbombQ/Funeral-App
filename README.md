# Funeral Planning Application

A modern, intuitive mobile application designed to help users plan and manage funeral arrangements with care and dignity. Built with Expo and React Native.

![App Preview](assets/images/app-preview.png)

## Features

- **User Authentication**: Secure sign-in with Google and Apple authentication options
- **Interactive Dashboard**: Easy-to-navigate dashboard for managing funeral arrangements
- **Location Planning**: Map integration for funeral venue selection
- **Dark Theme**: Elegant dark-themed UI with blue accents for comfortable viewing
- **Responsive Design**: Smooth, parallax scrolling and haptic feedback for enhanced user experience

## Technical Stack

- **Framework**: Expo / React Native
- **UI Components**: Custom-built components with theming support
- **Authentication**: Multi-provider auth system
- **Navigation**: File-based routing with Expo Router
- **State Management**: React Context for auth and navigation states
- **Real-time Updates**: WebSocket integration for live updates

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Development Mode

   ```bash
   npx expo start
   ```

   This will open the Expo Developer Tools in your browser.

3. Platform Specific Setup

   ### iOS
   
   Requirements:
   - macOS computer
   - Xcode 14 or newer
   - iOS 13.0 or newer
   - CocoaPods (`sudo gem install cocoapods`)

   Steps:
   ```bash
   cd ios
   pod install
   cd ..
   npx expo run:ios
   ```

   
   ```bash
   npx expo run:ios 
   ```

   ### Android
   
   Requirements:
   - Android Studio
   - Android SDK Platform 33 (Android 13.0)
   - Android SDK Build-Tools 33.0.0
   - JDK 11 or newer

   Steps:
   ```bash
   npx expo run:android
   ```

4. Production Build

   ### iOS
   ```bash
   eas build --platform ios
   ```

   ### Android
   ```bash
   eas build --platform android
   ```

## Development

The application structure is organized as follows:

- `/app` - Main application routes and layouts
- `/components` - Reusable UI components
- `/assets` - Images and fonts
- `/context` - React Context providers
- `/hooks` - Custom React hooks
- `/utils` - Utility functions
- `/constants` - Theme and configuration constants

## Testing

Run the test suite:

```bash
npm test
```
