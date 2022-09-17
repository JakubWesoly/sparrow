import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserElement from './UserElement';
import Post from './Post';
import { useNavigate, useParams } from 'react-router-dom';
import { search } from '../features/search/searchSlice';
const SearchContent = () => {
  const { query } = useParams();

  const { result } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.users.length === 0 || result.posts.length === 0) {
      dispatch(search(query));
    }
  }, []);

  return (
    <div>
      {result.users.map((user) => (
        <UserElement user={user} />
      ))}
      <hr />
      {result.posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default SearchContent;
