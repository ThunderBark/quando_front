import React from 'react';
import styles from './Gallery.module.css';
import { ApodEntry, ApodResponse } from './GalleryAPI';
import { getApodForMonth } from './GalleryActions';


// Функция, которая сдвигает значение месяца в допускаемое значение
// в выбранном году
const ClampMonthByYear = (year: number, month: number) => {
  const today = new Date();
  const monthMin = (year === 1995) ? 5 : 0;
  const monthMax = (year === today.getFullYear()) ? today.getMonth() : 11;
  return Math.min(Math.max(month, monthMin), monthMax);
}

// Функция для получения массива доступных для скачивания 
// месяцов в выбранном году
const GetAvailableMonthsByYear = (year: number
): Array<{value: number, name: string}> => {
  // Массив всех возможных месяцов
  const monthArray = [
    {value: 0, name: "January"},
    {value: 1, name: "February"},
    {value: 2, name: "March"},
    {value: 3, name: "April"},
    {value: 4, name: "May"},
    {value: 5, name: "June"},
    {value: 6, name: "July"},
    {value: 7, name: "August"},
    {value: 8, name: "September"},
    {value: 9, name: "October"},
    {value: 10, name: "November"},
    {value: 11, name: "December"},
  ];

  const today = new Date();
  const monthMin = (year === 1995) ? 5 : 0;
  const monthMax = (year === today.getFullYear()) ? today.getMonth() : 11;

  return monthArray.filter((item, index) => (index <= monthMax && index >= monthMin));
}


export function Gallery(props: {
  selectedDate: Date,
  onApodChange: (apod: ApodEntry, date: Date) => void
}) {

  const [months, setMonths] = React.useState(
    GetAvailableMonthsByYear(props.selectedDate.getFullYear())
  );
  const [years, setYears] = React.useState(
    [...Array(new Date().getFullYear() - 1994).keys()].map((i) => ((i + 1995).toString()))
  );
  const [apodArray, setApodArray] = React.useState(new Array<ApodEntry>());
  const [selectedYear, setSelectedYear] = React.useState(props.selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState(props.selectedDate.getMonth());

  // Выполняется один раз при маунте элемента
  React.useEffect(() => {
    // Запрашиваем данные для текущей даты
    getApodForMonth(
      selectedMonth,
      selectedYear
    )
    .then((value: ApodResponse) => {
      // Сохраняем все картинки себе в состояние
      setApodArray(value);

      // Пытаемся найти APOD за запрошенную дату
      const apod = value.find(
        (item) => (new Date(item.date).toDateString() === props.selectedDate.toDateString())
      ) ||
      // Или просто выдаем последний элемент
      value[value.length - 1];

      // Передаем родителю Apod для отображения
      props.onApodChange(
        apod,
        new Date(apod.date)
      );
    })
  }, []);

  // Функция для обновления просматриваемого месяца
  const setMonth = (month: number) => {
    setSelectedMonth(month);

    // Запрашиваем данные для текущей даты
    getApodForMonth(
      month,
      selectedYear
    )
    .then((response: ApodResponse) => {
      // Сохраняем все картинки себе в состояние
      setApodArray(response);
    })
  }
  
  // Функция для обновления просматриваемого года
  const setYear = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(ClampMonthByYear(year, selectedMonth))
    setMonths(GetAvailableMonthsByYear(year));

    // Запрашиваем данные для текущей даты
    getApodForMonth(
      ClampMonthByYear(year, selectedMonth),
      year
    )
    .then((response: ApodResponse) => {
      // Сохраняем все картинки себе в состояние
      setApodArray(response);
    })
  }

  // TODO: Блокировать селекторы во время загрузки
  // TODO: Блокировать галлерею во время загрузки
  // FIXME: Не отображаются число на элементах галереи
  return (
    <div className={styles.gallery}>
      <div className={styles.selection}>
        <select
          value={selectedMonth}
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
          }}
        >
          Month
          {months.map((item, index) => 
            <option value={item.value} key={index}>
              {item.name}
            </option>
          )}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => {
            setYear(parseInt(e.target.value));
          }}
        >
          Year
          {years.map((item, index) =>
            <option value={item} key={index}>
              {item}
            </option>
          )}
        </select>
      </div>

      <hr className={styles.hr} />

      <div className={styles.grid}>
        {apodArray.map((item, index) =>
          <div 
            className={styles.item}
            key={index}
            title={item.title}
            onClick={() => {
              props.onApodChange(item, new Date(item.date));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              className={styles.itemImg}
              src={item.media_type === 'image' ? item.url : item.thumbnail_url}
              alt={item.title}
            />
            <div></div>
            {item.media_type === "video" && (
              <img
                className={styles.youtubeLogo}
                src='youtube_logo.png'
                alt="video logo"
              ></img>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
