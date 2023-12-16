import React from 'react';
import styles from './Profile.module.css';
import { SocialIcon } from 'react-social-icons';
import { useLoading } from '../../App/App';

export function Profile() {
  const loadingCtx = useLoading();
  const [loadCnt, setLoadCnt] = React.useState(0);

  React.useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      loadingCtx.setLoading(false);
    }, 2000);

    // При заходе на страницу добавляем треугольники на фон
    document.body.classList.add('triangles');
    // При выходе со страницы убираем треугольники с фона
    return () => {
      clearTimeout(loadingTimeout);
      document.body.classList.remove('triangles');
    }
  });

  return (
    <main className={styles.container}>
      <div className={styles.about_container}>
        <img
          className={styles.avatar}
          src='/avatar.jpeg'
          alt='Аватар'
          onLoad={() => {setLoadCnt(loadCnt - 1)}}
          onLoadStart={() => {setLoadCnt(loadCnt + 1)}}
        />
        <div className={styles.description_container}>
          <h1>ThunderBark</h1>
          <p className={styles.description}>
            Программирую, ковыряю игры мб еще и стримлю. По кнопкам снизу можно посмотреть 
            все социалочки и еще ниже представлены мои проекты.
          </p>
          <div className={styles.socials}>
            <SocialIcon 
              url="https://www.youtube.com/channel/UC_U3_3kTMBkJCEylYyWwKjQ?sub_confirmation=1"
              className={styles.social_item}
              target='_blank'
            />
            <SocialIcon
              url="https://github.com/ThunderBark"
              className={styles.social_item}
              target='_blank'
            />
            <SocialIcon
              url="https://www.twitch.tv/thunderbark"
              className={styles.social_item}
              target='_blank'
            />
            <SocialIcon
              url="https://thunderbark.itch.io/"
              className={styles.social_item}
              target='_blank'
            />
          </div>
        </div>
      </div>
      
      <hr/>

      <h1 className={styles.header}>
        <a rel='noreferrer' target='_blank' href='https://thunderbark.itch.io/space-seekers'>
          SPACE SEEKERS
        </a>
      </h1>
      <article className={styles.project_container}>
        <div className={styles.text}>
          <p>
            Вы прибываете в свободный от грозовых туч анклав, 
            где можете видеть драгоценные Нуль-энтропийные кристаллы, 
            или, как их все называют, Кристаллы Пространства.
          </p>
          <p>
            Ваша миссия состоит в том, чтобы победить своего противника 
            в этом анклаве и установить монополию. Ваш корабль можно 
            отремонтировать на вырученные средства, но инвесторы не 
            собираются терпеть убытки, и ваша миссия будет завершена.
          </p>
          <p>
            Хорошая новость в том, что ваш противник такой же контрабандист, 
            как и вы, поэтому, если вы сделаете его миссию невыгодной, 
            ваша миссия будет успешной!
          </p>
        </div>
        <video controls className={styles.video}>
          <source src="/space_seekers_gameplay.mp4" type="video/mp4" />
          Sorry, your browser doesn't support videos.
        </video>
      </article>

      <h1 className={styles.header}>
        <a rel='noreferrer' target='_blank' href='https://thunderbark.github.io/good-nasa-apod/'>
          GOOD NASA APOD
        </a>
      </h1>
      <article className={styles.project_container}>
        {/* <iframe
          className={styles.preview}
          id="inlineFrameExample"
          title="Inline Frame Example"
          src="https://thunderbark.github.io/good-nasa-apod/"
        /> */}
        <div className={styles.text}>
          <p>
            Сайтик, в котором вы можете посмотреть картиночки и видосы,
            которые подбирают каждый день сами NASA.
          </p>  
          <p>
            Сайт позволяет 
            посмотреть текущий и предыдущие посты вплоть до начала этой
            программы NASA в 1996 году. 
          </p>
        </div>
      </article>
    </main>
  )
}