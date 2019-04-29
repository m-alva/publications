import { publicationConstants } from '../constants/publication.constants';

export function publications(state = {
  publications: []
}, action) {
  switch (action.type) {
    case publicationConstants.GETALL:
      return {
        publications: [...action.publications]
      };
    case publicationConstants.ADD:
      return {
        publications: [ action.publication, ...state.publications]
      };
    case publicationConstants.UPDATE:
      return state.publications.map((publication) => {
          return publication.id === action.id ?
          Object.assign({}, publication, action.publication) : publication
        });
    case publicationConstants.REMOVE:
      return {
        publications: state.publications.filter((publication) => {
          return publication.id !== action.id
        })
      }
    default:
      return state
  }
}