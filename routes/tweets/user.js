import express from 'express';
import middleware from '../../controller/middleware.js'
import prisma from '../../controller/prismadb.js'

const router = express.Router()

router.get("/:username", middleware, async(req, res) => {
    const { username } = req.params;

    try{
        const posts = await prisma.post.findMany({
            where : {
                author : {
                    username : username
                }
            }
        })

        res.json(posts)


    }catch(e){
        console.error(e)
        res.json({ msg : e.message })
    }
})


export default router;
