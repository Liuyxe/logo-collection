# 🎉 更新日志

## [1.2.0] - 2024-03-12

### ✨ 新增功能

- **跨浏览器数据同步**
  - 通过GitHub Issues实现数据持久化存储
  - 支持跨浏览器、跨设备数据同步
  - 自动从GitHub加载和同步数据
  - 配置GitHub Token和仓库信息

### 🔧 改进

- 添加同步状态提示（加载中、成功、失败）
- 添加GitHub配置界面
- 优化同步流程和错误处理
- 添加同步按钮到主界面

### 📝 技术细节

- 新增 `githubConfig` 对象存储GitHub配置
- 新增 `syncData()` 方法实现数据同步
- 新增 `loadFromGitHub()` 方法从GitHub Issues加载数据
- 新增 `saveToGitHub()` 方法保存数据到GitHub Issues
- 新增 `showSyncStatus()` 和 `hideSyncStatus()` 方法显示同步状态
- 新增 `saveGithubConfig()` 方法保存GitHub配置

---

## [1.1.0] - 2024-03-12

### ✨ 新增功能

- **自定义分类功能**
  - 上传logo时可以选择"➕ 添加新分类"
  - 输入自定义分类名称并保存
  - 自定义分类会自动保存到localStorage
  - 新添加的分类会自动出现在分类筛选器和上传表单中

### 🔧 改进

- 优化分类选择器的用户体验
- 添加自定义分类输入框的动画效果
- 分类数据持久化存储

### 🐛 修复

- 修复分类选择后的状态管理
- 改进表单重置逻辑

### 📝 技术细节

- 新增 `customCategories` 对象存储自定义分类
- 新增 `updateCategoryFilters()` 方法动态更新分类选项
- 新增 `handleCategoryChange()` 方法处理分类选择变化
- 新增 `saveCustomCategories()` 方法保存自定义分类

---

## [1.0.0] - 2024-03-12

### 🎉 首次发布

- ✅ Logo展示功能
- ✅ 上传logo功能
- ✅ 搜索和过滤功能
- ✅ 响应式设计
- ✅ 本地存储
- ✅ GitHub Pages部署支持