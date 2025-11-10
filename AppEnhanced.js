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
import { ParticleEffect } from './components/ParticleEffect';
import { GlowingButton } from './components/GlowingButton';

const { width, height } = Dimensions.get('window');

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
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [totalGames, setTotalGames] = useState(0);

  // Animations
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

    // Continuous rotation for VS circle
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const playGame = async (choice) => {
    if (isPlaying) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPlaying(true);
    setShowResult(false);
    setShowParticles(false);
    setPlayerChoice(choice);
    setTotalGames((prev) => prev + 1);

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

    // Simulate computer thinking with animation
    const choices = ['rock', 'paper', 'scissors'];
    let counter = 0;
    const interval = setInterval(() => {
      setComputerChoice(choices[counter % 3]);
      counter++;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        // Confetti and particles animation
        setShowParticles(true);
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
        ]).start(() => setShowParticles(false));
      } else if (winner === 'computer') {
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
        setStreak(0);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        
        // Shake animation on loss
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
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
    setShowParticles(false);
  };

  const resetScore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setScore({ player: 0, computer: 0 });
    setStreak(0);
    setTotalGames(0);
    resetGame();
  };

  const getResultText = () => {
    if (!result) return '';
    if (result === 'draw') return "IT'S A DRAW! 🤝";
    if (result === 'player') {
      if (streak >= 5) return '🔥 LEGENDARY! 🔥';
      if (streak >= 3) return '⚡ ON FIRE! ⚡';
      return '🎉 YOU WIN! 🎉';
    }
    return '😢 YOU LOSE! 😢';
  };

  const getResultColor = () => {
    if (!result) return '#666';
    if (result === 'draw') return '#FFA500';
    if (result === 'player') return '#00FF87';
    return '#FF4757';
  };

  const winRate = totalGames > 0 ? ((score.player / totalGames) * 100).toFixed(1) : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0a0a0a', '#1a0a2e', '#16213e', '#0a0a0a']}
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
                transform: [
                  { translateY: slideAnim },
                  { translateX: shakeAnim },
                ],
              },
            ]}
          >
          {/* Header with Score */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ROCK PAPER SCISSORS</Text>
              <Text style={styles.subtitle}>Ultimate Showdown</Text>
            </View>
            
            <View style={styles.scoreContainer}>
              <Animated.View
                style={[
                  styles.scoreBox,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Text style={styles.scoreLabel}>YOU</Text>
                <Text style={styles.scoreValue}>{score.player}</Text>
                <Text style={styles.winRate}>{winRate}% Win</Text>
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
                <Text style={styles.winRate}>{totalGames - score.player}</Text>
              </Animated.View>
            </View>

            <View style={styles.statsRow}>
              {streak > 1 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakText}>🔥 {streak} STREAK!</Text>
                </View>
              )}
              {bestStreak > 0 && (
                <View style={styles.bestStreakBadge}>
                  <Text style={styles.bestStreakText}>👑 Best: {bestStreak}</Text>
                </View>
              )}
            </View>
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
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <LinearGradient
                  colors={['#FF6B6B', '#8B5CF6', '#00D9FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.vsCircle}
                >
                  <Text style={styles.vsText}>VS</Text>
                </LinearGradient>
              </Animated.View>
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

          {/* Particle Effect */}
          <ParticleEffect active={showParticles} />

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
                <GlowingButton
                  onPress={() => playGame(choice.name)}
                  disabled={isPlaying}
                  style={styles.button}
                >
                  <Text style={styles.buttonEmoji}>{choice.emoji}</Text>
                  <Text style={styles.buttonText}>
                    {choice.name.toUpperCase()}
                  </Text>
                </GlowingButton>
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
                <Text style={styles.controlButtonText}>
                  <MaterialCommunityIcons name="reload" size={14} /> NEW ROUND
                </Text>
              </TouchableOpacity>
            )}
            {(score.player > 0 || score.computer > 0) && (
              <TouchableOpacity
                onPress={resetScore}
                style={[styles.controlButton, styles.resetButton]}
              >
                <Text style={styles.controlButtonText}>
                  <MaterialCommunityIcons name="restart" size={14} /> RESET
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Footer Stats */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Total Games: {totalGames}</Text>
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
    marginBottom: 15,
    marginTop: 35,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: '#8B5CF6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 3,
    marginTop: 5,
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
    width: 90,
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
  winRate: {
    fontSize: 10,
    color: '#666',
    marginTop: 3,
  },
  scoreDivider: {
    width: 2,
    height: 60,
    backgroundColor: 'rgba(139,92,246,0.5)',
    marginHorizontal: 25,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  streakBadge: {
    backgroundColor: 'rgba(255,107,107,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.5)',
  },
  streakText: {
    color: '#FF6B6B',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
  bestStreakBadge: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.5)',
  },
  bestStreakText: {
    color: '#FFD700',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
  gameArea: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    minHeight: 300,
    paddingVertical: 10,
  },
  choiceArea: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    marginBottom: 12,
    letterSpacing: 2,
  },
  choiceCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  computerCircle: {
    backgroundColor: 'rgba(139,92,246,0.1)',
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  playerCircle: {
    backgroundColor: 'rgba(0,255,135,0.1)',
    borderColor: '#00FF87',
    shadowColor: '#00FF87',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  choiceEmoji: {
    fontSize: 55,
  },
  vsDivider: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  vsCircle: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 15,
  },
  vsText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  resultContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  resultBox: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  resultText: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    gap: 8,
    marginTop: 8,
  },
  button: {
    flex: 1,
    maxWidth: 110,
  },
  buttonEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 5,
  },
  controlButton: {
    backgroundColor: 'rgba(139,92,246,0.2)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
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
    fontSize: 11,
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 5,
  },
  footerText: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
  },
});

