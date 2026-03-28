import express from 'express';
import cp from 'cookie-parser'
import register from './routes/auth/register.js'
import login from './routes/auth/login.js'
import logout from './routes/auth/logout.js'
import search from './routes/users/search.js'

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 3001;
app.use(express.json())
app.use(cp())


app.use('/api/v1/auth/register', register);
app.use('/api/v1/auth/login', login)
app.use('/api/v1/auth/logout', logout)
app.use('/api/v1/user', search)

app.get('/', (req, res) => {
    res.json({ msg : 'health verified' })
    console.log('verified')
})


const server = app.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`);
});

server.on('error', (error) => {
    console.error('server failed to start', error);
    process.exitCode = 1;
});

