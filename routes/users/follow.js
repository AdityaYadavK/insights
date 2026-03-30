import express from 'express';
import middleware from '../../controller/middleware.js'
import prisma from '../../controller/prismadb.js'

const router = express.Router();

router.post('/:username', middleware, async(req, res) => {
    const { username } = req.params;

    try{
        const target = await prisma.user.findUnique({
            where : { username : username }
        })
        if(!target) return res.json({ msg : 'user does not exist' })

        if(req.user.id == target.id){
            return res.json({ msg : 'cant follow self' })
        }

        await prisma.follow.create({
            data : {
                followerId : req.user.id,
                followingId : target.id
            }
        })

        res.json({ msg : 'succesfully followed' })

    }catch(e){
        console.error(e);
        res.json({ msg : e.message })
    }
})

router.delete('/:username', middleware, async(req, res) => {
    const { username } = req.params;

    try{
        const target = await prisma.user.findUnique({
            where : { username : username }
        })
        if(!target) return res.json({ msg : 'user does not exists' })

        if(req.user.id == target.id){
            return res.json({ msg : 'cant unfollow self' })
        }

        await prisma.follow.deleteMany({
            where : {
                followerId : req.user.id,
                followingId : target.id
            }
        })

        res.json({ msg : 'succesfully unfollowed' })

    }catch(e){
        console.error(e);
        res.json({ msg : e.message })
    }
})




export default router;
