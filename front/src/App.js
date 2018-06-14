import React, { Component } from 'react';
import { Card, Button, Form } from 'semantic-ui-react'
import './App.css';
import axios from "axios/index";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameNote: '',
            textNote: '',
        };
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    handleClick = () => {

        let data = {
          name: this.state.nameNote,
          text: this.state.textNote,
        };

        axios.post('http://127.0.0.1:8000/notes', data)
            .then((res) => {
                console.log(res);
                })
            .catch((error) => {
                console.log(error);
            });
    };

  render() {
      let { nameNote, textNote } = this.state;
    return (
      <div className="App">
          <Card>
              <Card.Content>
                  <Card.Header>Add Notes</Card.Header>
                  <Form >
                      <Form.Field>
                          <Form.Input placeholder='Name note' onChange={this.handleInput} name = 'nameNote' value={nameNote} />
                      </Form.Field>
                      <Form.Field>
                          <Form.TextArea autoHeight placeholder='Text note' onChange={this.handleInput}  name = 'textNote' value={textNote} />
                      </Form.Field>
                  </Form>
              </Card.Content>
              <Button onClick={this.handleClick}>Click</Button>
          </Card>
      </div>
    );
  }
}

export default App;
