// ----------------------------------------------------------------------------

// npm
var through2 = require('through2');

// ----------------------------------------------------------------------------

function objects(s3Client, bucket, callback) {
    var objects = [];

    function listObjects(marker) {
        var params = {
            Bucket : bucket,
        };
        if (marker) {
            params.Marker = marker;
        }

        // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property
        s3Client.listObjects(params, function (err, data) {
            if (err) {
                if ( err.retryable ) {
                    return listObjects(marker);
                }
                // this error cannot be re-tried
                return callback(err);
            }

            data.Contents.forEach(function(obj) {
                objects.push(obj);
                // console.log(obj.ETag.substr(1, 32) + ' ' + obj.Key + ' (' + obj.Size + ')');
            });

            if ( data.IsTruncated ) {
                listObjects(data.Contents[data.Contents.length-1].Key);
            }
            else {
                return callback(null, objects);
            }
        });
    }

    // start it off
    listObjects();
}

function objectStream(s3Client, bucket) {
    var stream = through2({ objectMode : true });

    function listObjects(marker) {
        var params = {
            Bucket : bucket,
        };
        if (marker) {
            params.Marker = marker;
        }

        // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property
        s3Client.listObjects(params, function (err, data) {
            if (err) {
                return stream.emit('error', err);
            }

            data.Contents.forEach(function(obj) {
                stream.push(obj)
            });

            if ( data.IsTruncated ) {
                listObjects(data.Contents[data.Contents.length-1].Key);
            }
            else {
                stream.push(); // end
            }
        });
    }

    // start it off
    listObjects();

    return stream;
}

// ----------------------------------------------------------------------------

module.exports.objects      = objects;
module.exports.objectStream = objectStream;

// ----------------------------------------------------------------------------
