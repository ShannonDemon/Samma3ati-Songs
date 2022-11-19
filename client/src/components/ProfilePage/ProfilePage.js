import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import './ProfilePage.css'
import jwt_decode from 'jwt-decode'

function ProfilePage(props) {
    // const [usersList, setUsersList] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        console.log('useeffect')
        getUser()
    }, [])
    
    const getUser = () => {
        const token = localStorage.getItem('token')
        let user = jwt_decode(token);
        axios.get(`http://localhost:3001/users/${user.user.id}`, {
            headers: {
                'Authorization': token,
        }})
        .then(res => {
            setUser(res.data)
            console.log(res.data)
            props.updateUser({user: {id: res.data._id, name: res.data.name} })
        })
        .catch(err => console.log(err))
      }
      const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        // password: ''
        }
      )
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }

      const handleSubmit = async () => {
        // axios.put... .. http.. ... , formData).then .. . . setUser(res.data)
        const token = localStorage.getItem('token')
        let user = jwt_decode(token);
        axios.put(`http://localhost:3001/user/${user.user.id}`, formData).then((res) => {
          setUser(res.data)
        })
        .then(() => {
          console.log('user updated!')
        })
      }

    // const getUser = () => {
    //     fetch('http://localhost:3001/users', {
    //         method: 'POST', 
    //         headers: {
    //         'Authorization': token,
    //         'Content-Type': 'application/json'
    //     },
    //         body: JSON.stringify(formData)})
    //         // axios.post('http://localhost:3001/users', formData)
    //         .then(res => console.log(res))
    //         .then(() => getAllUsers())
    //         .catch(err => console.log(err))

    // }
    return (
        <div className='profile-container'>
        <form onSubmit={handleSubmit}>
          {/* <label className='text-white'>Name</label> */}
          <h3 className='text-white'>User Page:</h3>
          <br></br>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" /><br></br>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" /><br></br>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" /><br></br>
          {/* <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" /><br></br> */}
          <button type="submit">New User!</button>
        </form>
  
      {/* {usersList.length ? usersList.map(user =>  */}
        <div key={user._id}>
          {/* <Link to={`/detail/${user._id}`} >{user._id}</Link> */}
          <p className='text-white'>Name: {user.name}</p>
          <p className='text-white'>Email: {user.email}</p>
        </div>
      {/* ) */}
      {/* : null} */}
      </div>
    )
}


export default ProfilePage