import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";
import { useTranslation } from 'react-i18next';

const items = [
  {
    title: "中文",
    language: 'zh'
  },
  {
    title: "English",
    language: 'en'
  },
];

const Notification = ({ className }) => {
  const [visible, setVisible] = useState(false);

  const { i18n } = useTranslation();

  const switchLanguage = function(language){
    i18n.changeLanguage(language.language)
    localStorage.chair_language = language.language;
    setVisible(!visible);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.notification, className)}>
        <button
          className={cn(styles.head)}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="globe" size="24" />
        </button>
        {visible && (
          <div className={styles.body}>
            <div className={cn("h4", styles.title)}>{React.translate('headerLanguage')}</div>
            <div className={styles.list}>
              {items.map((x, index) => (
                <Link
                  className={styles.item}
                  onClick={() => switchLanguage(x)}
                  key={index}
                >
                  {/* <div className={styles.preview}>
                    <img src={x.image} alt="Notification" />
                  </div> */}
                  <div className={styles.details}>
                    <div className={styles.subtitle}>{x.title}</div>
                    {/* <div className={styles.price}>{x.price}</div>
                    <div className={styles.date}>{x.date}</div> */}
                  </div>
                  {/* <div
                    className={styles.status}
                    style={{ backgroundColor: x.color }}
                  ></div> */}
                </Link>
              ))}
            </div>
            {/* <Link
              className={cn("button-small", styles.button)}
              to="/activity"
              onClick={() => setVisible(!visible)}
            >
              See all
            </Link> */}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
