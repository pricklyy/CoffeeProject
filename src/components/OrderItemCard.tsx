import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface OrderItemCardProps {
    type: string,
    name: string,
    imagelink_square: ImageProps,
    special_ingredients: string,
    prices: any,
    ItemPrice: string,
}
const OrderItemCard: React.FC<OrderItemCardProps> = ({
    type,
    name,
    imagelink_square,
    special_ingredients,
    prices,
    ItemPrice,
}) => {
    return (
        <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]} style={styles.CardLinearGradient}>
            <View style={styles.CardInfoContainer}>
                <View style={styles.CardImageContainer}>
                    <Image source={imagelink_square}  style={styles.img}/>
                    <View>
                        <Text style={styles.Title}>{name}</Text>
                        <Text style={styles.Subtitle}>{special_ingredients}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.Currency}>$ <Text style={styles.Prices}>{ItemPrice}</Text></Text>
                </View>
            </View>
            {prices.map((data:any,index:any) => (
                <View key={index.toString()} style={styles.CardRow}>
                    <View style={styles.CardRow}>
                        <View style={styles.SizeBox}>
                            <Text style={[styles.SizeText,
                                {fontSize:type=="Bean" ?FONTSIZE.size_12:FONTSIZE.size_16}]}
                                
                                >
                                    {data.size}</Text>
                        </View>
                        <View style={styles.PriceBox}>
                            <Text style={styles.PriceCurrence}>{data.currency}<Text style={styles.Price}></Text>{data.price}</Text>
                        </View>
                    </View>
                    <View style={styles.CardRow}>
                        <Text style={styles.CardQuantity}>X <Text style={styles.Price}>{data.quantity}</Text></Text>
                        <Text style={styles.CardQuantity}>$ <Text style={styles.Price}>{(data.quantity*data.price).toFixed(2).toString()}</Text></Text>
                    </View>
                </View>
            ))}
        </LinearGradient>
    )
}

export default OrderItemCard

const styles = StyleSheet.create({
    CardLinearGradient :{
        gap:SPACING.space_20,
        padding:SPACING.space_20,
        borderRadius:BORDERRADIUS.radius_25,
        marginTop:SPACING.space_10
    },
    CardInfoContainer : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    CardImageContainer : {
        flexDirection:'row',
        gap:SPACING.space_20,
        alignItems:'center',
       
    },
    img : {
        height:90,
        width:90,
        borderRadius : BORDERRADIUS.radius_15,
    },
    Title : {
        fontFamily :FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color:COLORS.primaryWhiteHex,
    },
    Subtitle : {
        fontFamily :FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color:COLORS.secondaryLightGreyHex,
    },
    Currency :{
        fontFamily :FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color:COLORS.redMan,
    },
    Prices : {
        color:COLORS.primaryWhiteHex,
    },
    CardRow : {
        flex : 1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    SizeBox : {
        backgroundColor:COLORS.primaryBlackHex,
        height:45,
        flex: 1,
        borderTopLeftRadius:BORDERRADIUS.radius_10,
        borderBottomLeftRadius:BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems:'center',
        borderRightWidth: 1,
        borderRightColor:COLORS.primaryGreyHex,
    },
    SizeText : {
        fontFamily :FONTFAMILY.poppins_medium,
        color:COLORS.primaryWhiteHex,
    },
    PriceBox : {
        backgroundColor:COLORS.primaryBlackHex,
        height:45,
        flex: 1,
        borderTopRightRadius:BORDERRADIUS.radius_10,
        borderBottomRightRadius:BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems:'center',
        borderLeftWidth: 1,
        borderLeftColor:COLORS.primaryGreyHex,
    },
    PriceCurrence : {
        fontFamily :FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color:COLORS.primaryWhiteHex,
    },
    Price :{
        color:COLORS.primaryWhiteHex,
    },
    CardQuantity : {
        flex : 1,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color:COLORS.redMan
    }

})