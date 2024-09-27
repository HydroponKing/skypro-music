export default function Playlist() {
    return (
      <div className="centerblock__content playlist-content">
        <div className="content__title playlist-title">
          <div className="playlist-title__col col01">Трек</div>
          <div className="playlist-title__col col02">Исполнитель</div>
          <div className="playlist-title__col col03">Альбом</div>
          <div className="playlist-title__col col04">
            <svg className="playlist-title__svg">
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className="content__playlist playlist">
          {/* Здесь добавьте список треков */}
          <div className="playlist__item">
            <div className="playlist__track track">
              <div className="track__title">
                <div className="track__title-image">
                  <svg className="track__title-svg">
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className="track__title-text">
                  <a className="track__title-link" href="http://">Guilt</a>
                </div>
              </div>
              <div className="track__author">
                <a className="track__author-link" href="http://">Nero</a>
              </div>
              <div className="track__album">
                <a className="track__album-link" href="http://">Welcome Reality</a>
              </div>
              <div className="track__time">
                <svg className="track__time-svg">
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className="track__time-text">4:44</span>
              </div>
            </div>
          </div>
          {/* Другие треки */}
        </div>
      </div>
    );
  }
  