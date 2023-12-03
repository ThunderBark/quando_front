import React from 'react';
import styles from './Navbar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';


const onRouteChange = (button: HTMLButtonElement | null, id: string | null) => {
  const list = document.getElementsByClassName(styles.button);
  for (var i = 0; i < list.length; i++) {
    if ((list[i] === button) || (list[i].id === id && button === null)) {
      list[i].classList.remove(styles.inactive);
    }
    else if ((list[i] !== button) || (button === null)) {
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
        onRouteChange(e.target as HTMLButtonElement, location.pathname);

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
    onRouteChange(null, location.pathname);
  });

  return (
    <nav className={styles.container + ' ' + styles.expanded}>
      <RouteButton text='ОБО МНЕ' route='/'/>
      {/* <RouteButton text='ТУРИКИ' route='/tournaments'/> */}
    </nav>
  );
};

export default Navbar;