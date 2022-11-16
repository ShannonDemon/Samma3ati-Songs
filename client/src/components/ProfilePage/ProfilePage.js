import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import './ProfilePage.css'

function ProfilePage() {
    const [usersList, setUsersList] = useState([])
    useEffect(() => {
        console.log('useeffect')
        getAllUsers()
    }, [])
    
    const getAllUsers = () => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3001/users', {
            headers: {
                'Authorization': token,
        }})
        .then(res => {
            setUsersList(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
      }
      const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
        }
      )
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
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
        {/* <form onSubmit={handleSubmit}>
          <label>Name</label><br></br>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" /><br></br>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" /><br></br>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" /><br></br>
          <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" /><br></br>
          <button type="submit">New User!</button>
        </form> */}
  
      {usersList.length ? usersList.map(user => 
        <div key={user._id}>
          User Page
          {/* <Link to={`/detail/${user._id}`} >{user._id}</Link> */}
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )
      : null}
      </div>
    )
}


export default ProfilePage