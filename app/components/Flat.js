import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image, Button, Dimensions} from "react-native";
import { Actions } from 'react-native-router-flux';
import MyTable from './Table';
import { List, ListItem, Icon, Header, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

const width = (Dimensions.get('window').width - 4 * 10) / 2;

export class MyHeader extends Component{
  constructor(props) {
      super(props);
      this.state = { 
        username: props.username,
        rank: props.rank,
      }
  }

  render(){
    if(this.state.rank){
      return(
        <Header
          containerStyle={{ backgroundColor: '#009387'}}
          placement="left"
          centerComponent={<Text style={styles.headerText}>Classifica</Text>}
        />      
      )
    }
    else{
      return(
        <Header
          containerStyle={{ backgroundColor: '#009387'}}
          placement="left"
          leftComponent={<Icon name="arrow-left" type="font-awesome" color="white" onPress={()=> Actions.rank()}/>}
          centerComponent={<Text style={styles.headerText}>Profilo di {this.state.username}</Text>}
        />      
      )
    }
  }  
} 


export default class Flat extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          dataSource: props.dataSource,
          rank: props.rank,
          logFlag: props.logFlag,
          username: props.username                  
        }
    }

  delete = ({ID_img}) => {
    this.setState({ logFlag: false });
    let path = "http://192.168.1.200:8000/api/delete/" + ID_img + '/';
    axios
    .post(path)
    .then(res => {
      alert("Immagine eliminata con successo")
      Actions.profile({'user': this.state.username});
    })
    .catch(err => console.log(err))
  }     
  
  _renderItem = ({ item }) => {
    let path = "http://192.168.1.200:8000/" + item.upload;
    if(this.state.rank){
      return (
          <View style={styles.container}>
              <Image 
                  source={{uri: path}}
                  style={{flex: 0.5, padding: 20, height:100, width: 100}}
              />
              <MyTable data={item}/>
          </View>
      )       
    }
    else{
      if(this.state.logFlag){
        return(
          <View style={styles.profileContainer}>
              <Card
                image={{uri: path}}
                imageStyle={{height:150}}
                containerStyle={[styles.card, { height: 200}]}
              >
                <Text>{item.name} ha vinto {item.fights_won}/{item.fights} battaglie</Text>
              </Card>

              <View style={styles.buttonContainer}>
                <Button title="Elimina" color='#009387' onPress={() => this.delete({ID_img: item.id})}></Button>
              </View>

          </View>
        );
      }
      else{
        return(
          <View style={styles.profileContainer}>
            <Card
              image={{uri: path}}
              imageStyle={{height:150}}
              containerStyle={[styles.card, { height: 200}]}
            >
              <Text>{item.name} ha vinto {item.fights_won}/{item.fights} battaglie</Text>
            </Card>
          </View>
        );
      }
    }     
  }      

  FlatListItemSeparator = () => {
    return (
        <View
        style={{
            height: 1,
            width: "100%",
            backgroundColor: "#000",
        }}
        />
    );
  }

  headerFlat = ({course}) => {
    let title = ""
    if(course == 'primi'){
      title = 'Primi piatti'
    }
    else if(course=='secondi'){
      title = 'Secondi piatti'
    }
    else if(course=='dessert'){
      title = 'Dolci'
    }

    return (
      <View elevation={1} style={styles.flatHeader}>
        <Text style={styles.flatText}>{title}</Text>
      </View>
    );
  }

  render() {
    let primi = this.state.dataSource.filter(it => it.course.includes('primo'));
    let secondi = this.state.dataSource.filter(it => it.course.includes('secondo'));
    let dolci = this.state.dataSource.filter(it => it.course.includes('dessert'));

    let numCol = 1
    if(!this.props.rank){
      numCol = 2
    }

    return (
      <ScrollView>           
          <MyHeader dataSource={this.state.dataSource} rank={this.state.rank} username={this.state.username}/>            
          <FlatList
              data={primi}
              renderItem={this._renderItem}
              ListHeaderComponent = { this.headerFlat({'course': 'primi'}) }   
              ItemSeparatorComponent = { this.FlatListItemSeparator }
              ListFooterComponent = { this.FlatListItemSeparator }
              keyExtractor={(item, index) => index}
              numColumns={numCol}
          />
          <FlatList
              data={secondi}
              renderItem={this._renderItem}
              ListHeaderComponent = { this.headerFlat({'course': 'secondi'}) }   
              ItemSeparatorComponent = { this.FlatListItemSeparator }
              ListFooterComponent = { this.FlatListItemSeparator }
              keyExtractor={(item, index) => index}
              numColumns={numCol}
          />
          <FlatList
              data={dolci}
              renderItem={this._renderItem}
              ListHeaderComponent = { this.headerFlat({'course': 'dessert'}) }   
              ItemSeparatorComponent = { this.FlatListItemSeparator }
              ListFooterComponent = { this.FlatListItemSeparator }
              keyExtractor={(item, index) => index}
              numColumns={numCol}
          />
      </ScrollView>
    );                 
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', padding: 0, paddingTop: 15, backgroundColor: '#fff' },
  profileContainer: { flex: 1, flexDirection: 'column', padding: 0, paddingTop: 15, backgroundColor: '#fff' },
  buttonContainer: { flex: 0.5, flexDirection: 'column', width: width, margin:10, padding: 0, paddingTop: 15, backgroundColor: '#fff' },
  
  headerText: {
    color: 'white',
    marginTop:5,
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  flatHeader: {
    marginTop: 10,
    height: 50,
    width: "97%",
    margin: 5,
    backgroundColor: "#fff",
    borderColor: "black",
    alignSelf: "center",
  },
  flatText:{ 
    fontWeight: "bold", 
    fontSize: 5, 
    flex: 1, 
    alignSelf: "center", 
    paddingTop: 5, 
    fontSize: 20
  },
    card: {
    flex: 1,
    width: width,
    margin: 10,
  }, 
});