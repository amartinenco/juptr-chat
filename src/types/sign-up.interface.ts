interface IRegisterCredentials {
    [key: string]: number | string | boolean | undefined;
    email: string,
    displayName: string,
    fullName: string,
    password: string,
    confirmPassword: string
}

export default IRegisterCredentials;