import React, {useEffect, useState} from "react";
import { AntDesign , MaterialIcons} from '@expo/vector-icons';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert} from "react-native";
import {  useRoute} from "@react-navigation/native";

import api from "../services/api"

const { width, height} = Dimensions.get("screen")

const user_id = "60b77ed6901227408c046231"


function AsionaCont({navigation}) {

    const route = useRoute()
      const { conts} = route.params;
    const [nome, setnome] = useState(conts.nome)
    const [numero, setnumero] = useState(conts.numero)

    async function AddContacto (){

        if(numero.trim("") =="" || nome.trim("") ==""){

            Alert.alert(
                "Compos obrigatorios",
                "Por favor preecha todos campos e tente novamente"
            )
            return
        }

        try{
            const _id = conts._id;
            const user = conts.user;

            const data = { numero, nome, _id, user}

            const response = await api.post("/tcontacto", data)
            Alert.alert(
                "Resta do Servidor",
                `${response.data}`
            )
            navigation.goBack()

        }catch{ alert("Erro ao criar contaco")}

    }




  return (
      <SafeAreaView style={styles.container}>

        <View style={{ marginTop:30, flexDirection:"row", alignItems:"center", width:width*0.93, justifyContent:"space-between"}}>

            <View style={{flexDirection:"row", alignItems:"center"}}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="close" size={40} color="black" />
                </TouchableOpacity>
                

                <Text style={{fontSize:30, marginLeft:10}}>Novo Contacto</Text>
            </View>
            
            <TouchableOpacity onPress={() => AddContacto()}
                style={{backgroundColor:"red", width:width*0.2, borderRadius:4, height:height*0.05, alignItems:"center", justifyContent:"center"}}
            >
                <Text style={{fontSize:18, fontWeight:"700", color:"#fff"}}>Guardar</Text>
            </TouchableOpacity>
            
        </View>

        <View style={{backgroundColor:"#fff", elevation:3, marginTop: height*0.06, 
            width:width*0.9, height:height*0.2,paddingHorizontal:width*0.05, justifyContent:"center"}}>

            <Text style={{fontWeight:"700", fontSize:20}}>Nome</Text>
            <TextInput placeholder="Intoduz o nome completo" autoCapitalize="words" value={nome} onChangeText={(text) => setnome(text)} />
        </View>

        <View style={{backgroundColor:"#fff", elevation:3, marginTop: height*0.06, 
            width:width*0.9, height:height*0.2,paddingHorizontal:width*0.05, justifyContent:"center"}}>

            <Text style={{fontWeight:"700", fontSize:20}}>Numero</Text>
            <TextInput placeholder="Intoduz o nome numero" 
            keyboardType="number-pad" maxLength={9}
            value={numero} onChangeText={(text) => setnumero(text)} />
        </View>

      </SafeAreaView>
  )
}

export default AsionaCont;

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
        marginBottom:height*0.03
    }
})