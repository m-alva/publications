import React from 'react';
import "./TextInput.scss";

class TextInput extends React.Component{
    constructor(props){
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleKeyUp(e){
        if(this.props.onKeyUp){
            this.props.onKeyUp(e);
        }
    }
    handleOnChange(e){
        if(this.props.onChange){
            this.props.onChange(e);
        }
    }
    render(){
        const { placeholder, value, name, type } = this.props;
        return(
            <div className="text-input">
                <input className="text-input__input" name={name} value={value} type={type} onChange={this.handleOnChange} onKeyUp={this.handleKeyUp} />
                <label className={"text-input__label " + (value ? 'text-input__label--float' : '' ) }>{placeholder}</label>
            </div>
        )
    }
}

export default TextInput;