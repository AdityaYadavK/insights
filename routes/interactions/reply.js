import express from 'express';
import middleware from '../../controller/middleware.js'
import prisma from '../../controller/prismadb.js'

const router = express.Router()

router.post("/:id", middleware, async(req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try{
        const post = await prisma.post.findUnique({
            where : {
                id
            }
        })

        if(!post) return res.json({ msg : 'invalid post' })

        await prisma.reply.create({
            data : {
                content : content,
                authorId : req.user.id,
                postId : id
            }
        })

        res.json({ msg : 'reply created' })
    }catch(e){
        console.error(e)
        res.json({ msg : e.message })
    }
})



router.delete("/:id", middleware, async(req, res) => {
    const { id } = req.params;

    try{
        const reply = await prisma.reply.findFirst({
            where : {
                id : id,
                authorId : req.user.id
            }
        })

        if(!reply ) return res.json({ msg : 'invalid id'})

        await prisma.reply.delete({
            where : {
                id : id,
                authorId : req.user.id
            }
        })

        return res.json({ msg : 'reply deleted' })

    }catch(e){
        console.error(e)
        res.json({ msg : e.message })
    }
})


export default router;
