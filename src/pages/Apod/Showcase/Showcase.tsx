import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ApodEntry } from "../ApodAPI";
import styles from './Showcase.module.css';
import { point2d } from "../../../utils/utils";


// Хук для отслеживания изменения экрана
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export const Showcase = (props: {
  apod: ApodEntry
  onClick?: React.MouseEventHandler<HTMLImageElement>
}) => {
  const imageId = 'ShowcaseImageId'
  const [apod, setApod] = useState(props.apod);
  const [fade_timer, setTimer] = useState(0);
  const [imgCalculatedSize, setImgCalculatedSize] = useState<point2d>({x: 0, y: 0});
  const [imgCenter, setImgCenter] = useState<point2d>({x: 0, y: 0});

  const [width, height] = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);

  // Подключаем колбэк при загрузке картинки
  useEffect(() => {
    document.getElementById(imageId)?.addEventListener('load', imageLoaded)
    return () => {document.getElementById(imageId)?.removeEventListener('load', imageLoaded)}
  });

  // Обработка затенения картинки при переключении
  useEffect(() => {
    clearTimeout(fade_timer);

    containerRef.current?.classList.remove(styles.visible);
    setTimer(setTimeout(() => {
      setApod(props.apod);
      imageLoaded()
      containerRef.current?.classList.add(styles.visible);
    }, 300));

    return () => {clearTimeout(fade_timer)}
  }, [props.apod]);

  // Обновляем положение инфы о картинке при изменении viewport
  useEffect(() => {
    imageLoaded();
  }, [width, height])

  // Изменение положения и размера окна с описанием картинки при загрузке новой картинки
  const imageLoaded = () => {
    const image: HTMLImageElement = document.getElementById(imageId)! as HTMLImageElement
    const imageNaturalRatio = image.naturalWidth / image.naturalHeight
    const imageClientRatio = image.clientWidth / image.clientHeight

    var newImgCalculatedSize: point2d = {x: 0, y: 0}
    var newImgCenter: point2d = {x: 0, y: 0}

    if (imageNaturalRatio < imageClientRatio) {
      newImgCalculatedSize.x = image.clientHeight * imageNaturalRatio;
      newImgCalculatedSize.y = image.clientHeight;
    }
    else {
      newImgCalculatedSize.x = image.clientWidth;
      newImgCalculatedSize.y = image.clientWidth / imageNaturalRatio;
    }

    newImgCenter.x = (image.clientWidth - newImgCalculatedSize.x) / 2;
    newImgCenter.y = (image.clientHeight - newImgCalculatedSize.y) / 2;

    setImgCalculatedSize(newImgCalculatedSize)
    setImgCenter(newImgCenter)
  }


  return (
    <div ref={containerRef} className={styles.container}>
      <img
        id={imageId}
        className={styles.image + ' ' + styles.visible}
        src={apod.url}
        title={apod.title}
        alt={apod.title}
        onClick={props.onClick}
      />
      <a
        className={styles.link}
        href={apod.hdurl}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={styles.content}
          style={{
            width: imgCalculatedSize.x + 'px',
            height: imgCalculatedSize.y + 'px',
            left: String(imgCenter.x + 10) + 'px',
            top: String(imgCenter.y + 10) + 'px',
          }}
        >
          <div className={styles.title}>
            <h2>{apod.title}</h2>
            <p>By {apod.copyright}, {apod.date}</p>
          </div>
          <div className={styles.description}>
            {apod.explanation}
          </div>
        </div>
      </a>
    </div>
  )
}