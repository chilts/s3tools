## s3tools ##

Tools for managing your S3 buckets and objects.

### s3-list-objects ###

```
Usage: s3-list-objects <bucket>
```

Prints each object out as follows:

```
ETag Key (Size)

e.g.
1b3ca34cd0f42fa00d57d30d7307f214 recipes/crunchy-lemon-muffins.jpg (5208787)
```

Options:

* none

Examples:

```
$ s3-list-objects my-bucket
1b3ca34cd0f42fa00d57d30d7307f214 recipes/crunchy-lemon-muffins.jpg (5208787)

$ s3-list-objects bucket-not-exist
NoSuchBucket The specified bucket does not exist
```

If the bucket does not exist, the command returns a non-zero exit code.

### s3-upload ###

Uploads one file at a time and puts it into a bucket with the given prefix:

```
Usage: s3-upload <bucket> <filename> <key>
```

Options:

* acl : any valid ACL, see [PutObject](docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html).

Examples:

```
$ s3-upload my-bucket my-file.txt file.txt
$ s3-upload f.example.com --acl public-read path/to/animation.avi videos/animation.avi
```

## Author ##

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

## License ##

MIT - http://chilts.mit-license.org/2013/

(Ends)
