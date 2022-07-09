const express = require('express');
const cors = require('cors');
const { got } = require('got');
const slugify = require('slugify');
const path = require('path');
const ytdl = require('ytdl-core');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, '/files')));
app.use(cors());

app.listen(port, () => {
    console.log(`Server running port ${port}`);
});

function customHeaders(req, res, next) {
    app.disable('x-powered-by');
    res.setHeader('X-Powered-By', 'Video Downloader');
    next();
}

app.use(customHeaders);

app.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/robots.txt', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/robots.txt'));
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
            console.log(High_q || 'null');
            const final = High_q;
            res.send('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><P>Your File is Ready <b>' + title + '</b> - For Download Click Download File & save the Video <br> PC Users Right Click From Mouse and Click Save us <br> Mobile Users Long press the Link for Direct download</p> ▶ <a href="'+ final +'" target="_blank"><b>Download File</b></a></body></html>');
        } catch (error) {
            console.log('null');
            res.send('HD Not avilable for this Video');
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
            console.log(Low_q || 'null');
            const final = Low_q;
            res.send('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><P>Your File is Ready <b>' + title + '</b> - For Download Click Download File & save the Video <br> PC Users Right Click From Mouse and Click Save us <br> Mobile Users Long press the Link for Direct download</p> ▶ <a href="'+ final +'" target="_blank"><b>Download File</b></a></body></html>');
        } catch (error) {
            console.log('null');
            res.send('SD Not avilable for this Video');
        }
    })();
});

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Enter a valid URL'
    });
});