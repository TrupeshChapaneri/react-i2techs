export const callApi = async ({
  url,
  method,
  postData = null,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  let fetchOptions = {
    method: method ? method : postData ? "POST" : "GET",
    headers: {
      Authorization: `Bearer 9c5fcbef2dc1a7c5da667398a6f8ab4eeb9638fc2dfa5ac8ad4f84c06eab6a6e`,
      "Content-Type": "application/json"
    },
  };

  if (postData) {
    fetchOptions["body"] = JSON.stringify(postData);
  }

  try {
    let data = await fetch(url, fetchOptions);

    data
      .json()
      .then((data) => {
        // console.log(data);
        onSuccess(data);
      })
      .catch((err) => {
        console.log(err);
        onFailure(err);
      });
  } catch (err) {
    console.log(err);
    onFailure(err);
  }
};
