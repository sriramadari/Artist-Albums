import React, { useState } from "react";
import axios from "axios"; // You can use Axios for API requests
import  Playlist from "./Playlist";
import { CircularProgress } from "@mui/material";
import Header from "./Header";
const extractArtistId = (spotifyUri) => {
  const parts = spotifyUri.split(":");
  return parts[2] || null;
};

const App = () => {
  const [albumdata, setalbumdata] = useState([]);
  const [artistdp,setartistdp]=useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [head, setname] = useState("");
  const [isloading, setloading] = useState(false);
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: searchQuery, //search field
      type: "artist",
      offset: "0",
      limit: "10",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "6d856755ccmsh394e437ed062897p18cdcajsncdfd6eb27e6c",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const fetchData = async () => {
    try {
      setloading(true);
      const response = await axios.request(options);
      // setTracks(response.data.artists.items);
      setname(response.data.artists.items[0].data.profile.name);
      setartistdp(response.data.artists.items[0].data.visuals.avatarImage.sources[0].url);
      const spotifyUri = response.data.artists.items[0].data.uri;
      const artistId = extractArtistId(spotifyUri);
      console.log(artistId);
      const options1 = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/artist_singles/",
        params: {
          id: artistId, //artistID
          offset: "0",
          limit: "20",
        },
        headers: {
          "X-RapidAPI-Key":
            "6d856755ccmsh394e437ed062897p18cdcajsncdfd6eb27e6c",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };
      const res = await axios.request(options1);
      console.log(res.data);
      console.log(res.data.data.artist.discography.singles.items[0].releases.items[0].id);
      setalbumdata(res.data.data.artist.discography.singles.items);
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };

  return (
    <div>
      <Header/>
      <div className="intag">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search your favourite artist"
          onChange={function (e) {
            setSearchQuery(e.target.value);
          }}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      {isloading && (
        <div className="load">
          <CircularProgress color="success" />
        </div>
      )}

      {albumdata && <Playlist track={albumdata} head={head} dp={artistdp}/>}
    </div>
  );
};

export default App;
