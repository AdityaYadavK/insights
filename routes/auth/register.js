import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../../controller/prismadb.js'

const userschema = z.object({
    username : z.string().min(6),
    email : z.email(),
    password : z.string().min(6)
});

const router = express.Router();

export default router.post('/', async(req, res) => {
    const result = userschema.safeParse(req.body);
    if(!result.success){
        return res.json({ msg : result.error.flatten() })
    }

    const { username, email, password } = result.data;
    const usernameexists = await prisma.user.findUnique( { where : { username }})
    if(usernameexists) return res.json({ msg : 'username taken' })

    const emailexists = await prisma.user.findUnique({ where : { email }} )
    if( emailexists ) return res.json({ msg : 'email already exists' });

    const hashed = await bcrypt.hash( password, 10 );

    try{
        const user = await prisma.user.create({
            data : {
                username : username,
                email : email,
                password : hashed
            }
        })
        const token = jwt.sign(
            { id : user.id }, process.env.JWT_SECRET, { expiresIn : '7d' }
        )
        console.log(token);
        res.cookie(
            'token', token,
            { httpOnly : false, expires : new Date(Date.now() + 90000000000 )}
        ).json({ msg : "registered" })
    }catch(e){
        console.log(e);
        res.json({ msg : e });
    }
})







