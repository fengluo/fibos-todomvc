import React, {Component} from 'react'
import Header from './header'
import MainSection from './main-section'
// import EOS from 'eosjs'
import FIBOS from 'fibos.js'
import config from '../../config'

// const eosClient = EOS(config.clientConfig)
const fibosClient = FIBOS(config.client)

const initialState = [
  {
    text: 'React ES6 TodoMVC',
    completed: 0,
    id: 0
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [] || initialState,
      gameID: null,
      player: 0
    }
    this.fetchTodo()
  }

  fetchTodo = () => {
    fibosClient.getTableRows(
      true,
      config.contract.sender,
      config.contract.name,
      'todos').then((data)=>{
        this.setState({todos: data.rows})
      }).catch((e) => {
        console.error(e)
      }
    )
  }

  addTodo = (text) => {
    const todo_id = this.state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
    fibosClient.contract(config.contract.name).then((contract) => {
      contract.emplace(
        {
          id: todo_id,
          text,
          completed: 0
        },
        { authorization: [config.contract.sender] }
      ).then((res) => {
        const todos = [
          {
            id: todo_id,
            completed: 0,
            text: text
          },
          ...this.state.todos
        ]
        this.setState({todos})
       }
      )
      .catch((err) => { console.log(err) })
    })
  }

  deleteTodo = (id) => {
    fibosClient.contract(config.contract.name).then((contract) => {
      contract.destory(
        {
          id
        },
        { authorization: [config.contract.sender]}
      ).then((res) => {
        const todos = this.state.todos.filter(todo => todo.id !== id)
        this.setState({todos})
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }

  editTodo = (id, text) => {
    const todo_item = this.state.todos.find((el) => el.id === id)
    if (!todo_item){
      return
    }
    fibosClient.contract(config.contract.name).then((contract) => {
      contract.update(
        {
          id: id,
          text,
          completed: todo_item.completed 
        },
        { authorization: [config.contract.sender] }
      ).then((res) => {
        const todos = this.state.todos.map(todo =>
          todo.id === id ? {...todo, text} : todo
        )
        this.setState({todos})
       }
      )
      .catch((err) => { console.log(err) })
    })
  }

  completeTodo = (id) => {
    const todo_item = this.state.todos.find((el) => el.id === id)
    if (!todo_item){
      return
    }
    fibosClient.contract(config.contract.name).then((contract) => {
      contract.update(
        {
          id: id,
          text: todo_item.text,
          completed: todo_item.completed === 1?0:1
        },
        { authorization: [config.contract.sender] }
      ).then((res) => {
        const todos = this.state.todos.map(todo =>
          todo.id === id ? {...todo, completed: !todo.completed} : todo
        )
        this.setState({todos})
       }
      )
      .catch((err) => { console.log(err) })
    })
  }

  clearCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.completed === 0)
    this.setState({todos})
  }

  actions = {
    addTodo: this.addTodo,
    deleteTodo: this.deleteTodo,
    editTodo: this.editTodo,
    completeTodo: this.completeTodo,
    clearCompleted: this.clearCompleted
  }

  render() {
    return(
      <div>
        <Header addTodo={this.actions.addTodo} />
        <MainSection todos={this.state.todos} actions={this.actions} />
      </div>
    )
  }
}

export default App