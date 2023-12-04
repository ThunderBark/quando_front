import React from 'react';
import styles from './Navbar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';


// Функция для обработки лоадера при смене страницы
const onRouteChange = (button: HTMLButtonElement | null) => {
  const list = document.getElementsByClassName(styles.button);
  for (var i = 0; i < list.length; i++) {
    if (list[i] === button) {
      list[i].classList.remove(styles.inactive);
    }
    else {
      list[i].classList.add(styles.inactive);
    }
  }

  document.getElementsByClassName(styles.container)[0].classList.add(styles.expanded);
  document.body.classList.add(styles.disable_scroll);

  setTimeout(() => {
    for (var i = 0; i < list.length; i++) {
      if (list[i] !== button) {
        list[i].classList.remove(styles.inactive);
      }
    }

    document.getElementsByClassName(styles.container)[0].classList.remove(styles.expanded);
    document.body.classList.remove(styles.disable_scroll);
  }, 1500);
}


type RouteButtonProps = {
  text: string,
  route: string,
};

function RouteButton(props: RouteButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      id={props.route}
      className={styles.button + ' ' + ((location.pathname !== props.route) ? styles.inactive : '')}
      onClick={(e: React.MouseEvent) => {
        onRouteChange(e.target as HTMLButtonElement);
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
  const location = useLocation();

  React.useEffect(() => {
    // Пытаемся прокрутиться вверх, если пользователь не находится вверху
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })

    // Находим подходящую кнопку-заглавье для текущей страницы
    const list = document.getElementsByClassName(styles.button);
    var button: HTMLButtonElement | null = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === location.pathname) {
        button = list[i] as HTMLButtonElement;
        break;
      }
    }

    onRouteChange(button);
  });

  return (
    <nav className={styles.container + ' ' + styles.expanded}>
      <RouteButton text='ОБО МНЕ' route='/'/>
      {/* <RouteButton text='ТУРИКИ' route='/tournaments'/> */}
    </nav>
  );
};

export default Navbar;