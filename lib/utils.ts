//* "token=value" 를 {token:"value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if (cookieString) {
      //* "token=value"
      const itemString = cookieString?.split(/\s*;\s*/);
      itemString.forEach((pairs) => {
        //* ["token","value"]
        const pair = pairs.split(/\s*=\s*/);
        cookies[pair[0]] = pair.splice(1).join("=");
      });
    }
    return cookies;
  };


//*string에서 number만 return 하는 함수
export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join("");
  if (numbers) {
    return Number(numbers);
  }
  return null;
};

//* 금액을 입력하면 금액에 ,를 넣어주는 함수
export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, "");
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return "";
};

//query string 만들기
export const makeQueryString = (
  baseUrl: string,
  queuriesObject:Object & {[key:string]:any}
) => {
  const keys = Object.keys(queuriesObject);
  const value = Object.values(queuriesObject);
  if (keys.length === 0){
    return baseUrl;
  }
  let queryString = `${baseUrl}?`;
  keys.forEach((key,i)=>{
    if(queuriesObject[key]){
      queryString += `${keys[i]}=${value[i]}&`;
    }
  });

  //마지막 '$' 제거하기
  return queryString.slice(0,-1);
}
