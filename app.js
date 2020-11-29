const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public/assets')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// require('dotenv').config();
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const url = require('url');
// const ejs = require('ejs');
// const fetch = require('node-fetch');
// const gqlQuery = require('./utils/graphql');

// const host = 'localhost';
// const port = process.env.PORT || 8000;

// let githubProfileData;
// const { log, error } = console;

// const templatePath = `${__dirname}/views/index.ejs`;
// const html = fs.readFileSync(templatePath, 'utf-8');

// const token = process.env.GITHUB_TOKEN;

// const staticFileHandler = (req, res, filePath, contentType) => {
//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       console.log(err);
//       // if (error.code === 'ENOENT') {
//       //   fs.readFile('./404.html', function (error, content) {
//       //     res.writeHead(404, { 'Content-Type': 'text/html' });
//       //     res.end(content, 'utf-8');
//       //   });
//       // } else {
//       res.writeHead(500);
//       res.end(`Sorry, check with the site admin for error: ${err.code}`);
//       // }
//     } else {
//       res.writeHead(200, { 'Content-Type': contentType }); // indicate the request was successful
//       res.end(content, 'utf-8'); // send the client the index file generated by EJS templating engine
//     }
//   });
// };

// // The pattern used to match url like /assets/[filename].[extension], for example /assets/main.css
// const assetPattern = /^\/assets\/[a-zA-Z]+\.[a-zA-Z]+/;
// const requestListener = (req, res) => {
//   const requestUrl = url.parse(req.url);
//   const urlPath = requestUrl.pathname;
//   const parts = urlPath.split('/').slice(1);
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end(parts[1]);
//   // log(req.url);
//   // let filePath;
//   // const { url } = req;
//   // if (url === '/') {
//   //   res.end(ejs.render(html, { ...githubProfileData, filename: templatePath }));
//   // } else if (url.match(assetPattern)) {
//   //   // Added the public pattern because these static files are actually located inside /public/assets, although they are publicly served under [domain]/assets/
//   //   filePath = `./public${req.url}`;
//   //   const extname = String(path.extname(filePath)).toLowerCase();
//   //   const mimeTypes = {
//   //     '.html': 'text/html',
//   //     '.js': 'text/javascript',
//   //     '.css': 'text/css',
//   //     '.json': 'application/json',
//   //     '.png': 'image/png',
//   //     '.jpg': 'image/jpg',
//   //     '.gif': 'image/gif',
//   //     '.svg': 'image/svg+xml',
//   //     '.wav': 'audio/wav',
//   //     '.mp4': 'video/mp4',
//   //     '.woff': 'application/font-woff',
//   //     '.ttf': 'application/font-ttf',
//   //     '.eot': 'application/vnd.ms-fontobject',
//   //     '.otf': 'application/font-otf',
//   //     '.wasm': 'application/wasm',
//   //   };
//   //   const contentType = mimeTypes[extname] || 'application/octet-stream';
//   //   log(`file path is ${filePath}`);
//   //   staticFileHandler(req, res, filePath, contentType);
//   // } else {
//   //   res.end("This page doesn't exist");
//   // }
// };

// const checkResponseStatus = (res) => {
//   if (!res.ok) throw new Error(`Request to Github API failed: ${res.status}-${res.statusText}`);
//   return res;
// };

// const server = http.createServer(requestListener);

// server.listen(port, host, () => {
//   log(`Server is running on http://${host}:${port}`);
// });

// // fetch('https://api.github.com/graphql', {
// //   method: 'POST',
// //   body: JSON.stringify({ query: gqlQuery, variables: { repos_count: 20 } }),
// //   headers: {
// //     Authorization: `bearer ${token}`,
// //   },
// // })
// //   .then(checkResponseStatus)
// //   .then((res) => res.json())
// //   .then((json) => {
// //     githubProfileData = json.data.viewer;
// //     log(githubProfileData.repositories);
// //     const server = http.createServer(requestListener);
// //     server.listen(port, host, () => {
// //       log(`Server is running on http://${host}:${port}`);
// //     });
// //   })
// //   .catch((err) => error(err));
