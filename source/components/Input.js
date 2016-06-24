import React from 'react';
import SearchResults from './SearchResults';
import 'whatwg-fetch';

function ajax(url, callback) {
  fetch(`https://api.spotify.com/v1${url}`)
    .then(res => res.json())
    .then(callback);
}

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: null,
    };
  }

  searchTrack(e) {
    const trackName = e.target.value;
    if (!trackName) {
      this.setState({ searchResults: null });
      return;
    }

    ajax(`/search/?q=${trackName}&type=track`, json => {
      if (json.error) {
        return;
      }

      const searchResults = json.tracks.items.map(item => ({
        name: item.name,
        preview_url: item.preview_url,
        artists: item.artists,
        album: item.album,
      }));

      this.setState({ searchResults });
    });
  }

  render() {
    return (
      <div className="search">
        <input type="text" placeholder="search" onChange={e => this.searchTrack(e)} />
        <SearchResults emmiter={this.props.emmiter} items={this.state.searchResults} />
      </div>
    );
  }
}

Input.propTypes = {
  emmiter: React.PropTypes.object,
};

export default Input;
