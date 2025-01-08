import axios from "axios";
import apiServerInfo from "@/config/serverConfig"
import { cookies } from 'next/headers';


export const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const verifyJwtEndpoint = `${apiServerInfo["epVerifyJwt"]}`;
  const decriptedJwt = await axios.get(
      verifyJwtEndpoint,
      {
        withCredentials: true,
        headers: {
          'Cookie': `access_token=${token}`,  // Cookieヘッダーを明示的に設定
          'Authorization': token  // Bearer tokenを設定
        }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      return null
    })

  return decriptedJwt
}


// NG: %22Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzYzNDk0NDMsImlhdCI6MTczNjM0NTg0Mywic3ViIjoibWlvLmZAbWFpbC5jb20ifQ.BVMPsH77l_hDEP6mHBtrm5iusybWRoK6moD1tuDRkT8%22
// OK: %22Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzYzNDk0NTksImlhdCI6MTczNjM0NTg1OSwic3ViIjoibWlvLmZAbWFpbC5jb20ifQ.KFoHYQz1R2mAq0DitkleO73rb33h4JsJrM5_3nU9zWE%22