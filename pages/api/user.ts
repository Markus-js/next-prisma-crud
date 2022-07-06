// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "../../lib/prisma";

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const { id, name, email, picture } = req.body;

//     try {
//         await prisma.user.create({
//             data: {
//                 id,
//                 name,
//                 email,
//                 picture,
//             },
//         });
//     } catch (e) {
//         console.error(e);
//         res.status(500).send(e);
//     }
// }

// // const { name, email, password } = req.body;
// // const user = await prisma.user.create({
// //   data: {
// //     name,
// //     email,
// //     password,
// //   },
// // });
// // res.status(201).json(user);
