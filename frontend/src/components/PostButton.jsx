import { useState } from 'react';
import Modal from './Modal';
import SendPost from './SendPost';
const PostButton = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <button
        className='button-primary home-nav-left-list-item-button'
        onClick={() => setIsShown(true)}
      >
        Post
      </button>
      <Modal isShown={isShown} isShownHandler={setIsShown}>
        <SendPost closeModal={setIsShown} />
      </Modal>
    </>
  );
};

export default PostButton;
