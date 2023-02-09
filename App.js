import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState(null)
  const [gameIsOver,setGameIsOver] = useState(true)
  const [guessRounds,setGuessRounds] = useState(0)
  
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded) {
    return <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading Fonts</Text>
    </View>
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  let screen = <StartGameScreen pickedNumberHandler={pickedNumberHandler} />

  const onStartNewGame = () => {
    setUserNumber(null)
  }

  if(userNumber) {
    screen = <GameScreen gameOverHandler={gameOverHandler} userNumber={userNumber} />
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen onStartNewGame={onStartNewGame} roundsNum={guessRounds} userNum={userNumber} />
  }

  

  return (
    <>
      <StatusBar style="light" animated={true} />
      <LinearGradient colors={[Colors.primary700,Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground 
          source={require('./assets/images/background.png')} 
          resizeMode="cover" 
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary600
  },
  loadingText: {
    fontSize: 24,
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 12
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});
