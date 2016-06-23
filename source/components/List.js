import React from 'react';
import PlayControls from './PlayControls';

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
		this.setState({
			queueTracks: this.state.queueTracks.sort((a, b) => { return b.votesCount - a.votesCount })
		})
	}

	render() {
		if(!this.state.queueTracks.length){
			return null
		}

		const tracks = this.state.queueTracks.map((track, index) => {
			return <Track key={index} track={track} voteTrack={this.voteTrack.bind(this)} />
		})

		return (
			<div>
				<h2>List</h2>
				<ul>
					{tracks}
				</ul>
				<PlayControls queueTracks={this.state.queueTracks} emmiter={this.props.emmiter} />
			</div>
		)
	}
}

const Track = (props) => {
	return (
		<li>
			<div>
				{props.track.name}
			</div>
			<div>
				<span>{props.track.votesCount}</span>
				<span onClick={() => props.voteTrack(props.track, true)}>up</span>
				<span onClick={() => props.voteTrack(props.track, false)}>down</span>
			</div>
		</li>
	)
}

export default List;