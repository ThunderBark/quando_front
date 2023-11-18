import React from 'react';
import styles from './Profile.module.css';
import avatar from './avatar.jpeg';
import { SocialIcon } from 'react-social-icons';

export function Profile() {
  return (
    <main className={styles.container}>
    <img className={styles.avatar.concat(' ', styles.center)} src={avatar} alt='Аватар'></img>
      <h1 className={styles.center}>ThunderBark</h1>
      <p className={styles.center}>
        Программирую, ковыряю игры мб еще и стримлю
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
      </div>
      <hr/>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </main>
  )
}