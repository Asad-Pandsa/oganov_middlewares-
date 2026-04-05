export const authMiddleware = (store) => (next) => (action) => {
    if (action.type === 'auth/register'){
        console.log("register", action.payload);

        localStorage.setItem('user', JSON.stringify(action.payload));

    }

    if (action.type === 'auth/login'){
        const savedUser = JSON.parse(localStorage.getItem('user'));
    }

    if(!savedUser || savedUser.email !== action.payload.email){
        alert("пользователь найден")
        return;
    }

    console.log("успешный вход");

    return next(action);
}