import React from 'react';

let audio = new Audio();
let isNewTrackFlag = true;

class PlayControls extends React.Component {
	render() {
    const className = !this.props.queueTracks.length ? 'disabled' : '';

		return (
			<div className={'play-controls ' + className}>
				<div onClick={this.playTrack.bind(this)}>play</div>
				<div onClick={this.pauseTrack.bind(this)}>stop</div>
				<div onClick={this.nextTrack.bind(this)}>next</div>
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
