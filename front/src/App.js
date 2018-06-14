import React, { Component } from 'react';
import './App.css';
import NewNote from './components/NewNote';
import { Card, Button } from 'semantic-ui-react'
import axios from "axios/index";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            allNotes: [],
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/notes')
            .then((res) => {
                this.setState({
                    allNotes: res.data,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    displayNote = () => {
        let notes = this.state.allNotes;
        let display = notes.map((item) =>
            <Card id = {item._id} className = 'cardNote'>
                <Card.Content>
                    <Card.Meta>
                        <span className='date'>{item.title}</span>
                    </Card.Meta>
                    <Card.Description>{item.text}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Card.Content>
            </Card>
        );
        return display;
    };
    addArray = (value) => {
        this.state.allNotes.push(value);
        this.forceUpdate();
        console.log(this.state.allNotes);
    };

  render() {

    let display = this.displayNote();
    return (
      <div className="App">
          {display}
          <NewNote addNewItem = {this.addArray}/>
      </div>
    );
  }
}

export default App;
