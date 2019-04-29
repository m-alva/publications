import React from 'react';
import "./TextInput.scss";

class TextInput extends React.Component{
    constructor(props){
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(e){
        if(this.props.onChange){
            this.props.onChange(e);
        }
    }
    render(){
        const { placeholder, value } = this.props;
        return(
            <div className="text-input">
                <input className="text-input__input" value={value} onChange={this.handleOnChange} />
                <label className="text-input__label">{placeholder}</label>
            </div>
        )
    }
}

export default TextInput;