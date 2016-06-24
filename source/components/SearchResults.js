import React from 'react';
import SearchResultsItem from './SearchResultsItem';

const SearchResults = (props) => {
	const items = props.items;

	if(!items) {
		return null;
	}

	const list = items.map((item, index) => (
		<SearchResultsItem key={index} item={item} emmiter={props.emmiter}/>
	));

	return (
		<ul className="search-results">
			{list}
		</ul>
	);
}

export default SearchResults;

// SearchResults.propTypes = {
// 	items: React.PropTypes.array
// }