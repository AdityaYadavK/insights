import express from 'express';
import cp from 'cookie-parser'
import register from './routes/auth/register.js'
import login from './routes/auth/login.js'
import logout from './routes/auth/logout.js'
import search from './routes/users/search.js'
import following from './routes/users/following.js'
import followers from './routes/users/followers.js'
import follow from './routes/users/follow.js'
import one from './routes/tweets/one.js'
import user from './routes/tweets/user.js'
import like from './routes/interactions/like.js'
import reply from './routes/interactions/reply.js'

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 3001;
app.use(express.json())
app.use(cp())


app.use('/api/v1/auth/register', register);
app.use('/api/v1/auth/login', login)
app.use('/api/v1/auth/logout', logout)
app.use('/api/v1/user/search', search)
app.use('/api/v1/user/following', following)
app.use('/api/v1/user/followers', followers)
app.use('/api/v1/user/follow', follow)
app.use('/api/v1/tweets/tweet', one)
app.use('/api/v1/tweets/user', user)
app.use('/api/v1/interactions/like', like)
app.use('/api/v1/interactions/reply', reply)

app.get('/', (req, res) => {
    res.json({ msg : 'health verified' })
    console.log('verified')
})


// const server = app.listen(port, host, () => {
//     console.log(`listening on http://${host}:${port}`);
// });

// server.on('error', (error) => {
//     console.error('server failed to start', error);
//     process.exitCode = 1;
// });


app.listen(process.env.PORT || 3000, () => {
    console.log('listening')
});
