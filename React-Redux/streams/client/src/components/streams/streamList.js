import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { listStreams } from '../../actions';
import { connect} from 'react-redux';

export class streamList extends Component {
  componentDidMount() {
    this.props.listStreams();
  }

  renderAdmin = stream => {
    if (!this.props.currentUserId || !stream.userId) return;
    if (this.props.currentUserId === stream.userId){
      return (
        <div className="right floated content">
          <button className="ui button primary">
            Edit
          </button>
          <button className="ui button negative">
            Delete
          </button>
        </div>
      );
    };
  }

  renderCreateLink = () => {
    if(this.props.isSignIn){
      return(
        <div style={{textAlign:'right'}}>
          <Link to="streams/new">
            Create Streams
          </Link>
        </div>
      );
    };
  }

  renderList = () => {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera"/>
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Stream</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        {this.renderCreateLink()}
      </div>
    );
  };
}

const mapStatetoProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignIn: state.auth.isSignIn
  }
}

export default connect(mapStatetoProps, {listStreams})(streamList);
