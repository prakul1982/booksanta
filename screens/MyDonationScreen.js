import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import Header from '../components/header.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId:firebase.auth().currentUser.email,
       allDonations:'',
     }
     this.requestRef= null
   }


   getAllDonations =()=>{
     this.requestRef=db.collection('all_Donations').where('donerId','==',this.state.userId)
     .onSnapshot((snapshot)=>{
       var allDonations=snapshot.docs.map((document)=>{
document.data()
       })
       this.setState({
         allDonations:allDonations
       })
     })
   }

   sendBook=(bookDetails)=>{
     if(bookDetails.request_status==='Book Sent'){
       var request_status='doner intrested'
       db.collection('all_Donations').doc(bookDetails.doc_id).update({
         request_status:'donner intrested'
       })
       this.sendNotification(bookDetails,request_status)
     }
     else{
       var request_status='book Sent'
       db.collection('all_Donations').doc(bookDetails.doc_id).update({
        request_status:'book Sent'
      })
      this.sendNotification(bookDetails,request_status)
     }
   }

   sendNotification=(bookDetails,request_status)=>{
     var request_Id=bookDetails.request_Id
     var donerId=bookDetails.donner_Id
     db.collection('all_notifications').where('request_Id','==',request_Id)
     .where('donerId','==',donerId)
     .get().then((snapshot)=>{
       snapshot.forEach(()=>{
         var msg =''
         if(request_status==='Book Sent'){
           msg=this.state.donnerName+'Sent you book'
         }
         else{
           msg=this.state.donnerName+'has shown intrest in donating books'
         }
         db.collection('all_notifications').doc(doc.id).update({
          message:msg,notification_status:'unread',date:firebase.firestore.FieldValue.serverTimestamp()
         })
       })
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
     key={i}
     title={item.book_Name}
     subtitle={'Requested by:'+item.requestedBy+'Status:'+item.request_status}
     leftItem={<Icon
     name='book'
     type='font-awesome'
     color='#696969'
     />}
     titleStyle={{
       color:'black',
       fontWeight:'bold'
     }}
     rightElement={<TouchableOpacity style={styles.button}
     onPress={(item)=>{
this.sendBook()
     }}
     >
<Text style={{color:'white'}}>
SEND BOOK
</Text>

     </TouchableOpacity>}
     bottomDivider
     />
   )


   componentDidMount(){
     this.getAllDonations()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Donations"/>
         <View style={{flex:1}}>
           {
             this.state.allDonations.length===0?
             (<View style={styles.subtitle}>
<Text style={{fontSize:20}}>
LIST OF ALL BOOK DONATIONS
</Text>
             </View>)
             :(<FlatList
             keyExtractor={this.keyExtractor}
             data={this.state.allDonations}
             renderItem={this.renderItem}
             />)
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})
