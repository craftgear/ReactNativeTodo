import React, { Component } from 'react';
import {
  View,
  ListView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  }

  render() {
    return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text>
            This ScrollView contains two components,
          </Text>
          <View>
          <TextInput
            style={styles.input}
            autoFocus
            placeholder='When this TextInput has the focus'
          >
          </TextInput>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text>
            This TouchableOpacity demands a double tap to response
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


      <Text>
        How about ListView?
      </Text>
      <ListView
        keyboardShouldPersistTaps="handled"
        dataSource={this.ds.cloneWithRows([1])}
        renderRow={()=>{
          return (
            <View>
              <TextInput
                style={styles.input}
                autoFocus
                placeholder='When this TextInput has the focus'
              >
              </TextInput>
              <TouchableOpacity style={styles.button}>
                <Text>
                This TouchableOpacity demands a double tap to response
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      >
      </ListView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 8,
    flex: 1,
    padding: 12,
    marginHorizontal : 16,
    alignItems: 'center',
  },
});
