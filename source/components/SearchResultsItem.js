import React from 'react';

const onTrackClick = (emmiter, track) => {
	emmiter.emit('addTrack', track);
}

const SearchResultsItem = (props) => {
	return (
		<li onClick={() => onTrackClick(props.emmiter, props.item)}>
			<div className="cover-image">
				<img src={props.item.album.images[0].url} alt="" />
			</div>
			<div className="track-details">
				<div className="track">{props.item.name}</div>
				<div className="artist">{props.item.artists[0].name}</div>
			</div>
		</li>
	)
}

export default SearchResultsItem;
