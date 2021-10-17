import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import Web3 from '../../Web3';
import PubSub from 'pubsub-js'

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
  },
  // {
  //   title: "My items",
  //   icon: "image",
  //   url: "/item",
  // },
  {
    title: "Dark theme",
    icon: "bulb",
  },
  // {
  //   title: "Disconnect",
  //   icon: "exit",
  //   url: "https://ui8.net/ui8/products/crypter-nft-marketplace-ui-kit",
  // },
];

const User = ({ className }) => {
  const [logined, setLogined] = useState(window.chair_login);
  const [balance, setBalance] = useState(window.chair_balance);
  const [address, setAddress] = useState(window.chair_address);
  const [visible, setVisible] = useState(false);

  const Login = async () => {
    const loginresult = await Web3.connectWallet();
    window.chair_address = loginresult.address;
    window.chair_login = loginresult.connectedStatus;
    window.chair_balance = (loginresult.balance / 1e18).toFixed(4);
    setLogined(window.chair_login);
    setBalance(window.chair_balance);
    setAddress(window.chair_address);
  }

  const cutAddress = (value) => {
    if (!value) return ''
		let len = value.length;
		if (value.length > 21) {
			return value.substring(0,14) + '...' + value.substring(len - 4,len)
		}
		return value
	}

  useEffect(() => {
    Login();
    PubSub.subscribe('newLogin',(name,msg) => {
      Login();
    })
  }, [])

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={async () => {
            if(window.chair_login){
              setVisible(!visible);
            }else{
              Login();
              setVisible(!visible);
            }
          }}>
          <div className={styles.avatar}>
            <img src="/chair/common/defaultavatar.svg" alt="Avatar" />
          </div>
          {
            logined ?
            <div className={styles.wallet}>
              {balance} <span className={styles.currency}>MATIC</span>
            </div>
            : <></>
          }
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>{React.translate('accountWalletAddress')}</div>
            <div className={styles.code}>
              <div className={styles.number}>{cutAddress(address)}</div>
              <button className={styles.copy}>
                <Icon name="copy" size="16" />
              </button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/chair/common/defaultavatar.svg"
                    alt="Etherium"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>{React.translate('accountWalletBalance')}</div>
                  <div className={styles.price}>{balance} MATIC</div>
                </div>
              </div>
              {/* <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Manage fun on Coinbase
              </button> */}
            </div>
            <div className={styles.menu}>
              {items.map((x, index) =>
                x.url ? (
                  x.url.startsWith("http") ? (
                    <a
                      className={styles.item}
                      href={x.url}
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </a>
                  ) : (
                    <Link
                      className={styles.item}
                      to={x.url}
                      onClick={() => setVisible(!visible)}
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{React.translate('headerAccount')}</div>
                    </Link>
                  )
                ) : (
                  <div className={styles.item} key={index}>
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{React.translate('headerDarkTheme')}</div>
                    <Theme className={styles.theme} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;
