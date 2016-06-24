import React from 'react';

const audio = new Audio();
let isNewTrackFlag = true;

class PlayControls extends React.Component {
  componentDidMount() {
    this.props.emmiter.on('playTrack', this.playTrack.bind(this));
    audio.addEventListener('ended', this.onTrackEnd.bind(this));
  }

  componentWillUnmount() {
    audio.removeEventListener('ended', this.onTrackEnd);
  }

  onTrackEnd() {
    this.nextTrack();
  }

  getCurrentTrackUrl() {
    return this.props.queueTracks[0].preview_url;
  }

  playTrack() {
    if (this.props.queueTracks.length) {
      if (isNewTrackFlag) {
        isNewTrackFlag = false;

        const trackUrl = this.getCurrentTrackUrl();
        audio.src = trackUrl;
      }

      audio.play();
    }
  }

  nextTrack() {
    isNewTrackFlag = true;
    this.pauseTrack();
    this.props.emmiter.emit('nextTrack');
  }

  pauseTrack() {
    audio.pause();
  }

  render() {
    const className = !this.props.queueTracks.length ? 'play-controls disabled' : 'play-controls';

    return (
      <div className={className}>
        <div onClick={() => this.playTrack()}>play</div>
        <div onClick={() => this.pauseTrack()}>stop</div>
        <div onClick={() => this.nextTrack()}>next</div>
      </div>
    );
  }
}

PlayControls.propTypes = {
  queueTracks: React.PropTypes.array,
  emmiter: React.PropTypes.object,
};

export default PlayControls;
