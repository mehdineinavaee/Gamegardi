import useSWR from "swr";
import style from "../styles/Comment.module.css";
import api from "../api.js";
import Comment from "./Comment";
import Rating from "@material-ui/lab/Rating";
import { useState,useEffect } from "react";

const fetcher = (url, props) =>
  fetch(url).then(async (res) => {
    const result = await res.json();
    props.loaded(result.result.count);
    return result;
  });

const Main = (props) => {
  const { data, error } = useSWR(
    api.gameComments + `?gameId=${props.gameId}&offset=${props.offset}`,
    (url) => fetcher(url, props)
  );
  if (error) return <div>مشکلی بوجود آمده.</div>;
  if (!data) return <div>بارگیری نظرات...</div>;

  const avgScore = data.result.gameAvgScores[0].averageScore;

  return (
    <>
      <div
        className={`${style.stats}
          ${avgScore && style.active} 
          `}
      >
        <div className={style.rate}>
          <div className={style.label}>امتیاز کلی</div>
          <div className={style.rateWrap}>
            <span className={style.scoreLabel}>
              {Math.floor(avgScore * 10) / 10}
            </span>
            <Rating
              precision={0.1}
              readOnly
              name="escaperoomScenarioScore"
              value={Number(avgScore)}
            />
          </div>
        </div>
        <div className={style.rate}>
          <div className={style.label}>معمای بازی</div>
          <div className={style.rateWrap}>
            <span className={style.scoreLabel}>
              {data.result.gameAvgScores[0].escaperoomAverageMysteryScore}
            </span>
            <Rating
              precision={0.1}
              readOnly
              name="escaperoomDecorationScore"
              value={
                avgScore &&
                Number(
                  data.result.gameAvgScores[0].escaperoomAverageMysteryScore
                )
              }
            />
          </div>
        </div>
        <div className={style.rate}>
          <div className={style.label}>سناریو</div>
          <div className={style.rateWrap}>
            <span className={style.scoreLabel}>
              {data.result.gameAvgScores[0].escaperoomAverageScenarioScore}
            </span>
            <Rating
              precision={0.1}
              readOnly
              name="escaperoomPersonnelBehaviorScore"
              value={
                avgScore &&
                Number(
                  data.result.gameAvgScores[0].escaperoomAverageScenarioScore
                )
              }
            />
          </div>
        </div>
        <div className={style.rate}>
          <div className={style.label}>دکور</div>
          <div className={style.rateWrap}>
            <span className={style.scoreLabel}>
              {data.result.gameAvgScores[0].escaperoomAverageDecorationScore}
            </span>
            <Rating
              precision={0.1}
              readOnly
              name="escaperoomMysteryScore"
              value={
                avgScore &&
                Number(
                  data.result.gameAvgScores[0].escaperoomAverageDecorationScore
                )
              }
            />
          </div>
        </div>
        <div className={style.rate}>
          <div className={style.label}>برخورد پرسنل</div>
          <div className={style.rateWrap}>
            <span className={style.scoreLabel}>
              {
                data.result.gameAvgScores[0]
                  .escaperoomAveragePersonnelBehaviorScore
              }
            </span>
            <Rating
              precision={0.1}
              readOnly
              name="escaperoomMysteryScore"
              value={
                avgScore &&
                data.result.gameAvgScores[0]
                  .escaperoomAveragePersonnelBehaviorScore
              }
            />
          </div>
        </div>
      </div>
      {data.result.comments.map((comment) => (
        <Comment data={comment} />
      ))}
    </>
  );
};
export default Main;
