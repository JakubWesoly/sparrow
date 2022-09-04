import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSpring, animated } from 'react-spring';

const Modal = (props) => {
  const { isShown, isShownHandler } = props;

  useEffect(() => {
    if (
      document.querySelector('.home-main') &&
      document.querySelector('.home-right-main')
    ) {
      document.querySelector('.home-main').style.zIndex = isShown
        ? -1
        : 'inherit';
      document.querySelector('.home-right-main').style.zIndex = isShown
        ? -1
        : 'inherit';
    }
  }, [isShown]);

  return (
    isShown && (
      <>
        <div className='modal'>
          <AiOutlineClose
            className='modal-close'
            onClick={() => isShownHandler(false)}
          />
          <div className='modal-content'>{props.children}</div>
        </div>
        <div
          className='modal-background'
          onClick={() => isShownHandler(false)}
        />
      </>
    )
  );
};

export default Modal;
