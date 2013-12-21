## s3tools ##

Tools for managing your S3 buckets and objects.

## Environment Variables ##

Similar to the official tools, you should export the following into your environment:

```
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
```

### s3-list-buckets ###

```
Usage: s3-list-buckets
```

Prints each objects out as follows:

```
CreationDate Name

e.g.
2008-01-06T10:04:16.000Z bulk
```

Options:

* none

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
Usage: s3-upload <bucket> <filename> [<key>]
```

If key is not specified, then the key defaults to the filename.

Options:

* acl : any valid ACL, see [PutObject](docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html).

Examples:

```
$ s3-upload my-bucket my-file.txt file.txt
$ s3-upload my-bucket filename-and-key.txt
$ s3-upload f.example.com --acl public-read path/to/animation.avi videos/animation.avi
```

### s3-find-duplicates ###

Finds all duplicate objects in the bucket based on the ETag/MD5.

```
Usage: s3-find-duplicates <bucket>
```

Prints each ETag first, then the names of any duplicate objects:

```
dc603ae9ef991f230c00671fde9958a8
  my-file-1.txt
  my-file-2.txt
f18a0da9e043cc4f8579acb7cc838357
  photos/2013-holiday/20130319_165630.jpg
  photos/2013-holiday/DSCN2274.JPG
```

As you can see the two `my-file-{1,2}.txt` are the same file and the two holiday images are also the same.

## Author ##

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

## License ##

MIT - http://chilts.mit-license.org/2013/

(Ends)
