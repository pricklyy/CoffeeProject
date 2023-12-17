import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientIcon from './GradientIcon'
import Profile from './Profile'


interface HeaderProps {
    title?: string,
}
const Header:React.FC<HeaderProps>= ({title}) => {
  return (
    <View style={styles.HeaderContainer}> 
    <GradientIcon name='menu'color={COLORS.nen} size={FONTSIZE.size_16} />
      <Text style={styles.HeaderText}>{title}</Text>
      <Profile/>
    </View>
  )
}




const styles = StyleSheet.create({
    HeaderContainer: {
        padding:SPACING.space_30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    HeaderText : {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_20,
        color:COLORS.primaryWhiteHex,
    }
})
export default Header