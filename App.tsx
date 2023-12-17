import React from "react";
import { StyleSheet,Text,View } from "react-native";
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack= createNativeStackNavigator();
import TabNavigator from "./src/navigators/TabNavigator";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import PaymentScreen from "./src/screens/PaymentScreen";

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Tab" component={TabNavigator} options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen name="Details" component={DetailScreen} options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen name="Payment" component={PaymentScreen} options={{animation:'slide_from_bottom'}}></Stack.Screen>
   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default App;