import axios from 'axios';

export const duplicateEmailApi = async (payload) => {
  try {
    await axios({
      method: 'POST',
      url: '/api/members/duplicate-email',
      payload,
    });
  } catch (err) {
    console.log('err', err);
  }
};
