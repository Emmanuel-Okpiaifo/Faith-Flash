import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const indexHtml = resolve('dist', 'index.html')
const notFoundHtml = resolve('dist', '404.html')
copyFileSync(indexHtml, notFoundHtml)
