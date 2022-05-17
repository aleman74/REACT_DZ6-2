import React from 'react';
import ReactDOM from 'react-dom';


class CrudItem extends React.Component{

    constructor(props) {
        super(props);

        this.item = props.item;
        this.onDelete = props.onDelete;
    }

    onDeleteHandler = (id) => {
        this.onDelete(id);
    }

    render() {
        return (
                <div className="data_item_container">
                    <div className="data_item_close">
                        <span className="material-icons" onClick={(evt) => this.onDeleteHandler(this.item.id)}>highlight_off</span>
                    </div>
                    <div className="data_item">
                        {this.item.content}
                    </div>
                </div>
        );
    }
}

export default CrudItem;
