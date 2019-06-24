# migrate-easymock-data

Easy Mock数据迁移工具。

本工具是在 [easy-mock/migrate2local](https://github.com/easy-mock/migrate2local) 的基础上修改, 原版只能从easymock.com迁出, 本工具可以在任意两个网络之间迁出

## Using

```
$ git clone https://github.com/ihwf/migrate-easymock-data.git
$ cd migrate-easymock-data
$ npm install
$ node index.js
```

## Config

请先配置目录下的 config.js 以完成准备工作。

```
// config.js
module.exports = {
  fromDomain: '',//迁出地址
  fromUserName: '', // 迁出用户名
  fromUserPassword: '', // 迁出用户密码
  toDomain: '', // 迁入地址（如：http://localhost:7300）
  toUserName: '', // 迁入的用户名
  toUserPassword: '' // 迁入的用户密码
}
```

## License

MIT
