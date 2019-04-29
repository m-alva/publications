import React from 'react';
import "./CommentItem.scss";
import userIcon from "res/images/user.png"

import { formatDateToNow } from "../../helpers/format";

class CommentItem extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        const { commentRef } = this.props;
        const { user } = commentRef;
        return(
            <div className="comment-item">
                <div className="comment-item__left">
                    <picture className="comment-item__picture">
                        <img src={userIcon} alt="User"></img>
                    </picture>
                </div>
                <div className="comment-item__right">
                    <div className="comment-item__description">
                        <h4 className="comment-item__title">{user.firstName}</h4>
                        <p className="comment-item__message">{commentRef.message}</p>
                    </div>
                    <blockquote className="comment-item__created-date">
                        {formatDateToNow(commentRef.created_at)}
                    </blockquote>
                </div>
            </div>
        )
    }
}

export default CommentItem;