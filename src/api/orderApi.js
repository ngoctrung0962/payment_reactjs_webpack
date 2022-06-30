import axiosClient from "./axiosClient"

const orderApi = {
    get(id_app, api_code, _id, token) {
        const url = `/${id_app}/${api_code}/${_id}?access_token=${token}`
        return axiosClient.get(url);
    },
}

export default orderApi;