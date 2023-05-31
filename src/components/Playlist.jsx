import React from 'react';

const Playlist= ({ track,head,dp }) => {
  return (
    <div className="card-container">
    <div className='profile'>{head&&<img src={dp} className="artist-icon" alt="artist"></img>}<h2>{head}</h2></div>
    <div className='allcards'>
    {track.map((item, index) => (
      <div className="card" key={index}>
        <img src={item.releases.items[0].coverArt.sources[0].url} alt="Album Cover" />
        <h3>{item.releases.items[0].name}</h3>
      </div>
    ))}
    </div>
  </div>
  );
};

export default Playlist;
