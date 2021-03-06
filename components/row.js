import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity,
  TextInput,
  Button,
 } from 'react-native';

class Row extends Component {
  render() {
    const {complete} = this.props;
    const textComponent = (
      <TouchableOpacity style={styles.textWrap} onLongPress={ () => {
        this.props.onToggleEdit(true);
      }}>
        <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
      </TouchableOpacity>
    )
    const removeButton = (
      <TouchableOpacity onPress={this.props.onRemove}>
        <Text style={styles.destroy}>X</Text>
      </TouchableOpacity>
    )
    const editingComponent = (
      <View style={styles.textWrap}>
        <TextInput
          onChangeText={this.props.onUpdate}
          autoFocus
          blurOnSubmit={true}
          value={this.props.text}
          style={styles.input}
          multiline
        />
      </View>
    );

    const doneButton = (
      <View>
        <TouchableOpacity style={styles.textWrap} onLongPress={ () => {
          console.log('LongPress');
        }}>
        <Text style={[styles.text, complete && styles.complete]}>LongPressButton</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.done} onPress={
          () => { this.props.onToggleEdit(false); console.log('done pressed') }
        }>
          <Text style={styles.doneText}>Save</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container} >
        <Switch
          value={this.props.complete}
          onValueChange={this.props.onComplete}
        />
        {this.props.editing ? editingComponent : textComponent }
        {this.props.editing ? doneButton : removeButton }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    color: '#4d4d4d',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  complete: {
    textDecorationLine: 'line-through',
  },
  destroy: {
    fontSize: 20,
    color: '#cc9a9a',
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: '#4d4d4d',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 20,
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7be290',
    padding: 7,
  },
  doneText: {
    color: '#4d4d4d',
    fontSize: 20,
  }
})

export default Row;
