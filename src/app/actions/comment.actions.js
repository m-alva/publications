import { commentConstants } from '../constants/comment.constants';
import { commentService } from '../services/comment.services';

export const CommentActions = {
    add,
    update,
    remove,
    getAll
};

function add(publication_id,comment) {
    comment.publication_id = publication_id // force publication_id
    return dispatch => {
        commentService.add(comment).then(
            comment => {
                console.log("CommentActions",comment);
                dispatch({ type: commentConstants.ADD, comment: comment })
            },
            error =>{

            }
        )
    }
}

function update(comment) {

}

function remove(id){

}

function getAll(){

}