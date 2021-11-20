import React from 'react'
import Lottie from 'react-lottie';
import style from 'styles/layout/loading.module.css'
import animationData from '../../../public/assets/loading/lottie-loading.json'

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return(
  
  <div className={style.base}>
    <div className={style.content}>
      <Lottie
          options={defaultOptions}
          height={200}
          width={200}
        />
    </div>
  </div>
)
}
export default Loading
