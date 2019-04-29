import React from 'react';
import "./PublicationItem.scss";

class PublicationItem extends React.Component{
    constructor(props){
        super(props);

        this.handleReactionClick = this.handleReactionClick.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
    }

    handleReactionClick(){

    }

    handleCommentClick(){

    }

    render(){
        const { publicationRef } = this.props;
        return (
            <article className="publication-item">
                <picture className="publication-item__picture">
                    <source></source>
                </picture>
                <div className="publication-item__content">
                    <h4 className="publication-item__user-name">{publicationRef.user.firstName} {publicationRef.user.lastName}</h4>
                    <h6 className="publication-item__post-date">{publicationRef.created_at}</h6>
                    <p className="publication-item__message">{publicationRef.message}</p>
                    <div className="publication-item__buttons">
                        <button onClick={this.handleCommentClick}>Reaccionar</button>
                        <button onClick={this.handleCommentClick}>Comentar</button>
                    </div>
                </div>
            </article>
        )
    }
}

export default PublicationItem;