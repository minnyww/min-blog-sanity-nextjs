import { getPaginatedBlogs, getAllBlogs } from "lib/api";

export default async function getBlogs(req, res) {
   console.log("req : ", req.query.offset);
   const offset = parseInt(req.query.offset || 0, 10);
   const date = req.query.date || "desc";
   const data = await getAllBlogs({ offset: req.query.offset });
   //    const data = await getPaginatedBlogs({ offset, date });
   res.status(200).json(data);
}
