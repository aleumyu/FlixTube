const express = require('express');
// Loads the (built-in) fs library so we can use the Node.js filesystem API.
const fs = require('fs');
const app = express();

// We will configure our microservices using environment variables.
// Specifically, in this case, we need a single environment variable to set the port number for the HTTP server
// Port can be thought of as an input or parameter to our microservice
if (!process.env.PORT) {
  throw new Error(
    'Please specify the port number for the HTTP server with the environment variable PORT.'
  );
}
const PORT = process.env.PORT;

// Defines the HTTP route for streaming video. This is a REST API for streaming video!
app.get('/video', (req, res) => {
  const path = '../../Documents/cherryblossom.mp4';

  // Retrieves the video file size. We’ll encode this in the HTTP header as a response to the web browser.
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error('An error occurred', err);
      res.sendStatus(500);
      return;
    }

    //Sends a response header to the web browser, including the content length and mime type
    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': 'video/mp4',
    });
    // here we are opening a readable stream from the video file.
    // Then we are piping the stream to our HTTP response (look for the call to the pipe function).
    fs.createReadStream(path).pipe(res);
  });
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
