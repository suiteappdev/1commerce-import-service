const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'cat.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};


const uploadFileToS3 = (url, bucket, key) => {
    return axios.get(url, { responseType: "arraybuffer", responseEncoding: "binary" }).then((response) => {
      const params = {
        ContentType: response.headers["content-type"],
        ContentLength: response.data.length.toString(),
        Bucket: bucket,
        Body: response.data,
        Key: key,
      };
      return s3.putObject(params).promise();
    });
  }
  
  uploadFileToS3(<your_file_url>, <your_s3_path>, <your_s3_bucket>)
     .then(() => console.log("File saved!"))
     .catch(error) => console.log(error));