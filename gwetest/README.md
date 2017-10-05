# gulp + webpack + express test.

1. 下载依赖
npm install

2. 开发调试
  - 1）启动本地服务
    npm start
    访问 http://localhost:3000/index.html(即dist目录下的index.html)
  - 2）构建项目并监听文件更新（新开命令行）
  npm run debug

3. 生产构建
npm run build

**备注**：
  * 仅在src目录中进行开发，dist为构建发布目录
  * 每个页面（html）有一个入口JS，需在webpack entry中配置
  * server/routes目录为本地调试服务器，不会构建与发布
  * dist目录必须在生成构建后发布，每次提交之前先执行npm run build
