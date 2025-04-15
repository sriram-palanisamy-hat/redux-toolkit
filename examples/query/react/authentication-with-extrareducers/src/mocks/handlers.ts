import { nanoid } from '@reduxjs/toolkit'
import { rest } from 'msw'

const token = nanoid()

export const handlers = [
  rest.get('/protected', (req, res, ctx) => {
    const authorization = req.headers.get('authorization')
    if (authorization !== `Bearer ${token}`) {
      return res(
        ctx.json({
          message: 'You shall not pass. Please login first.',
        }),
        ctx.status(401),
      )
    }
    return res(
      ctx.json({
        message:
          'Join us on the Reactiflux Discord server in #redux if you have any questions.',
      }),
    )
  }),
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.delay(400),
      ctx.json({
        user: {
          first_name: 'Test',
          last_name: 'User',
        },
        token,
      }),
    )
  }),
]
