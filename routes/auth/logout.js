import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken'

export default router.post('/', async(req, res) => {
    const token = jwt.sign({ id : "0987654321" }, process.env.JWT_SECRET, {
        expiresIn : '7d'
    })

    res.cookie('token', token, {
        httpOnly : false,
        expires : new Date(Date.now() - 900000000000)
    }).json({ msg : "logged out!"})
})
