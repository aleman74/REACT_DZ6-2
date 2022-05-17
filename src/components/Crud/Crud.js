import React from 'react';
import ReactDOM from 'react-dom';
import './Crud.css';
import shortid from "shortid";
import CrudItem from "./CrudItem";

class Crud extends React.Component{

    constructor(props) {
        super(props);

        // Привязываем функции использующие контекст
        this.onAdd = this.onAdd.bind(this);
    }

    state = {
        data: [],
        text: ''
    };

    changeText = (evt) => {
        this.setState( prev => ({text: evt.target.value}));
    }


    onAdd(evt) {

        if (this.state.text.length == 0)
            return;

        let value = {
            "id": 0,
            "content": this.state.text
        }

        console.log('onAdd call POST', JSON.stringify(value));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };

        fetch(process.env.REACT_APP_TEXT_URL, requestOptions)
            .then(response => {
                console.log('onAdd - RESPONSE', response);
                console.log('onAdd - RESPONSE status = ' + response.status);

                this.setState( prev => ({text: ''}));
                this.loadData();
//                return response;
            });

    }

    onDelete = (id) => {

        let url = process.env.REACT_APP_TEXT_URL + '/' + id;

        console.log('onDelete call DELETE', url);

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
//            body: JSON.stringify(value)
        };

        fetch(url, requestOptions)
            .then(response => {
                console.log('onDelete - RESPONSE', response);
                console.log('onDelete - RESPONSE status = ' + response.status);

                this.loadData();
            });
    }

    // После отображения элемента
    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
//            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        fetch(process.env.REACT_APP_TEXT_URL, requestOptions)
            .then(response => {
                console.log('Load data - RESPONSE', response);
                console.log('Load data - RESPONSE status = ' + response.status);
                return response.json();
            })
            .then(
                (data) => {
                    console.log('Load data - OK', data);
                    this.setState( prev => ({data: data}));
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    console.log('Load data - ERROR', error);
                }
            );
    }


    render() {
        return (
            <div id="container">
                <div id="title">
                    <span>Notes</span>
                    <span id="refresh" className="material-icons" onClick={this.loadData}>cached</span>
                </div>
                <div id="data">

                    {this.state.data.map(item =>
                        <CrudItem key={item.id} item={item} onDelete={this.onDelete} />
                    )}

                </div>
                <div id="new">
                    <span>New Note</span>
                    <div id="new_item">
                        <textarea
                            id="new_item_note"
                            name="new_item_note"
                            type="text"
                            onChange={this.changeText}
                            value={this.state.text}
                        >
                        </textarea>
                        <div id="new_item_send">
                            <span className="material-icons" onClick={this.onAdd}>send</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Crud;
