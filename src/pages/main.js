import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import api from '../services/api'

export default function Main({ navigation }){

    const [docs1, setDocs1] = useState([]);
    const [page, setPage] = useState(1);
    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        async function loadProducts(page){

            const response = await api.get(`/products?page=${page}`)

            const { docs, ...productInfo } = response.data
    
            setDocs1([...docs1, ...docs])
            setProductInfo(productInfo)
        }

        loadProducts(page)
    }, [page]);

    function loadMore(){

        if(page == productInfo.pages) {
            return
        }

        const pageNumber = page + 1

        setPage(pageNumber)
    }

    function renderItem({item}){
        return (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>

                <TouchableOpacity 
                    style={styles.productButton} 
                    onPress={() => {
                        navigation.navigate('Product', { product: item })
                    }}
                >
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* {docs1.map(product => <Text key={product._id}>{product.title}</Text>)} */}
            <FlatList 
                contentContainerStyle={styles.list}
                data={docs1}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 20
    },

    productContainer: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24,
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: "bold"
    }
})