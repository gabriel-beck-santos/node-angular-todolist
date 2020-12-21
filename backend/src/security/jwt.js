import jwt from 'jsonwebtoken'


export const sign = payload => jwt.sign(payload, process.env.JWT_SECRET)

export const validate = token => jwt.verify(token, process.env.JWT_SECRET)