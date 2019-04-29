import React from 'react';
import { connect } from 'react-redux';

import "./PublicationItem.scss";

import { CommentActions } from "../../actions/comment.actions";

import CommentItem from "../comment-item/CommentItem";
import CommentForm from "../comment-form/CommentForm";

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
        const { dispatch, publicationRef } = this.props;
        const { commentMessage } = this.state;
        let comment = {
            user_id: publicationRef.user_id,
            publication_id: publicationRef.id,
            message: commentMessage
        }
        if(e.key === 'Enter'){
            dispatch(CommentActions.add(publicationRef.id,comment))
        }
    }

    handleReactionClick(e){
        e.preventDefault();
    }

    handleCommentClick(e){
        const { showCommentForm } = this.state;
        e.preventDefault();
        this.setState({
            showCommentForm: !showCommentForm
        })
    }

    render(){
        const { showCommentForm } = this.state;
        const { publicationRef } = this.props;
        const { comments } = publicationRef;
        let renderComments = comments.map((v,k)=>
            <CommentItem key={k} commentRef={v}/>
        )
        console.log("comments",renderComments);
        return (
            <article className="publication-item">
                <div className="publication-item__container publication-item__container--content">
                    <div className="publication-item__left">    
                        <picture className="publication-item__picture">
                            <source></source>
                        </picture>
                    </div>
                    <div className="publication-item__right">
                        <div className="publication-item__information">
                            <h4 className="publication-item__user-name">{publicationRef.user.firstName} {publicationRef.user.lastName}</h4>
                            <h6 className="publication-item__post-date">{publicationRef.created_at}</h6>
                            <p className="publication-item__message">{publicationRef.message}</p>
                        </div>
                        <div className="publication-item__actions">
                            <button onClick={this.handleCommentClick}>Reaccionar</button>
                            <button onClick={this.handleCommentClick}>Comentar</button>
                        </div>
                    </div>
                </div>
                <div className="publication-item__container publication-item__container--details">
                    <div>social result</div>
                    <div>{comments.length} comentarios</div>
                </div>
                {showCommentForm ? (
                <div className="publication-item__container publication-item__container--comment-widget">
                    <CommentForm/>
                </div>
                ) : null }
                <div className="publication-item__comments-wrapper">
                    {comments.length ?(
                        renderComments
                    ) : null }
                    <input className="publication-item__comment-input"
                    placeholder="Escribe un comentario"
                    name="comment-message"
                    value={this.commentMessage}
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