import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import style from './media.module.css';

const Media = React.memo((props) => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState('');
  const [startSerch, setStartSerch] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');
  const [prevPageToken, setPrevPageToken] = useState('');
  const [currentPageToken, setCurrentPageToken] = useState('');
  useEffect(() => {
    const apiKey = 'AIzaSyC6livTWCMf7Ve_bUj61hvCClRsjz_jWvQ';
    if (startSerch) {
      axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${currentPageToken}&q=${search}&key=${apiKey}`
        )
        .then((data) => {
          setItems(data.data.items);
          setNextPageToken(data.data.nextPageToken);
          setPrevPageToken(data.data.prevPageToken);
          setStartSerch(false);
        });
    }
  }, [search, startSerch]);
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const _onReady = (event) => {
    event.target.pauseVideo();
  };
  if (!props.isAuth) {
    return <Navigate to={'/Login'} />;
  }
  return (
    <div>
      <div className='col-12 md:col-4'>
        <div>
          <form
            className='p-inputgroup'
            onSubmit={() => {
              setStartSerch(true);
            }}
          >
            <InputText
              placeholder='Enter name of video'
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
            <Button
              icon='pi pi-search'
              className='p-button-warning'
              onClick={() => {
                setStartSerch(true);
              }}
            />
          </form>
        </div>
      </div>

      <div className={style.content}>
        {items
          ? items.map((obj, key) => {
              return (
                <div className={style.videoBlock}>
                  <YouTube
                    key={key}
                    videoId={obj.id.videoId}
                    opts={opts}
                    onReady={_onReady}
                  />
                </div>
              );
            })
          : null}
      </div>
      <div>
        {prevPageToken ? (
          <span className={style.prevPageButton}>
            <Button
              label='Prev page'
              className='p-button-success'
              onClick={(e) => {
                setCurrentPageToken(prevPageToken);
                setStartSerch(true);
              }}
            />
          </span>
        ) : null}
        {nextPageToken || prevPageToken ? (
          <Button
            className={style.upButton}
            label='Page up'
            onClick={(e) => {
              window.scrollTo(0, 0);
            }}
          />
        ) : null}
        {nextPageToken ? (
          <span className={style.nextPageButton}>
            <Button
              label='Next page'
              className='p-button-success'
              onClick={(e) => {
                setCurrentPageToken(nextPageToken);
                setStartSerch(true);
              }}
            />
          </span>
        ) : null}
      </div>
      <div></div>
    </div>
  );
});

export default Media;
