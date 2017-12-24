# Salmon Run Time Timer
A web-based countdown Timer for Salmon Run Time.

# Usage
[サーモンランタイム タイマー](https://emaame.github.io/salmonrun_time_timer/) にアクセスするだけ！

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
npm install
```

# Build
`npm run webpack`

`src/*.js` are packed to `docs/bundle.js`.

# webpack-dev-server
`npm run serve`

# Run test
`npm run test`

# License
[CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)

`src/reference` の `jst_clock.html` および `JST5.js` は [JST Clock](https://www.nict.go.jp/JST/JST5.html) のコピーとなります。
「Copyright (C) 1998 - 2013 NICT, Hiroshi Toriyama, All Rights Reserved.」とあるのですが、ライセンスは書かれていません。
これらは文字通り参考用に含めています。

また、そちらから `fetch` / `calculate` / `errmsg` / `toggle` 関数を `src/time_offset.js` にコピペして、多少書き換えています。
閏秒まわりの処理も入っているようなのですが、変には触ってないつもりです。
`src/time_offset.js` に関するライセンスは [CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja) の対象外とし、
ライセンス不明とします。
