const express = require('express');
const app = express();
const PORT = 5050;
const aws = require('aws-sdk');
const S3 = require("aws-sdk/clients/s3");
const fs = require('fs');
var ffmpeg = require('ffmpeg');
const accessKeyId = 'AKIA5R3EZFNQ27JLPRDU';
const secretAccessKey = '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';
const bucketName = 'workegypt-job-seeker-production';

//s3 config
const s3 = new S3({
  accessKeyId,
  secretAccessKey,
});

//upload to s3
function uploadFile(file) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: 'test1',
  };
return s3.upload(uploadParams).promise(console.log('UPLOADED')); // this will upload file to S3
}

//test api to compress then upload
app.post('/api/upload', async (req, res) => {

  //const data = fs.readFileSync('/home/atef/Downloads/pexels-serkan-bayraktar-8214649.mp4', 'utf8')
  //console.log(data)

    var process = new ffmpeg('/home/atef/Downloads/pexels-serkan-bayraktar-8214649.mp4');
    process.then(function (video) {
        console.log(video.info_configuration.decode,'VIDEO');

        //merge to buffer type 
        const buff = Buffer.from(video.info_configuration.decode, "utf-8");

          console.log(buff);

        const uploadToS3 = uploadFile(video.metadata);
        console.log(uploadToS3,'S3 DATA');
        // Video metadata
        console.log(video.metadata,'METADATA');
    }, function (err) {
        console.log('Error: ' + err);
    });

});


app.listen(PORT, () => console.log(`server running @ ${PORT}`));