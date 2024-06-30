AWS CDK によりインフラを自動生成します。

`.env` ファイルを作成し、以下の情報を設定します。ホストゾーンにドメインを設定済みである前提です。

- `APPLICATION_ID`: 楽天ウェブサービスのアプリ ID
- `HOSTED_ZONE_ID`: Route 53 に登録したドメインのホストゾーン ID
- `ZONE_NAME`: Route 53 に登録したドメインのホストゾーン名
- `API_SUBDOMAIN`: API のサブドメイン名
- `BUCKET_SUBDOMAIN`: 静的サイトをホストする S3 のサブドメイン
- `DISTRIBUTION_REFERER`: S3 を参照できるクライアント（CloudFront）を制限するための REFERER ヘッダの値

リポジトリのルートで、以下のコマンドを実行してインフラを作成します。

```
npm run deploy:all -w cdk
```

サイトの更新時は、リポジトリのルートで以下のコマンドを実行します。

```
npm run build -w app
npm run deploy -w cdk
```
