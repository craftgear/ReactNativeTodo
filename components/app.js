import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
  Keyboard,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

const filterItems = (filter, items) => {
  const filteredItems = items.filter(item => {
    if (filter === 'ALL') {
      return true;
    }
    if (filter === 'COMPLETED') {
      return item.complete;
    }
    if (filter === 'ACTIVE') {
      return !item.complete;
    }
  });
  return filteredItems;
}

class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      loading: true,
      allComplete: false,
      value: '',
      items: [],
      filter: 'ALL',
      dataSource: ds.cloneWithRows([]),
    }
    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
  }

  async componentWillMount() {
    try {
      const json = await AsyncStorage.getItem('items');
      const items = JSON.parse(json);
      setTimeout( () => {
        this.setSource(items, items, { loading: false });
      }, 1000);
    } catch (e) {
      setTimeout( () => {
        this.setState({ loading: false });
      }, 1000);
    }
  }

  handleUpdateText(key, text) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key ) {
        return item;
      }
      return {
        ...item,
        text
      }
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key ) {
        return item;
      }
      return {
        ...item,
        editing
      }
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState,
    });

    AsyncStorage.setItem('items', JSON.stringify(items));
  }

  handleClearComplete(){
    const newItems = filterItems('ACTIVE', this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), { filter });
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter(item => {
      return item.key !== key;
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete,
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ...item,
      complete,
    }));

    this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete });
  }

  handleAddItem() {
    if (!this.state.value)  return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false,
      }
    ]

    this.setSource(newItems, filterItems(this.state.filter, newItems), { value: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
        <ListView
          keyboardShouldPersistTaps='handled'
          style={styles.list}
          enableEmptySections
          dataSource={this.state.dataSource}
          onScroll={() => Keyboard.dismiss()}
          renderRow={({ key, ...value }) => {
            return (
              <Row
                onUpdate={(text) => this.handleUpdateText(key, text)}
                onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
                onComplete = {(complete)=>this.handleToggleComplete(key, complete)}
                onRemove = {() => this.handleRemoveItem(key)}
                key={key}
                {...value}
              />
            )
          }}
          renderSeparator={(sectionId, rowId) => {
            return <View key={rowId} style={styles.separator}/>
          }}
        />

        </View>
        <Footer
          count={filterItems('ACTIVE', this.state.items).length}
          onFilter={this.handleFilter}
          filter={this.state.filter}
          onClearComplete={this.handleClearComplete}
        />
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size='large'
          />
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    ... Platform.select({
      ios: { paddingTop: 30 }
    }),
  },
  content: {
    flex: 1,
  },
  list: {
    backgroundColor: '#fff',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
});

export default App;
