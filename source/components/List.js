import React from 'react';
import PlayControls from './PlayControls';
import Track from './Track';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      queueTracks: [],
    };
  }

  componentDidMount() {
    this.props.emmiter.on('addTrack', this.addTrack.bind(this));
    this.props.emmiter.on('nextTrack', this.nextTrack.bind(this));
  }

  componentWillUnmount() {
    this.props.emmiter.removeListener('addTrack', this.addTrack);
  }

  addTrack(track) {
    const tracks = this.state.queueTracks;
    tracks.push({
      name: track.name,
      preview_url: track.preview_url,
      votesCount: 0,
    });

    this.setState({ queueTracks: tracks });
  }

  nextTrack() {
    const tracks = this.state.queueTracks;
    tracks.shift();
    this.setState({ queueTracks: tracks });
    this.props.emmiter.emit('playTrack');
  }

  voteTrack(index, status) {
    const votedTrack = this.state.queueTracks[index];

    if (status) {
      votedTrack.votesCount++;
    } else {
      votedTrack.votesCount--;

      if (votedTrack.votesCount < 0) {
        votedTrack.votesCount = 0;
      }
    }

    this.sortTracks();
  }

  sortTracks() {
    const currentTrack = this.state.queueTracks[0];
    const sortedTracks = this.state.queueTracks.sort((a, b) => {
      if (a === currentTrack) {
        return false;
      }

      return b.votesCount - a.votesCount;
    });

    this.setState({
      queueTracks: sortedTracks,
    });
  }

  render() {
    const tracks = this.state.queueTracks.map((track, index) =>
      <Track key={index} track={track} voteTrack={(a, b) => this.voteTrack(a, b)} index={index} />
    );

    return (
      <div className="list">
        <ul>
          {tracks}
        </ul>
        <PlayControls queueTracks={this.state.queueTracks} emmiter={this.props.emmiter} />
      </div>
    );
  }
}

List.propTypes = {
  emmiter: React.PropTypes.object,
};

export default List;
