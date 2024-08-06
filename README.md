# Unit-AI

> [!WARNING]
> This project is still in its early stages. Currently, i have only completed the basic framework, core logic, and a basic UI. If you are interested in this project, feel free to join our [Discord Group](https://discord.gg/ZgpAeZfF) for discussions. We also warmly welcome contributions through pull requests. If you have any suggestions, please submit them via issues.

[中文文档](./README/zh-cn.md)

![](https://oss.kinda.info/image/202408061442292.png)

[Click here to visit the demo sample deployed on Vercel](https://unit-ai.com)

Unit-AI is an AI workflow platform based on Vite and FastAPI, designed to help users quickly build and deploy AI applications.

## Core Developers

- [Kinda Hall](https://github.com/Alndaly)

## TODO

- [x] Support workflow export
- [x] Support Dark mode 
- [x] Support workflow drag-and-drop loading
- [ ] Some mathematical logic nodes
- [ ] Support for plugin development
- [ ] Support for API provisioning

## Developer Setup

1. Clone this project

```shell
git clone git@github.com:Alndaly/unit-ai.git
cd unit-ai
```

2. Install dependencies

```shell
cd frontend
pnpm i
cd ../backend 
pip install -r ./requirements.txt
```

3. Start the project

```shell
cd ../frontend
pnpm dev
cd ../backend
python main.py
```

4. Access [http://localhost:5173](http://localhost:5173)