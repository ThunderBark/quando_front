import React from 'react';
import styles from './Apod.module.css';
import { Gallery } from './gallery/Gallery';
import { ApodEntry } from './gallery/GalleryAPI';


type ApodState = {
  status: "idle" | "loading",
  selectedDate: Date,
  selectedApod: ApodEntry | undefined,
}

export function Apod(props: { date: Date } = {
  date: new Date(),
}) {
  const [status, setStatus] = React.useState<'idle' | 'loading'>('loading');
  const [selectedDate, setSelectedDate] = React.useState(props.date);
  const [selectedApod, setSelectedApod] = React.useState({} as ApodEntry);


  // TODO: Починить стили страницы, как-то
  // TODO: Выставлять раут в соответствии с выбранной датой

  // Колбэк для галереи для изменения текущего отображаемого APOD
  const changeApod = React.useCallback((apod: ApodEntry, date: Date) => {
    setSelectedDate(date);
    setSelectedApod(apod);
  }, [])

  // TODO: Добавить лоадер
  return (
    <div className={styles.wrapper}>
      {selectedApod?.media_type === "image" && (
        <div className={styles.imgWrapper}>
            <img
              className={styles.image}
              src={selectedApod.url}
              alt={selectedApod.title}
              onClick={() => {window.open(selectedApod?.hdurl)}}
            />
            <a
              className={styles.descrLink}
              href={selectedApod.hdurl}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.content}>
                <div className={styles.title}>
                  <h2>{selectedApod.title}</h2>
                  <p>By {selectedApod.copyright}, {selectedApod.date}</p>
                </div>
                <div className={styles.description}>
                  {selectedApod.explanation}
                </div>
              </div>
            </a>
        </div>
      )}
      {selectedApod?.media_type === "video" && (
        <div className={styles.videoWrapper}>
          <iframe
            width="100%"
            height="100%"
            src={selectedApod.url}
            allowFullScreen
            title={selectedApod.title}
          >
            video
          </iframe>
          <div className={styles.videoContent}>
            <h2>{selectedApod.title}</h2>
            <p>
              By {selectedApod.copyright}, {selectedApod.date}
            </p>
            <div>{selectedApod.explanation}</div>
          </div>
        </div>
      )}

      <hr className={styles.hr} />

      <Gallery
        selectedDate={selectedDate}
        onApodChange={changeApod}
      />
    </div>
  )
}
