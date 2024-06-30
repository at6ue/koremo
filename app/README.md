アプリケーションを S3 で公開可能な静的サイトとして生成します。

`.env` ファイルの `NEXT_PUBLIC_SEARCH_API_URL` に利用する[楽天市場商品検索 API](https://webservice.rakuten.co.jp/documentation/ichiba-item-search) の URL を指定してください。
この URL はクライアントに公開されるので、[規約](https://webservice.rakuten.co.jp/guide/rule)における以下の要件を満たすには独自の API エンドポイントを中継する必要があります。

> デベロッパーは、アプリIDを他人に知られることがないよう責任をもって管理するものとします。

中継 API は [AWS CDK により生成](../cdk/README.md)できます。

アプリケーションを起動するには、リポジトリのルートで以下を実行します。

```
npm run dev -w app
```

または、本番と同じ静的サイトとして起動するには、以下を実行します。

```
npm run build -w app
npm run stage -w app
```
