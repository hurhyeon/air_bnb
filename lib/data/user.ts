import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

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

// 유저 리스트 저장

const write = async (users: StoredUserType[]) => {
    writeFileSync("data/user.json", JSON.stringify(users));
};

export default {getList,exist,write};