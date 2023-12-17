import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'
import CustomIcom from './CustomIcom'

interface GradientIconProps {
    name:string,
    color:string,
    size:number,
}


const GradientIcon:React.FC<GradientIconProps> = ({name,color,size}) => {
  return (
    <View style={styles.IconContainer}>
      <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} style={styles.LinearGradient} colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}>
      <CustomIcom name={name} color={color} size={size} />
      </LinearGradient>
      
    </View>
  )
}

export default GradientIcon

const styles = StyleSheet.create({
    IconContainer: {
        borderWidth: 2,
        borderColor:COLORS.secondaryDarkGreyHex,
        borderRadius:SPACING.space_12,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.secondaryDarkGreyHex,
        overflow:'hidden',
    },
    LinearGradient: {
        height:SPACING.space_36,
        width:SPACING.space_36,
        alignItems:'center',
        justifyContent:'center'
    }
})