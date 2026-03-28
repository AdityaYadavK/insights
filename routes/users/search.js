import express from 'express';
import prisma from '../../controller/prismadb.js'
import middleware from '../../controller/middleware.js'

const router = express.Router();

export default router.get('/:username', middleware, async(req, res) => {

    const { username } = req.params
    let check = String(username)
    console.log(check)
    try{
        const user = await prisma.user.findUnique({
            where : { username : check },
            select : {
                username : true,
                _count : {
                    select : {
                        followers : true,
                        following : true,
                        posts : true,
                        replies : true
                    }
                }
            }
        })
        if(!user) return res.json({ msg : 'username not found' })

        res.json( user )

    }catch(e){
        console.error(e);
        res.json({ msg : e })
    }
})
