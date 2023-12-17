import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcom from './CustomIcom';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width*0.32;

interface CoffeeCardProps {
    id:string,
    index : number,
    type :string,
    roasted : string,
    imagelink_square : ImageProps,
    name : string,
    special_ingredient: string,
    average_rating: number,
    price: any,
    buttonPressHandler : any,
}
const CoffeeCard: React.FC<CoffeeCardProps> = ({id,index,type,roasted,imagelink_square,name,special_ingredient,average_rating,price,buttonPressHandler}) => {
  return (
    <LinearGradient
    start={{x:0,y:0}}
    end={{x:1,y:1}}
    style={styles.CardContainer}
    colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}>
        <ImageBackground  source={imagelink_square} style={styles.CardImg} resizeMode='cover'>
            <View style={styles.CardRatingContainer}>
                <CustomIcom name='star' color={COLORS.vang} size={FONTSIZE.size_16} />
                <Text style={styles.TextStar}>{average_rating}</Text>
            </View>
        </ImageBackground>
        <Text style={styles.CardTitle}>{name}</Text>
        <Text style={styles.CardSpecial}>{special_ingredient}</Text>
        <View style={styles.CardFooter}>
            
            <Text style={styles.CardPriceCurrency}>
              $ <Text style={styles.CardPrice}>{price.price}</Text>
            </Text>
            <TouchableOpacity onPress={() => {
                buttonPressHandler({id,index,type,roasted,imagelink_square,name,special_ingredient,prices:[{...price,quantity:1}]});}}>
                <BGIcon color={COLORS.primaryWhiteHex} name={'add'} BGColor={COLORS.redMan} size={FONTSIZE.size_10} />
            </TouchableOpacity>
        </View>

        
    </LinearGradient>
  )
}

export default CoffeeCard

const styles = StyleSheet.create({
    CardContainer: {
        padding:SPACING.space_15,
        borderRadius:BORDERRADIUS.radius_25,
    },
    CardImg: {
        width:CARD_WIDTH,
        height:CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom:SPACING.space_15,
        overflow:'hidden',
    }, 
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent:'center',
        gap:SPACING.space_10,
        paddingHorizontal:SPACING.space_16,
        position:'absolute',
        borderBottomLeftRadius:BORDERRADIUS.radius_20,
        borderRadius: BORDERRADIUS.radius_20,
        top : 0,
        right:0,
    },
    TextStar: {
        fontFamily:FONTFAMILY.poppins_medium,
        color:COLORS.vang,
        fontSize:FONTSIZE.size_14,
        lineHeight:22,
    },
    CardFooter: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:SPACING.space_15,
    },
    CardTitle:{
        fontFamily:FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize:FONTSIZE.size_16,
    },
    CardSpecial : {
        fontFamily:FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize:FONTSIZE.size_10,
    },
    CardPrice : {
        color: COLORS.primaryWhiteHex,
    },
    CardPriceCurrency :{
        fontFamily:FONTFAMILY.poppins_semibold,
        color: COLORS.redMan,
        fontSize:FONTSIZE.size_18,
    }
})