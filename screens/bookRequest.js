import React from 'react'
import {View ,Text, TextInput, TouchableOpacity,StyleSheet,Alert,Image,Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import Myheader from '../components/header'
export default class bookRequest extends React.Component{

    constructor(){
        super()
        this.state = {

            userId:firebase.auth().currentUser.email,
            bookName:'' , reasonToRequest:''
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }


    addRequest=(bookName,reasonToRequest)=>{
var userId = this.state.userId
var raondomRequestId= this.createUniqueId()
db.collection('requested_books').add({
    user_Id:userId,book_name:bookName,reason_To_Request:reasonToRequest,request_Id:raondomRequestId
})
this.setState({
    bookName:'',
    reasonToRequest:''

})
return Alert.alert('BOOK REQUESTED SUCESSFULLY')
    }

    render(){
        return(
            <View   style={{
                flex:1,
            }}>
<Myheader title='Request books'/>

<KeyboardAvoidingView  style={styles.keyBoardStyle}>  

<TextInput
    
    style={styles.formTextInput}
placeholder={'BOOK NAME'}
onChangeText={(text)=>{
this.setState({
    bookName:text
})
}}
value={this.state.bookName}
    />

    <TextInput
    
    style={styles.formTextInput}
multiline={true}
numberOfLines={10}
placeholder={'WHY DO YOU NEED THE BOOK'}
onChangeText={(text)=>{
this.setState({
    reasonToRequest:text
})
}}
value={this.state.reasonToRequest}
    />
    <TouchableOpacity   style={styles.button}
    onPress={()=>{
        this.addRequest(this.state.bookName,this.state.reasonToRequest)
    }}
    > 
        <Text>       
            REQUEST
         </Text>

      
        
    </TouchableOpacity>

  </KeyboardAvoidingView>  

            </View>
        ) 
    }
    
}

const styles = StyleSheet.create({ 
    
    keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' }, 
    formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, 
    button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", 
    shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, } )
