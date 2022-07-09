import got from 'got';
import slugify from 'slugify';
import ytdl from 'ytdl-core';

const video = "https://www.facebook.com/LyricsEngsongs/videos/321854395918041/";
const YT_VIDEO = "https://www.youtube.com/watch?v=bKDdT_nyP54";

(async () => {
    try {
        const response = await got(video);
        const seo_title = response.body.split('<title>')[1].split('</title>')[0];
        const title = slugify(seo_title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: true
        });
        console.log(title);
    } catch (error) {
        console.log("null");
    }
    try {
        var url = YT_VIDEO;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }
        let info = await ytdl.getInfo(url);
        const title = slugify(info.videoDetails.title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: false
        });
        console.log(title);

    } catch (err) {
        console.error(err);
    }
})();