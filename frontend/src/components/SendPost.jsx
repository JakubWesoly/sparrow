import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createPost, reset } from '../features/posts/postsSlice';

const SendPost = (props) => {
  const dispatch = useDispatch();

  const toastLoading = useRef(null);

  const { isError, isLoading, isSuccess, posts, message } = useSelector(
    (state) => state.posts
  );

  const [content, setContent] = useState('');

  useEffect(() => {
    // if (isLoading) toastLoading.current = toast.loading('Ładowanie');
    // if (!isLoading) toast.dismiss(toastLoading.current);
    if (isError) toast.error(message);
    else if (isSuccess) {
      toast.success(message);
      if (props.closeModal) props.closeModal();
    }
    dispatch(reset());
  }, [dispatch, props, isError, isLoading, isSuccess, posts, message]);

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(createPost({ content }));
  };

  return (
    <form onSubmit={(e) => handleForm(e)} className='send-post'>
      <textarea
        placeholder='Co słychać?'
        className='send-post-input'
        maxLength='250'
        style={{ height: '225px' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className='button-primary send-post-button'>Wyślij</button>
    </form>
  );
};

export default SendPost;
