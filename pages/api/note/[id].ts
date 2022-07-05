// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const noteId = req.query.id;

    if (req.method === "DELETE") {
        const note = await prisma.note.delete({
            where: { id: noteId?.toString() },
        });
        res.json(note);
    } else {
        console.log("Could not be deleted");
    }

    const { title, content } = req.body;
    if (req.method === "PUT") {
        await prisma.note.update({
            where: { id: noteId?.toString() },
            data: {
                title,
                content,
            },
        });
    } else {
        console.log("Could not be deleted");
    }
}
