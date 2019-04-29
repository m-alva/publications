import { publicationConstants } from '../constants/publication.constants';
import { commentConstants } from '../constants/comment.constants';

export function publications(state = {
  publications: []
}, action) {
  switch (action.type) {
    //
    // PUBLICATIONS ACTIONS
    //  
    case publicationConstants.GETALL:
      return {
        publications: [...action.publications]
      };
    case publicationConstants.ADD:
      return {
        publications: [ action.publication, ...state.publications]
      };
    case publicationConstants.UPDATE:
      return {
        publications: state.publications.map((publication) => {
          return publication.id === action.id ?
          Object.assign({}, publication, action.publication) : publication
        })
      }
    case publicationConstants.REMOVE:
      return {
        publications: state.publications.filter((publication) => {
          return publication.id !== action.id
        })
      }
    //
    // REACTIONS ACTIONS
    //
    case publicationConstants.REACTION_GETALL:
      return {
        publications: state.publications.map((publication) => {
          return publication.id === action.publication_id ?
          Object.assign({}, publication, {
            reactions: action.reactions
          }) : publication
        })
      }
    //
    // COMMENTS ACTIONS
    //  
    case commentConstants.ADD:
      return {
        publications: state.publications.map((publication) => {
          return publication.id === action.comment.publication_id ?
          Object.assign({}, publication, {
            comments: [action.comment,...publication.comments]
          }) : publication
        })
      }
    case commentConstants.UPDATE:
      return state.comments.map((comment) => {
          return comment.id === action.id ?
          Object.assign({}, comment, action.comment) : comment
        });
    case commentConstants.REMOVE:
      return {
        comments: state.comments.filter((comment) => {
          return comment.id !== action.id
        })
      }
    default:
      return state
  }
}