import { publicationConstants } from '../constants/publication.constants';
import { publicationService } from '../services/publication.services';
import { reactionService } from '../services/reaction.services';

export const PublicationActions = {
    add,
    update,
    remove,
    getAll,
    setReaction
};

function add(publication) {
    return dispatch => {
        publicationService.add(publication).then(
            publication => {
                dispatch({ type: publicationConstants.ADD, publication });
            },
            error =>{
                console.log("error");
            }
        )
    }
}

function update(message) {
    return { type: publicationConstants.ERROR, message };
}

function remove() {
    return { type: publicationConstants.CLEAR };
}

function getAll() {
    return dispatch => {
        publicationService.getAll().then(
            publications => {
                dispatch({ type: publicationConstants.GETALL, publications });
            },
            error => {
                console.log("error");
            }
        )
    }
}

function setReaction(publication_id,reaction) {
    reaction.publication_id = publication_id // force publication_id
    return dispatch => {
        reactionService.add(reaction).then(
            reactions => {
                dispatch({ type: publicationConstants.REACTION_GETALL, publication_id,reactions});
            },
            error => {
                console.log("error");
            }
        )
    }
}