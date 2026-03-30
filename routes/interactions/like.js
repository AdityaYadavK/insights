import express from 'express';
import prisma from '../../controller/prismadb.js';
import middleware from '../../controller/middleware.js';

const router = express.Router();

router.post('/:id', middleware, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ msg: 'invalid post' });

    await prisma.like.create({
      data: { userId: req.user.id, postId: id }
    });

    res.json({ msg: 'post liked' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
});

router.delete('/:id', middleware, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ msg: 'invalid post' });

    await prisma.like.delete({
      where: { userId_postId: { userId: req.user.id, postId: id } }
    });

    res.json({ msg: 'post unliked' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
});

export default router;
