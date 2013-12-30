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

Prints each object's ETag (MD5), name and size in the bucket.

```
Usage: s3-list-objects --bucket <bucket>
Usage: s3-list-objects --dir <dir>
```

Examples:

```
$ s3-list-objects my-bucket
1b3ca34cd0f42fa00d57d30d7307f214 recipes/crunchy-lemon-muffins.jpg (5208787)

$ s3-list-objects bucket-not-exist
NoSuchBucket The specified bucket does not exist
```

If the bucket does not exist, the command returns a non-zero exit code.

### s3-bucket-summary ###

```
Usage: s3-bucket-summary --bucket <bucket>
```

Examples:

```
$ s3-bucket-summary --bucket my-bucket
Total Objects = 10195
Size (bytes)  = 37136856094
```

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
$ s3-upload my-bucket filename-and-key.txt
↑ filename-and-key.txt

$ s3-upload my-bucket my-file.txt file.txt
↑ my-file.txt → file.txt

$ s3-upload f.example.com --acl public-read path/to/animation.avi videos/animation.avi
↑ path/to/animation.avi → videos/animation.avi
```

### s3-download ###

Downloads one file at a time and saves it to the file system:

```
Usage: s3-download <bucket> <key> [<filename>]
```

If filename is not specified, then it defaults to the key

Options:

* [none]

Examples:

```
$ s3-download my-bucket filename-and-key.txt
↓ filename-and-key.txt

$ s3-download my-bucket my-file.txt file.txt
↑ my-file.txt → file.txt

$ s3-download my-bucket non/existant/file.txt
✗ non/existant/file.txt (download err: Error: The specified key does not exist.)
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

### s3-sync ###

Syncs a folder and a bucket. This program NEVER deletes your local files or your objects. It preserves everything
and in the case where it doesn't know what to do, it'll tell you to resolve your conflict. The procedure is:

* if a local file exists and an object does not exist, the file is uploaded
* if an object exists but a file does not, the object is downloaded
* if the file and object differ in size, a conflict error is shown (for you to resolve)
* if the file (MD5) and object (ETag) differ, a conflict is shown (for you to resolve)
* if they both exist with the same length and MD5, the file is shown as correct

It's very simple, but designed to be this way.

```
Usage: s3-sync --bucket <bucket> --dir <dir>
```

You must provide both a bucket and a directory to compare.

Options:

* --up   - only upload files
* --down - only download files

Examples:

```
$ s3-sync my-bucket my-dir/
$ s3-sync files files
$ s3-sync s3.example.com public
```

Example output. You can see a subdir/ being created, a conflict on filesize, a conflict on MD5, an object being
downloaded, a file being uploaded and a file which is the same in both places:

```
+ subdir/ (created)
✗ different-size.txt (different sizes)
✗ different-md5.txt (different MD5s)
↓ new-object.txt ...
↑ new-file.js ...
↓ new-object.txt ... done
↑ new-file.js ... done
✓ file-ok.txt
```

There are various other errors (such as inability to create a subdirectory) and each is preceded with `✗` and followed
by the error message. If a file is ignored for either upload or download, it is postfixed with '(ignored)'.

### s3-delete ###

Deletes the filename locally and the object from the bucket specified.

```
Usage: s3-delete --bucket bucket --dir path/to/dir <filename/key>
```

This operation will look for a local file and delete it. It will also delete the key in the bucket specified. Both of
these operations will succeed even if the file and/or key doesn't actually exist.

Example:

```
$ s3-delete --bucket my-bucket --dir path/to/my-bucket my-file.txt
! my-file.txt (file)
! my-file.txt (object)

$ s3-delete --bucket images --dir path/to/my-bucket holiday-2013.jpg
! holiday-2013.jpg (file)
! holiday-2013.jpg (object)
```

## Author ##

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

## License ##

MIT - http://chilts.mit-license.org/2013/

(Ends)
