'use strict'

const url = require('url')
const axios = require('axios')
const chalk = require('chalk')

const Migrate = require('./lib/migrate')
const config = require('./config')

const ONLINE_DOMAIN = config.fromDomain

function main () {
  let title = chalk.green(`
==============
你正在使用 migrate2local 从${ ONLINE_DOMAIN }迁移你的mock数据到${ config.toDomain }。
请确定已经配置当前目录下的 config.js 以完成准备工作。
注意：该操作只是调用相应环境的接口，并非真正意义上的数据迁移（不过也能达到目的）。
==============`)

  console.log(title)
  console.log()

  login()
}

function login () {
  let onlineRequest
  let localRequest

  createRequestByToken()
    .post('/u/login', {
      name: config.fromUserName,
      password: config.fromUserPassword
    })
    .then(res => {
      const body = res.data.data
      if (body && body.token) {
        onlineRequest = createRequestByToken(body.token)
        return createRequestByToken(null, config.toDomain).post('/u/login', {
          name: config.toUserName,
          password: config.toUserPassword
        })
      }
    })
    .then(res => {
      const body = res.data.data
      if (body && body.token) {
        localRequest = createRequestByToken(body.token, config.toDomain)
        const migrate = new Migrate(onlineRequest, localRequest, config.toDomain, ONLINE_DOMAIN)
        migrate.setMigrateType()
      }
    })
}

function createRequestByToken (token, domain) {
  const instance = axios.create({
    baseURL: url.resolve(domain || ONLINE_DOMAIN, '/api'),
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  instance.interceptors.response.use(response => {
    if (!response.data.success) {
      console.log(chalk.red(`\n${response.data.message}(${response.config.url})`))
      process.exit(1)
    }
    return response
  }, error => {
    console.log(chalk.red(error.message))
    process.exit(1)
  })

  return instance
}

main()
