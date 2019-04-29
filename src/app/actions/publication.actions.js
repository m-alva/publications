import { publicationConstants } from '../constants/publication.constants';
import { publicationService } from '../services/publication.services';

export const PublicationActions = {
    add,
    update,
    remove,
    getAll
};

function add(publication) {
    return dispatch => {
        publicationService.add(publication).then(
            publication => {
                console.log("pre dispatch publication");
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
                console.log("pre dispatch publication");
                dispatch({ type: publicationConstants.GETALL, publications });
            },
            error =>{
                console.log("error");
            }
        )
    }
}