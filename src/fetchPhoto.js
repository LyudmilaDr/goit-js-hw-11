// export const fetchPhoto = async(query, page)=>{
//     return await fetch(`https://pixabay.com/api/?key=33899578-833a0699edaa5282298dabcf2&q=${query}&image_type="photo" &orientation="horizontal" &safesearch="true"&page=${page}&per_page=40`)
//     .then(async response => {
// if(!response.ok){
//     throw new Error(response.statusText);
// }
// return await response.json();
//     })
// };