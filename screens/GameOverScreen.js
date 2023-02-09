import { ScrollView, Image, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import PrimaryButton from "../components/UI/PrimaryButton"

import Title from "../components/UI/Title.ios"
import Colors from "../constants/colors.ios"

function GameOverScreen({roundsNum, userNum, onStartNewGame }) {
    
  const { height, width } = useWindowDimensions()
  
  let imageSize = 300

  if(width < 380) {
    imageSize = 150
  }

  if(height < 400) {
    imageSize = 80
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }


  return (
    <ScrollView style={styles.flex}>
      <View style={styles.rootContainer}>
        <Title>Game Over</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={require('../assets/images/success.png')}/>
        </View>
        <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNum}</Text> rounds to guess the number <Text style={styles.highlight}>{userNum}</Text></Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  )
}

export default GameOverScreen

// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    // borderRadius: 150,
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    height: '100%',
    width: '100%'
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize:24,
    textAlign: 'center',
    marginBottom: 16
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
})