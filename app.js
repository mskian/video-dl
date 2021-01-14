const express = require('express');
const cors = require('cors');
const got = require('got');
const slugify = require('slugify');
const ytdl = require('ytdl-core');

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

app.listen(port, function () {
    console.log('listening on port ' + port);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Sample URL: http://localhost:4000/audio/audio?url=https://www.youtube.com/watch?v=bKDdT_nyP54  //
////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/audio/:audio', async (req, res) => {
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
        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
            quality: 'highest'
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Sample URL: http://localhost:4000/video/video?url=https://www.youtube.com/watch?v=bKDdT_nyP54  //
////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/video/:video', async (req, res) => {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sample URL: http://localhost:4000/hd/video?url=https://www.facebook.com/LyricsEngsongs/videos/321854395918041/ //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/hd/:video', function(req, res) {
    var video = req.query.url;
    (async () => {
        try {
            const response = await got(video);
            const High_q = response.body.split('hd_src:"')[1].split('",sd_src:"')[0];
            const seo_title = response.body.split('<title id="pageTitle">')[1].split('</title>')[0];
            const title = slugify(seo_title, {
                replacement: '-',
                remove: /[*+~.()'"!:@]/g,
                lower: true,
                strict: true
            });
            res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
            res.header('Content-type: octet/stream');
            console.log(High_q || 'null');
            var final = High_q;
            res.send(final);
        } catch (error) {
            console.log("null");
            res.send("HD Not avilable for this Video");
        }
    })();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sample URL: http://localhost:4000/low/video?url=https://www.facebook.com/LyricsEngsongs/videos/321854395918041/ //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/low/:video', function(req, res) {
    var video = req.query.url;
    (async () => {
        try {
            const response = await got(video);
            const Low_q = response.body.split('sd_src:"')[1].split('",hd_tag')[0];
            const seo_title = response.body.split('<title id="pageTitle">')[1].split('</title>')[0];
            const title = slugify(seo_title, {
                replacement: '-',
                remove: /[*+~.()'"!:@]/g,
                lower: true,
                strict: true
            });
            res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
            res.header('Content-type: octet/stream');
            console.log(Low_q || 'null');
            var final = Low_q;
            res.send(final);
        } catch (error) {
            console.log("null");
            res.send("SD Not avilable for this Video");
        }
    })();
});

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Enter a valid URL'
    });
});
