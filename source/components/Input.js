import React from 'react';
import SearchResults from './SearchResults';

function ajax(url, callback) {
  const accessToken = 'BQAEk496OnE4xCzJWljoYEBZ_uGerEKolOG-moC9VaDgI-FeLGz0lD6L_2q0hbCZLQ4mv230G8yN-pihlVd3T54qZiICjNZSW2RNy0YFRSekLiDoHzqgPxiVT1mZI_8baYg6jVXDiupQBdEMS1jJPHIkezAesBa7pw';
  const headers = { 'Authorization': `Bearer ${accessToken}` };
  
  fetch(`https://api.spotify.com/v1${url}`, { headers })
    .then(res => res.json())
    .then(callback);
}

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: null
    }
  }

  searchTrack(e) {
    const trackName = e.target.value;
    if(!trackName) {
      return
    }

    ajax(`/search/?q=${trackName}&type=track`, json => {
      if(json.error) {
        return
      }

      const searchResults = json.tracks.items.map(i => ({
        name: i.name,
        preview_url: i.preview_url
      }));

      this.setState({ searchResults })
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.searchTrack.bind(this)} />
        <SearchResults items={this.state.searchResults} />
      </div>
    )
  }
}

export default Input;