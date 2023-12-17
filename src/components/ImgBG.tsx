import { StyleSheet, Text, View ,ImageProps, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import GradientIcon from './GradientIcon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcom from './CustomIcom';

interface ImgBGProps  {
    EnableBackHandler: boolean;
    imagelink_portrait : ImageProps;
    type : string,
    id: string,
    favourite : boolean,
    name : string,
    special_ingredient : string,
    ingredients:string,
    average_rating: number,
    ratings_count : string,
    roasted : string,
    BackHandler?: any,
    ToggleFavourite: any,
}
const ImgBG : React.FC<ImgBGProps>= ({
        EnableBackHandler,
        imagelink_portrait,
        type ,
        id,
        favourite,
        name ,
        special_ingredient,
        ingredients,
        average_rating,
        ratings_count ,
        roasted ,
        BackHandler,
        ToggleFavourite,}) => {
  return (
    <View>
      <ImageBackground source={imagelink_portrait} style={styles.ImgBackground}>
        {EnableBackHandler ? (
            <View style={styles.HeaderBarContainer}>
                <TouchableOpacity onPress={() => {
                    BackHandler();
                }}>
                    <GradientIcon name='left' 
                    color={COLORS.primaryLightGreyHex} 
                    size={FONTSIZE.size_16} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    ToggleFavourite(favourite,type,id);
                }}>
                <GradientIcon name='like' 
                color={favourite? COLORS.redMan: COLORS.primaryLightGreyHex} 
                size={FONTSIZE.size_16} />
                </TouchableOpacity>
            </View>
        ):(
            <View style={styles.HeaderBarContainerBack}>
            <TouchableOpacity onPress={() =>{
                    ToggleFavourite(favourite,type,id);
                }}>
            <GradientIcon name='like' 
            color={favourite? COLORS.redMan: COLORS.primaryLightGreyHex} 
            size={FONTSIZE.size_16} />
            </TouchableOpacity>
        </View>
        )}
        <View style={styles.imgInfoOuter}>
            <View style={styles.imgInfoInner}>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.itemTitle}>{name}</Text>
                        <Text style={styles.itemSpeical}>{special_ingredient}</Text>
                    </View>
                    <View style={styles.itemProperties}>
                        <View style={styles.properFirst}>
                            <CustomIcom name={type == 'Bean' ? 'bean' : 'beans'} 
                            size={type == 'Bean' ? FONTSIZE.size_18: FONTSIZE.size_24}
                            color={COLORS.redMan}
                            />
                            <Text style={[styles.propertyText,{marginTop:type == 'Bean' ? SPACING.space_4+ SPACING.space_2: 0}]}>{type}</Text>
                        </View>
                        <View style={styles.properFirst}>

                        <CustomIcom name={type == 'Bean' ? 'location' : 'drop'} 
                            size={FONTSIZE.size_16}
                            color={COLORS.redMan}
                            />
                            <Text style={styles.propertyTextLast}>{ingredients}</Text>
                        </View>
                    </View>
        </View>
        <View style={styles.infoContainer}>
            <View style={styles.RatingContainer}>
                <CustomIcom name='star' color={COLORS.vang} size={FONTSIZE.size_20} />
                <Text style={styles.RatingText}>{average_rating}</Text>
                <Text style={styles.RatingCountText}>({ratings_count})</Text>
            </View>
            <View style={styles.RoatedContainer}>
                <Text style={styles.RoatedText}>{roasted}</Text>
            </View>
        </View>
        </View>
        </View>
        
      </ImageBackground>

    </View>
  )
}

export default ImgBG

const styles = StyleSheet.create({
    ImgBackground: {
        width: '100%',
        aspectRatio: 20/25,
        justifyContent:'space-between',
    },
    HeaderBarContainer: {
        padding:SPACING.space_30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    HeaderBarContainerBack :{
        padding:SPACING.space_30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    imgInfoOuter: {
        paddingVertical:SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopLeftRadius:BORDERRADIUS.radius_20*2,
        borderTopRightRadius:BORDERRADIUS.radius_20*2,
    },
    imgInfoInner: {
        justifyContent: 'space-between',
        gap:SPACING.space_15,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    itemProperties :{
        flexDirection : 'row',
        alignContent:'center',
        gap:SPACING.space_20,
    },
    itemTitle : {
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_24,
        color:COLORS.primaryWhiteHex
    },
    itemSpeical: {
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_12,
        color:COLORS.primaryWhiteHex
    },
    properFirst : {
        height:55,
        width:55,
        borderRadius:BORDERRADIUS.radius_20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.primaryBlackHex
    },
    propertyText :{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_10,
        color:COLORS.primaryWhiteHex
    },
    RatingContainer :{
        flexDirection: 'row',
        gap:SPACING.space_10,
        alignItems:'center',
    },
    RatingText : {
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_18,
        color:COLORS.primaryWhiteHex,
    },
    RatingCountText: {
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:FONTSIZE.size_12,
        color:COLORS.primaryWhiteHex,
    },
    RoatedContainer :{
        height:55,
        width:55*2 +  SPACING.space_24,
        borderRadius:BORDERRADIUS.radius_20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.primaryBlackHex
    },
    RoatedText :{
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:FONTSIZE.size_10,
        color:COLORS.primaryWhiteHex,
    },
    propertyTextLast :{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_10,
        color:COLORS.primaryWhiteHex,
        marginTop:SPACING.space_2 + SPACING.space_4
    }

})