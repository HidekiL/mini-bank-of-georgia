export interface User {
    name: string;
    user: string;
    password: {
        password1: string,
        password2: string,
    };
}

export interface UserFiltered {
    name: string;
    username: string;
    password: string;
}
