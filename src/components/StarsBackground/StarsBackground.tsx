import React from 'react';
import { memo } from 'react';
import styles from './StarsBackground.module.css'


const getVec = (
  point1: {x: number, y: number},
  point2: {x: number, y: number}
): {x: number, y: number} => {

  return {
    x: point2.x - point1.x,
    y: point2.y - point1.y
  };
}

const vecLen = (
  vec: {x: number, y: number}
) => {
  return Math.sqrt(
    vec.x * vec.x + vec.y * vec.y
  );
}

const vecNorm = (
  vec: {x: number, y: number}
): {x: number, y: number} => {
  return {
    x: vec.x / vecLen({x: vec.x, y: vec.y}),
    y: vec.y / vecLen({x: vec.x, y: vec.y})
  };
}


const cubicBezier = (
  t: number,
  p1: number,
  p2: number,
  p3: number,
  p4: number
): number => {
  return Math.pow((1 - t), 3) * p1 +
  3 * Math.pow((1 - t), 2) * t * p2 + 
  3 * (1 - t) * t * t * p3 +
  Math.pow(t, 3) * p4;
}


export const StarsBackground = memo(() => {
  const dpi_x = document.getElementById('dpi')!.offsetWidth;
  const dpi_y = document.getElementById('dpi')!.offsetHeight;
  const width = screen.width / dpi_x;
  const height = screen.height / dpi_y;
  const starNumber: number = Math.round((height * width) * 5);

  var starData: Array<{
    startX: number,
    startY: number,
    startOffset: number
  }> = [];


  const drawStar = (
    ctx : CanvasRenderingContext2D,
    x : number,
    y : number,
    size : number,
    opacity : number,
  ) => {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  };


  const drawStars = (
    canvasId : string,
    w : number,
    h : number,
    density : number,
  ) => {
    const animationDuration = 5000;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx : CanvasRenderingContext2D = canvas.getContext('2d')!;
    const spaceSize = 1.3 *  Math.max(w, h);

  
    ctx.clearRect(0, 0, w, h);

    const t = ((new Date).getTime() % animationDuration) / animationDuration;

    starData.map((item) => {
      const offset_t = (((t + item.startOffset) * 100) % 100) / 100;
      const startPosVec = getVec(
        {x: w/2, y: h/2},
        {x: item.startX, y: item.startY}
      );
      const posVecLen = vecLen(startPosVec);
      const pathLen = spaceSize / 2 - posVecLen;
      const directionVec = vecNorm(startPosVec);
      const progress: number = cubicBezier(
        offset_t,
        0,
        0,
        0,
        1
      );

      drawStar(
        ctx,
        item.startX + progress * directionVec.x * pathLen,
        item.startY + progress * directionVec.y * pathLen,
        progress * (pathLen / (spaceSize / 2)) * 3,
        1
      );
      return 0;
    });
  };
  

  const draw = () => {
    drawStars(
      'starsCanvas',
      window.innerWidth,
      window.innerHeight,
      Math.min(dpi_x, dpi_y)
    );
  
    window.requestAnimationFrame(draw);
  };


  React.useEffect(() => {
    starData = [];
    Array.from(Array(starNumber)).map(() => {
      starData.push({
        startX: Math.random() * window.innerWidth,
        startY: Math.random() * window.innerHeight,
        startOffset: Math.random()
      })
    });

    draw();
  }, []);


  return (
    <div className={styles.wrapper}>
      {/* {Array.from(Array(starNumber)).map(() => {
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
      } */}
      <canvas 
        id='starsCanvas'
        style={{height: '100vh', width: '100vw'}}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  )
});