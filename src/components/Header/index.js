import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";

const nav = [
  {
    url: "/",
    title: 'headerHome',
  },
  {
    url: "/search01",
    title: 'headerAuction',
  },
  {
    url: "/sellsearch01",
    title: 'headerLimited',
  },
  {
    url: "/upload-details",
    title: 'headerCreate',
  },
  {
    url: "/profile",
    title: 'headerAccount',
  },
];

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/chair/common/logo.jpg"
            srcDark="/chair/common/logowhite.jpg"
            alt="Chair_img"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
                onClick={() => setVisibleNav(!visibleNav)}
              >
                {React.translate(x.title)}
              </Link>
            ))}
          </nav>
          {/* <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form> */}
          {/* <Link
            className={cn("button-small", styles.button)}
            to="/upload-variants"
          >
            Upload
          </Link> */}
        </div>
        <Notification className={styles.notification} />
        {/* <Link
          className={cn("button-small", styles.button)}
          to="/upload-variants"
        >
          Upload
        </Link> */}
        {/* <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet
        </Link> */}
        <User className={styles.user} />
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
