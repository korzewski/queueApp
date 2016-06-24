import React from 'react';
import SearchResults from './SearchResults';

function ajax(url, callback) {
  fetch(`https://api.spotify.com/v1${url}`)
    .then(res => res.json())
    .then(callback);
}

class Input extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchResults: null
    }
  }

  searchTrack(e) {
    const trackName = e.target.value;
    if(!trackName) {
      this.setState({ searchResults: null })
      return
    }

    ajax(`/search/?q=${trackName}&type=track`, json => {
      if(json.error) {
        return
      }

      const searchResults = json.tracks.items.map(item => ({
        name: item.name,
        preview_url: item.preview_url,
        artists: item.artists,
        album: item.album
      }));

      this.setState({ searchResults })
    })
  }

  render() {
    return (
      <div className="search">
        <input type="text" placeholder="search" onChange={this.searchTrack.bind(this)} />
        <SearchResults emmiter={this.props.emmiter} items={this.state.searchResults} />
      </div>
    )
  }
}

export default Input;