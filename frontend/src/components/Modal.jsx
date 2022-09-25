import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSpring, animated, config } from 'react-spring';

const Modal = (props) => {
  const { isShown, isShownHandler } = props;

  const modalAnimation = useSpring({
      config: { ...config.stiff },
      from: { opacity: 0, top: '-100%' },
      to: {
          opacity: isShown ? 1 : 0,
          top: isShown ? (window.innerWidth < 992 ? '0' : '10%') : '-100%',
      }
  });
  const backgroundAnimation = useSpring({
      config: { ...config.stiff },
      from: { opacity: 0, display: 'none' },
      to: {
          opacity: isShown ? 1 : 0,
          display: isShown ? 'block' : 'none'
      }
  });


  const modalRef = useRef();
  const backgroundRef = useRef();

  useEffect(() => { // Hide other elements when modal is shown
    if (
        document.querySelector('.home-nav-left') &&
      document.querySelector('.home-main') &&
      document.querySelector('.home-right-main')
    ) {
        if(!document.querySelector('.home-nav-left').contains(modalRef.current))
            document.querySelector('.home-nav-left').style.zIndex = isShown ? '-1' : 'inherit';
        if(!document.querySelector('.home-main').contains(modalRef.current))
            document.querySelector('.home-main').style.zIndex = isShown
        ? -1
        : 'inherit';
        if(!document.querySelector('.home-right-main').contains(modalRef.current))
            document.querySelector('.home-right-main').style.zIndex = isShown
        ? -1
        : 'inherit';
    }
  }, [isShown]);

  return (
      <>
        <animated.div style={{...modalAnimation}} className='modal' ref={modalRef}>

          <AiOutlineClose
            className='modal-close'
            onClick={() => isShownHandler(false)}
          />
          <div className='modal-content'>{props.children}</div>
        </animated.div>
        <animated.div
          className='modal-background'
          ref={backgroundRef}
            style={{...backgroundAnimation}}
          onClick={() => isShownHandler(false)}
        />
      </>
    )
};

export default Modal;
