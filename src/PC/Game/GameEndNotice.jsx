export const GameEndNotice = (props) => {
  const gameSet = props.gameSet;
  const Game_EndCommenBox = props.Game_EndCommenBox;

  return (
    <>
      {gameSet === 2 && (
        <div className="Game_EndComment">
          <div className="Game_EndCommentBg"></div>

          <div className="Game_EndCommenBox" ref={Game_EndCommenBox}>
            <div> 3초 후에 엔딩으로 넘어갑니다.</div>
            <div> 랭킹 데이터 저장을 원하지 않을시</div>
            <div> 지금 메인화면으로 나가주세요</div>
          </div>
        </div>
      )}

      {gameSet === 3 && (
        <div className="Game_EndModalContainer">
          <div className="Game_EndModal"></div>
          <div className="Game_EndOverBox">
            <div> HP : 0</div>
            <div>[게임종료!]</div>
            3초 뒤에 대기실로 이동합니다.
          </div>
        </div>
      )}
    </>
  );
};
