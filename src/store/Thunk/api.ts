import axios from 'axios';
import { ILoginUser, ISignUpUser } from '../../types/types';

const url = 'http://localhost:4000/';

export const signIn = async (user: ILoginUser) => {
  const response = await axios.post(`${url}/signin`, { user }).then((res) => res);
  console.log(response);
};

export const signUp = async (user: ISignUpUser) => {
  const response = await axios
    .post(
      `${url}/signup`,
      { user },
      {
        headers: {
          Origin: '*',
          'content-type': 'application/json',
        },
      }
    )
    .then((res) => res);
  console.log(response);
};
