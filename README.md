# truffle-ganache
truffleとganacheを使って独自トークンをローカルネットワーク上で動作させる

# how it was started

1. 初期設定
```
npm install -g truffle
mkedir truffle-ganache
cd truffle-ganache
truffle init
```

ganacheにつなぐ場合はtruffle-config.jsを更新し、localhostに接続するように設定する

2. ganacheとの接続確認
```
truffle console
```
truffle(development)と表示されればOK

exitしたい場合はCTRL+Cを2回連続で叩く

3. contract追加後にコンパイルを行う
```
truffle compile
```
正常に完了した場合はbuildフォルダが作成され、中に生成物が格納される

4. マイグレーションファイルの作成
作成したコントラクトに合わせたマイグレーションファイルを使う
マイグレーションファイルもtruffleコマンドを使って簡単に作成できる
```
truffle create migration sushiItem
```
作成されたマイグレーションファイル名の先頭には作成時点のタイムスタンプがくっついている

5. コントラクトのデプロイ


