import { StyleSheet, View, Dimensions } from "react-native"

import Colors from "../../constants/colors"

function Card({children}) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 55 : 60,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        //Android
        elevation: 4
    },
})