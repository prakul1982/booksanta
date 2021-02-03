import React from 'react'
import {Image} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import bookDonate from '../screens/bookDonate'
import bookRequest from '../screens/bookRequest'

export const AppTabNavigator = createBottomTabNavigator({

    DonateBooks:{screen:bookDonate,
    navigationOptions:{tabBarIcon:<Image
    source={require('../assets/request-list.png')}
    style={{width:20,height:20}}
    />,
tabBarLabel:'DONATE BOOKS'
}
},
BookRequest:{screen:bookRequest,
    navigationOptions:{tabBarIcon:<Image
    source={require('../assets/request-book.png')}
    style={{width:20,height:20}}
    />,
tabBarLabel:'REQUEST BOOKS'
}
}
}
)