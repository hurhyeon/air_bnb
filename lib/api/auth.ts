import axios from "axios";
import { UserType } from "../../types/user";

interface SingUpAPIbody{
    email: string;
    firstname:string;
    lastname:string;
    password:string;
    birthday:string;
}

export const signupAPI = ( body: SingUpAPIbody) =>
    axios.post<UserType>("/api/auth/signup",body);