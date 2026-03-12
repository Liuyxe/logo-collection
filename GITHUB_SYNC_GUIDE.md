# 🔧 GitHub同步配置指南

## 📋 前置要求

- ✅ 已有GitHub账号
- ✅ 已创建logo-collection仓库
- ✅ 准备好GitHub Personal Access Token

---

## 🚀 快速配置步骤

### 步骤1：获取GitHub Personal Access Token

1. **访问GitHub Token设置页面**
   - 打开：https://github.com/settings/tokens/new
   - 或在GitHub点击头像 → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **创建新Token**
   - 点击 "Generate new token (classic)"
   - **Note**: 输入 `Logo Collection` 或其他描述
   - **Expiration**: 选择 `No expiration` 或合适的过期时间
   - **Select scopes**: 勾选以下权限：
     - ✅ `repo` (完整仓库访问权限)
     - ✅ `public_repo` (如果仓库是公开的)
   - 点击 "Generate token"

3. **保存Token**
   - ⚠️ **重要**：复制生成的token（格式：`ghp_xxxxxxxxxxxx`）
   - ⚠️ **重要**：立即保存，离开页面后无法再次查看

### 步骤2：配置网站

1. **打开网站**
   - 访问你的GitHub Pages网站
   - 或本地打开 `index.html`

2. **点击同步按钮**
   - 点击页面右上角的 "🔄 同步数据" 按钮
   - 会自动弹出配置窗口

3. **填写配置信息**
   - **GitHub用户名**: 你的GitHub用户名（例如: `your-username`）
   - **仓库名称**: `logo-collection`（或你的仓库名）
   - **Personal Access Token**: 粘贴刚才复制的token

4. **保存配置**
   - 点击 "保存配置" 按钮
   - 配置会保存在浏览器中

### 步骤3：同步数据

1. **首次同步**
   - 配置保存后，点击 "🔄 同步数据" 按钮
   - 系统会自动从GitHub Issues加载数据
   - 然后将本地数据同步到GitHub

2. **后续同步**
   - 每次上传新logo后，点击 "🔄 同步数据" 按钮
   - 数据会自动同步到GitHub
   - 在其他浏览器中点击同步按钮即可获取最新数据

---

## 🎯 工作原理

### 数据存储

- **GitHub Issues**: 每个logo作为一个Issue存储
- **Issue标题**: logo名称
- **Issue内容**: logo的JSON数据（包含图片、分类、描述等）
- **标签**: 使用 `logos` 标签标识

### 同步流程

1. **从GitHub加载**:
   - 读取所有带 `logos` 标签的Issues
   - 解析Issue内容获取logo数据
   - 更新本地显示

2. **保存到GitHub**:
   - 遍历所有本地logo
   - 如果logo已存在GitHub，更新Issue
   - 如果logo不存在，创建新Issue

---

## 💡 使用技巧

### 自动同步建议

- **上传后立即同步**: 每次上传logo后点击同步按钮
- **切换浏览器前同步**: 确保数据已同步到GitHub
- **定期同步**: 即使没有新数据，也定期点击同步

### 多设备使用

1. **设备A**: 上传logo → 点击同步
2. **设备B**: 打开网站 → 点击同步 → 获取最新数据

---

## 🔒 安全注意事项

### Token安全

- ✅ Token只保存在你的浏览器localStorage中
- ✅ 不会发送到任何第三方服务器
- ⚠️ 不要分享你的Token给他人
- ⚠️ 定期更换Token（建议每6个月）

### 数据隐私

- ✅ 如果仓库是私有的，只有你能看到数据
- ✅ 公开仓库中，Issues内容可见
- ⚠️ 图片使用Base64编码，存储在Issue中

---

## 🐛 常见问题

### Q: 同步失败怎么办？

**A:** 检查以下几点：
1. Token是否正确且未过期
2. 用户名和仓库名是否正确
3. Token是否有 `repo` 权限
4. 网络连接是否正常

### Q: 为什么看不到之前的数据？

**A:** 
1. 确保在GitHub仓库中有带 `logos` 标签的Issues
2. 点击同步按钮从GitHub加载数据
3. 检查浏览器控制台是否有错误信息

### Q: 可以删除GitHub中的数据吗？

**A:** 
1. 可以直接在GitHub仓库的Issues页面删除
2. 或使用GitHub API删除特定Issue
3. 删除后点击同步按钮会从本地移除

### Q: Token过期了怎么办？

**A:** 
1. 重新生成新的Personal Access Token
2. 点击同步按钮打开配置窗口
3. 更新Token并保存

### Q: 数据会冲突吗？

**A:** 
- 系统使用logo的ID作为唯一标识
- 相同ID的logo会被更新而不是创建重复
- 不会出现数据冲突

---

## 📊 数据限制

### GitHub API限制

- **认证请求**: 每小时5000次
- **未认证请求**: 每小时60次
- **Issue大小**: 建议1MB以内（图片Base64编码后较大）

### 优化建议

- 压缩图片后再上传
- 使用PNG格式而非JPG（压缩效果更好）
- 避免上传过大的图片

---

## 🔄 更新Token

如果需要更新Token：

1. 访问 https://github.com/settings/tokens
2. 找到旧的Token并点击删除
3. 创建新的Token
4. 在网站中打开配置窗口
5. 更新Token并保存

---

## 📞 获取帮助

如果遇到问题：

1. **查看浏览器控制台**: 按F12查看错误信息
2. **检查GitHub Issues**: 确认数据是否正确存储
3. **重新配置**: 删除localStorage中的配置后重新设置

---

**配置完成后，享受跨浏览器数据同步的便利！** 🎉