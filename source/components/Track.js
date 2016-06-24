import React from 'react';

const Track = (props) => {
  let votes = null;

  if(props.index != 0) {
    votes = (
      <div className="votes">
        <span className="counter">{props.track.votesCount}</span>
        <span onClick={() => props.voteTrack(props.track, true)}>up</span>
        <span onClick={() => props.voteTrack(props.track, false)}>down</span>
      </div>
    );
  }

  return (
    <li>
      <div className="name">
        {props.track.name}
      </div>
      {votes}
    </li>
  )
}

export default Track;