import axios from 'axios';
import { useCurrentUser } from './current-user.hook';
import { useDataSource } from './data-source.hook';
import { useResource } from './resource.hook';
import { useUser } from './user.hook';

const fetchFromServer = (resourceUrl) => async () => {
  const response = await axios.get(resourceUrl);
  return response.data;
};

const getDataFromLocaleStorage = (key) => () => {
  return localStorage.getItem(key);
};

export const UserInfo = ({ userId }) => {
  // const user = useResource("/users/2");
  const user = useDataSource(fetchFromServer(`/users/${userId}`));
  const message = useDataSource(getDataFromLocaleStorage("msg"));

  const { name, age, country, books } = user || {};
  return user ? (
    <>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
