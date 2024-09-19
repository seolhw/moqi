# 选择一个基础镜像，这里使用 Node.js 的官方镜像
FROM node:lts-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建 Next.js 应用
RUN npm run ci-build


# 暴露容器的 3000 端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["npm", "start"]