import axios from 'axios';

export async function fetchPost(page){
    const respone = await axios.get(`/rest/PostAPI/?page=${page}`)
    return respone;
}

export async function fetchPostDetail(id){
    const response = await axios.get(`/rest/PostAPI/${id}`)
    return response;
}