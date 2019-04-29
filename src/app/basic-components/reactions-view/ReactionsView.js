import React from 'react';
import "./ReactionsView.scss";
import likeIcon from "res/images/like.png";
import loveIcon from "res/images/love.png";
import hahaIcon from "res/images/haha.png";
import wowIcon from "res/images/wow.png";
import angryIcon from "res/images/angry.png";

import { publicationConstants } from '../../constants/publication.constants';

class ReactionsView extends React.Component{
    getGroupByType(){
        const { reactionsRef } = this.props;
        return {
            like: reactionsRef.filter((r) => r.type === publicationConstants.REACTION_LIKE).length,
            love: reactionsRef.filter((r) => r.type === publicationConstants.REACTION_LOVE).length,
            haha: reactionsRef.filter((r) => r.type === publicationConstants.REACTION_HAHA).length,
            wow: reactionsRef.filter((r) => r.type === publicationConstants.REACTION_WOW).length,
            angry: reactionsRef.filter((r) => r.type === publicationConstants.REACTION_ANGRY).length
        }
    }
    render(){
        const { like, love, haha, wow, angry } = this.getGroupByType();
        return (
            <div className="reactions-view">
                <img className={"reactions-view__image " + (like ? 'show' : 'hidden') } src={likeIcon} alt="Like" />
                <img className={"reactions-view__image " + (love ? 'show' : 'hidden') } src={loveIcon} alt="Love" />
                <img className={"reactions-view__image " + (haha ? 'show' : 'hidden') } src={hahaIcon} alt="Haha" />
                <img className={"reactions-view__image " + (wow ? 'show' : 'hidden') } src={wowIcon} alt="Wow" />
                <img className={"reactions-view__image " + (angry ? 'show' : 'hidden') } src={angryIcon} alt="Angry" />
            </div>
        )
    }
}

export default ReactionsView;