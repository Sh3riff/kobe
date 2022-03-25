import axios from 'axios';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useAppContext} from '../../App';

const baseUrl = 'https://kobe-server.herokuapp.com';

export const useGetUser = () => {
  const {
    user: {email, displayName, photoURL},
  } = useAppContext();

  const {isLoading, error, data} = useQuery('user', () =>
    axios.get(`${baseUrl}/user/${email}/${displayName}/${photoURL}`),
  );
  return {isLoading, error, data: data?.data};
};

export const useGetKobe = () => {
  const {isLoading, error, data} = useQuery('kobe', () =>
    axios.get(`${baseUrl}/kobe`),
  );
  return {isLoading, error, data: data?.data};
};

export const useCreateTask = () => {
  const {
    user: {email},
  } = useAppContext();
  const queryclient = useQueryClient();
  const {mutate} = useMutation(
    taskName => axios.post(`${baseUrl}/task`, {email, taskName}),
    {
      onSuccess: () => {
        queryclient.invalidateQueries('user');
        queryclient.invalidateQueries('kobe');
      },
    },
  );
  return {mutate};
};

export const useUpdateTask = () => {
  const {
    user: {email},
  } = useAppContext();
  const queryclient = useQueryClient();
  const {mutate} = useMutation(
    taskId => axios.put(`${baseUrl}/task`, {email, taskId}),
    {
      onSuccess: () => {
        queryclient.invalidateQueries('user');
        queryclient.invalidateQueries('kobe');
      },
    },
  );
  return {mutate};
};

export const gradeUser = n =>
  n + ['st', 'nd', 'rd'][(((((n < 0 ? -n : n) + 90) % 100) - 10) % 10) - 1] ||
  'th';
