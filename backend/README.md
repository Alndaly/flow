# 原理讲解

> [!note]
> 按目前的构思，每次插件下载之后都需要重启服务，这样不太合理，后续想下怎么优化

## 获取节点流原理

后端服务启动的时候获取plugins下的节点组

## 节点流实际运行原理

每加入一个节点，自动通过uuid为其func生成对应的api接口

### api地址

`/api/<uuid>`

### 请求方式

`POST`

### 请求体编码方式 

`application/json`

### 请求体

```json
{
    "input1": "data1",
    "input2": "data2"
}
```

### 返回值

```json
{
    "output1": "data1",
    "output2": "data2"
}
```
