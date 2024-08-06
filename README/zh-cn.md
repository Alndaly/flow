# Unit-AI

> [!WARNING]
> 这个项目还只是初步启动状态，目前大体上只有一个框架，仅刚刚完成了基础逻辑层面和基本的UI，如果对本项目感兴趣欢迎加入[Discord群组](https://discord.gg/ZgpAeZfF)一起讨论，同时我也非常欢迎感兴趣的人提供PR。如果有什么建议可以通过issue的方式提交。

![](https://oss.kinda.info/image/202408061442292.png)

[点击访问我部署在vercel上的demo样例](https://unit-ai.com)

Unit-AI 是一个基于Vite和FastAPI的 AI 工作流平台，旨在帮助用户快速构建和部署 AI 应用程序。

## 核心开发人员

- [Kinda Hall](https://github.com/Alndaly)


## TODO

- [x] 支持工作流导出
- [x] 支持夜间模式
- [x] 支持工作流拖放加载
- [ ] 部分数学逻辑节点
- [ ] 支持插件开发
- [ ] 支持API供应

## 开发者

1. 克隆本项目

```shell
git clone git@github.com:Alndaly/unit-ai.git
cd unit-ai
```

2. 安装依赖

```shell
cd frontend
pnpm i
cd ../backend 
pip install -r ./requirements.txt
```

3. 启动项目

```shell
cd ../frontend
pnpm dev
cd ../backend
python main.py
```

4. 访问 [http://localhost:5173](http://localhost:5173)