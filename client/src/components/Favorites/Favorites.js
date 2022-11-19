import React, {useEffect, useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';

function Favorites() {

  const [fav, setFav] = useState({});

    useEffect(() => {
        getFavorites()
      }, [])

      const getFavorites = async () => {
        let token = localStorage.getItem("token");
        if(token != null){
          let user = jwt_decode(token);
    
          if(user){
            // axios.delete(`http://localhost:3001/fav/${user.user.id}`)
            axios.get(`http://localhost:3001/fav/${user.user.id}`)
            .then(res => {
              console.log(res);
              setFav(res.data.favorite)
            })
            .catch(err => {
              console.log(err)
            });
          }
          else if(!user){
            localStorage.removeItem("token");
          }
        }
      }

      const deleteFavorite = async (favId) => {
        axios.delete(`http://localhost:3001/favorites/${favId}`)
        .then((res) => console.log(res.data))
        .then(() => console.log('Fav deleted!'))
        .then(() => getFavorites())
      }


  return (
    <div>
        <h2 className='bg-dark text-white'>Favorite tracks:</h2>
          {fav.length ? fav.map(f => 
        <div key={f._id}>
          {/* <Link to={`/detail/${user._id}`} >{user._id}</Link>
          <p>Track: {f.title}</p>
          <p>Artist: {f.artist}</p> 
          <p><img src={f.albumUrl}></img></p> */}
          <div className="d-block p-2 bg-dark text-white border border-success border-left" style={{cursor:"pointer"}}>
            <img className="rounded" src={f.albumUrl} style={{height:'64px', width:'64px'}}/>
            <div className='ml-3'>
            <div>{f.title}</div>
            <div className='text-muted'>{f.artist}</div>
        </div>
        <button className="btn btn-light" onClick={() => {deleteFavorite(f._id)}}>Delete</button>         
        </div>
        </div> 
      )
      : null}
      </div>
  )
}

export default Favorites