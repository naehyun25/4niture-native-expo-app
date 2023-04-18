import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./screen/Main";
import Product from "./screen/Product";
import Review from "./screen/Review";

const Stack = createNativeStackNavigator();

console.log(Stack)
export default function App() {
	return (
		<SafeAreaView style={styles.safeView}>
       <NavigationContainer>
        <Stack.Navigator 
		initialRouteName="Main"
		screenOptions={{
			headerStyle: {
			  backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
			  fontWeight: 'bold',
			},
		  }}
		>
          <Stack.Screen name="Main" component={Main} options={{title:"홈화면" }}/>
          <Stack.Screen name="Product" component={Product} options={{title:"상품상세화면" }}/>
          <Stack.Screen name="Review" component={Review} options={{title:"리뷰" }}/>
        </Stack.Navigator>
       </NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeView:{
		flex:1,
		backgroundColor:"#fff"
	}
});
