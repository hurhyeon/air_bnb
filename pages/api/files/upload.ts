// import { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import aws from "aws-sdk";
// import { v4 as uuidv4 } from "uuid";
// import { createReadStream } from "fs";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     try {
//       const form = new formidable.IncomingForm();
//       const url = await new Promise((resolve, reject) => {
//         form.parse(req, async (err, fields, files) => {
//           const s3 = new aws.S3({
//             accessKeyId: process.env.ACCESSKEY_ID!,
//             secretAccessKey: process.env.SECRET_ACCESSKEY_ID!,
//           });

//           const stream = createReadStream(files.file.path);

//           //* 파일이름
//           const originalFileName = files.file.name.split(".").shift();
//           //* 확장자
//           const fileExtension = files.file.name.split(".").pop();

//           await s3
//             .upload({
//               Bucket: process.env.S3_BUCKET_NAME!,
//               Key: `${originalFileName}__${uuidv4()}.${fileExtension}`,
//               ACL: "public-read",
//               Body: stream,
//             })
//             .promise()
//             .then((res) => resolve(res.Location))
//             .catch((e) => reject(e));
//         });
//       });
//       res.statusCode = 201;
//       res.send(url);
//     } catch (e) {
//       console.log(e);
//       res.end();
//     }
//   }
//   res.statusCode = 405;

//   return res.end();
// };
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { createReadStream } from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = formidable();

      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });

      // 디버깅을 위한 로깅
      console.log("files:", files);

      // 파일 객체와 파일 속성이 존재하는지 확인
      if (!files || !files.file || !files.file[0] || !files.file[0].filepath) {
        throw new Error("파일 경로를 찾을 수 없습니다");
      }

      const s3 = new S3Client({
        credentials: {
          accessKeyId: process.env.ACCESSKEY_ID!,
          secretAccessKey: process.env.SECRET_ACCESSKEY_ID!,
        },
        region: "ap-northeast-2", // 여기에 실제 사용 중인 AWS 지역을 입력하세요. 예: "ap-northeast-2"
      });

      const stream = createReadStream(files.file[0].filepath);

      // 파일 이름과 확장자 추출
      const originalFileName = files.file[0].originalFilename.split(".").shift();
      const fileExtension = files.file[0].originalFilename.split(".").pop();

      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `${originalFileName}__${uuidv4()}.${fileExtension}`,
        ACL: "public-read",
        Body: stream,
      };

      const uploadResponse = await s3.send(new PutObjectCommand(uploadParams));
      const url = uploadResponse.Location;

      res.status(201).send(url);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
};

