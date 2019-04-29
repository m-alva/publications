import React from 'react';
import "./CommentItem.scss";

class CommentItem extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        const { commentRef } = this.props;
        return(
            <div>
                {commentRef.id}
                {commentRef.message}
            </div>
        )
    }
}

export default CommentItem;