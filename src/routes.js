import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Main from './pages/main'
import Product from './pages/product'

const Routes = createAppContainer(
    createSwitchNavigator({
        Main,
        Product
    })
);

export default Routes;