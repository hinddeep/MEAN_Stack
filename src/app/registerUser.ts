export class userRegister
{
    constructor(
        public email: string,
        public password: string,
        public confpassword: string,
        public subjects: string[],
        public subjects_selected: boolean[],
        public gender: string,
        public city: string[],
        public city_selected: string,
        public age: number){ }
}