import React from 'react';
import SearchResultsItem from './SearchResultsItem';

const SearchResults = (props) => {
  const items = props.items;

  if (!items) {
    return null;
  }

  const list = items.map((item, index) => (
    <SearchResultsItem key={index} item={item} emmiter={props.emmiter} />
  ));

  return (
    <ul className="search-results">
      {list}
    </ul>
  );
};

SearchResults.propTypes = {
  items: React.PropTypes.array,
  emmiter: React.PropTypes.object,
};

export default SearchResults;
