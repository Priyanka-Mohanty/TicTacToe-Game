import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Board from './components/Board';

// Extracted globally so minimax can use it
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Minimax algorithm to find the absolute best move for the system ('O')
const minimax = (board, depth, isMaximizing) => {
  const winner = calculateWinner(board);
  // 'O' is the maximizer (system), 'X' is the minimizer (user)
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (board.every(cell => cell !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const getBestMove = (squares) => {
  let bestScore = -Infinity;
  let move = -1;
  const boardCopy = [...squares];
  for (let i = 0; i < 9; i++) {
    if (!boardCopy[i]) {
      boardCopy[i] = 'O';
      let score = minimax(boardCopy, 0, false);
      boardCopy[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true); // User is 'X', System is 'O'
  const [isSystemThinking, setIsSystemThinking] = useState(false);

  // System's turn effect
  useEffect(() => {
    if (!isUserTurn && !calculateWinner(board) && board.includes(null)) {
      setIsSystemThinking(true);
      // Artificial delay so the system move feels natural instead of instant
      const timer = setTimeout(() => {
        const bestMoveIndex = getBestMove(board);
        if (bestMoveIndex !== -1) {
          const newBoard = [...board];
          newBoard[bestMoveIndex] = 'O';
          setBoard(newBoard);
          setIsUserTurn(true);
        }
        setIsSystemThinking(false);
      }, 500); 

      return () => clearTimeout(timer);
    }
  }, [isUserTurn, board]);

  const handlePress = (index) => {
    // Return if cell already clicked, game over, or not user's turn
    if (board[index] || calculateWinner(board) || !isUserTurn || isSystemThinking) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsUserTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
    setIsSystemThinking(false);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  let statusMsg;
  if (winner) {
    statusMsg = `Winner: ${winner === 'X' ? 'You' : 'System'} 🎉`;
  } else if (isDraw) {
    statusMsg = "It's a Draw! 🤝";
  } else {
    statusMsg = isUserTurn ? 'Your Turn (X)' : 'System Thinking... (O)';
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* Header */}
        <Text style={styles.title}>Tic Tac Toe</Text>
        
        {/* Status indicator */}
        <View style={styles.statusContainer}>
          <Text style={[
            styles.status, 
            winner === 'X' || (isUserTurn && !winner && !isDraw) ? styles.xText : styles.oText,
            (winner === 'X') && styles.winText
          ]}>
            {statusMsg}
          </Text>
        </View>

        {/* Dynamic Board */}
        <View style={styles.boardWrapper}>
          <Board squares={board} onPress={handlePress} />
        </View>

        {/* Restart Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetGame} activeOpacity={0.8}>
          <Text style={styles.resetButtonText}>Restart Game</Text>
        </TouchableOpacity>

        {/* Footer info for web responsiveness */}
        {Platform.OS === 'web' && (
          <Text style={styles.footerText}>Play directly in your browser or install on mobile!</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121215',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121215',
    padding: Platform.OS === 'web' ? 20 : 0,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 25,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  statusContainer: {
    marginBottom: 30,
    backgroundColor: '#1E1E24',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D2D34',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  status: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E0E0E0',
    letterSpacing: 1,
  },
  winText: {
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  xText: {
    color: '#FF6B6B',
  },
  oText: {
    color: '#4ECDC4',
  },
  boardWrapper: {
    marginVertical: 10,
  },
  resetButton: {
    marginTop: 40,
    backgroundColor: '#6C63FF', 
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 30,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  }
});
