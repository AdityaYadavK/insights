import express from 'express';
import middleware from '../../controller/middleware.js'
import { z } from 'zod';
import prisma from '../../controller/prismadb.js'

const router = express.Router()

const postschema = z.object({
    content : z.string().min(1)
})


router.post('/', middleware, async(req, res) => {
    const result = postschema.safeParse(req.body)

    if(!result.success){
        return res.json({ msg : 'invalid format' })
    }

    const { content } = result.data;

    try{
        const post = await prisma.post.create({
            data : {
                content : content,
                authorId : req.user.id
            }
        })
        res.json({ msg : "post created",
            post
         })
    }catch(e){
        console.error(e)
        res.json({ msg : e.message })
    }
})


router.delete('/:id', middleware, async(req, res) => {
    const { id } = req.params;

    try{
        const post = await prisma.post.findUnique({
            where : {
                id : id
            }
        })

        if(!post) return res.json({ msg : 'invalid post' })

        if(post.authorId != req.user.id){
            return res.json({ msg : "not your post" })
        }

        await prisma.post.delete({
            where : {
                id : id
            }
        })

        res.json({ msg : "post deleted" })

    }catch(e){
        console.error(e)
        res.json({ msg : e.message })
    }
})

router.get("/:id", middleware, async(req, res) => {
    const { id } = req.params;

    try{
        const post = await prisma.post.findUnique({
            where : {
                id : id
            }
        })

        if(!post){
            return res.json({ msg : "invalid post id" })
        }

        res.json(post)
        console.log("post fetched")

    }catch(e){
        console.error(e)
        res.json({ msg : e.message })
    }
})


export default router;
