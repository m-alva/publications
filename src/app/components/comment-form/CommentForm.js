import React from 'react';
import "./CommentForm.scss";

class CommentForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            message: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        e.preventDefault();
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render(){
        const { message } = this.state;
        return(
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <input className="comment-form__input" name="message"  value={message} onChange={this.handleChange} />
                <button className="comment-form__button" >submit</button>
            </form>
        )
    }
}

export default CommentForm;