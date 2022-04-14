const baseUrl = `https://gorest.co.in/public/v2`;

export const postList = () => `${baseUrl}/users/100/posts`;
export const addPost = () => `${baseUrl}/users/100/posts`;
export const getComments = (id) => `${baseUrl}/posts/${id}/comments`;
export const addComment = (id) => `${baseUrl}/posts/${id}/comments`;

// here Using Hard Coded Becuse I did't get it API doc.