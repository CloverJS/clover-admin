<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://docs.nestjs.cn/" target="blank">中文官网</a>
</p>

## Description

CloverAdmin是一个Nest后台后端解决方案。它借助强大的[Nest](https://github.com/nestjs/nest)和社区快速、轻巧地构建更优雅的Node服务端应用程序。目前已集成权限验证、使用Typeorm的MySql与SqlServer方案、数据验证、文件上传、静态服务等功能。它提供了一个完整的RestFul风格的接口示例。

`node：14.19.0`
`pnpm：6.32.3`
## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Start 
建设中。。。

### 数据库
采用[Typeorm](https://github.com/typeorm/typeorm)
文档地址: https://typeorm.bootcss.com/

Nest文档：https://docs.nestjs.cn/8/techniques?id=%e6%95%b0%e6%8d%ae%e5%ba%93
#### Mysql
```
// ormconfig.json
{
  "type": "mysql",
  "host": "数据库ip地址",
  "port": 数据库端口号,
  "username": "xxxx",
  "password": "xxxxxx",
  "database": "数据库名",
  "entities": ["dist/feature/**/entities/*.entity{.ts,.js}"],
  "synchronize": true,
  "autoLoadEntities": true
}
```
#### SqlServer
```
// ormconfig.json
{
  "type": "mssql",
  "host": "数据库ip地址",
  "port": 数据库端口号,
  "username": "xxxx",
  "password": "xxxxxx",
  "database": "数据库名",
  "entities": ["dist/feature/**/entities/*.entity{.ts,.js}"],
  "synchronize": true,
  "autoLoadEntities": true,
  "options": { # mssql如果出现ssl问题, 则需要添加此options
    "encrypt": false,
    "trustServerCertificate": true,
    "cryptoCredentialsDetails": {
      "minVersion": "TLSv1"
    }
  }
}
```
注意：Typeorm生成的sql语句可能不支持SqlServer2008，因此可能需要使用QueryBuilder来拼接sql。

### 校验
[class-validator](https://github.com/typestack/class-validator#validation-messages)

Nest文档：https://docs.nestjs.cn/8/techniques?id=%e9%aa%8c%e8%af%81

### 静态服务
所有需要静态访问的静态资源文件均可放在根目录的client(没有则需创建)目录下

### 文件上传
文件上传后将会保存在client/fileUpload目录下
## License

Nest is [MIT licensed](LICENSE).
