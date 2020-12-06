export interface User {
    userId: number;
    userName: string;
    userNick: string;
    userBday: string;
    userGender: string;
    userEmail: string;
    userPass: string;
    userPicture: string;
    userRole: string;
}
export class UserClass implements User {
    userId:number;
    userName:string;
    userNick:string;
    userBday:string;
    userGender:string;
    userEmail:string;
    userPass:string;
    userPicture:string;
    userRole:string;
}