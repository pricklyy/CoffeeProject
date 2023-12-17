import React,{useState} from "react";
import { ScrollView, StatusBar, StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import GradientIcon from "../components/GradientIcon";
import PaymentMethod from "../components/PaymentMethod";
import PaymentFooter from "../components/PaymentFooter";
import LinearGradient from "react-native-linear-gradient";
import CustomIcom from "../components/CustomIcom";
import { useStore } from "../store/store";
import PopupAnimation from "../components/PopupAnimation";



const  PaymentList = [
  {
    name : 'Wallet',
    icon : 'icon' ,
    isIcon : true,
  },
  {
    name : 'Momo',
    icon : require('../assets/app_images/momo.png') ,
    isIcon : false,
  },
  {
    name : 'VN Pay',
    icon : require('../assets/app_images/vnpay.png') ,
    isIcon : false,
  },
  {
    name : 'Google Pay',
    icon : require('../assets/app_images/gpay.png') ,
    isIcon : false,
  },
  {
    name : 'Apple Pay',
    icon : require('../assets/app_images/applepay.png') ,
    isIcon : false,
  },
  {
    name : 'Amazon Pay',
    icon : require('../assets/app_images/amazonpay.png') ,
    isIcon : false,
  },
  
]
const PaymentScreen = ({navigation,route} : any) =>  {
  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore((state:any) => state.addToOrderHistoryListFromCart);
  const [paymentMode,setPaymentMode] = useState('Credit Card');
  const [showAnimation ,setShowAnimation] = useState(false);
  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History')
    },2000);
  }
    return(
      <View style={styles.ScreenContainer}>
          <StatusBar backgroundColor={COLORS.primaryBlackHex} />
          {showAnimation? <PopupAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')}/> : <></>}


          <ScrollView 
          showsVerticalScrollIndicator = {false}
          contentContainerStyle={styles.ScrollViewContainer}
          >
            <View style = {styles.HeaderContainer}>
              <TouchableOpacity onPress={() =>{
                navigation.pop();
              }}>
                <GradientIcon name="left" color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />

              </TouchableOpacity>
              <Text style={styles.HeaderText}>Payments</Text>
              <View style={styles.EmptyViews} />

             
            </View>
            <View style={styles.PaymentOptionsContainer}>
              <TouchableOpacity onPress={() => {
                setPaymentMode('Credit Card')
              }}>
                <View style={[styles.CardCreditContainer,{ borderColor:paymentMode == 'Credit Card'? COLORS.redMan:COLORS.primaryGreyHex,}]}>

                  <Text style={styles.CreditCardTitle}>Credit Card</Text>
                  <View style= {styles.CreditCardItem}>
                    <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]} style={styles.LinearGradientStyle} >
                      <View style = {styles.CreditCardRow}>
                        <CustomIcom name="chip"  size={FONTSIZE.size_20 *2}  color={COLORS.vang} />

                        <CustomIcom name="visa"  size={FONTSIZE.size_30 *2}  color={COLORS.primaryWhiteHex} />
                      </View>

                      <View style = {styles.CreditCardNumberContainer}>
                        <Text style={styles.CreditCardNumber}>0999</Text>
                        <Text style={styles.CreditCardNumber}>9999</Text>
                        <Text style={styles.CreditCardNumber}>9999</Text>
                        <Text style={styles.CreditCardNumber}>9999</Text>
                      </View>

                      <View style= {styles.CreditCardRow}>
                        <View style= {styles.CreditCardContainerName}>
                          <Text style= {styles.CreditCardSubName}>Card Holder Name</Text>
                          <Text style= {styles.CreditCardTitleName}>NGO TUAN ANH</Text>
                        </View>

                        <View style= {styles.CreditCardContainerDate}>
                          <Text style= {styles.CreditCardSubName}>Thời hạn/Date</Text>
                          <Text style= {styles.CreditCardTitleName}>02/26</Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                </View>

              </TouchableOpacity>
              {PaymentList.map((data:any) =>(
                <TouchableOpacity key={data.name} onPress={() => {
                  setPaymentMode(data.name);
                }}>
                  <PaymentMethod  
                  paymentMode= {paymentMode} 
                  name={data.name} 
                  icon={data.icon} 
                  isIcon={data.isIcon}/>
                </TouchableOpacity>
              ))}

            </View>
          </ScrollView>

          <PaymentFooter buttonTitle= {`Pay with ${paymentMode}`} 
          price={{price :route.params.amount,currency:'$'}}
          buttonPressHandler={buttonPressHandler}
          />
      </View>
    )
}


const styles = StyleSheet.create({
  ScreenContainer : {
    flex : 1,
    backgroundColor:COLORS.xanh,
  },
  ScrollViewContainer : {
    flexGrow : 1,
  },
  HeaderContainer : {
    paddingHorizontal:SPACING.space_24,
    paddingVertical:SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  HeaderText :{
    fontSize: FONTSIZE.size_20,
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
  },
  EmptyViews :{
    height:SPACING.space_36,
    width:SPACING.space_36,
  },
  PaymentOptionsContainer :{
    padding : SPACING.space_15,
    gap:SPACING.space_15,
  },
  CardCreditContainer : {
    padding :  SPACING.space_10,
    gap : SPACING.space_10,
    borderRadius : BORDERRADIUS.radius_25,
    borderWidth : 3,
  },
  CreditCardTitle : {
    fontFamily  :FONTFAMILY.poppins_semibold,
    fontSize : FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft : SPACING.space_10,  
  },
  CreditCardItem : {
    backgroundColor : COLORS.primaryGreyHex,
    borderRadius : BORDERRADIUS.radius_25,    
  },
  LinearGradientStyle : {
    borderRadius :BORDERRADIUS.radius_25,
    gap  : SPACING.space_36,
    paddingHorizontal:SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardRow : {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  CreditCardNumberContainer : {
    flexDirection : 'row',
    gap : SPACING.space_10,
    alignItems : 'center'
  },
  CreditCardNumber : {
    fontFamily  :FONTFAMILY.poppins_semibold,
    fontSize : FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing:SPACING.space_4 +  SPACING.space_2
  },
  CreditCardSubName : {
    fontFamily  :FONTFAMILY.poppins_regular,
    fontSize : FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardTitleName : {
    fontFamily  :FONTFAMILY.poppins_medium,
    fontSize : FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardContainerName : {
    alignItems : 'flex-start'
  },
  CreditCardContainerDate : {
    alignItems : 'flex-end'
  },
  LottieAnimation : {
    flex : 1,
  }

});
export default PaymentScreen;