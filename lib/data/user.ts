import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

//유저 리스트 데이터 불러오기
const getList = () => {
    const usersBuffer = readFileSync("data/user.json");
    const usersString = usersBuffer.toString();
    if(!usersString) {
        return [];
    }
    const users: StoredUserType[] = JSON.parse(usersString);
    return users;
};

// email의 유저가 있는지 확인
const exist =({ email}: {email:string}) => {
    const users = getList();
    return users.some((user) => user.email === email);
};

//email또는 id의 유저 불러오기
const find = ({email,id}: {email?: string; id?: number }) =>{
    const users = getList();
    return users.find((user) => user.email === email || user.id === id);
}

// 유저 리스트 저장
const write = async (users: StoredUserType[]) => {
    writeFileSync("data/user.json", JSON.stringify(users));
};



export default {getList,exist,write,find};