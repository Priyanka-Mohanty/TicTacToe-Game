import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Square({ value, onPress }) {
  return (
    <TouchableOpacity style={styles.square} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.text, value === 'X' ? styles.xText : styles.oText]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 90,
    height: 90,
    backgroundColor: '#1E1E24',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 16,
    // Add subtle shadow for 3D effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  text: {
    fontSize: 52,
    fontWeight: 'bold',
  },
  xText: {
    color: '#FF6B6B', // Vibrant Red/Pink
    textShadowColor: 'rgba(255, 107, 107, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  oText: {
    color: '#4ECDC4', // Vibrant Teal/Cyan
    textShadowColor: 'rgba(78, 205, 196, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
