// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const noteId = req.query.id;

    if (req.method === "DELETE") {
        const note = await prisma.note.delete({
            where: { id: Number(noteId) },
        });
        res.json(note);
    }

    try {
        await prisma.note.create({
            data: {
                title,
                content,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}
