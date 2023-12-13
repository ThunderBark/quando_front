import { memo } from 'react';
import styles from './RotatingStars.module.css'


export const RotatingStars = memo(() => {
  const number_of_stars = 300;

  const random_number = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={styles.wrapper}>
      {
        Array.from(Array(number_of_stars)).map(() => (
            <div className={styles.star} style={
              {
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                width: Math.random() * 0.3 + 'em',
                animationName: random_number(0, 2) == 1 ? styles.move_left : styles.move_right + ',' + styles.fade,
                animationDuration: random_number(6, 16) + 's,' + random_number(3, 9) + 's'
              } as React.CSSProperties
            }/>
          )
        )
      }
    </div>
  )
});