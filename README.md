# truffle-ganache
truffleとganacheを使って独自トークンをローカルネットワーク上で動作させる

## how it was started

1. 初期設定
```
$ npm install -g truffle
$ mkedir truffle-ganache
$ cd truffle-ganache
$ truffle init
```

ganacheにつなぐ場合はtruffle-config.jsを更新し、localhostに接続するように設定する

2. ganacheとの接続確認
```
$ truffle console
```
truffle(development)と表示されればOK

exitしたい場合はCTRL+Cを2回連続で叩く

3. contract追加後にコンパイルを行う
```
$ truffle compile
```
正常に完了した場合はbuildフォルダが作成され、中に生成物が格納される

4. マイグレーションファイルの作成
作成したコントラクトに合わせたマイグレーションファイルを使う
マイグレーションファイルもtruffleコマンドを使って簡単に作成できる
```
$ truffle create migration sushiItem
```
作成されたマイグレーションファイル名の先頭には作成時点のタイムスタンプがくっついている

5. コントラクトのデプロイ
マイグレーションファイルを動かして実際にganacheのネットワークに対してコントラクトのデプロイを行う
```
$ truffle migrate
```

以下のように出てきたら成功で、実際にganacheがわのアカウントを見るとfinal costに出てきている分だけETHが減っている
```
Summary
=======
> Total deployments:   2
> Final cost:          0.0658655 ETH
```

6. デプロイしたコントラクトをtruffleコンソールから操作する
簡単な操作として、以下を入力することでコントラクトのアドレスを確認できる
入力するコントラクトの名前はビルドファイルの先頭に書いてある
```
> truffle(development)> SushiItem.address
'0xDd8e2f787260783B2f3954C5A4d92E834afFf5be'
```

コントラクトをインスタンス化して操作する場合は以下の入力
```
> truffle(development)> SushiItem.deployed().then(function(instance){app = instance;})
undifined
```

appインスタンスが作成される
appインスタンスの中身の情報を見るとマイグレーションファイルの中身と同じものが出てくる
```
> truffle(development)> app
~~~
中略
~~~
```

appを使ってmintを行う
mintの第一引数はtokenId, 第二引数はamount
```
> truffle(development)> app.mint(4, 10)
{
  tx: '0x3ae736ad2a519465371a8d170f00f5ecad55c3f7be2a2bacebc6ff97a01acf85',
  receipt: {
    transactionHash: '0x3ae736ad2a519465371a8d170f00f5ecad55c3f7be2a2bacebc6ff97a01acf85',
    transactionIndex: 0,
    blockHash: '0x917aafc1da4744e1e198bf21bf7004725f9487abdad608841aa8e082a0af7c29',
    blockNumber: 5,
    from: '0xa437c9c08e662ffc71d0563a6e82b9239e53e0ee',
    to: '0xdd8e2f787260783b2f3954c5a4d92e834afff5be',
    gasUsed: 32447,
    cumulativeGasUsed: 32447,
    contractAddress: null,
    logs: [ [Object] ],
    status: true,
    logsBloom: '0x00008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000800000000010000000000000000000000000000000040000000000000000000000000000080000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000008000000000000000020000000000000000000000000000000000000000000000000000000080000000000',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      logIndex: 0,
      transactionIndex: 0,
      transactionHash: '0x3ae736ad2a519465371a8d170f00f5ecad55c3f7be2a2bacebc6ff97a01acf85',
      blockHash: '0x917aafc1da4744e1e198bf21bf7004725f9487abdad608841aa8e082a0af7c29',
      blockNumber: 5,
      address: '0xDd8e2f787260783B2f3954C5A4d92E834afFf5be',
      type: 'mined',
      id: 'log_b5181375',
      event: 'TransferSingle',
      args: [Result]
    }
  ]
}
```

truffle上を確認すると、同じTxHashが発行されてコントラクトがコールされていることがわかる

## フロントエンド上からトークンを操作できるようにする
1. reactのインストール
create-react-appコマンドを使って雛形だけ作る
```
$ npm install -g create-react-app
$ exec $SHELL -l
$ create-react-app client
```

clientフォルダが作成され、中にreactの雛形が出来上がっている
```
$ cd client
```

npm run startでREACTのサンプルページを立ち上げることができる
```
$ npm run start
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.20.10.2:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

