import axios from "axios";
import apiServerInfo from "@/config/serverConfig"
import { User } from '@/app/lib/types/users';
import { cookies } from 'next/headers';


export const getUser = async (): Promise<User | null> => {
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
