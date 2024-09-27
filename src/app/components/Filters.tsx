export default function Filters() {
    return (
      <div className="centerblock__filter filter">
        <div className="filter__title">Искать по:</div>
        <button className="filter__button button-author _btn-text">исполнителю</button>
        <button className="filter__button button-year _btn-text">году выпуска</button>
        <button className="filter__button button-genre _btn-text">жанру</button>
      </div>
    );
  }
  