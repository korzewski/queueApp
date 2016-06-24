import React from 'react';
import PlayControls from './PlayControls';
import Track from './Track';

class List extends React.Component {
	constructor() {
		super();
		this.state = {
			queueTracks: []
		}
	}

	componentDidMount() {
		this.props.emmiter.on('addTrack', this.addTrack.bind(this))
		this.props.emmiter.on('nextTrack', this.nextTrack.bind(this))
	}

	componentWillUnmount() {
		this.props.emmiter.removeListener('addTrack', this.addTrack);
	}

	addTrack(track) {
		let tracks = this.state.queueTracks;
		tracks.push({
			name: track.name,
			preview_url: track.preview_url,
			votesCount: 0
		});

		this.setState({ queueTracks: tracks });
	}

	nextTrack() {
		let tracks = this.state.queueTracks;
		tracks.shift();
		this.setState({ queueTracks: tracks })
		this.props.emmiter.emit('playTrack');
	}

	voteTrack(track, status) {
		if(status) {
			track.votesCount++;
		} else {
			track.votesCount--;
			if(track.votesCount < 0) {
				track.votesCount = 0;
			}
		}

		this.sortTracks();
	}

	sortTracks() {
		let currentTrack = this.state.queueTracks[0];
		let sortedTracks = this.state.queueTracks.sort((a, b) => {
			if(a === currentTrack) {
				return false;
			}

			return b.votesCount - a.votesCount
		});

		this.setState({
			queueTracks: sortedTracks
		})
	}

	render() {
		const tracks = this.state.queueTracks.map((track, index) => {
			return <Track key={index} track={track} voteTrack={this.voteTrack.bind(this)} index={index} />
		})

		return (
			<div className="list">
				<ul>
					{tracks}
				</ul>
				<PlayControls queueTracks={this.state.queueTracks} emmiter={this.props.emmiter} />
			</div>
		)
	}
}

export default List;
