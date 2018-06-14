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
            open: false,
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
                    <Card.Header>
                        <span className='date'>{item.text}</span>
                    </Card.Header>
                    <Card.Description>{item.title}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={this.handleClick} id = {item._id}>Edit</Button>
                    <Button>Delete</Button>
                </Card.Content>
            </Card>
        );
        return display;
    };

    handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let arrayNote = this.state.allNotes;
        let editArray = arrayNote.find(items => items._id === e.target.id);
        console.log(editArray);
        this.setState({
            open: true,
            name: editArray.title,
            text: editArray.text,
            idNote: e.target.id,
        });
    };

    addArray = (value) => {
        this.state.allNotes.push(value);
        this.forceUpdate();
    };

    close = (value) => {
        this.setState({
            open: value,
        });
    };

  render() {

    let display = this.displayNote();
    return (
      <div className="App">
          {display}
          <NewNote addNewItem = {this.addArray} open = {this.state.open} onClosed = {this.close} array = {[this.state.name, this.state.text, this.state.idNote]}/>
      </div>
    );
  }
}

export default App;
