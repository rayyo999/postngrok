// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import NextCors from 'nextjs-cors'

// type Data = {
//   name: string
// }
// // const allowCors = (fn) => async (req, res) => {
// //   res.setHeader('Access-Control-Allow-Credentials', true)
// //   res.setHeader('Access-Control-Allow-Origin', '*')
// //   // another common pattern
// //   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
// //   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
// //   res.setHeader(
// //     'Access-Control-Allow-Headers',
// //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
// //   )
// //   if (req.method === 'OPTIONS') {
// //     res.status(200).end()
// //     return
// //   }
// //   return await fn(req, res)
// // }
// export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
//   await NextCors(req, res, {
//     // Options
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     origin: '*',
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   })
//   console.log(req.body)
//   res.status(200).json(req)
//   // res.status(200).json(JSON.stringify(req))
// }
// // module.exports = allowCors(handler)

import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  console.log('🚀 -> file: hello.ts -> line 63 -> handler -> req', req.body);

  // Rest of the API logic
  res.status(200).json(req.body)
}