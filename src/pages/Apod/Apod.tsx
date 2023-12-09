import React from 'react';
import styles from './Apod.module.css';
import { Gallery } from './gallery/Gallery';
import { ApodEntry } from './gallery/GalleryAPI';
import { useNavigate, useParams } from 'react-router-dom';


export function IsApodDateValid(date: string | undefined): (string | 'invalid') {
  if (date === undefined) {
    return 'invalid';
  }

  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return 'invalid';
  }

  return date;
}


type ApodState = {
  status: "idle" | "loading",
  selectedDate: Date,
  selectedApod: ApodEntry | undefined,
}


export function Apod() {
  const params = useParams<{date: string}>();
  const navigate = useNavigate();

  const [status, setStatus] = React.useState<'idle' | 'loading'>('loading');
  const [selectedDate, setSelectedDate] = React.useState(new Date(params.date!));
  const [selectedApod, setSelectedApod] = React.useState({} as ApodEntry);

  // TODO: Починить стили страницы, как-то

  // Колбэк для галереи для изменения текущего отображаемого APOD
  const changeApod = React.useCallback((apod: ApodEntry, date: Date) => {
    if (!apod.copyright) {
      apod.copyright = 'NASA';
    }
    
    setSelectedDate(date);
    setSelectedApod(apod);

    navigate('/apod/' + date.toISOString().substring(0, 10));
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
            onClick={() => {window.open(selectedApod.hdurl)}}
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
