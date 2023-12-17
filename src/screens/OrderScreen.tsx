import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import Header from "../components/Header";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PopupAnimation from "../components/PopupAnimation";
import OrderHistoryCard from "../components/OrderHistoryCard";

const OrderScreen = ({ navigation }: any) => {

  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push('Details', { index, id, type })
  }
  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('Home')
    },2000);
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopupAnimation style={styles.LottieAnimation} source={require('../lottie/download.json')} />
      ) : (
        <></>)}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewContainer}>
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <Header title="Order History" />

            {OrderHistoryList.length == 0 ? (<EmptyListAnimation title={'No order History'} />
            ) : (
              <View style={styles.ListItem}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard key={index.toString()}
                    navigationHandler={navigationHandler}
                    OrderDate={data.OrderDate}
                    CartListPrice={data.CartListPrice}
                    CartList={data.CartList} />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ?
            <TouchableOpacity style={styles.Checkout} onPress={() => {
              buttonPressHandler();
            }}>
              <Text style={styles.Text}>Done</Text>
            </TouchableOpacity> : <></>}
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.xanh,
  },
  ScrollViewContainer: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItem: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
  LottieAnimation: {
    height: 250,
  },
  Checkout: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.redMan,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  Text: {
    fontFamily :FONTFAMILY.poppins_semibold,
    fontSize : FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  }


});
export default OrderScreen;