import { StyleSheet,Text,View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartSceen";
import FavouriteScreen from "../screens/FavouriteScreen";
import OrderScreen from "../screens/OrderScreen";
import CustomIcom from "../components/CustomIcom";
import { COLORS } from "../theme/theme";
import { BlurView } from "@react-native-community/blur";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
            <Tab.Navigator screenOptions={{headerShown:false,tabBarHideOnKeyboard:true,tabBarShowLabel:false,tabBarStyle:styles.tabBarStyle
            ,tabBarBackground:()=>(
                <BlurView overlayColor="" blurAmount={1} style={styles.blurStyle} />
            )}}>
                <Tab.Screen name='Home' component={HomeScreen}
                options={{tabBarIcon:({focused,color,size})=>(
                    <CustomIcom name="home" size={25} color={focused?COLORS.redMan:COLORS.primaryLightGreyHex} />
                )}}></Tab.Screen>
                <Tab.Screen name='cart' component={CartScreen}
                options={{tabBarIcon:({focused,color,size})=>(
                    <CustomIcom name="cart" size={25} color={focused?COLORS.redMan:COLORS.primaryLightGreyHex} />
                )}}></Tab.Screen>
                <Tab.Screen name='Favourite' component={FavouriteScreen}
                options={{tabBarIcon:({focused,color,size})=>(
                    <CustomIcom name="like" size={25} color={focused?COLORS.redMan:COLORS.primaryLightGreyHex} />
                )}}></Tab.Screen>
                <Tab.Screen name='History' component={OrderScreen}
                options={{tabBarIcon:({focused,color,size})=>(
                    <CustomIcom name="bell" size={25} color={focused?COLORS.redMan:COLORS.primaryLightGreyHex} />
                )}}></Tab.Screen>
            </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    tabBarStyle: {
        height:65,
        position:'absolute',
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopWidth:0,
        elevation:0,    
        borderTopColor:'transparent'
    },
    blurStyle: {
        position: 'absolute',
        top : 0,
        bottom:0,
        left:0,
        right:0,
    }
});
export default TabNavigator;