import React from 'react'

import { WebView } from 'react-native'

export default function Product({ navigation }){
    const product = navigation.getParam('product')
    return (
        <WebView source={{ uri: product.url }} />
    )
}