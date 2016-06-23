import React from 'react';

const ListItem = (props) => {
	return (
		<li onClick={() => onTrackClick(props.emmiter, props.item)}>
			<span>{props.item.name}</span>
		</li>
	)
}

const SearchResults = (props) => {
	const items = props.items;

	if(!items) {
		return null;
	}

	const list = items.map((item, index) => (
		<ListItem key={index} item={item} emmiter={props.emmiter}/>
	));

	return (
		<ul className="search-results">
			{list}
		</ul>
	);
}

const onTrackClick = (emmiter, track) => {
	emmiter.emit('addTrack', track);
}

export default SearchResults;

// SearchResults.propTypes = {
// 	items: React.PropTypes.array
// }