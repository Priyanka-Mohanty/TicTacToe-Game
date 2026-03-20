import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

export default function Board({ squares, onPress }) {
  const renderSquare = (i) => (
    <Square value={squares[i]} onPress={() => onPress(i)} />
  );

  return (
    <View style={styles.boardContainer}>
      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    padding: 15,
    backgroundColor: '#2D2D34',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
  },
});
