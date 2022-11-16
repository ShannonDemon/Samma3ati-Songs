import React, {useEffect, useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';

function Favorites() {

  const [fav, setFav] = useState({});

    useEffect(() => {
        let token = localStorage.getItem("token");
    
        if(token != null){
          let user = jwt_decode(token);
    
          if(user){
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
      }, [])


  return (
    <div>
          {fav.length ? fav.map(f => 
        <div key={f._id}>
          User Page
          {/* <Link to={`/detail/${user._id}`} >{user._id}</Link> */}
          <p><img src={f.albumUrl}></img></p>
          <p>Track: {f.title}</p>
          <p>Artist: {f.artist}</p>          
        </div> 
      )
      : null}
      </div>
  )
}

export default Favorites