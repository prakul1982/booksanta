import React from 'react'
import {View ,Text, TextInput, TouchableOpacity,StyleSheet,Alert,Image,Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class WelcomeScreen extends React.Component{
    
constructor(){
super()

this.state={

emailid:'',
password:'',
isModalVisible:false,
firstName:'',
lastName:'',
contact:'',
adress:'',
confirmPassword:''}

             }


userSignUp=(emailid,password,confirmPassword)=>{


if(password!== confirmPassword){
    return Alert.alert('WRONG PASSWORD')

                               }

else{
firebase.auth().createUserWithEmailAndPassword(emailid,password)

.then((response)=>{

db.collection('users').add({
    first_Name:this.state.firstName,
    last_Name:this.state.lastName,
    adress:this.state.adress,
    contact:this.state.contact,
    emailid:this.state.emailid,
                           })

return Alert.alert(
    'ALERT','USER ADDED SUCESSFULY',
    [{
        text:'OK',onPress:()=>{

            this.setState({
                isModalVisible:false
                          })
                              }
    }]
                  )
                  })

.catch (function(error){
var errorMsg = error.message 
return Alert.alert(errorMsg)

                        })

                                            }}

userlogin=(emailid,password)=>{
firebase.auth().signInWithEmailAndPassword(emailid,password)

.then((response)=>{
//return Alert.alert('USER SUCESSFULLY LOGINED')
this.props.navigation.navigate('DonateBooks')

                  })

.catch (function(error){
var errorMsg = error.message
return Alert.alert(errorMsg)

                       })

                              }     

showModal=()=>{

    return(

        <Modal 

            animationType='fade' 
            transparent={true}
            visible={this.state.isModalVisible}
        >

<View style={styles.modalContainer}>

<ScrollView style={{width:'100%'}}>

<KeyboardAvoidingView style={styles.KeyboardAvoidingView}>

<Text style={styles.modalTitle}>
 REGISTRATION

</Text>

<TextInput

    style={styles.formTextInput}
    placeholder='FIRST NAME'
    maxLength={12}
    onChangeText={(text)=>{
 this.setState({ 
 firstName:text
    
               })
                          }}
/>

<TextInput

    style={styles.formTextInput}
    placeholder='LAST NAME'
    maxLength={12}
    onChangeText={(text)=>{
    this.setState({
    lastName:text
                  })
                          }}
/>

<TextInput

    style={styles.formTextInput}
    placeholder='CONTACT'
    maxLength={10}
    keyboardType={'numeric'}
    onChangeText={(text)=>{
    this.setState({
    contact:text
                  })
                          }}
/>

<TextInput

    style={styles.formTextInput}
    placeholder='ADRESS'
    multiline={true}
    onChangeText={(text)=>{
    this.setState({
    adress:text
                  })
                          }}
/>

<TextInput
    style={styles.formTextInput}
    placeholder='ENTER EMAIL ADRESS'
    keyboardType='email-address'
    onChangeText={(text)=>{
    this.setState({
    emailid:text  
                  })

                          }}
/>
                
<TextInput
    style={styles.formTextInput}
    placeholder='ENTER PASSWORD'
    secureTextEntry={true}
    onChangeText={(text)=>{
    this.setState({
    password:text
                  }) 

                          }}
/>

<TextInput
    style={styles.formTextInput}
    placeholder='CONFIRM PASSWORD'
    secureTextEntry={true}
    onChangeText={(text)=>{
    this.setState({
 confirmPassword:text
                  }) 
                          }}
/>

<TouchableOpacity  

    style={styles.registerButton}
    onPress={()=>{
    this.userSignUp(this.state.emailid,this.state.password,this.state.confirmPassword)
                 
                 }}
>

    <Text style={styles.registerButtonText}>
        REGISTER
    </Text>

</TouchableOpacity>

<TouchableOpacity 

    style={styles.cancelButton}
    onPress={()=>{
        this.setState({
            isModalVisible:false
                      })
                 }}
>
    <Text style={styles.registerButtonText}>
        CANCEL
    </Text>

</TouchableOpacity>

</KeyboardAvoidingView>

</ScrollView>


</View>

</Modal>
    )
    
}

render(){

 return(
    <View style={styles.container}>     

        <View style={{justifyContent:'center',alignItems:'center'}}>
            {this.showModal()}
    </View>

    <View>    

        <Text style={styles.title}>
            BOOK SANTA 
        </Text>

    </View>

    <View>

        <TextInput
            style={styles.loginBox}
            placeholder='ENTER EMAIL ADRESS'
            keyboardType='email-address'
            onChangeText={(text)=>{ 

            this.setState({

            emailid:text  })

                                    }}
        />
        
        <TextInput
            style={styles.loginBox}
            placeholder='ENTER PASSWORD'
            secureTextEntry={true}
            onChangeText={(text)=>{

                this.setState({
                password:text
                            }) 

                                    }}
        />

    </View>

    <View>   
                    
        <TouchableOpacity style={[styles.button,{marginTop:30,marginBottom:40}]}
        
            onPress={()=>{
                            this.setState({isModalVisible:true})  
                            console.log(this.state.isModalVisible)     
                            }}
        >         

            <Text style={styles.buttonText}>    
                SIGNUP
            </Text>                

        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
        
            onPress={()=>{
            this.userlogin(this.state.emailid,this.state.password)
                            
                            }}
        >         
            <Text style={styles.buttonText}>                     
                LOGIN
            </Text> 

        </TouchableOpacity>

    </View>

    <View>

        <Image
            source={require('../assets/booksanta.png')}
            style={{width:400,height:400,marginLeft:20}}

        />

    </View>

    </View>

)

}
} 

const styles = StyleSheet.create({ 
    
container:{flex:1,backgroundColor:'grey'},

profileContainer:{flex:1,justifyContent:'center',alignItems:'center'}, 
     
title:{fontSize:65,fontWeight:'300',paddingBottom:30,color:'black',marginTop:50 ,fontWeight:'bold',shadowOffset:{width:0,height:8,},shadowOpacity:0.6,shadowRadius:5,elevation:122,}, 
     
loginBox:{color:'white',width:300,height:40,borderBottomWidth:3,borderColor:'#ff8a65',fontSize:20,margin:10,paddingLeft:10,marginLeft:50,shadowOffset:{width:0,height:8,},shadowOpacity:20,shadowRadius:7,elevation:122},
          
button:{width:300,height:50,justifyContent:'center',alignItems:'center',borderRadius:25,backgroundColor:"#ff9800",shadowColor: "black",marginLeft:50,borderWidth:3,borderColor:'black',shadowOffset:{width:0,height:8,},shadowOpacity:1,shadowRadius:10.32,elevation:16,}, 
            
buttonText:{color:'black',fontWeight:'900',fontSize:20}, 
            
buttonContainer:{ flex:1,alignItems:'center'} ,

KeyboardAvoidingView:{ flex:2, justifyContent:'center', alignItems:'center' }, 

modalTitle :{ justifyContent:'center', alignSelf:'center', fontSize:35, color:'black', margin:50 ,fontWeight:'bold',marginBottom:5}, 

modalContainer:{ flex:1, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:"orange", marginRight:30, marginLeft : 30, marginTop:80, marginBottom:80, }, formTextInput:{ width:"70%", height:45, alignSelf:'center', borderColor:'black', borderRadius:15, borderWidth:2, marginTop:20, padding:10 }, 

registerButton:{ width:200, height:60, alignItems:'center', justifyContent:'center', borderWidth:2, borderRadius:70, marginTop:20 }, 

registerButtonText:{ color:'white', fontSize:30}, 

cancelButton:{ width:200, height:60, justifyContent:'center', alignItems:'center', marginTop:20, borderWidth:2, borderRadius:70 },

                                 })