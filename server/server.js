const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()

require('dotenv').config()
require('../server/config/database')
app.use((req, res, next) => {
    console.log(req.body)
    next()
})
app.use(cors())
// app.use(bodyParser.urlencoded())
// app.use(express.json())

app.use(bodyParser.json())



app.post('/refresh',(req,res)=>{

    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
    redirectUri:"http://localhost:3000",
    clientId:"14734e301927401fb046756786c5af70",
    clientSecret:"22307a73307245eda49aab7123da96d0",
    refreshToken
    })


spotifyApi.refreshAccessToken().then(data => {
    res.json({
      accessToken: data.body.accessToken,
      expiresIn: data.body.expiresIn,
    })
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

app.use('/', require('./routes/users'))
app.use('/', require('./routes/favorites'))


app.post('/login',(req,res)=>{
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri:"http://localhost:3000",
        clientId:"14734e301927401fb046756786c5af70",
        clientSecret:"22307a73307245eda49aab7123da96d0",
        })
    

    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(400)
    })

})

app.listen(3001)