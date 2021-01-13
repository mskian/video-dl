# Video Downloader 📥

Video Downloader - Download Facebook Video and Youtube Video and Audio.  

🤖 Easy to use - Just add the URL Done...!  

## Built with 📦

- Node.js
- Yarn Package manager
- EXpress.js
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

## Disclaimer ⚠

- Use this as your Personal Tool if you are going to this on Production Please read the terms and Policy from Facebook & Youtube.
- all the Files are served from there CDN servers.
- Not affiliated with facebook and youtube.

LICENSE ☑

MIT
