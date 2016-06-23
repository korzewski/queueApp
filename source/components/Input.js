import React from 'react';
import SearchResults from './SearchResults';

function ajax(url, callback) {
  const accessToken = 'BQA9-1E7jc8ta6Hr5CTvf33Ojv7xsLXUzcjRICy_9PwQcqhEMMxl4Wz1ZfmaKG8f1Af_6QKhbFKXhzT82riYl9UtBHi_BNhT-WI-yFx35l7rc6_LWRlKI5TtvGowiF_kqyxvGTURPTPheOKgh-HtHmM3pF4IcoVfZQ';
  const headers = { 'Authorization': `Bearer ${accessToken}` };
  
  fetch(`https://api.spotify.com/v1${url}`, { headers })
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
        preview_url: item.preview_url
      }));

      this.setState({ searchResults })
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.searchTrack.bind(this)} />
        <SearchResults emmiter={this.props.emmiter} items={this.state.searchResults} />
      </div>
    )
  }
}

export default Input;