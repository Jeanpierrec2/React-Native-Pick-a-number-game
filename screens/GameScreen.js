import { useEffect, useState } from "react"
import {  View, StyleSheet, Alert, Text, FlatList, useWindowDimensions } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";
import PrimaryButton from "../components/UI/PrimaryButton";
import Title from '../components/UI/Title'
import GuessLogItem from "../components/game/GuessLogItem";


const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if(rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  }else{
    return rndNum
  }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({gameOverHandler,userNumber}) {

  const initialGuess = generateRandomBetween(
    1,
    100,
    userNumber
  )

  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRounds, setGuessRounds] = useState([initialGuess])

    const { width, height } = useWindowDimensions()

  const nextGuessHandler = (direction) => {

    if(
      (direction === 'lower' && currentGuess < userNumber) || 
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      return Alert.alert(
        "Don't lie", 
        "You know this is wrong",[
        { text: "Sorry!", style:'cancel' }
      ])
    }

    if(direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }
    const newRndNum = generateRandomBetween(
      minBoundary, 
      maxBoundary, 
      currentGuess
    )
    setCurrentGuess(newRndNum)
    setGuessRounds(prev => [newRndNum ,...prev])
  }

  useEffect(() => {
    if(currentGuess === userNumber){
      gameOverHandler(guessRounds.length)
    }
  },[currentGuess,userNumber, gameOverHandler])

  useEffect(() => {
    minBoundary = 1
    maxBoundary =100
  }, [])

  let content =
  <>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
      <InstructionText style={styles.instructionText} >Higher or lower?</InstructionText>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name="md-remove" size={24} />
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler('higher')}>
            <Ionicons name="md-add" size={24} />
          </PrimaryButton>
        </View>
      </View>
    </Card>
  </> 

  if(width > 400) {
    content =
    <>
      <View style={styles.buttonsContainerWide}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name="md-remove" size={24} />
          </PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler('higher')}>
            <Ionicons name="md-add" size={24} />
          </PrimaryButton>
        </View>
      </View>
    </> 
  }

  return (
    <View style={[styles.screen, {marginTop: width>400 ? 15 : 60}]}>
      <Title >Opponent's Guess</Title>
      { content }
      <View style={styles.listContainer}>   
        <FlatList 
          data={guessRounds} 
          renderItem={(itemData) => (
            <GuessLogItem 
              roundNumber={guessRounds.length - itemData.index} 
              guess={itemData.item} 
            />
          )} 
          keyExtractor={(item) => item} 
          />
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  instructionText: {
    marginBottom: 12
  },
  listContainer: {
    flex: 1,
    padding: 16
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})