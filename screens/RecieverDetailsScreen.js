import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class RecieverDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId:firebase.auth().currentUser.email,
      reciverId:this.props.navigation.getParam('details')[user_Id],
      requestId:this.props.navigation.getParam('details')[request_Id],
      bookName:this.props.navigation.getParam('details')[book_name],
      reasonToRequesting:this.props.navigation.getParam('details')[reason_To_Request],
      reciverName:'',
      reciverContact:'',
      reciverAdress:'',
      reciverRequestDocId:''
    }
  }



getRecieverDetails(){
  db.collection('users').where('email_Id','==',this.state.reciverId).get()
  .then((snapshot)=>{
snapshot.forEach((doc)=>{
this.setState({
  reciverName:doc.data().first_Name,
  reciverContact:doc.data().contact,
  reciverAdress:doc.data().adress

})
})
  })
 }

updateBookStatus=()=>{
  db.collection('all_Donations').add({
    book_Name:this.state.bookName,
    request_Id:this.state.requestId,
    requestedBy:this.state.reciverName,
    donerId:this.state.userId,
    request_status:'doner Interested'
  })
}



componentDidMount(){
  this.getRecieverDetails()
}

addNotification=()=>{
var msg=this.state.userName+' Has shown intrest in donating the book'
db.collection('all_notifications').add({
  targeted_user_id:this.state.reciverId,
  doner_id:this.state.userId,
  request_Id:this.state.requestId,
  book_name:this.state.bookName,
  date:firebase.firestore.FieldValue.serverTimestamp(),
  notification_status:'unread',
  message:msg
})
}

  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Book Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reasonToRequesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
        <Card
              title={"Reciver Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.reciverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>contact : {this.state.reciverContact}</Text>
            </Card>
            <Card >
              <Text style={{fontWeight:'bold'}}>Adress : {this.state.reciverAdress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.reciverId!==this.state.userId?
            (<TouchableOpacity style={styles.button}
            onPress={()=>{
              this.updateBookStatus()
              this.addNotification()
              this.props.navigation.navigate('MyDonations')
            }}
            >
<Text>
  I WANT TO DONATE
</Text>

            </TouchableOpacity>)
            :null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})
