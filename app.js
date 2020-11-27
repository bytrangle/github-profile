require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const fetch = require('node-fetch');
const gqlQuery = require('./utils/graphql');

const host = 'localhost';
const port = process.env.PORT || 8000;

let githubProfileData;
const { log, error } = console;

const templatePath = `${__dirname}/views/index.ejs`;
const html = fs.readFileSync(templatePath, 'utf-8');

const token = process.env.GITHUB_TOKEN;

const staticFileHandler = (req, res, filePath, contentType) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log(err);
      // if (error.code === 'ENOENT') {
      //   fs.readFile('./404.html', function (error, content) {
      //     res.writeHead(404, { 'Content-Type': 'text/html' });
      //     res.end(content, 'utf-8');
      //   });
      // } else {
      res.writeHead(500);
      res.end(`Sorry, check with the site admin for error: ${err.code}`);
      // }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};
const assetPattern = /^\/static\/[a-zA-Z]+\.[a-zA-Z]+/;
const requestListener = async function (req, res) {
  // res.setHeader("Content-Type", "text/html"); // tell the client that we are returning HTML data
  // res.writeHead(200); // indicate the request was successful
  // res.end("<html><body><h1>This is HTML</h1></body></html>"); // send the client the index file
  console.log(req.url);
  let filePath;
  const { url } = req;
  if (url === '/') {
    res.end(ejs.render(html, { ...githubProfileData, filename: templatePath }));
  } else if (url.match(assetPattern)) {
    filePath = `.${req.url}`;
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.wasm': 'application/wasm',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    log(`file path is ${filePath}`);
    staticFileHandler(req, res, filePath, contentType);
  } else {
    res.end("This page doesn't exist");
  }
};

const checkResponseStatus = (res) => {
  if (!res.ok) throw new Error(`Request to Github API failed: ${res.status}-${res.statusText}`);
  return res;
};

// const server = http.createServer(requestListener);

// server.listen(port, host, () => {
//   log(`Server is running on http://${host}:${port}`);
// });

fetch('https://api.github.com/graphql', {
  method: 'POST',
  body: JSON.stringify({ query: gqlQuery, variables: { repos_count: 10 } }),
  headers: {
    Authorization: `bearer ${token}`,
  },
})
  .then(checkResponseStatus)
  .then((res) => res.json())
  .then((json) => {
    githubProfileData = json.data.viewer;
    log(githubProfileData.repositories.nodes[1].languages);
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
      log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch((err) => error(err));