import express from 'express';
import prisma from '../../controller/prismadb.js'

const router = express.Router();

export default router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try{
        const user = await prisma.follow.findMany({
            where : { followerId : id },
            select : {
                following : {
                    select : {
                        id : true,
                        username : true
                    }
                }
            }
        })

        if(!user) return res.json({ msg : 'user not found' });

        res.json( user );

    }catch(e){
        console.error(e);
        res.json({ msg : e })
    }
})
