import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Particle = ({ delay, duration, color }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const randomX = (Math.random() - 0.5) * width * 0.8;
    const randomY = -Math.random() * height * 0.5;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: randomX,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: randomY,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.2,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          backgroundColor: color,
          transform: [
            { translateX },
            { translateY },
            { scale },
          ],
          opacity,
        },
      ]}
    />
  );
};

export const ParticleEffect = ({ active, color = '#00FF87' }) => {
  if (!active) return null;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    key: i,
    delay: Math.random() * 100,
    duration: 1000 + Math.random() * 500,
    color: [
      '#00FF87',
      '#8B5CF6',
      '#3B82F6',
      '#FF6B6B',
      '#FFA500',
    ][Math.floor(Math.random() * 5)],
  }));

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Particle
          key={particle.key}
          delay={particle.delay}
          duration={particle.duration}
          color={particle.color}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height * 0.5,
    left: width * 0.5,
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

