import { useState } from "react"
import { StyleSheet, TextInput, View, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native"

import Card from "../components/UI/Card"
import InstructionText from "../components/UI/InstructionText"
import PrimaryButton from "../components/UI/PrimaryButton"
import Title from "../components/UI/Title"
import Colors from "../constants/colors"

function StartGameScreen({pickedNumberHandler}) {

  const [enteredNumber, setEnteredNumber] = useState('')

  const { height, width } = useWindowDimensions()

  const numberInputHandler = (inputText) => {
    setEnteredNumber(inputText)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber)

    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number!', 
        'Choose a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }
    pickedNumberHandler(chosenNumber)
  }

  const resetInputHandler = () => {
    setEnteredNumber('')
  }

  const marginTop = height < 400 ? 30 : 100

  return (
    <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter A Number</InstructionText>
            <TextInput
              maxLength={2} 
              keyboardType="number-pad" 
              style={styles.numInput}
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center'
  },
  numInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  }
})