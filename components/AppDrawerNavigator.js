import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './customSideBarMenu'
import SettingScreen from '../screens/settingScreen'
import MyDonationScreen from '../screens/MyDonationScreen'
import NotificationScreen from '../screens/notificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({

    Home:{screen:AppTabNavigator},
    Setting:{screen:SettingScreen},
    MyDonations:{screen:MyDonationScreen},
    Notifications:{screen:NotificationScreen}
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
}
)