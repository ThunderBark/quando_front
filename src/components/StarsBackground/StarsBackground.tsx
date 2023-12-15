import { memo } from 'react';
import styles from './StarsBackground.module.css'


export const StarsBackground = memo(() => {
  const dpi_x = document.getElementById('dpi')!.offsetWidth;
  const dpi_y = document.getElementById('dpi')!.offsetHeight;
  const width = screen.width / dpi_x;
  const height = screen.height / dpi_y;
  const starNumber: number = Math.round((height * width) * 2);


  return (
    <div className={styles.wrapper}>
      {Array.from(Array(starNumber)).map(() => {
          const starSize = Math.max(0.2, Math.random());
          const starSpeed = (1 / starSize) + (Math.random() - 0.5) / 4;

          return (<div className={styles.star} style={{
            left: Math.random() * 100 + '%',
            width: starSize * 0.3 + 'em',
            animationName: styles.move_up + ',' + styles.fade,
            animationTimingFunction: 'linear, ease',
            animationDirection: 'normal, alternate',
            animationDuration: starSpeed * 30 + 's,' + starSize * 20 + 's',
            animationDelay: -Math.random() * starSpeed * 30 + 's,' + -Math.random() * starSize * 20 + 's',
          } as React.CSSProperties}/>)
        })
      }
    </div>
  )
});