import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search } from '../features/search/searchSlice';

import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = (props) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { result, isLoading, isSuccess, isError } = useSelector(
    (state) => state.search
  );

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(search(query));
  };

  useEffect(() => {
    if (
      !isError &&
      (result.users.length !== 0 || result.posts.length !== 0) &&
      !location.pathname.startsWith('/search/')
    ) {
      console.log(location.pathname);
      navigate(`/search/${query}`);
    }
  }, [result]);

  return (
    <form
      className={'search-bar ' + props.classes}
      onSubmit={(e) => handleSearch(e)}
    >
      <div className='search-icon'>
        <AiOutlineSearch />
      </div>
      <input
        type='text'
        placeholder='Szukaj'
        className='search-input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type='reset' className='search-reset'>
        <AiOutlineClose />
      </button>
    </form>
  );
};

export default SearchBar;
