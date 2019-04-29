import React from 'react';
import { connect } from 'react-redux';

import PublicationItem from "../publication-item/PublicationItem";
import { PublicationActions } from "../../actions/publication.actions";

import "./PublicationList.scss";

class PublicationList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            publications: []
        }

        this.props.dispatch(PublicationActions.getAll());
    }
    render(){
        const { publications } = this.props
        var renderPublications = publications.map((v,k) =>
            <PublicationItem key={k} publicationRef={v}/>
        )
        return (
            <div className="state-list">
                {renderPublications}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { publications } = state.publications;
    return {
        publications
    };
}

export default connect(mapStateToProps)(PublicationList);