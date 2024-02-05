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
  const starNumber: number = Math.round((dpi_x * dpi_y) / 4);

  var starData: Array<{
    startX: number,
    startY: number,
    startOffset: number,
    pathDir: {x: number, y: number},
    pathLen: number
  }> = [];


  const drawStar = (
    ctx : CanvasRenderingContext2D,
    x : number,
    y : number,
    size : number,
    opacity : number,
  ) => {
    ctx.fillStyle = 'rgb(' + opacity * 255 + ', ' + opacity * 255 + ', ' + opacity * 255 + ')';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  };


  const drawStars = (
    canvasId : string,
    w : number,
    h : number,
  ) => {
    const animationDuration = 20000;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx : CanvasRenderingContext2D = canvas.getContext('2d', { alpha: false })!;
    const spaceSize = 1.3 *  Math.max(w, h);

  
    ctx.clearRect(0, 0, w, h);

    const t = ((new Date).getTime() % animationDuration) / animationDuration;

    starData.map((item) => {
      const offset_t = (((t + item.startOffset) * 1000) % 1000) / 1000;

      // В конце каждого цикла анимации двигаем начальное положение звезды
      if (Math.floor(offset_t * 10000) === 0) {
        item.startX = Math.random() * w;
        item.startY = Math.random() * h;

        const startPosVec = getVec(
          {x: window.innerWidth / 2, y: window.innerHeight / 2},
          {x: item.startX, y: item.startY}
        );

        item.pathDir = vecNorm(startPosVec);
        item.pathLen = spaceSize / 2 - vecLen(startPosVec);
      }

      const pathProgress: number = cubicBezier(
        offset_t,
        0.0,
        0.0,
        0.0,
        1
      );
      const closenessCoef = item.pathLen / (spaceSize / 2);
      const sizeProgress: number = cubicBezier(
        offset_t,
        closenessCoef * 0.1,
        closenessCoef * 0.3,
        closenessCoef * 0.5,
        closenessCoef
      );

      drawStar(
        ctx,
        item.startX + pathProgress * item.pathDir.x * item.pathLen,
        item.startY + pathProgress * item.pathDir.y * item.pathLen,
        sizeProgress * 5,
        sizeProgress
      );
      return 0;
    });
  };
  

  const draw = () => {
    drawStars(
      'starsCanvas',
      window.innerWidth,
      window.innerHeight,
    );

    window.requestAnimationFrame(draw);
  };


  React.useEffect(() => {
    starData = [];
    Array.from(Array(starNumber)).map(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const spaceSize = 1.3 *  Math.max(window.innerWidth, window.innerHeight);
      const startPosVec = getVec(
        {x: window.innerWidth / 2, y: window.innerHeight / 2},
        {x: x, y: y}
      );

      starData.push({
        startX: x,
        startY: y,
        startOffset: Math.random(),
        pathDir: vecNorm(startPosVec),
        pathLen: spaceSize / 2 - vecLen(startPosVec),
      })
    });

    draw();
  }, []);


  return (
    <div className={styles.wrapper}>
      <canvas 
        id='starsCanvas'
        style={{height: '100vh', width: '100vw'}}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  )
});