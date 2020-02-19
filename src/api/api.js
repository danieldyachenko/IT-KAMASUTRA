import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: { "API-KEY": "6abc813c-9b11-4474-87c9-56c0f8b74242" }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(usersId) {
        return instance.post(`follow/${usersId}`, {});
    },
    unfollow(usersId) {
        return instance.delete(`follow/${usersId}`);
    },
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    }
}

