const jwtTokenUserAuth = (token) => {
    // console.log('token ',token);
    if (token) {
        const { access, refresh } = token;
        // console.log('access_token ', access);
        // console.log('refresh_token ', refresh);
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    }
}


const getToken = () => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return {
        access_token,
        refresh_token
    };
}

const removeToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

export { jwtTokenUserAuth, getToken, removeToken }