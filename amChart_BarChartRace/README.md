# Bar Chart Race README.md

## Code Notes

## amCharts' Demo - Bar Chart Race
- [Demo.js](./Demo.js)
- https://www.amcharts.com/demos/bar-chart-race/

## Requested Changes
- Code Simplification:
  - [] Remove the Repeat function
  - [] Remove the Play / Stop Button function
- [ ] REST APIを叩いているのに、レコード一覧のイベントオブジェクトを利用してるところです。
- [] Use Kintone REST API for 
- Although code is using the Kintone REST API, code is still using the event object in the record list.
- [ ] 
ここはREST APIのレスポンスを利用してください。
Please use the REST API response here.
また、過去のワークショップではレコード一覧の絞り込みがグラフに影響があったので(例えば特定の大陸の国だけで絞るとか)、今回のREST APIの手法でも kintone.app.getQueryCondition() などを使用して、絞り込みがグラフに影響が出るようにお願いします。