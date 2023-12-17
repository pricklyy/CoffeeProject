import React from "react";
import { ScrollView, StatusBar, StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS, SPACING } from "../theme/theme";
import Header from "../components/Header";
import EmptyListAnimation from "../components/EmptyListAnimation";
import FavouriteItem from "../components/FavouriteItem";

const FavouriteScreen = ({navigation} : any) =>  {
  const FavouriteList = useStore((state:any) => state.FavouriteList);
  const tabBarHeight = useBottomTabBarHeight();

  const addFavouriteList = useStore((state: any) => state.addFavouriteList);
  const deleteFromFavouriteList = useStore((state: any) => state.deleteFromFavouriteList);
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavouriteList(type, id) : addFavouriteList(type, id);
  }
    return(
      <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInner,{marginBottom:tabBarHeight}]}>
          <View style={styles.ItemTitle}>
          <Header title="Favourites"  />
          {FavouriteList.length == 0 ? (<EmptyListAnimation title={'No Favourites'} />
          ) : (
            <View style={styles.ListItem}>
              {FavouriteList.map((data:any) => (
                <TouchableOpacity onPress={() => {
                      navigation.push('Details',{index:data.index, id:data.id,type:data.type})
                }} key={data.id}
                >
                 <FavouriteItem
                 id= {data.id}
                 imagelink_portrait = {data.imagelink_portrait}
                 name = {data.name}
                 special_ingredient = {data.special_ingredient}
                 type = {data.type}
                 ingredients = {data.ingredients}
                 average_rating = {data.average_rating}
                 ratings_count = {data.ratings_count}
                 roasted = {data.roasted}
                 description = {data.description}
                 favourite = {data.favourite}
                 ToggleFavouriteItem  = {ToggleFavourite}
                 />
                </TouchableOpacity>
              ))}
            </View>
             
             )}
          </View>
        </View>
      </ScrollView>
  </View>
    )
}


const styles = StyleSheet.create({
  ScreenContainer : {
    flex : 1,
    backgroundColor : COLORS.xanh,
  
  },
  ScrollViewFlex : {
    flexGrow : 1,
  },
  ScrollViewInner : {
    flex : 1,
    justifyContent: 'space-between',
  },
  ItemTitle : {
    flex : 1,
  },
  ListItem :{
    paddingHorizontal:SPACING.space_20,
    gap:SPACING.space_20,
  }
});
export default FavouriteScreen;