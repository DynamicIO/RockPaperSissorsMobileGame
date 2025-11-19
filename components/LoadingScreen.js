import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const pulse3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in and scale up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Staggered pulse animations for emojis
    const createPulse = (anim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.spring(anim, {
            toValue: 1.3,
            tension: 100,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.spring(anim, {
            toValue: 1,
            tension: 100,
            friction: 3,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createPulse(pulse1, 0);
    createPulse(pulse2, 300);
    createPulse(pulse3, 600);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0a', '#1a0a2e', '#16213e', '#0a0a0a']}
        style={styles.gradient}
      >
        {/* Main Content - Centered */}
        <View style={styles.contentWrapper}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Emojis with background circles */}
            <View style={styles.emojiRow}>
              <Animated.View
                style={[
                  styles.emojiCircle,
                  { transform: [{ scale: pulse1 }] },
                ]}
              >
                <LinearGradient
                  colors={['rgba(139,92,246,0.2)', 'rgba(139,92,246,0.05)']}
                  style={styles.emojiCircleGradient}
                >
                  <Text style={styles.emoji}>🪨</Text>
                </LinearGradient>
              </Animated.View>

              <Animated.View
                style={[
                  styles.emojiCircle,
                  { transform: [{ scale: pulse2 }] },
                ]}
              >
                <LinearGradient
                  colors={['rgba(99,102,241,0.2)', 'rgba(99,102,241,0.05)']}
                  style={styles.emojiCircleGradient}
                >
                  <Text style={styles.emoji}>📄</Text>
                </LinearGradient>
              </Animated.View>

              <Animated.View
                style={[
                  styles.emojiCircle,
                  { transform: [{ scale: pulse3 }] },
                ]}
              >
                <LinearGradient
                  colors={['rgba(59,130,246,0.2)', 'rgba(59,130,246,0.05)']}
                  style={styles.emojiCircleGradient}
                >
                  <Text style={styles.emoji}>✂️</Text>
                </LinearGradient>
              </Animated.View>
            </View>

            {/* Title */}
            <Text style={styles.title}>ROCK PAPER SCISSORS</Text>
            <Text style={styles.subtitle}>Get ready to play...</Text>

            {/* Loading dots */}
            <View style={styles.dotsContainer}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    opacity: pulse1.interpolate({
                      inputRange: [1, 1.3],
                      outputRange: [0.3, 1],
                    }),
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  {
                    opacity: pulse2.interpolate({
                      inputRange: [1, 1.3],
                      outputRange: [0.3, 1],
                    }),
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  {
                    opacity: pulse3.interpolate({
                      inputRange: [1, 1.3],
                      outputRange: [0.3, 1],
                    }),
                  },
                ]}
              />
            </View>
          </Animated.View>
        </View>

        {/* Footer - Fixed at bottom */}
        <View style={styles.footerContainer}>
          <Text style={styles.poweredBy}>Powered by Dynamic.IO</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiRow: {
    flexDirection: 'row',
    marginBottom: 50,
    gap: 20,
  },
  emojiCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiCircleGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  emoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: '#8B5CF6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 1.5,
    marginBottom: 35,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
  },
  footerContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  poweredBy: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 1,
  },
});

