import express from 'express';

const authRouter = express.Router();

authRouter.get('/', (req,res) => {
    res.send("Auth Endpoint working . . .")
})

export default authRouter;