# 🎨 Logo收集站

一个简洁美观的Logo收集和展示网站，使用纯HTML、CSS和JavaScript构建，可以轻松托管在GitHub Pages上。

## ✨ 功能特点

- 🖼️ **Logo展示** - 以卡片网格形式展示收集的logo
- 📤 **上传功能** - 支持上传新的logo图片
- ➕ **自定义分类** - 可以添加新的分类，不再局限于预设分类
- � **跨浏览器同步** - 通过GitHub Issues实现跨浏览器、跨设备数据同步
- � **搜索过滤** - 按名称或分类搜索logo
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 💾 **本地存储** - 使用localStorage保存数据
- 🎯 **分类管理** - 支持科技、餐饮、时尚、教育等分类，并可自定义添加

## 🚀 快速开始

### 本地运行

1. 克隆或下载此仓库
2. 直接在浏览器中打开 `index.html` 文件

### 部署到GitHub Pages

#### 方法一：使用GitHub网页界面

1. 在GitHub上创建新仓库，命名为 `logo-collection`
2. 上传以下文件到仓库：
   - `index.html`
   - `styles.css`
   - `app.js`
3. 进入仓库的 **Settings** > **Pages**
4. 在 **Source** 下选择 `main` 分支
5. 点击 **Save**
6. 等待几分钟后，你的网站将在 `https://你的用户名.github.io/logo-collection/` 上线

#### 方法二：使用Git命令行

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/logo-collection.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

然后在GitHub仓库设置中启用GitHub Pages。

## 📁 文件结构

```
logo-collection/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── app.js          # JavaScript逻辑
└── README.md       # 说明文档
```

## 🎨 使用说明

### 上传Logo

1. 点击页面右上角的"➕ 上传Logo"按钮
2. 填写logo名称
3. 选择分类：
   - 从预设分类中选择（科技、餐饮、时尚、教育、其他）
   - 或选择"➕ 添加新分类"并输入自定义分类名称
4. 添加描述（可选）
5. 选择要上传的logo图片
6. 点击"上传"按钮

**提示：** 自定义分类会自动保存，下次上传时会出现在分类列表中。

### 同步数据（跨浏览器/跨设备）

1. 首次使用需要配置GitHub信息：
   - 点击"🔄 同步数据"按钮
   - 填写GitHub用户名、仓库名称和Personal Access Token
   - 详细配置步骤请查看 [GitHub同步配置指南](GITHUB_SYNC_GUIDE.md)
2. 配置完成后：
   - 点击"🔄 同步数据"按钮
   - 系统会自动从GitHub加载数据并同步本地数据
   - 在其他浏览器或设备中点击同步即可获取最新数据

### 搜索Logo

- 在搜索框中输入关键词，按回车或点击搜索按钮
- 使用分类下拉菜单筛选特定类别的logo

### 查看详情

- 点击任意logo卡片可以查看详细信息

## 🛠️ 技术栈

- HTML5
- CSS3 (使用CSS Grid和Flexbox)
- 原生JavaScript (ES6+)
- LocalStorage API

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 其他现代浏览器

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🌟 特色功能

- 渐变色头部设计
- 卡片悬停动画效果
- 模态框动画
- 图片预览功能
- 空状态提示
- 响应式布局

---

Made with ❤️ for Logo lovers