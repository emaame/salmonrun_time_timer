# Salmon Run Time Timer
A web-based countdown Timer for Salmon Run Time.

# Usage
[サーモンランタイム タイマー](https://emaame.github.io/salmonrun_time_timer/) にアクセスするだけ！

# フレンド部屋用モード追加しました
2秒遅れモードです。MDL の Switch にしたかったのですが、うまくいきませんでした。

# サーモンランタイムって？

[@rayudne75](https://github.com/emaame/splatnet2statink) 様、提唱の草の根運動です。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E3%82%B5%E3%83%BC%E3%83%A2%E3%83%B3%E3%83%A9%E3%83%B3%E3%82%BF%E3%82%A4%E3%83%A0?src=hash&amp;ref_src=twsrc%5Etfw">#サーモンランタイム</a>　草の根運動の内容告知ツイートです　ver.1.0<br><br>サーモンランの各開催において<br>運動参加者が時刻を示し合わせて同時にマッチングを開始する事により<br>野良で誘導理解者と組める確率を高めようという趣旨の運動です<br><br>具体的な手法については、添付の説明画像を参照して下さい<br><br>続く <a href="https://t.co/I8FZDf17Ox">pic.twitter.com/I8FZDf17Ox</a></p>&mdash; 鮭走情報専＠サーモンランタイム最終告知完了 (@rayudne75) <a href="https://twitter.com/rayudne75/status/941699433623728129?ref_src=twsrc%5Etfw">2017年12月15日</a></blockquote>

テッパン・モグラを誘導できるイカをスナイプ！

# 時刻合わせについて
v1.1 (2017/12/25) から、「NICT インターネット時刻供給サービス」のJSON形式時刻情報を取得し、時間合わせを行うようにしました。

NICT のサーバへの負荷を減らすためロード時に一回だけ時刻合わせを行います。
長時間の利用の場合には、必ず数時間程度の間隔を置いてからリロードをお願いします。

# Install to local
```
git clone https://github.com/emaame/salmonrun_time_timer.git
```

`docs` フォルダ以下が必要なファイルになります。

# Build
ビルドには [Node.js](https://nodejs.org/ja/) と [Yarn](https://classic.yarnpkg.com/ja/docs/install/#windows-stable) を入れて

```
yarn
yarn webpack
```

`src/*.js` are packed to `docs/bundle.js`.

# webpack-dev-server
`yarn serve`

# Run test
`yarn test`

# License
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/deed.ja)
