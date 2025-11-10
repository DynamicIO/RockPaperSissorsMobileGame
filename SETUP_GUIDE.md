# 🚀 Complete Setup Guide

This guide will help you get the Rock Paper Scissors mobile app up and running on your iOS and Android devices.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or newer)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn** (comes with Node.js)
   - Verify: `npm --version`

3. **Expo CLI** (optional but recommended)
   ```bash
   npm install -g expo-cli
   ```

4. **Mobile Device** with Expo Go app:
   - **iOS**: Download "Expo Go" from App Store
   - **Android**: Download "Expo Go" from Google Play Store

## 🔧 Installation Steps

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React Native
- Expo SDK
- Linear Gradient for beautiful UI
- Haptics for tactile feedback
- Vector Icons
- Animation libraries

### Step 2: Start the Development Server

```bash
npm start
```

Or with Expo CLI:
```bash
expo start
```

You should see a QR code in your terminal and a browser window will open with the Expo Dev Tools.

### Step 3: Run on Your Device

#### For iOS (iPhone/iPad):
1. Open the **Camera** app on your iPhone
2. Point it at the QR code in your terminal
3. Tap the notification that appears
4. The app will open in Expo Go

#### For Android:
1. Open the **Expo Go** app
2. Tap "Scan QR Code"
3. Scan the QR code from your terminal
4. The app will load

### Step 4: Run on Emulator/Simulator

#### iOS Simulator (Mac only):
1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Press `i` in the terminal where Expo is running
4. Or click "Run on iOS simulator" in Expo Dev Tools

#### Android Emulator:
1. Install Android Studio from https://developer.android.com/studio
2. Set up an Android Virtual Device (AVD) in Android Studio
3. Press `a` in the terminal where Expo is running
4. Or click "Run on Android device/emulator" in Expo Dev Tools

## 🎮 Using the App

### Basic Controls:
1. **Choose Your Move**: Tap Rock, Paper, or Scissors
2. **Watch the Battle**: AI opponent makes their choice
3. **See Results**: Winner is displayed with animations
4. **Track Progress**: Scores and streaks are automatically tracked
5. **New Round**: Tap "NEW ROUND" to play again
6. **Reset**: Tap "RESET SCORE" to start fresh

### Features to Explore:
- 🔥 **Win Streaks**: Build consecutive wins
- 👑 **Best Streak**: Your all-time best streak
- 📊 **Win Rate**: Percentage of games won
- ✨ **Particle Effects**: Celebrate wins with confetti
- 📳 **Haptic Feedback**: Feel every action
- 🎨 **Smooth Animations**: Enjoy premium transitions

## 📱 Building for Production

### For Testing:
```bash
# iOS (requires Apple Developer account)
expo build:ios

# Android
expo build:android
```

### Using EAS Build (Recommended - New Expo Build Service):
1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure your project:
   ```bash
   eas build:configure
   ```

4. Build:
   ```bash
   # For iOS
   eas build --platform ios

   # For Android
   eas build --platform android

   # For both
   eas build --platform all
   ```

### App Store Submission:
- **iOS**: Requires Apple Developer Program ($99/year)
- **Android**: Requires Google Play Developer account ($25 one-time)

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "Module not found" errors
```bash
npm install
# or
rm -rf node_modules && npm install
```

#### 2. Metro bundler issues
```bash
npm start -- --clear
# or
expo start -c
```

#### 3. Expo Go not connecting
- Ensure your phone and computer are on the same WiFi network
- Try using the Tunnel connection: `expo start --tunnel`
- Check firewall settings

#### 4. iOS Simulator not launching
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

#### 5. Android Emulator issues
- Ensure Android Studio is properly installed
- Check that ANDROID_HOME environment variable is set
- Try creating a new AVD in Android Studio

### Performance Issues:
- Close other apps on your device
- Restart the Expo development server
- Clear cache: `expo start -c`

## 🎨 Customization

### Change Colors:
Edit the gradient colors in `App.js` or `AppEnhanced.js`:
```javascript
colors={['#8B5CF6', '#6366F1', '#3B82F6']}
```

### Add App Icons:
Place your icons in the `assets` folder:
- `icon.png` (1024x1024)
- `splash.png` (1242x2436)
- `adaptive-icon.png` (1024x1024)

See `assets/README.md` for more details.

### Modify Game Logic:
The game logic is in the `getWinner` function. You can modify it to add new rules or game modes.

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://www.reactnative.directory/)

## 🚀 Going Viral

Tips to make your app viral:
1. Share gameplay videos on TikTok/Instagram
2. Challenge friends to beat your streak
3. Post high scores with #RockPaperScissors
4. Create tournaments
5. Add social sharing features
6. Engage with the community

## 💡 Pro Tips

- Use **AppEnhanced.js** instead of **App.js** for more features (particles, glowing buttons, better animations)
- Enable haptic feedback for better user experience
- Test on real devices for best performance
- Keep the app updated with new features

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Search [Stack Overflow](https://stackoverflow.com/)
3. Visit [Expo Forums](https://forums.expo.dev/)
4. Check the [GitHub Issues](https://github.com/expo/expo/issues)

---

**Happy Gaming! May your streaks be long and your victories plenty! 🎮🔥**

