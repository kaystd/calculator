import React from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView} from 'react-native'

interface Button {
  key: string,
  type?: string,
}

interface Props {

}

interface State {
  statement: string,
  output: string,
  intermediateResult: string,
  operator: string,
  reset: boolean,
  hasPoint: boolean,
  initialising: boolean,
}

const data: Array<Button> = [
  {
    key: '1',
    type: 'operand',
  },
  {
    key: '2',
    type: 'operand',
  },
  {
    key: '3',
    type: 'operand',
  },
  {
    key: '4',
    type: 'operand',
  },
  {
    key: '5',
    type: 'operand',
  },
  {
    key: '6',
    type: 'operand',
  },
  {
    key: '7',
    type: 'operand',
  },
  {
    key: '8',
    type: 'operand',
  },
  {
    key: '9',
    type: 'operand',
  },
  {
    key: '0',
    type: 'operand',
  },
  {
    key: ' + ',
    type: 'operator',
  },
  {
    key: ' - ',
    type: 'operator',
  },
  {
    key: ' * ',
    type: 'operator',
  },
  {
    key: ' / ',
    type: 'operator',
  },
  {
    key: '.',
    type: 'point',
  },
  {
    key: 'C',
    type: 'clear',
  },
  {
    key: '=',
    type: 'equals',
  },
]

class App extends React.Component<Props, State> {

  state = {
    statement: '',
    output: '0',
    intermediateResult: '',
    operator: '',
    reset: false,
    hasPoint: false,
    initialising: true,
  }

  addStatement = (item: Button) => (ev: object) => {
    const { statement, output, intermediateResult, operator, reset, hasPoint, initialising } = this.state

    switch (item.type) {
      case 'equals': return this.setState({
        statement: '',
        intermediateResult: '',
        output: eval(intermediateResult + operator + output),
        hasPoint: false,
        initialising: true,
      })
      case 'clear': return this.setState({
        statement: '',
        intermediateResult: '',
        output: '0',
        hasPoint: false,
        initialising: true,
      })
      case 'operand': return reset
        ? this.setState({
          output: item.key,
          reset: false,
        })
        : this.setState({
          output: output === '0' || output === 'Infinity' ? item.key : output + item.key,
        })
      case 'operator': return reset
        ? this.setState({
          statement: statement.slice(0, -3) + item.key,
          operator: item.key,
        })
        : initialising
          ? this.setState({
            statement: statement + output + item.key,
            intermediateResult: output,
            operator: item.key,
            reset: true,
            hasPoint: false,
            initialising: false,
          })
          : this.setState({
            statement: statement + output + item.key,
            intermediateResult: eval(intermediateResult + operator + output),
            output: eval(intermediateResult + operator + output),
            operator: item.key,
            reset: true,
            hasPoint: false,
          })
      case 'point': return hasPoint
        ? null
        : reset
          ? this.setState({
            output: '0' + item.key,
            hasPoint: true,
            reset: false,
          })
          : this.setState({
            output: output + item.key,
            hasPoint: true,
          })
      default: return
    }
  }

  renderItem = ({ item }: {item: Button}) => (
    <TouchableOpacity
      key={item.key}
      style={styles.button}
      onPress={this.addStatement(item)}
    >
      <Text style={styles.text}>{item.key}</Text>
    </TouchableOpacity>
  )

  render(): React.ReactNode {
    return (
      <View style={styles.root}>
        <ScrollView>
          <Text style={styles.statement}>{this.state.statement}</Text>
        </ScrollView>
        <ScrollView>
          <Text style={styles.output}>{this.state.output}</Text>
        </ScrollView>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={this.renderItem}
          numColumns={3}
        />
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  list: {

  },
  button: {
    margin: 1,
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
  },
  text: {
    fontSize: 30,
  },
  statement: {
    flex: 0.2,
    fontSize: 30,
  },
  output: {
    flex: 0.2,
    fontSize: 40,
  },
})