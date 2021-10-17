import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import dataFormatter from '../../../util/dataFormatter.js'
import api from '../../../api/index.js'
import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom'

// data
import { bids } from "../../mocks/bids";

const searchTypeOptions = ["All items", "Art", "Collectibles", "Chair INO", "Invitation", "Contest"];
const searchCurrencyOptions = ["All", "MATIC", "BNCH", "USDT", "XBNCH"];
const searchJumpOptions = [{
  value: 'auction',
  label: "headerAuction"
}, {
  value: 'limited',
  label: "headerLimited"
}]
const searchSortOptions = [{
  value: 'recommend',
  label: "limitedRecommend"
}, {
  value: 'recently',
  label: "limitedRecently"
}]
const searchStatusOptions = [{
  value: 'notended',
  label: "auctionNotEnded"
}, {
  value: 'ended',
  label: "auctionEnded"
}]

const Search = () => {
  const [showBids, setshowBids] = useState([])
  const [total, settotal] = useState(12)
  const [page, setpage] = useState(1)
  const [rows, setrows] = useState(12)
  const [type, settype] = useState(1)
  const [status, setstatus] = useState(searchStatusOptions[0].value)
  const [searchType, setsearchType] = useState(0)
  const [searchCurrency, setsearchCurrency] = useState(searchCurrencyOptions[0])
  const [searchSort, setsearchSort] = useState(searchSortOptions[0].value)
  const [searchJump, setsearchJump] = useState(searchJumpOptions[0].value)
  const history = useHistory();

  const changePage = function(page, pageSize){
    setpage(page);
    setrows(pageSize)
  }

  useEffect(() => {
    // todo Deaso: 最后一个参数时aid，貌似不需要
    api.marketAllHandle(page, rows, type, 1, 
      status,
      (searchType == 0 ? "" : searchType), 
      (searchCurrency == searchCurrencyOptions[0] ? "" : searchCurrency), 
      searchSort, "").then((result) => {
      console.log('getting search');
      console.log(result);
      settotal(result.total)
      setshowBids(dataFormatter.formatItemList(result.list));
    });
  }, [page, rows, type, status, searchType, searchCurrency, searchSort])

  useEffect(() => {
    if(searchJump == 'limited') history.replace('/sellsearch01');
  }, [searchJump])
  
  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>{React.translate('auctionTitle')}</div>
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
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form> */}
        </div>
        <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={React.translate(searchJumpOptions[0].label)}
              setValue={setsearchJump}
              options={(()=>{
                var arr = [];
                searchJumpOptions.map((item, index)=>{
                  arr.push({
                    value: item.value,
                    label: React.translate(item.label)
                  });
                })
                return arr;
              })()}
            />
          </div>
          <div className={styles.nav}>
            {searchTypeOptions.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: index === searchType,
                })}
                onClick={() => setsearchType(index)}
                key={index}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.filters}>
            {/* <div className={styles.range}>
              <div className={styles.label}>Price range</div>
              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "8px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#3772FF", "#E6E8EC"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#3772FF",
                      border: "4px solid #FCFCFD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-33px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontFamily: "Poppins",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        backgroundColor: "#141416",
                      }}
                    >
                      {values[0].toFixed(1)}
                    </div>
                  </div>
                )}
              />
              <div className={styles.scale}>
                <div className={styles.number}>0.01 ETH</div>
                <div className={styles.number}>10 ETH</div>
              </div>
            </div> */}
            <div className={styles.group}>
              <div className={styles.item}>
                <div className={styles.label}>{React.translate('limitedSort')}</div>
                <Dropdown
                  className={styles.dropdown}
                  value={React.translate(searchSortOptions[0].label)}
                  setValue={setsearchSort}
                  options={(()=>{
                    var arr = [];
                    searchSortOptions.map((item, index)=>{
                      arr.push({
                        value: item.value,
                        label: React.translate(item.label)
                      });
                    })
                    return arr;
                  })()}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>{React.translate('limitedCurrency')}</div>
                <Dropdown
                  className={styles.dropdown}
                  value={searchCurrency}
                  setValue={setsearchCurrency}
                  options={searchCurrencyOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>{React.translate('auctionStatus')}</div>
                <Dropdown
                  className={styles.dropdown}
                  value={React.translate(searchStatusOptions[0].label)}
                  setValue={setstatus}
                  options={(()=>{
                    var arr = [];
                    searchStatusOptions.map((item, index)=>{
                      arr.push({
                        value: item.value,
                        label: React.translate(item.label)
                      });
                    })
                    return arr;
                  })()}
                />
              </div>
              {/* <div className={styles.item}>
                <div className={styles.label}>Creator</div>
                <Dropdown
                  className={styles.dropdown}
                  value={creator}
                  setValue={setCreator}
                  options={creatorOptions}
                />
              </div> */}
            </div>
            {/* <div className={styles.reset}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div> */}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {showBids.map((x, index) => (
                <Card className={styles.card} item={x} key={index} type={type} />
              ))}
            </div>
            {/* <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Load more</span>
              </button>
            </div> */}
            <div className={styles.page}>
              <Pagination defaultPageSize={12} defaultCurrent={1} total={total} onChange={changePage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
