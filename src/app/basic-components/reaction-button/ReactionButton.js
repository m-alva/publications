import React from 'react';
import "./ReactionButton.scss";
import likeIcon from "res/images/like.png"
import loveIcon from "res/images/love.png"
import hahaIcon from "res/images/haha.png"
import wowIcon from "res/images/wow.png"
import angryIcon from "res/images/angry.png"

import { publicationConstants } from '../../constants/publication.constants';

class ReactionButton extends React.Component{
    constructor(props){
        super(props);

        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    handleClickEvent(e){
        const { name } = e.target;
        if(this.props.onClick && name){
            this.props.onClick(Object.assign(e,{reactionEvent: name}));
        }
    }
    render(){
        const { label } = this.props;
        return(
            <div className="reaction-button">
                <div className="reaction-button__options">
                    <button className="reaction-button__circle-button" name={publicationConstants.REACTION_LIKE} onClick={this.handleClickEvent} >
                        <img src={likeIcon} alt="Like Icon" />
                    </button>
                    <button className="reaction-button__circle-button" name={publicationConstants.REACTION_LOVE} onClick={this.handleClickEvent} >
                        <img src={loveIcon} alt="Love Icon" />
                    </button>
                    <button className="reaction-button__circle-button" name={publicationConstants.REACTION_HAHA} onClick={this.handleClickEvent} >
                        <img src={hahaIcon} alt="haha Icon" />
                    </button>
                    <button className="reaction-button__circle-button" name={publicationConstants.REACTION_WOW} onClick={this.handleClickEvent} >
                        <img src={wowIcon} alt="Wow Icon" />
                    </button>
                    <button className="reaction-button__circle-button" name={publicationConstants.REACTION_ANGRY} onClick={this.handleClickEvent} >
                        <img src={angryIcon} alt="Angry Icon" />
                    </button>
                </div>
                <button className="reaction-button__default-button" name="like" onClick={this.handleClickEvent} >{label}</button>
            </div>
        )
    }
}

export default ReactionButton;