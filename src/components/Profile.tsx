import { StyleSheet,Image,View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'

const Profile = () => {
  return (
    <View style={styles.ImgContainer}>
      <Image source={require('../assets/app_images/4511668.png')} style={styles.img}></Image>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  ImgContainer: {
    height:SPACING.space_36,
    width:SPACING.space_36,
    borderRadius:SPACING.space_12,
    borderWidth:2,
    borderColor:COLORS.secondaryBlackRGBA,
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden',
  },
  img: {
      height:SPACING.space_36,
      width:SPACING.space_36
  }
})