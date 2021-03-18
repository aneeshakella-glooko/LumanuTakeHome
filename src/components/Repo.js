import React from 'react';
import './Repo.css'


class Repo extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className={this.props.glow ? "clicked_repo" : "repo"} >
                    <p> Repo: {this.props.owner}</p>
                    <p> Owner: {this.props.repo}</p>
                    <p> Release Date: {this.props.releaseDate}</p>
                    <button onClick = {this.props.onClick}> {this.props.glow ? "Mark as Read" : "Mark as Unread"}  </button>
                    <button onClick = {this.props.handleDelete}> Delete! </button> 
            </div>
        )
    }


}

export default Repo;