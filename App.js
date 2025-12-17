import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoadingScreen } from './components/LoadingScreen';

const { width, height } = Dimensions.get('window');

const CONTENT_HORIZONTAL_PADDING = 20; // must match styles.content.paddingHorizontal
const BUTTON_GAP = 10; // must match styles.buttonContainer.gap
const BUTTON_WIDTH = Math.min(
  110,
  Math.floor((width - CONTENT_HORIZONTAL_PADDING * 2 - BUTTON_GAP * 2) / 3)
);
const BUTTON_ROW_WIDTH = BUTTON_WIDTH * 3 + BUTTON_GAP * 2;

const CHOICES = {
  ROCK: { name: 'rock', icon: 'gesture-tap-hold', emoji: '🪨' },
  PAPER: { name: 'paper', icon: 'newspaper-variant', emoji: '📄' },
  SCISSORS: { name: 'scissors', icon: 'content-cut', emoji: '✂️' },
};

const getWinner = (player, computer) => {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'player';
  }
  return 'computer';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [streak, setStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Animations
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Show loading screen for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for score
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => clearTimeout(timer);
  }, []);

  const playGame = async (choice) => {
    if (isPlaying) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPlaying(true);
    setShowResult(false);
    setPlayerChoice(choice);

    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate computer thinking
    const choices = ['rock', 'paper', 'scissors'];
    let counter = 0;
    const interval = setInterval(() => {
      setComputerChoice(choices[counter % 3]);
      counter++;
    }, 100);

    // Stop after 1 second and show result
    setTimeout(() => {
      clearInterval(interval);
      const computerFinal = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(computerFinal);

      const winner = getWinner(choice, computerFinal);
      setResult(winner);

      // Update scores and streak
      if (winner === 'player') {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
        setStreak((prev) => prev + 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        // Confetti animation
        Animated.sequence([
          Animated.timing(confettiAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(confettiAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      } else if (winner === 'computer') {
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
        setStreak(0);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      setShowResult(true);
      setIsPlaying(false);
    }, 1200);
  };

  const resetGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
  };

  const resetScore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setScore({ player: 0, computer: 0 });
    setStreak(0);
    resetGame();
  };

  const getResultText = () => {
    if (!result) return '';
    if (result === 'draw') return "IT'S A DRAW! 🤝";
    if (result === 'player') return '🎉 YOU WIN! 🎉';
    return '😢 YOU LOSE! 😢';
  };

  const getResultColor = () => {
    if (!result) return '#666';
    if (result === 'draw') return '#FFA500';
    if (result === 'player') return '#00FF87';
    return '#FF4757';
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0a0a0a', '#1a0a2e', '#0a0a0a']}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
          {/* Header with Score */}
          <View style={styles.header}>
            <Text style={styles.title}>ROCK PAPER SCISSORS</Text>
            <View style={styles.scoreContainer}>
              <Animated.View
                style={[
                  styles.scoreBox,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Text style={styles.scoreLabel}>YOU</Text>
                <Text style={styles.scoreValue}>{score.player}</Text>
              </Animated.View>
              <View style={styles.scoreDivider} />
              <Animated.View
                style={[
                  styles.scoreBox,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Text style={styles.scoreLabel}>AI</Text>
                <Text style={styles.scoreValue}>{score.computer}</Text>
              </Animated.View>
            </View>
            {streak > 1 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>🔥 {streak} WIN STREAK!</Text>
              </View>
            )}
          </View>

          {/* Game Area */}
          <View style={styles.gameArea}>
            {/* Computer Choice */}
            <View style={styles.choiceArea}>
              <Text style={styles.label}>AI OPPONENT</Text>
              <View style={[styles.choiceCircle, styles.computerCircle]}>
                {computerChoice ? (
                  <Text style={styles.choiceEmoji}>
                    {CHOICES[computerChoice.toUpperCase()].emoji}
                  </Text>
                ) : (
                  <MaterialCommunityIcons
                    name="robot"
                    size={60}
                    color="#8B5CF6"
                  />
                )}
              </View>
            </View>

            {/* VS Divider */}
            <View style={styles.vsDivider}>
              <LinearGradient
                colors={['#FF6B6B', '#8B5CF6', '#00D9FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.vsCircle}
              >
                <Text style={styles.vsText}>VS</Text>
              </LinearGradient>
            </View>

            {/* Player Choice */}
            <View style={styles.choiceArea}>
              <Text style={styles.label}>YOU</Text>
              <View style={[styles.choiceCircle, styles.playerCircle]}>
                {playerChoice ? (
                  <Text style={styles.choiceEmoji}>
                    {CHOICES[playerChoice.toUpperCase()].emoji}
                  </Text>
                ) : (
                  <MaterialCommunityIcons
                    name="account"
                    size={60}
                    color="#00FF87"
                  />
                )}
              </View>
            </View>
          </View>

          {/* Result Display */}
          {showResult && (
            <Animated.View
              style={[
                styles.resultContainer,
                {
                  opacity: confettiAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={[getResultColor() + '40', getResultColor() + '20']}
                style={styles.resultBox}
              >
                <Text style={[styles.resultText, { color: getResultColor() }]}>
                  {getResultText()}
                </Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {Object.values(CHOICES).map((choice) => (
              <Animated.View
                key={choice.name}
                style={{ transform: [{ scale: scaleAnim }] }}
              >
                <TouchableOpacity
                  onPress={() => playGame(choice.name)}
                  disabled={isPlaying}
                  style={styles.button}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={
                      isPlaying
                        ? ['#333', '#222']
                        : ['#8B5CF6', '#6366F1', '#3B82F6']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonEmoji}>{choice.emoji}</Text>
                    <Text style={styles.buttonText}>
                      {choice.name.toUpperCase()}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Control Buttons */}
          <View style={styles.controlButtons}>
            {(playerChoice || computerChoice) && (
              <TouchableOpacity
                onPress={resetGame}
                style={styles.controlButton}
              >
                <Text style={styles.controlButtonText}>NEW ROUND</Text>
              </TouchableOpacity>
            )}
            {(score.player > 0 || score.computer > 0) && (
              <TouchableOpacity
                onPress={resetScore}
                style={[styles.controlButton, styles.resetButton]}
              >
                <Text style={styles.controlButtonText}>RESET SCORE</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.poweredBy}>Powered by Dynamic.IO</Text>
          </View>
        </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 20,
    minHeight: height - 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 20,
    textShadowColor: '#8B5CF6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  scoreBox: {
    alignItems: 'center',
    width: 80,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    marginBottom: 5,
    letterSpacing: 1,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
  },
  scoreDivider: {
    width: 2,
    height: 50,
    backgroundColor: 'rgba(139,92,246,0.5)',
    marginHorizontal: 30,
  },
  streakBadge: {
    marginTop: 15,
    backgroundColor: 'rgba(255,107,107,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.5)',
  },
  streakText: {
    color: '#FF6B6B',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1,
  },
  gameArea: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    minHeight: 320,
    paddingVertical: 10,
  },
  choiceArea: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
    marginBottom: 15,
    letterSpacing: 2,
  },
  choiceCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  computerCircle: {
    backgroundColor: 'rgba(139,92,246,0.1)',
    borderColor: '#8B5CF6',
  },
  playerCircle: {
    backgroundColor: 'rgba(0,255,135,0.1)',
    borderColor: '#00FF87',
  },
  choiceEmoji: {
    fontSize: 60,
  },
  vsDivider: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  vsCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  resultContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  resultBox: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  resultText: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: BUTTON_ROW_WIDTH,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  button: {
    width: BUTTON_WIDTH,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  buttonEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  controlButton: {
    backgroundColor: 'rgba(139,92,246,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.5)',
  },
  resetButton: {
    backgroundColor: 'rgba(255,71,87,0.2)',
    borderColor: 'rgba(255,71,87,0.5)',
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 10,
  },
  poweredBy: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 1,
  },
});

