import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useStore } from "../store/store";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import ImgBG from "../components/ImgBG";
import PaymentFooter from "../components/PaymentFooter";

const DetailScreen = ({ navigation, route }: any) => {
  const ItemofIndex = useStore((state: any) =>
    route.params.type == "Coffee" ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const BackHanlder = () => {
    navigation.pop();
  }
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavouriteList(type, id) : addFavouriteList(type, id);
  }
  const addFavouriteList = useStore((state: any) => state.addFavouriteList);
  const deleteFromFavouriteList = useStore((state: any) => state.deleteFromFavouriteList);

  const [fullDes, setFullDes] = useState(false);
  const [price, setPrice] = useState(ItemofIndex.prices[0]);
  const addToCart = useStore((state:any) => state.addToCart);
  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);

  const AddToCart = ({id,index,name,roasted,imagelink_square,special_ingredient,type,price}: any) => {
    addToCart({id,index,name,roasted,imagelink_square,special_ingredient,type,prices:[{...price,quantity:1}]});
    calculateCartPrice();
    navigation.navigate('cart')
  }

  

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        <ImgBG
          EnableBackHandler={true}
          imagelink_portrait={ItemofIndex.imagelink_portrait}
          type={ItemofIndex.type}
          id={ItemofIndex.id}
          favourite={ItemofIndex.favourite}
          name={ItemofIndex.name}
          special_ingredient={ItemofIndex.special_ingredient}
          ingredients={ItemofIndex.ingredients}
          average_rating={ItemofIndex.average_rating}
          ratings_count={ItemofIndex.ratings_count}
          roasted={ItemofIndex.roasted}
          BackHandler={BackHanlder}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.FooterContainer}>
          <Text style={styles.Descriptiontitle}>Description</Text>
          {fullDes ? (<TouchableWithoutFeedback onPress={() => { setFullDes(prev => !prev) }}>
            <Text style={styles.DescriptionText}>{ItemofIndex.description}</Text>
          </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => { setFullDes(prev => !prev) }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>{ItemofIndex.description}</Text>
            </TouchableWithoutFeedback>)}
          <Text style={styles.Descriptiontitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {ItemofIndex.prices.map((data: any) => (
              <TouchableOpacity onPress={()=> {
                setPrice(data);
              }} key={data.size} style={[styles.SizeBox, { borderColor: data.size == price.size ? COLORS.redMan : COLORS.primaryDarkGreyHex }]}>
                <Text style={[styles.SizeText, {
                  fontSize: ItemofIndex.type == 'bean' ?
                    FONTSIZE.size_14 : FONTSIZE.size_16,
                  color:
                    data.size == price.size ? COLORS.redMan : COLORS.secondaryLightGreyHex
                }]}



                >{data.size}</Text>

              </TouchableOpacity>
            ))}
          </View>
        </View>


              <PaymentFooter price={price} buttonTitle="Add To Cart" buttonPressHandler={() => {
                  AddToCart({
                    id:ItemofIndex.id,
                    index:ItemofIndex.index,
                    name:ItemofIndex.name,
                    roasted:ItemofIndex.roasted,
                    imagelink_square:ItemofIndex.imagelink_square,
                    special_ingredient:ItemofIndex.special_ingredient,
                    type:ItemofIndex.type,
                    price:price,
                  })
              }} />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollView: {
    flexGrow: 1,
    justifyContent:'space-between',

  },
  FooterContainer: {
    padding: SPACING.space_20,
  },
  Descriptiontitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  sizeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:SPACING.space_20,


  },
  SizeBox :{
    flex:1,
    backgroundColor:COLORS.primaryDarkGreyHex,
    alignItems:'center',
    justifyContent:'center',
    height:SPACING.space_20*2,
    borderRadius:BORDERRADIUS.radius_15,
    borderWidth: 2,
  },
  SizeText :{
    fontFamily:FONTFAMILY.poppins_medium,
  }

});
export default DetailScreen;