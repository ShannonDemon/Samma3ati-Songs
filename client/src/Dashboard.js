import React, { useEffect } from 'react'
import {useState} from 'react'
import useAuth from './useAuth'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import {Container, Form} from 'react-bootstrap'
import axios from 'axios'
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
    // redirectUri:"http://localhost:3000",
    clientId:"14734e301927401fb046756786c5af70",
    // clientSecret:"22307a73307245eda49aab7123da96d0",
    // refreshToken
    })


function Dashboard({code}) {
  const accessToken = useAuth(code)  
  const [search,setSearch] = useState("")
  const [searchResults,setSearchResults] = useState([])
  const [playingTrack,setPlayingTrack] = useState()

  const [songFav, setFav] = useState({})

  function chooseTrack(track){
    setPlayingTrack(track)
    setSearch('')
  }

  console.log(searchResults)


  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken])

  useEffect(()=>{
    // console(res.body)
    if(!search) return setSearchResults([])
    if(!accessToken) return 

    let cancel = false
    spotifyApi.searchTracks(search).then(res=>{
        if (cancel) return
        setSearchResults(
            res.body.tracks.items.map(track=>{
            const smallestAlbumImage = track.album.images.reduce(
                (smallest, image)=>{
                    if (image.height < smallest.height) return image
                    return smallest
                },
                track.album.images[0]
                )

            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url
            }
        }))
    })
    return ()=> cancel = true
  },[search, accessToken])

  const addToFav = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    const token = localStorage.getItem('token')
    const songData = searchResults.filter(song => song.uri == e.target.value)
    // debugger
    fetch('http://localhost:3001/favorites', {
    method: 'POST', 
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
}).then(res => console.log(res.json()))
    // axios.post('http://localhost:3001/favorites', songData, {headers: { Authorization: token }}
    // )
    // .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  return (
    <Container className='d-flex flex-column py-2' style={{height:"100vh"}} >
        <Form.Control type='search' placeholder='Search Songs/Artists'
        value={search} onChange={e=>setSearch(e.target.value)}/>
        <div className='flex-grow-1 my-2' style={{overflowY:'auto'}}>Songs</div>
        {searchResults.map(track=>(
        <>
            <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
            <button class="btn btn-light" onClick={addToFav} value={track.uri} >Add To Favorites</button>   
        </>
        ))}
        <div>
        <Player
        accessToken={accessToken}
        trackUri={playingTrack ?. uri} />
        </div>
    </Container>
  )
}

export default Dashboard