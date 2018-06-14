import React, { Component } from 'react';
import { Button, Form, Modal, Header } from 'semantic-ui-react'
import axios from "axios/index";

class NewNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameNote: '',
            textNote: '',
            open: false,
        };
    }
    show = () => {
        this.setState({
            open: true,
        });
    };

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
                this.props.addNewItem(res.data);
                this.setState({
                    open: false,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        let { nameNote, textNote, open } = this.state;
        return (
                <Modal trigger={<Button onClick = {this.show}>Add new note</Button>} open={open}>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>Add Notes</Header>
                            <Form >
                                <Form.Field>
                                    <Form.Input placeholder='Name note' onChange={this.handleInput} name = 'nameNote' value={nameNote} />
                                </Form.Field>
                                <Form.Field>
                                    <Form.TextArea autoHeight placeholder='Text note' onChange={this.handleInput}  name = 'textNote' value={textNote} />
                                </Form.Field>
                            </Form>
                            <Button onClick={this.handleClick}>Click</Button>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
        );
    }
}

export default NewNote;
