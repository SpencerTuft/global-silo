# silo
Creates a single location for server-wide variables.

#### Accessing variables
all - Retrieves all the store properties and values

get - Retrieves the key-value pair

set - Stores the key-value pair, over-writes the key if it already exists

add - Creates the key-value pair, will not over-write the key if it already exists

rm - Removes the property from the store

cp - Copy the value from one property to another

mv - Move the value from one property to another

#### Example

In a server.js file:
```$xslt
const express = require('express');
const silo = require('silo');
const getBucket = require('./get_s3_bucket');

const app = express();

app.get('/xhealth', (req, res) => res.sendStatus(200));

/* This will supply a single location for variables used server-wide. 
The get_s3_bucket.js file could contain a function that retrieves a file
from an AWS S3 Bucket, which requires a bucket name and a file name.
*/
silo.init([
  [ 'bucketName', 'identity-level-of-education-dev-bucket-s3' ],
  [ 'storageFile', 'levels_of_education.json' ],
  [ 'logFile', 'level_of_education_logs.json' ]
]);

app.get('/log-info', (req, res) => res.status(200).send(getBucket(logs.json);

app.listen(process.env.PORT || 8081, function () {
  console.log("Server running on port", port);
});
```