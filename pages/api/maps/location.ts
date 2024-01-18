import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method === "GET"){
        const {latitude,longitude} = req.query;
        if (!latitude || !longitude) {
            res.statusCode = 400;
            return res.send("위치 정보가 없습니다.");
        }
        try{
            const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
            const {data} = await axios.get(URL);
            console.log(data);
            const addressComponent = data.results[0].address_components;
            const { lat, lng } = data.results[0].geometry.location;
            const result = {
                latitude: lat,
                longitude: lng,
                country: addressComponent[4].long_name,
                city: addressComponent[3].long_name,
                district: addressComponent[2].long_name,
                streetAddress: `${addressComponent[1].long_name} ${addressComponent[0].long_name}`,
                postcode: addressComponent[5].long_name,
            };
            res.statusCode = 200;
            res.send(result);
        } catch (e) {
            console.log(e);
            return res.end();
        }
    }
    res.statusCode = 405;
        
    return res.end();
    };


// import { NextApiResponse, NextApiRequest } from "next";
// import axios from "axios";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "GET") {
//     const { latitude, longitude } = req.query;
//     if (!latitude || !longitude) {
//       res.statusCode = 400;
//       return res.send("위치 정보가 없습니다.");
//     }

//     try {
//       const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
//       if (!apiKey) {
//         throw new Error("Google Maps API 키가 설정되지 않았습니다.");
//       }

//       const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${apiKey}`;
//       const { data } = await axios.get(url);

//       // 클라이언트에게 데이터 전송
//       res.status(200).json(data);
//     } catch (e) {
//       console.error("Error fetching location info:", e);
//       res.status(500).json({ error: "서버에서 위치 정보를 가져오는 중에 오류가 발생했습니다." });
//     }
//   } else {
//     // 허용되지 않은 메소드에 대한 응답
//     res.status(405).end();
//   }
// };
