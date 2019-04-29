import React from 'react';
import { connect } from 'react-redux';

import "./PublicationItem.scss";
import userIcon from "res/images/user.png"

import { CommentActions } from "../../actions/comment.actions";
import { PublicationActions } from '../../actions/publication.actions';

import CommentItem from "../comment-item/CommentItem";
import ReactionButton from "../../basic-components/reaction-button/ReactionButton";
import ReactionsView from "../../basic-components/reactions-view/ReactionsView";
import { commentsFormat, formatDateToNow } from "../../helpers/format";



class PublicationItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showCommentForm: false,
            commentMessage: ''
        }

        this.handleReactionClick = this.handleReactionClick.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.handleCommentInputKeyUp = this.handleCommentInputKeyUp.bind(this);
        this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
    }

    handleCommentInputChange(e){
        const { value } = e.target;
        this.setState({
            commentMessage: value
        })
    }

    handleCommentInputKeyUp(e){
        const { dispatch, publicationRef, user } = this.props;
        const { commentMessage } = this.state;
        let comment = {
            user_id: user.id,
            publication_id: publicationRef.id,
            message: commentMessage
        }
        if(e.key === 'Enter') {
            this.setState({
                commentMessage: ''
            })
            dispatch(CommentActions.add(publicationRef.id,comment))
        }
    }

    handleReactionClick(e){
        const { dispatch, publicationRef, user } = this.props;
        const { reactionEvent } = e;
        e.preventDefault();
        dispatch(PublicationActions.setReaction(publicationRef.id,{
            user_id: user.id,
            publication_id: publicationRef.id,
            type: reactionEvent
        }))
    }

    handleCommentClick(e){
        const { showCommentForm } = this.state;
        e.preventDefault();
        this.setState({
            showCommentForm: !showCommentForm
        })
    }

    render(){
        const { showCommentForm, commentMessage } = this.state;
        const { publicationRef } = this.props;
        const { comments, reactions } = publicationRef;
        let renderComments = comments.map((v,k)=>
            <CommentItem key={k} commentRef={v}/>
        )
        return (
            <article className="publication-item">
                <div className="publication-item__container publication-item__container--content">
                    <div className="publication-item__container--content__left">
                        <picture className="publication-item__picture">
                            <img src={userIcon} alt="User"/>
                        </picture>
                    </div>
                    <div className="publication-item__right">
                        <div className="publication-item__information">
                            <h4 className="publication-item__user-name">{publicationRef.user.firstName} {publicationRef.user.lastName}</h4>
                            <blockquote className="publication-item__post-date">{formatDateToNow(publicationRef.created_at)}</blockquote>
                            <p className="publication-item__message">{publicationRef.message}</p>
                        </div>
                        <div className="publication-item__actions">
                            <ReactionButton onClick={this.handleReactionClick} label="Reaccionar" />
                            <button onClick={this.handleCommentClick}>Comentar</button>
                        </div>
                    </div>
                </div>
                <div className="publication-item__container publication-item__container--details">
                    {<ReactionsView reactionsRef={reactions} />}
                    <div className="publication-item__comment-number">{commentsFormat(comments.length)}</div>
                </div>
                <div className="publication-item__comments-wrapper">
                    {comments.length ?(
                        renderComments
                    ) : null }
                    <input className={"publication-item__comment-input " + (showCommentForm ? 'active' : 'inactive')}
                    placeholder="Escribe un comentario"
                    name="comment-message"
                    value={commentMessage}
                    onKeyUp={this.handleCommentInputKeyUp}
                    onChange={this.handleCommentInputChange}
                    ></input>
                </div>
            </article>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(PublicationItem);