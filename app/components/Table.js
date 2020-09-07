import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, Button} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Actions } from 'react-native-router-flux';

export default class MyTable extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          tableHead: ['Nome', 'Punteggio', 'Utente'],   
          tableData: [[]]                   
        }
    }
  
  render() {
    const data = this.state.data;
    let path = "http://192.168.1.200:8000/" + data.upload;
    let tableData = [[]]
    tableData.push([data.name, data.score, data.ID_user]);
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
        <Button title="Scopri" onPress={() => Actions.profile({'user': data.ID_user})}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 0, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' },
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
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 16,
    },
    shadowOpacity: 1,
    shadowRadius: 7.49
  },
  flatText:{ fontWeight: "bold", fontSize: 5, flex: 1, alignSelf: "center", paddingTop: 5, fontSize: 20},
  ratingImage: {
    height: 80,
    width: 100
  }, 
});