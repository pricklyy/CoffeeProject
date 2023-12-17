import React, { useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet,Text,TextInput,ToastAndroid,TouchableOpacity,View } from "react-native";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import Header from "../components/Header";
import CustomIcom from "../components/CustomIcom";
import CoffeeCard from "../components/CoffeeCard";

const getCategoriesFromData = (data:any) => {
  let temp : any = {};
  for(let i =0;i<data.length; i++) {
    if(temp[data[i].name] == undefined){
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category:string,data:any) => {
  if(category == "All"){
    return data;
  } else {
    let CoffeeList = data.filter((item:any)=> item.name == category);
    return CoffeeList;
  }
}

const HomeScreen = ({navigation}:any) =>  {
  const CoffeeList = useStore((state:any)=> state.CoffeeList);
  const BeanList = useStore((state:any)=> state.BeanList);

  const [categories,setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText,setSearchText] = useState('');
  const [categoryIndex,setCategoryIndex] = useState({
    index :0,
    category: categories[0],
  })
  const [sortedCoffee,setSortedCoffee] = useState(getCoffeeList(categoryIndex.category,CoffeeList));

  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();
  const searchCoffee = (search: string) => {
    if(search != "") {
      ListRef?.current?.scrollToOffset({
        annimated:true,
        offset:0,
        })
        setCategoryIndex({index:0,category:categories[0]})
        setSortedCoffee([...CoffeeList.filter((item:any) => 
        item.name.toLowerCase().includes(search.toLowerCase()))])
    }
  }
  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      annimated:true,
      offset:0,
      })
      setCategoryIndex({index:0,category:categories[0]})
      setSortedCoffee([...CoffeeList])
      setSearchText('')
  }
  const addToCart = useStore((state:any) => state.addToCart);
  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);
  const CoffeeCardAddtoCart = ({id,index,name,roasted,imagelink_square,special_ingredient,type,prices}: any) => {
    addToCart({id,index,name,roasted,imagelink_square,special_ingredient,type,prices,});
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${name} is Added to Cart`,ToastAndroid.SHORT,ToastAndroid.CENTER)
    
  }
    return(
      <View style={styles.ScreenContainer}>
          <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            <Header title="Home"/>
            <Text style={styles.Title}>Find the best{'\n'}coffee for you</Text>

            <View style={styles.InputContainer}>
              <TouchableOpacity onPress={()=>{
                searchCoffee(searchText);
              }}>
                <CustomIcom name="search" size={FONTSIZE.size_18} color={searchText.length > 0? COLORS.redMan:COLORS.primaryGreyHex} style={styles.InputIcon}/>
              </TouchableOpacity>
              <TextInput placeholder="Find Your Coffee..."  value={searchText}
               onChangeText={text => {
                setSearchText(text)
                searchCoffee(text);
              }} placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.textInput}/>
              {searchText.length > 0 ?
              (<TouchableOpacity onPress={()=> {
                resetSearchCoffee();
              }}>
                <CustomIcom style={styles.inputIcon}name="close"size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />

              </TouchableOpacity>
              ):(
                <></>
              )}
            </View>

            <ScrollView  horizontal showsHorizontalScrollIndicator={false}  contentContainerStyle={styles.CategoryScroll}>
              {categories.map((data,index)=> (
                <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
                  <TouchableOpacity onPress={()=>{
                    ListRef?.current?.scrollToOffset({
                    annimated:true,
                    offset:0,
                    })
                    setCategoryIndex({index:index,category:categories[index]});
                    setSortedCoffee([...getCoffeeList(categories[index],CoffeeList)])
                  }} style={styles.TouchItem}>
                    <Text style={[styles.CategoryText,categoryIndex.index == index ? {color:COLORS.redMan,}:{},]}>{data}</Text>
                    {categoryIndex.index == index ?<View style={styles.ActiveCategory} /> :<></>}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <FlatList ref={ListRef} ListEmptyComponent={
              <View style={styles.EmptyList}>
                <Text style={styles.CategoryText}>No Coffee Available</Text>
              </View>
            }horizontal showsHorizontalScrollIndicator={false}
            data={sortedCoffee} contentContainerStyle={styles.FlatListContainer}
            keyExtractor={(item) => item.id}
            renderItem={({item})=> {
              return <TouchableOpacity onPress={()=>{
                navigation.push('Details',{index:item.index,id:item.id,type:item.type})
              }}>
                <CoffeeCard
                id={item.id}
                index={item.index}
                type ={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeeCardAddtoCart} />
              </TouchableOpacity>
            }}
            />

            <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

            <FlatList horizontal showsHorizontalScrollIndicator={false}
            data={BeanList} contentContainerStyle={[styles.FlatListContainer,{marginBottom:tabBarHeight}]}
            keyExtractor={(item) => item.id}
            renderItem={({item})=> {
              return <TouchableOpacity onPress={()=>{
                navigation.push('Details',{index:item.index,id:item.id,type:item.type})
              }} >
                <CoffeeCard
                id={item.id}
                index={item.index}
                type ={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeeCardAddtoCart} />
              </TouchableOpacity>
            }}
            />
          </ScrollView>
      </View>
    )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex:1,
    backgroundColor:COLORS.xanh,
  },
  scrollView: {
    flexGrow:1,
  },
  Title : {
    fontSize:FONTSIZE.size_28,
    fontFamily:FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
    paddingLeft:SPACING.space_30,
  },
  InputContainer : {
    flexDirection:'row',
    margin:SPACING.space_30,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.nen,
    alignItems:'center',
    borderWidth: 0.5,
  },
  InputIcon : {
    marginHorizontal: SPACING.space_20,
  },
  textInput: {
    flex:1,
    height: SPACING.space_20*3,
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_14,
    color:COLORS.redMan,
  },
  CategoryScroll: {
      paddingHorizontal:SPACING.space_20,
      marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer : {
    paddingHorizontal: SPACING.space_15,
  },
  ActiveCategory: {
    height:SPACING.space_10,
    width:SPACING.space_10,
    borderRadius:BORDERRADIUS.radius_10,
    backgroundColor:COLORS.redMan,
  },
  TouchItem: {
    alignItems:'center',
  },
  CategoryText : {
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_4,
  },
  FlatListContainer: {
    gap:SPACING.space_20,
    paddingVertical:SPACING.space_20,
    paddingHorizontal:SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize:FONTSIZE.size_18,
    marginLeft:SPACING.space_30,
    marginTop:SPACING.space_20,
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
  },
  inputIcon: {
    marginHorizontal:SPACING.space_20,
  },
  EmptyList: {
    width:Dimensions.get('window').width - SPACING.space_30 *2,
    alignItems:'center',
    justifyContent:'center',
    padding:SPACING.space_36*2.6,
  }
});
export default HomeScreen;