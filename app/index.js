import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  Button,
  Switch,
  Alert
} from 'react-native';
import {manager, ReactCBLite} from 'react-native-couchbase-lite';

const SG_URL = '172.28.1.99:4984';
const DB_NAME = 'veiculos';
const SMT_DB_NAME = 'smt';
let database, smtDatabase;
let ddoc = {
  "views": {
    autos: {
      "map": function (doc) {
        if (doc.type === 'auto') {
          emit(doc._id, null);
        }
      }.toString()
    }
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dsAutos = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.state = {
      dataSource: ds.cloneWithRows([]),
      dataSourceAutos: dsAutos.cloneWithRows([]),
      placa: "",
      syncSwitch: false,
      sequence: ""      
    }
  }

  componentDidMount() {
    ReactCBLite.initWithAuthAndEncryptionKey('admin', '123', 'password123456', url => {
      console.log(url)
      database = new manager(url, DB_NAME);
      database.createDatabase()
        .then(res => {
          database.createDesignDocument('main', {
            views: {
              veiculosPorPlaca: {
                map: 'function (doc) { emit(doc.placa, null);}'
              }
            }
          });
          //database.replicate(`http://${SG_URL}/${DB_NAME}`, DB_NAME, {continuous: true});
          this.listen();
        })
        .catch(e => console.log('ERROR', e));
        console.log(database);

        smtDatabase = new manager(url, SMT_DB_NAME);
        console.log(smtDatabase);
        smtDatabase.createDatabase().then((res) => {
          //smtDatabase.replicate(SMT_DB_NAME, `http://${SG_URL}/${SMT_DB_NAME}`, {continuous: true});          
          smtDatabase.createDesignDocument('main', ddoc);
        }).then(() => {
          this.queryAutos();
        }).catch(e => console.log('ERROR', e));
    });
  }

  listen() {
    database.getInfo().then((res) => {
      database.listen({since: res.update_seq - 1, feed: 'longpoll'});
    });   
    database.changesEventEmitter.on('changes', function (e) {
      //console.log(e);
      this.setState({sequence: e.last_seq});
    }.bind(this));     
  }

  queryAutos() {
    smtDatabase.queryView('main', 'autos', {include_docs: true}).then((res) => {
      this.setState({
        dataSourceAutos: this.state.dataSourceAutos.cloneWithRows(res.rows)
      });
    });          
  }

  queryVeiculoPorPlaca() {
    var options = {include_docs: true};
    if (this.state.placa) {
      options.key = this.state.placa.toUpperCase();
    }
    database.queryView('main', 'veiculosPorPlaca', options).then(res => {
      //console.log(res.rows[0].doc);
      //console.log(res.rows);
      !res.rows.length && Alert.alert(
        'Atenção',
        'Nenhuma placa encontrada.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.rows)
      });
    });    
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  } 

  gerarAutos() {
    smtDatabase.createDocument({
      type: 'auto',
      id: "E999" + this.getRandomInt(10000, 100000),
      firstname: 'Dyego',
      lastname: 'Santin',
      placa: "XYZ4567",
      proprietario: "Dyegows"
    }).then((res) => {
      this.queryAutos();
    });    
  }

  replicate(on) {
    on ? this.startReplication() 
       : this.stopReplication();
  }

  startReplication() {
    database.replicate(`http://${SG_URL}/${DB_NAME}`, DB_NAME, {continuous: true});
    smtDatabase.replicate(SMT_DB_NAME, `http://${SG_URL}/${SMT_DB_NAME}`, {continuous: true});    
  }

  stopReplication() {
    database.replicate(`http://${SG_URL}/${DB_NAME}`, DB_NAME, {continuous: true, cancel: true});        
    smtDatabase.replicate(SMT_DB_NAME, `http://${SG_URL}/${SMT_DB_NAME}`, {continuous: true, cancel: true});    
  }  

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Digite a placa"
          onChangeText={(placa) => this.setState({placa})}
          onSubmitEditing={() => { this.queryVeiculoPorPlaca()}}
        />
        <View style={styles.listView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.doc.placa} - {rowData.doc.proprietario}</Text>}
            enableEmptySections
          />
        </View>        
        <View style={styles.buttonAuto}>
          <Button
            onPress={() => this.gerarAutos()}
            title="Gerar Auto"
            color="#787878"
          />
        </View>
        <View style={styles.listView}>
          <ListView
            dataSource={this.state.dataSourceAutos}
            renderRow={(rowData) => <Text>{rowData.doc.id}</Text>}
            enableEmptySections
          />
        </View>                  
        <View style={styles.switchSync}>
          <Text>Sincronizar</Text>
          <Switch
              onValueChange={(value) => {
                this.setState({syncSwitch: value});
                this.replicate(value);                
              }}
              style={{marginBottom: 10}}
              value={this.state.syncSwitch} />
        </View>
        <Text style={styles.seqTextLabel}>
          Status da POC: {this.state.sequence}
        </Text>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonAuto: {
    flexDirection: 'row',
    paddingTop: 10
  },
  listView: {
    paddingTop: 10
  },
  switchSync: {
    flexDirection: 'row',
    width: 200, 
    justifyContent: 'space-between', 
    paddingTop: 10
  }
});
