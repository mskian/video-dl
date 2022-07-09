import express from 'express';
import ytdl from 'ytdl-core';
import slugify from 'slugify';
const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////////
// Sample URL: http://localhost:4000/video/video?url=https://www.youtube.com/watch?v=bKDdT_nyP54  //
////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
    try {
        var url = req.query.url;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }
        let info = await ytdl.getInfo(url);
        console.log(info.videoDetails.title);
        const title = slugify(info.videoDetails.title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: false
        });
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(url, {
            format: 'mp4',
            quality: 'highest'
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});

export default router;