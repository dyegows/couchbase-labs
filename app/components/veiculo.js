import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class Veiculo extends Component {
  render() {
    const veiculo = this.props.data.doc;
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{veiculo.placa}</Text>
          <Text style={styles.year}>{veiculo.proprietario}</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});
