// 유틸 함수 js입니다.

import axios from "axios";

export function activitation(){
  console.log("is Activated");
}


export function UtilGetAxios(axiosURL, argJson, responseFunc) {
  axios.get( axiosURL,
  {
    params: argJson
  })
  .then(responseFunc)
  .catch(err=>console.log(err));
}
export function UtilPostAxios(axiosURL, argJson, responseFunc) {
  axios.post( axiosURL,
  {
    params: argJson
  })
  .then(responseFunc)
  .catch(err=>console.log(err));
}