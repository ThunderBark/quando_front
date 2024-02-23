import React from 'react';
import styles from './Navbar.module.css';
import { PathPattern, useLocation, useMatch, useMatches, useNavigate } from 'react-router-dom';
import routes from '../../routes';


// Функция для обработки лоадера при смене страницы
const closeDrawer = (button: HTMLButtonElement) => {
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
}


const PageButton = (
  props: {
    text: string,
    route: string,
    active: boolean
    onButtonPress: (e: React.MouseEvent) => void
  }
) => {

  return (
    <button
      id={ props.route }

      className={
        styles.button + ' ' +
        (props.active ? '' : styles.inactive)
      }

      onClick={props.onButtonPress}
    >
      {props.text}
    </button>
  )
}


const Navbar = (props: {
  isLoading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const getRoute = (): string => {
    const match = matches.find((value) => value.pathname.includes(location.pathname))
    if (match === undefined) {
      return '';
    }
    var route = match.pathname;
    Object.keys(match.params).forEach((key, index) => {
      route = route.replace(match.params[key]!, '');
    })
    return route;
  }

  const matches = useMatches();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = React.useState<string>(getRoute());



  React.useEffect(() => {
    if (!props.isLoading) {
      const list = document.getElementsByClassName(styles.button);
      // Возвращаем все кнопки
      for (var i = 0; i < list.length; i++) {
        list[i].classList.remove(styles.inactive);
      }
  
      // Открываем шторку
      document.getElementsByClassName(styles.container)[0].classList.remove(styles.expanded);
      document.body.classList.remove(styles.disable_scroll);
    }
  }, [props.isLoading]);

  React.useEffect(() => {
    document.body.classList.add(styles.disable_scroll);
  }, []);


  return (
    <nav className={styles.container + ' ' + styles.expanded}>
      {routes.map(
        (item) => <PageButton
          text={item.title}
          route={item.basepath}
          key={item.basepath}
          active={item.basepath === activeRoute}
          onButtonPress={(e: React.MouseEvent) => {
            // Выставляем статус что шторка открывается
            props.setLoading(true);
            setActiveRoute(item.basepath);
            // Закрываем шторку
            closeDrawer(e.target as HTMLButtonElement);
            // После окончания анимации переключаем страницу
            setTimeout(() => {
              navigate(item.basepath);
            }, 500);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;