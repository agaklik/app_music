import { StatusBar } from 'expo-status-bar';
import { ScrollView, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player'

export default function App() {

  LogBox.ignoreAllLogs(true);
  const [audioIndex, setarAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [audio, setarAudio] = useState(null);

  const [musicas, setarMusicas] = useState([
    
    {
        nome: 'Menino Campeiro',
        artita: 'Paulinho Mocelin',
        playing:false,
        file: require('./menino_campeiro.mp3')
    }, 

    {
      nome: 'Perigosa e Linda',
      artita: 'Corpo e Alma',
      playing:false,
      file: require('./perigosa_e_linda.mp3')
  }, 

  {
    nome: 'Faded',
    artita: 'Alan Walker',
    playing:false,
    file: require('./faded.mp3')
    
    },
     {
        nome: 'A Ilha',
        artita: 'Armandinho',
        playing:false,
        file: require('./a_ilha.mp3')
    }, 

    {
      nome: 'Titanium',
      artita: 'David Guetta',
      playing:false,
      file: require('./titanium.mp3')
  }, 

  {
    nome: 'Alone',
    artita: 'Alan Walker',
    playing:false,
    file: require('./alone.mp3')
    
    }

  ]);

  const changeMusic = async (id) =>{
     let curFile = null;
     let newMusics= musicas.filter((val, k)=>{
      if(id == k){
        //Toca a música aqui
        musicas[k].playing = true;
        curFile = musicas[k].file;
        setPlaying(true);
        setarAudioIndex(id);
        
      }else{
         musicas[k].playing = false;
      }
       return musicas[k];

     })

     if(audio != null){
        audio.unloadAsync();
     }

     //Instancia o Audio
     let curAudio = new Audio.Sound();

     try{

      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();

     }catch(error){}
  
     setarAudio(curAudio);
     setarMusicas(newMusics);
  }

  

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
      <Text style={{textAlign:'center', color:'white', fontSize:25}}>App Música | Alexandre</Text>
      </View>

      <View style={styles.table}>
        <Text style={{width:'50%', color:'rgb(200, 200, 200)'}}>Música</Text>
        <Text style={{width:'50%', color:'rgb(200, 200, 200)'}}>Artista</Text>
      </View>

      {
        musicas.map((val, k)=>{
             if(val.playing){                
                return(
                <View style={styles.table}>
                  <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                    <Text style={styles.tableTextSelected}><AntDesign name="play" size={15}
                     color="#1DB954"/>{val.nome}</Text>
                    <Text style={styles.tableTextSelected}>{val.artita}</Text>
                  </TouchableOpacity>
                </View>
                );
             }else{                
                return(
                  <View style={styles.table}>
                  <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                    <Text style={styles.tableText}><AntDesign name="play" size={15} color="white"/>{val.nome}
                    </Text>
                    <Text style={styles.tableText}>{val.artita}</Text>
                  </TouchableOpacity>
                </View>
                  );
             }
        })
      }
      <View style={{paddingBottom:200}}></View>
      
      </ScrollView>

      <Player playing={playing} setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} 
      musicas={musicas} setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}>
    
     </Player>

      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',    
  },
  header:{
      backgroundColor:"#1DB954",
      width:'100%',
      padding:20
  },
  table:{
    flexDirection:'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomtWidth:1
  },
  tableTextSelected:{
    width:'50%',
    color:'#1DB954'
  },
  tableText:{
    width:'50%',
    color:'white'

  }

});
