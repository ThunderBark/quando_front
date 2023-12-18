import { useEffect, useRef, useState } from "react";
import { ApodEntry } from "../ApodAPI";
import styles from './Picture.module.css';


export const Picture = (props: {
  apod: ApodEntry
  onLoad?: React.ReactEventHandler<HTMLImageElement>
  onClick?: React.MouseEventHandler<HTMLImageElement>
}) => {
  const [apod, setApod] = useState(props.apod);
  const [timer, setTimer] = useState(0);

  const container = useRef<HTMLDivElement>(null);


  useEffect(() => {
    clearTimeout(timer);


    container.current?.classList.remove(styles.visible);
    setTimer(setTimeout(() => {
      setApod(props.apod);
      container.current?.classList.add(styles.visible);
    }, 300));


    return () => {clearTimeout(timer)}
  }, [props.apod]);


  return (
    <div ref={container} className={styles.container}>
      <img
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
        <div className={styles.content}>
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