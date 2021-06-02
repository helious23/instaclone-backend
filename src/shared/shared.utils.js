import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "ap-northeast-2",
});

const Bucket = "pharmstargram-uploads";
const bucketInstance = new AWS.S3();

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await bucketInstance
    .upload({
      Bucket,
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

export const delPhotoS3 = async (fileUrl) => {
  const filePath = fileUrl.split("/uploads/")[1];
  const params = {
    Bucket: `${Bucket}/uploads`,
    Key: filePath,
  };
  await bucketInstance
    .deleteObject(params, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    })
    .promise();
};

export const delAvatarS3 = async (fileUrl) => {
  const filePath = fileUrl.split("/avatar/")[1];
  const params = {
    Bucket: "pharmstargram-uploads/avatar",
    Key: filePath,
  };
  await bucketInstance
    .deleteObject(params, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    })
    .promise();
};
