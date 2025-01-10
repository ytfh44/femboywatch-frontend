# 男娘家园 前端

男娘家园的 React 前端项目，展示游戏中的可爱男娘角色。

## 技术栈

- React
- Tailwind CSS
- React Router
- Axios

## 功能特点

- 游戏数据库浏览
- 按类别筛选游戏
- 游戏详情展示
- 男娘角色展示
- 可爱度评分系统
- 响应式设计

## 开发设置

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

3. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
src/
  ├── components/     # React 组件
  ├── styles/        # CSS 样式文件
  ├── assets/        # 图片等静态资源
  ├── App.js         # 主应用组件
  └── index.js       # 应用入口点
```

## API 接口

- `GET /api/database` - 获取游戏列表
- `POST /api/database` - 添加新游戏
- `GET /api/database/:id` - 获取游戏详情
- `PUT /api/database/:id` - 更新游戏信息
- `DELETE /api/database/:id` - 删除游戏

## 环境变量

在开发环境中，创建 `.env.local` 文件：

```env
REACT_APP_API_URL=http://localhost:5000
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT
