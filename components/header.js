import React from 'react'
import {View ,Text, TextInput, TouchableOpacity,StyleSheet,Alert,Image,Modal, ScrollView, KeyboardAvoidingView, ProgressBarAndroidComponent} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Header,Icon,Badge} from 'react-native-elements'

export default class Myheader extends React.Component{

    constructor(props){
        super(props)
        this.state={
            value:''
        }
    }
     BellIconWithBadge=()=>{
         return(<View>

             <Icon
     name='bell' type='font-awesome' color='#6969' size={25}
     onPress={()=>{
         this.props.navigation.navigate('Notifications')
     }
     }
             />
             <Badge
             value={
                 this.state.value
             }
             containerStyle={{
                 position:'absolute',
                 top:-4,
                 right:-4
             }}
             />
         </View>)
     }

     NoOfUnreadNotifications=()=>{
         db.collection('all_notifications').where('notification_status','==','unred')
         .onSnapshot((snapshot)=>{
var unreadNotification=snapshot.docs.map((doc)=>{
doc.data()
})
this.setState({
    value:unreadNotification.length
})
         })
     }
componentDidMount=()=>{
    this.NoOfUnreadNotifications()
}
     render(){
return(
    <Header
    leftComponent={<Icon
    name='bars' type='font-awesome' color='#6969'  
    onPress={()=>{
    this.props.navigation.toggleDrawer()
        }
    }
    />}
    centerComponent={{text:props.title,
        style:{color:'orange',fontSize:20,fontWeight:'bold'}}}
        backgroundColor = 'skyBlue'
        rightComponent={
<this.BellIconWithBadge{...this.props}/>
        }
    />
)
}
}
