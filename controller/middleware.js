import jwt from 'jsonwebtoken';

const middleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.json({ msg : 'unverified' });

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next();
    }catch(e){
        console.log(e);
        res.json({ msg : e });
    }
}

export default middleware;
