import axios from 'axios';
export const fetchPhoto = async(query, page = 1)=>{
    try {
    const response = await axios.get(`https://pixabay.com/api/?key=33899578-833a0699edaa5282298dabcf2&q=${query}&image_type="photo"&orientation="horizontal"&safesearch="true"&page=${page}&per_page=40`)
    return response.data;
      } catch (error) {
        console.log(error);
      }
    }
