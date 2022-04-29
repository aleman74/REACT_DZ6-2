import React from 'react';
import ReactDOM from 'react-dom';
import './Crud.css';
import shortid from "shortid";

class Crud extends React.Component{

    constructor(props) {
        super(props);

        this.timerId = null;

        // Привязываем функции использующие контекст
        this.onAdd = this.onAdd.bind(this);
    }

    state = {
        data: [],
        text: 'фф'
    };

    changeText = (evt) => {
        this.setState( prev => ({text: evt.target.value}));

//        console.log(evt.target.value);
    }


    onAdd(evt) {
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
//                return response;
            });
    }


    // После отображения элемента
    componentDidMount = () => {
        console.log('componentDidMount');
        this.loadData();
    }

    // После изменения элемента
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    // Перед удалением
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    loadData = () => {
//        console.log('REACT_APP_TEXT_URL = ' + process.env.REACT_APP_TEXT_URL);

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

                        <div key={item.id} className="data_item_container">
                            <div className="data_item_close">
                                <span className="material-icons" onClick={(evt) => this.onDelete(item.id)}>highlight_off</span>
                            </div>
                            <div className="data_item">
                                {item.content}
                            </div>
                        </div>

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
