import React from 'react';
import styles from './Navbar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../routes';


// Функция для обработки лоадера при смене страницы
const onPageChange = (button: HTMLButtonElement | null) => {
  // Пролистываем страницу вверх
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  // Выключаем все элементы, кроме нажатого
  const list = document.getElementsByClassName(styles.button);
  for (var i = 0; i < list.length; i++) {
    if (list[i] === button) {
      list[i].classList.remove(styles.inactive);
    }
    else {
      list[i].classList.add(styles.inactive);
    }
  }

  // Закрываем шторку
  document.getElementsByClassName(styles.container)[0].classList.add(styles.expanded);
  document.body.classList.add(styles.disable_scroll);

  // Через время...
  setTimeout(() => {
    // Возвращаем все кнопки
    for (var i = 0; i < list.length; i++) {
      if (list[i] !== button) {
        list[i].classList.remove(styles.inactive);
      }
    }

    // Открываем шторку
    document.getElementsByClassName(styles.container)[0].classList.remove(styles.expanded);
    document.body.classList.remove(styles.disable_scroll);
  }, 1500);
}


function PageButton(props: {text: string, route: string}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      id={props.route}
      className={styles.button + ' ' + ((location.pathname !== props.route) ? styles.inactive : '')}
      onClick={(e: React.MouseEvent) => {
        onPageChange(e.target as HTMLButtonElement);
        setTimeout(() => {
          navigate(props.route);
        }, 500);
      }
    }>
      {props.text}
    </button>
  )
}


function Navbar() {

  React.useEffect(() => {
    const curPage = ('/' + location.pathname.split('/')[1]);
    // Находим подходящую кнопку-заглавье для текущей страницы
    var button: HTMLButtonElement | null = null;
    const list = document.getElementsByClassName(styles.button);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === curPage) {
        button = list[i] as HTMLButtonElement;
        break;
      }
    }

    // Делаем анимацию смены страницы
    onPageChange(button);
  });

  return (
    <nav className={styles.container + ' ' + styles.expanded}>
      {routes.map(
        (item) => <PageButton
          text={item.title}
          route={item.basepath}
          key={item.basepath}
        />
      )}
    </nav>
  );
};

export default Navbar;