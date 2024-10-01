import axios from 'axios';

const apiClient = ({ query, variables }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://api.github.com/graphql',
        { query, variables },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
          },
        }
      )
      .then(response => {
        resolve(response.data.data);
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export default apiClient;
