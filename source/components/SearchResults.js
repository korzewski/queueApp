import React from 'react';

class SearchResults extends React.Component {
	render() {
		const items = this.props.items;

		if(!items) {
			return null;
		}

		const list = items.map((i, index) => (
			<li key={index}>
				<span>{i.name}</span>
			</li>
		));

		return (
			<ul>
				{list}
			</ul>
		);
	}
}

export default SearchResults;

SearchResults.propTypes = {
	items: React.PropTypes.array
}