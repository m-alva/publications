import React from 'react';
import { connect } from 'react-redux';

import './PublicationWidget.scss';

import { PublicationActions } from "../../actions/publication.actions";

import TextInput from "../../basic-components/text-input/TextInput";

class PublicationWidget extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: ''
        };

        this.publish = this.publish.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }
    updateMessage(e){
        const { value } = e.target;
        e.preventDefault();
        this.setState({
            message: value
        })
    }
    publish(e){
        const { dispatch, user } = this.props;
        const { message } = this.state;
        e.preventDefault();
        dispatch(PublicationActions.add({
            user_id: user.id,
            message: message
        }));
    }
    render(){
        const { message } = this.state;
        return (
            <div className="state-publisher">
                <div className="state-publisher__input-area">
                    <div className="state-publisher__input-widget">
                        <TextInput placeholder="Escribe aquí tu estado" value={message} onChange={this.updateMessage} />
                    </div>
                </div>
                <div className="state-publisher__button-area">
                   <button variant="contained" 
                   className="state-publisher__button-widget"
                   onClick={this.publish}
                   >Publicar
                    </button>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(PublicationWidget);