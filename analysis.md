# Tic Tac Toe Architecture & Logic Analysis

## 1. Architecture Overview
The application is built using **React Native** and the **Expo framework**, which enables a single unified codebase to target mobile platforms (iOS/Android) and modern web browsers.

### Component Structure
The UI is broken down into three logical layers:
1. **`App.js` (Smart Component)**
   - Acts as the Single Source of Truth for game state.
   - Manages the `board` array and `isXNext` player turn.
   - Contains the `calculateWinner` logic and passes state/callbacks down as props.
2. **`Board.js` (Presentational Component)**
   - Responsible for layout composition.
   - Renders the 3x3 grid using Flexbox UI principles.
3. **`Square.js` (Atom Component)**
   - The fundamental interactive unit handling individual touch events via `TouchableOpacity`.
   - Distinctive styling based on the assigned prop value ('X' or 'O').

## 2. State Management & Data Flow
The state is managed locally via React Hooks (`useState`). 
When a user taps a square:
1. `Square.js` triggers the `onPress` callback passed from `Board.js`.
2. `Board.js` bubbles this event up to `App.js` with the corresponding index (0-8).
3. `App.js` checks if the square is already filled or if the game is over. If not, it clones the `board` array (maintaining immutability), updates the index, and sets the new state. This triggers a downward re-render.

## 3. Algorithmic Complexity

### Win Detection (`calculateWinner`)
The win detection mechanism uses static checks against all 8 possible winning combinations on a 3x3 board:
```javascript
const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6]             // Diagonal
];
```
- **Time Complexity**: **O(1)**. Since the board size is fixed at 9 squares and there are exactly 8 winning lines, the loop always executes a maximum of 8 iterations regardless of the board's internal state.
- **Space Complexity**: **O(1)**. The algorithm evaluates the combinations in-place using existing memory references without allocating auxiliary data structures.

### Draw Detection
Determining a draw involves evaluating if the board is completely full and no winner has been decided.
```javascript
const isDraw = !winner && board.every((square) => square !== null);
```
- **Time Complexity**: **O(1)**. Checking the array of fixed length (9).

## 4. Cross-Platform Adaptations
* **Responsive Spacing**: `Platform.OS === 'web'` was used to conditionally apply layout margins on browsers while allowing native mobile builds to fill the device screen seamlessly using `SafeAreaView`.
* **Environment Polyfills**: Development under older Node LTS environments (v18) required `polyfill.js` to inject ES2023 Array methods (`toReversed`, `toSorted`) required by the underlying Expo Metro Bundler.

## 5. Potential Enhancements
If the requirement evolves to support variable-size grids (e.g., N x N boards requires M in a row to win):
- The `calculateWinner` logic would scale poorly `O(N^2)` with precomputed lines.
- It should be replaced with a directional ray-casting algorithm extending outwards from the `lastPlayedIndex` to check contiguous lines dynamically in `O(M)` time.
