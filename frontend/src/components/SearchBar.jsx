import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

const SearchBar = (props) => {
  return (
    <form className={'search-bar ' + props.classes}>
      <div className='search-icon'>
        <AiOutlineSearch />
      </div>
      <input type='text' placeholder='Szukaj' className='search-input' />
      <button type='reset' className='search-reset'>
        <AiOutlineClose />
      </button>
    </form>
  );
};

export default SearchBar;
