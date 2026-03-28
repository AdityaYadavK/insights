import express from 'express';
import { z } from 'zod';
const router = express.Router();
import prisma from '../../controller/prismadb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userschema = z.object({
    email : z.email(),
    password : z.string().min(6)
})

export default router.post('/', async(req, res) => {
    try{
        const result = userschema.safeParse(req.body);

        if(!result.success){
            return res.json({ msg : result.error });
        }

        const { email, password } = result.data
        const user = await prisma.user.findUnique({ where : { email }})
        if(!user) return res.json({ msg : 'email does not exists' })

        const verified = await bcrypt.compare( password, user.password );
        if(!verified) return res.json({ msg : "password incorrect" });

        const token = jwt.sign({ id : user.id }, process.env.JWT_SECRET,
            {
                expiresIn : "7d"
            }
        )

        res.cookie('token', token, {
            httpOnly : false,
            maxAge : 9000000000000
        }).json({ msg : 'logged in!'})

    }catch(e){
        console.error(e);
        res.json({ msg : e })
    }

})
