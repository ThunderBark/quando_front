import React from 'react';
import styles from './Apod.module.css';
import { Gallery } from './Gallery/Gallery';
import { ApodEntry, ApodResponse } from './ApodAPI';
import { LoaderFunctionArgs, redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getApodForMonth } from './ApodActions';
import routes from '../../routes';
import { StarsBackground } from '../../components/StarsBackground/StarsBackground';


function IsApodDateValid(date: string | undefined): string | 'invalid' {
  if (date === undefined) {
    return 'invalid';
  }

  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return 'invalid';
  }

  if (isNaN(Date.parse(date))) {
    return 'invalid';
  }

  const request = new Date(date).getTime();
  const today = new Date().getTime();
  const begin = new Date("1995-06-16").getTime();
  if (request < begin || request > today) {
    return 'invalid';
  }

  return date;
}


const getBasePath = () => {
  return routes.find((item) => item.title === 'APOD')?.basepath;
}


export const ApodLoader = (url: LoaderFunctionArgs<any>) => {
  if (!url.params.hasOwnProperty('date') || url.params.date === undefined) {
    return redirect(getBasePath() + new Date().toISOString().substring(0, 10)
    );
  }

  const apodDateString = IsApodDateValid(url.params.date);
  if (apodDateString === 'invalid') {
    return redirect('/404');
  }

  return new Date(apodDateString);
}


export function Apod() {
  const params = useParams<{date: string}>();
  const navigate = useNavigate();
  const location = useLocation();

  // const [status, setStatus] = React.useState<'idle' | 'loading'>('loading');
  const [apodArray, setApodArray] = React.useState(new Array<ApodEntry>());
  const [selectedDate, setSelectedDate] = React.useState(new Date("1970-01-01"));
  const [selectedApod, setSelectedApod] = React.useState({} as ApodEntry);


  React.useEffect(() => {
    const newDate = new Date(params.date!);

    // Если дата прошлого запроса данных входила в тот же месяц, значит данные у нас есть
    if (
      selectedDate.getFullYear() === newDate.getFullYear() &&
      selectedDate.getMonth() === newDate.getMonth()
    ) {
      const apod = apodArray.find(
        (item) => (new Date(item.date).toDateString() === newDate.toDateString())
      ) || apodArray[apodArray.length - 1];

      setSelectedApod(apod);
      setSelectedDate(newDate);
      return;
    }

    // Если дошли сюда, то данных нет - надо запрашивать
    getApodForMonth(
      newDate.getMonth(),
      newDate.getFullYear(),
    )
    .then((value: ApodResponse) => {
      // Пытаемся найти APOD за запрошенную дату
      const apod = value.find(
        (item) => (new Date(item.date).toDateString() === newDate.toDateString())
      ) ||
      // Или просто выдаем последний элемент
      value[value.length - 1];

      // Выставляем актуальную дату и сохраняем массив картинок
      setApodArray(value);
      setSelectedApod(apod);
      setSelectedDate(newDate);
    });
  }, [location]);

  // Колбэк для галереи для изменения текущего отображаемого APOD
  const changeApod = React.useCallback((date: Date) => {
    navigate(getBasePath() + date.toISOString().substring(0, 10));
  }, []);

  const loadMonthYear = React.useCallback((month: number, year: number) => {
    // Обновляем галерею
    getApodForMonth(
      month,
      year,
    )
    .then((value: ApodResponse) => {
      const newDate = new Date(selectedDate);
      newDate.setMonth(month);
      newDate.setFullYear(year);
      setSelectedDate(newDate);

      // Сохраняем массив картинок
      setApodArray(value);
    });
  }, []);

  // TODO: Как-то не раскрывать шторку если не загрузиласть страница
  // TODO: Навести красоту в стилях
  // XXX?: Добавить лоадер
  return (
    <div className={styles.wrapper}>
      <StarsBackground/>
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
        galleryArray={apodArray}
        onApodChange={changeApod}
        onYearMonthChange={loadMonthYear}
      />
    </div>
  )
}
