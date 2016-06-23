import React from 'react';

let audio = new Audio();
let isNewTrackFlag = true;

class PlayControls extends React.Component {
	render() {
		return (
			<div>
				<span onClick={this.playTrack.bind(this)}>play</span>
				<span onClick={this.pauseTrack.bind(this)}>stop</span>
				<span onClick={this.nextTrack.bind(this)}>next</span>
			</div>
		)
	}

	getCurrentTrackUrl() {
		return this.props.queueTracks[0].preview_url;
	}

	playTrack() {
		if(this.props.queueTracks.length) {
			if(isNewTrackFlag) {
				isNewTrackFlag = false;

				const trackUrl = this.getCurrentTrackUrl();
				audio.src = trackUrl;
			}

			audio.play();
		}
	}

	pauseTrack() {
		audio.pause();
	}

	nextTrack() {
		console.log('track end');
		isNewTrackFlag = true;
		this.pauseTrack();
		this.props.emmiter.emit('nextTrack');
	}

	onTrackEnd() {
		this.nextTrack();
	}

	componentDidMount() {
		this.props.emmiter.on('playTrack', this.playTrack.bind(this));
		audio.addEventListener('ended', this.onTrackEnd.bind(this));
	}

	componentWillUnmount() {
		audio.removeEventListener('ended', this.onTrackEnd);
	}
}

export default PlayControls;