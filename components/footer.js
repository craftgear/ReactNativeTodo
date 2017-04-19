import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Footer extends Component {
  render() {
    return (
      <View>
        <View>
          <TouchableOpacity>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
      // 08から
    )
  }
}

export default Footer;
