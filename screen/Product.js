import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert,ActivityIndicator } from "react-native";
import { API_URL } from "../config/constans";
import axios from "axios";
import dayjs from "dayjs";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
const Product = (props) => {
    const {id} = props.route.params;
    const [product, setProduct] = useState(null);
    useEffect(() => {
		axios
			.get(`${API_URL}/products/${id}`)
			.then((result) => {
				setProduct(result.data.product);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
    if (!product){
        return <ActivityIndicator/>
        //경로 틀리면 스피너가 돌아요
    }

    const onPressButton=() => {
        axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("결제가 완료 되었습니다");
        getProduct();
      })
      .catch((error) => {
        console.log(error);
      });
         if(product.soldout !==1){
         Alert.alert('구매가 완료되었습니다.')
         }
    };
    const convertPrice = product.price.toLocaleString("ko-KR");
    return(
        <View Style={styles.container}>
        <ScrollView>
            <View>
                <Image style = {styles.productImage} 
                source = {{uri : `${API_URL}/${product.imageUrl}`}}/>
            </View>
            <View style={styles.productSection}>
                <View style={styles.productSeller}>
                    <Text style={styles.sellerText}>{product.seller}</Text>
                    <Image style={styles.sellerAvatar} source={{uri:"https://cdn-icons-png.flaticon.com/512/10374/10374507.png"}}/>
                </View>
                <View style={styles.divider}></View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{convertPrice}</Text>
                    <Text style={styles.productDate}>카테고리:{product.category}</Text>
                    <Text style={styles.productDesc}>{product.desc}</Text>
            </View>
        </ScrollView>
        {/* scrollView 안에있으면 스크롤에 따라 같이 넘어간다.
        바깥쪽에 요소 두면 고정됨 */}
        <TouchableOpacity onPress={onPressButton}>
            <View style={product.soldout===1 ? styles.purchaseDisabled : styles.purchaseBtn}>
                <Text style={styles.purchaseText}>{product.soldout===1 ? "품절" : "구매하기"}</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor:"#ffffff",
    },
    productImage:{
        width:"100%",
        height:300,
        resizeMode:"contain"
    },
    productSection:{
        padding:16,
    },
    productSeller:{
        flexDirection:"row",
        alignItems:"center",
    },
    divider:{
        backgroundColor:"#ddd",
        height:1,
        marginVertical:16,
    },
    sellerText:{
        color:"#333",
        fontWeight:900,

    },
    sellerAvatar:{
        width:50,
        height:50,
    },
    productName:{
        fontSize:24,
        fontWeight:400
    },
    productPrice:{
        fontSize:18,
        fontWeight:700,
        marginTop:8
    },
    productDate:{
        fontSize:14,
        marginTop:4,
        color:"#aaa"
    },
    productDesc:{
        fontSize:16,
        marginTop:4,
        color:"#666"
    },
    purchaseBtn:{
        position: "absolute",
        top:0,
        left:0,
        right:0,
        backgroundColor:"rgb(255,90,88)",
        height:60,
        alignItems:"center",
        justifyContent: "center",
    },
    purchaseText:{
        color:"white",
        fontSize:24,
    },
    purchaseDisabled:{
        position: "absolute",
        top:0,
        left:0,
        right:0,
        backgroundColor:"gray",
        height:60,
        alignItems:"center",
        justifyContent: "center",
    }

})



export default Product;