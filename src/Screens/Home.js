import React, {useEffect, useState} from "react";
import {  useIsFocused} from "@react-navigation/native";
import { AntDesign , MaterialIcons} from '@expo/vector-icons';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import _ from "lodash";

import api from "../services/api";

const { width, height} = Dimensions.get("screen")

const HomeScreen = ({navigation}) => {
    
    const isFocused = useIsFocused();

    const [contactoss, setcontactoss] = useState([])
    const [datafull, setdatafull] = useState([])
    const [datasecha, setdatasecha] = useState("")

    useEffect(() => {
      async function ChamarCon(){

        try{
            const response = await api.get("/contacto",{
                headers:{
                    user:"60b77ed6901227408c046231",
                }
            })
            setcontactoss(response.data)
            setdatafull(response.data)
        }catch{
            alert("erro")
        }
      }
      
      if(isFocused){
        ChamarCon()
      }
    }, [isFocused])

    const seachbar = (text) =>{
        const seachtext = text.toLowerCase()
        const data = _.filter(contactoss, nome => {
          if(seachtext.trim() !==""){
            if(nome.nome.toLowerCase().includes(seachtext) || nome.numero.includes(seachtext)){
              return true
            }
            return false
          }
        })
        if(text.trim() < 1){
            setcontactoss(datafull)
        }
        setcontactoss(data)
        if(text.trim() < 1){
            setcontactoss(datafull)
        }
        
      }




    return(
        <SafeAreaView style={styles.container}>

            <View style={{ marginTop:30, flexDirection:"row", alignItems:"center", width:width*0.93, justifyContent:"space-between"}}>
                <Text style={{fontSize:30}}>Contactos</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Newcontac")}>
                    <MaterialIcons name="add-box" size={40} color="black"  />
                </TouchableOpacity>
                
            </View>

            <View style={{marginVertical:height*0.1, marginBottom:height*0.04, flexDirection:"row",alignItems:"center", 
                backgroundColor:"#fff", elevation:1, borderRadius:8}}>
                <TextInput 
                    placeholder="Pesquisar"
                    onChangeText={seachbar}

                    style={{height:height*0.07, width:width*0.9, textAlign:"center", borderRadius:8, backgroundColor:"#ddd"}} />
                <AntDesign name="search1" size={24} color="black" style={{position:"absolute", right:5}}/>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{width:width, }}>
                {contactoss.map(conts => (
                    <TouchableOpacity style={styles.contactos} key={conts._id} onPress={() => navigation.navigate("Editconta", {conts})}>
                        <View style={{backgroundColor:"#ddd",  padding:10}}>
                            <AntDesign name="user" size={30} color="black" />
                        </View>

                        <View style={{marginLeft:10}}>

                            <Text style={{fontWeight:"700", fontSize:22}}>{conts.nome}</Text>
                            <Text style={{fontWeight:"700", color:"#ddd"}}>{conts.numero}</Text>
                        </View>
                        
                    </TouchableOpacity>
                ))}
            </ScrollView>
            

        </SafeAreaView>
    )

}

export default HomeScreen;


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:"center"
    },
    contactos:{
        elevation:8,
        backgroundColor:"#fff",
        width:width*0.9,
        height:height*0.1,
        borderRadius:8,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:8,
        marginBottom:height*0.03,
        alignSelf:"center"
    }
})