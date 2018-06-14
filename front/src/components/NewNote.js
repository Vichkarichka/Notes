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

    close = () => {
        this.setState({
           open: false,
           nameNote: '',
           textNote: '',
        }, () => {
            this.props.onClosed(false);
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
                    nameNote: '',
                    textNote: '',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleUpdate = () => {

        let data = {
            name: this.state.nameNote,
            text: this.state.textNote,
        };

        axios.post('http://127.0.0.1:8000/notes/' + this.state.idNote, data)
            .then((res) => {
                this.setState({
                    open: false,
                }, () =>{
                    this.props.onDataLoaded();
                    this.props.onClosed(false);});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentWillReceiveProps (nextProps) {
        if(nextProps.open !== this.state.open) {
            this.setState({
                open: true,
                nameNote: nextProps.array[1],
                textNote: nextProps.array[0],
                idNote: nextProps.array[2],
            });
        }
    };

    render() {
        let { nameNote, textNote, open } = this.state;
        console.log(this.state, this.props.open);
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
                            {
                                this.props.open &&
                                    <div>
                                        <Button onClick={this.handleUpdate}>Edit</Button>
                                        <Button onClick={this.close}>Cancel</Button>
                                    </div> || <div>
                                    <Button onClick={this.handleClick}>Add</Button>
                                    <Button onClick={this.close}>Cancel</Button>
                                </div>
                            }
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
        );
    }
}

export default NewNote;
