import React from "react";
import { ScrollView, StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import { COLORS, SPACING } from "../theme/theme";
import Header from "../components/Header";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";
import CartItem from "../components/CartItem";


const CartScreen = ({navigation,route} : any) =>  {
  const CartList = useStore((state:any)=> state.CartList);
  const CartPrice = useStore((state:any)=> state.CartPrice);
  const incrementCartItemQuantity = useStore((state:any)=> state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore((state:any)=> state.decrementCartItemQuantity);
  const calculateCartPrice = useStore((state:any)=> state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();
  const buttonPressHandler = () => {
    navigation.push('Payment',{amount:CartPrice})
    }

    const incrementCartItemQuantityHanlder = (id:string,size: string) => {
      incrementCartItemQuantity(id,size);
      calculateCartPrice();
    }

    const decrementCartItemQuantityHanlder = (id:string,size: string) => {
      decrementCartItemQuantity(id,size);
      calculateCartPrice();
    }
    return(
      <View style={styles.ScreenContainer}>
          <StatusBar backgroundColor={COLORS.primaryBlackHex} />

          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}>
            <View style={[styles.ScrollViewInner,{marginBottom:tabBarHeight}]}>
              <View style={styles.ItemTitle}>
              <Header title="Cart"  />
              {CartList.length == 0 ? (<EmptyListAnimation title={'Cart is Empty'} />
              ) : (
                <View style={styles.ListItem}>
                  {CartList.map((data:any) => (
                    <TouchableOpacity onPress={() => {
                          navigation.push('Details',{index:data.index, id:data.id,type:data.type})
                    }} key={data.id}
                    >
                      <CartItem 
                      id= {data.id}
                      name= {data.name}
                      imagelink_square ={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted= {data.roasted}
                      prices= {data.prices}
                      type= {data.type}
                      incrementCartItemQuantityHanlder={incrementCartItemQuantityHanlder}
                      decrementCartItemQuantityHanlder={decrementCartItemQuantityHanlder}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                 
                 )}
              </View>
              {CartList.length != 0 ?  <PaymentFooter  buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay" price={{price:CartPrice,currency:'$'}}/> : <></>}
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
export default CartScreen;