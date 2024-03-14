import prisma from "../../db";
import { hashPassword, createJWT, comparePassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
    }})

    const token = createJWT(user)
    res.json({token})
}

export const signin = async (req, res) => {
    const user = prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePassword(req.body.password, (await user).password)

    if(!isValid) {
        res.status(401)
        res.json({"message": "Incorrect password!"})
    }

    const token = createJWT(user)
    res.json({token})
}