export default function Player() {
    return (
      <div className="bar">
        <div className="bar__content">
          <div className="bar__player-progress"></div>
          <div className="bar__player-block">
            <div className="bar__player player">
              {/* Контролы плеера */}
              <div className="player__controls">
                <div className="player__btn-prev">
                  <svg className="player__btn-prev-svg">
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </div>
                <div className="player__btn-play _btn">
                  <svg className="player__btn-play-svg">
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
                {/* Другие контролы */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  