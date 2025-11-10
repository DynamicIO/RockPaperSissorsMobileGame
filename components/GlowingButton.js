import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const GlowingButton = ({
  onPress,
  children,
  disabled,
  style,
  colors = ['#8B5CF6', '#6366F1', '#3B82F6'],
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!disabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [disabled]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: disabled ? 0 : glowOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={colors}
          style={styles.glowGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      <LinearGradient
        colors={disabled ? ['#333', '#222'] : colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 25,
  },
  glowGradient: {
    flex: 1,
    borderRadius: 25,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

