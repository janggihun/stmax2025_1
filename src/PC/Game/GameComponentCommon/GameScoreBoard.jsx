export const GameScoreBoard = (props) => {
  const liveData = props.liveData;
  return (
    <div className="Game_ScoreBoard">
      <div className="Game_ScoreBoard_bg"></div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">STMAX 100 : </div>
        <div className="Game_ScoreBord_row_R sort">{liveData.stmax100}</div>
      </div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">STMAX 90 : </div>
        <div className="Game_ScoreBord_row_R sort">{liveData.stmax90}</div>
      </div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">STMAX 60 : </div>
        <div className="Game_ScoreBord_row_R sort">{liveData.stmax60}</div>
      </div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">STMAX 30 : </div>
        <div className="Game_ScoreBord_row_R sort">{liveData.stmax30}</div>
      </div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">STMAX 10 : </div>
        <div className="Game_ScoreBord_row_R sort">{liveData.stmax10}</div>
      </div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">STMAX 0 : </div>
        <div className="Game_ScoreBord_row_R sort">{liveData.stmax0}</div>
      </div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">maxCombo : </div>
        <div className="Game_ScoreBord_row_R sort">{liveData.maxCombo}</div>
      </div>
      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">Score : </div>
        <div className="Game_ScoreBord_row_R sort">{Math.floor(liveData.score)}</div>
      </div>

      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">한노트당 점수: </div>
        <div className="Game_ScoreBord_row_R sort">{Math.floor(liveData.singleNoteScore)}</div>
      </div>

      <div className="Game_ScoreBord_row">
        <div className="Game_ScoreBord_row_L sort">총노트 수 / 현재 노트 : </div>
        <div className="Game_ScoreBord_row_R sort">
          {liveData.noteCount} /
          {liveData.stmax100 +
            liveData.stmax90 +
            liveData.stmax60 +
            liveData.stmax30 +
            liveData.stmax10 +
            liveData.stmax0}
        </div>
      </div>
    </div>
  );
};
