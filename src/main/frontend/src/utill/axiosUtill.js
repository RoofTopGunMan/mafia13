/* 유틸 함수 js입니다.
 * 단순하게 사용되는 axios 함수를 추려냈습니다.
 */
import axios from "axios";

export function activitation(){
  console.log("is Activated");
}


// getMapping 시 해당 함수로 호출하면 됩니다.
export function UtilGetAxios(axiosURL, argJson, responseFunc) {
  axios.get( axiosURL,
  {
    params: argJson
  })
  .then(responseFunc)
  .catch(err=>console.log(err));
}

// PostMapping 시 해당 함수로 호출하면 됩니다.
export function UtilPostAxios(axiosURL, argJson, responseFunc) {
  axios.post( axiosURL,
  {
    params: argJson
  })
  .then(responseFunc)
  .catch(err=>console.log(err));
}