# Video Downloader 📥

Video Downloader - Download Facebook Video and Youtube Video and Audio.  

🤖 Easy to use - Just add the URL Done...!  

## Built with 📦

- Node.js
- Yarn Package manager
- Express.js
- Node youtube-dl - <https://github.com/fent/node-ytdl-core>
- Got (HTTP request library) - <https://github.com/sindresorhus/got>
- CORS (Enable cors for Express.js) - <https://github.com/expressjs/cors>
- slugify(Slugify a string) - <https://github.com/sindresorhus/slugify>
- split - <https://www.w3schools.com/jsref/jsref_split.asp>

## Usage ✨

- Clone or download the repo

```sh
git clone https://github.com/mskian/video-dl.git
```

```sh
cd video-dl
yarn install
```

- start the server

```sh
yarn start
```

- Download Youtube video

```html
 http://localhost:4000/video/video?url=https://www.youtube.com/watch?v=bKDdT_nyP54
```

- Download youtube Video Audio Only

```html
http://localhost:4000/audio/audio?url=https://www.youtube.com/watch?v=bKDdT_nyP54
```

- Download Facebook HD Video

```html
http://localhost:4000/hd/video?url=https://www.facebook.com/LyricsEngsongs/videos/321854395918041/
```

- Download Low Resolution Facebook Video

```html
http://localhost:4000/low/video?url=https://www.facebook.com/LyricsEngsongs/videos/321854395918041/
```

## Formats 📼

- if you want to Change youtube Video & Audio Quality/Formats

```js
ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
            quality: 'highest'
        }).pipe(res);
```

```js
ytdl(url, {
            format: 'mp4',
            quality: 'highest'
        }).pipe(res);
```

For More check- <https://github.com/fent/node-ytdl-core#ytdlchooseformatformats-options>

## Free Deploy 🍔

- Deploy on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mskian/video-dl)  

- Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmskian%2Fvideo-dl)  

## Disclaimer ⚠

- Use this as your Personal Tool if you are going to this on Production Please read the terms and    Policy from Facebook & Youtube.
- This Tool does not Host any Pirated or Copyright content on its server and all
- We are not Affiliate or Authorized with Facebook - This Tool only for Educational Purpose.
- The videos or images that you downloaded to your System or Mobile directly from their respective CDN servers.

LICENSE ☑

MIT
