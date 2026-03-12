class LogoCollection {
    constructor() {
        this.logos = JSON.parse(localStorage.getItem('logos')) || [];
        this.customCategories = JSON.parse(localStorage.getItem('customCategories')) || {};
        this.githubConfig = JSON.parse(localStorage.getItem('githubConfig')) || null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCategoryFilters();
        this.renderLogos();
    }

    bindEvents() {
        document.getElementById('searchBtn').addEventListener('click', () => this.filterLogos());
        document.getElementById('searchInput').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.filterLogos();
        });
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterLogos());
        document.getElementById('uploadBtn').addEventListener('click', () => this.openUploadModal());
        document.getElementById('syncBtn').addEventListener('click', () => this.syncData());
        document.getElementById('uploadForm').addEventListener('submit', (e) => this.handleUpload(e));
        document.getElementById('configForm').addEventListener('submit', (e) => this.saveGithubConfig(e));
        document.getElementById('logoImage').addEventListener('change', (e) => this.previewImage(e));
        document.getElementById('logoCategory').addEventListener('change', (e) => this.handleCategoryChange(e));
        
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => this.closeModal(e));
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    renderLogos(filteredLogos = null) {
        const grid = document.getElementById('logoGrid');
        const emptyState = document.getElementById('emptyState');
        const logosToRender = filteredLogos || this.logos;

        if (logosToRender.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        grid.innerHTML = logosToRender.map(logo => `
            <div class="logo-card" data-id="${logo.id}">
                <img src="${logo.image}" alt="${logo.name}" class="logo-card-image">
                <div class="logo-card-content">
                    <h3 class="logo-card-title">${logo.name}</h3>
                    <span class="logo-card-category">${this.getCategoryName(logo.category)}</span>
                    <p class="logo-card-description">${logo.description || '暂无描述'}</p>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.logo-card').forEach(card => {
            card.addEventListener('click', () => {
                const logoId = card.dataset.id;
                this.showLogoDetail(logoId);
            });
        });
    }

    filterLogos() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;

        const filtered = this.logos.filter(logo => {
            const matchesSearch = logo.name.toLowerCase().includes(searchTerm) ||
                                 (logo.description && logo.description.toLowerCase().includes(searchTerm));
            const matchesCategory = category === 'all' || logo.category === category;
            return matchesSearch && matchesCategory;
        });

        this.renderLogos(filtered);
    }

    handleCategoryChange(e) {
        const customCategoryInput = document.getElementById('customCategory');
        if (e.target.value === 'custom') {
            customCategoryInput.style.display = 'block';
            customCategoryInput.required = true;
            customCategoryInput.focus();
        } else {
            customCategoryInput.style.display = 'none';
            customCategoryInput.required = false;
            customCategoryInput.value = '';
        }
    }

    openUploadModal() {
        document.getElementById('uploadModal').style.display = 'block';
    }

    closeModal(e) {
        e.target.closest('.modal').style.display = 'none';
        if (e.target.closest('#uploadModal')) {
            document.getElementById('uploadForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            document.getElementById('customCategory').style.display = 'none';
            document.getElementById('customCategory').required = false;
        }
    }

    previewImage(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('imagePreview');

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.innerHTML = `<img src="${event.target.result}" alt="预览">`;
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = '';
        }
    }

    handleUpload(e) {
        e.preventDefault();

        const name = document.getElementById('logoName').value.trim();
        const categorySelect = document.getElementById('logoCategory').value;
        const customCategory = document.getElementById('customCategory').value.trim();
        const description = document.getElementById('logoDescription').value.trim();
        const imageFile = document.getElementById('logoImage').files[0];

        if (!name || !imageFile) {
            alert('请填写logo名称并上传图片');
            return;
        }

        let category = categorySelect;
        if (categorySelect === 'custom') {
            if (!customCategory) {
                alert('请输入新分类名称');
                return;
            }
            category = customCategory;
            this.customCategories[customCategory] = customCategory;
            this.saveCustomCategories();
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const newLogo = {
                id: Date.now().toString(),
                name,
                category,
                description,
                image: event.target.result,
                createdAt: new Date().toISOString()
            };

            this.logos.unshift(newLogo);
            this.saveLogos();
            this.renderLogos();
            this.updateCategoryFilters();

            document.getElementById('uploadModal').style.display = 'none';
            document.getElementById('uploadForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            document.getElementById('customCategory').style.display = 'none';
            document.getElementById('customCategory').required = false;

            alert('Logo上传成功！');
        };
        reader.readAsDataURL(imageFile);
    }

    showLogoDetail(logoId) {
        const logo = this.logos.find(l => l.id === logoId);
        if (!logo) return;

        const detailContent = document.getElementById('detailContent');
        detailContent.innerHTML = `
            <img src="${logo.image}" alt="${logo.name}" class="detail-image">
            <div class="detail-info">
                <h2>${logo.name}</h2>
                <span class="detail-category">${this.getCategoryName(logo.category)}</span>
                <p class="detail-description">${logo.description || '暂无描述'}</p>
                <p class="detail-date">上传时间: ${new Date(logo.createdAt).toLocaleString('zh-CN')}</p>
            </div>
        `;

        document.getElementById('detailModal').style.display = 'block';
    }

    getCategoryName(category) {
        const categories = {
            tech: '科技',
            food: '餐饮',
            fashion: '时尚',
            education: '教育',
            other: '其他'
        };
        return categories[category] || category;
    }

    updateCategoryFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const uploadCategorySelect = document.getElementById('logoCategory');
        
        const allCategories = new Set([
            'tech', 'food', 'fashion', 'education', 'other',
            ...Object.keys(this.customCategories)
        ]);

        const currentFilterValue = categoryFilter.value;
        const currentUploadValue = uploadCategorySelect.value;

        categoryFilter.innerHTML = '<option value="all">所有分类</option>';
        uploadCategorySelect.innerHTML = '';

        allCategories.forEach(cat => {
            const displayName = this.getCategoryName(cat);
            categoryFilter.innerHTML += `<option value="${cat}">${displayName}</option>`;
            uploadCategorySelect.innerHTML += `<option value="${cat}">${displayName}</option>`;
        });

        uploadCategorySelect.innerHTML += '<option value="custom">➕ 添加新分类</option>';

        categoryFilter.value = currentFilterValue;
        uploadCategorySelect.value = currentUploadValue;
    }

    saveCustomCategories() {
        localStorage.setItem('customCategories', JSON.stringify(this.customCategories));
    }

    saveLogos() {
        localStorage.setItem('logos', JSON.stringify(this.logos));
    }

    saveGithubConfig(e) {
        e.preventDefault();
        
        const username = document.getElementById('githubUsername').value.trim();
        const repo = document.getElementById('githubRepo').value.trim();
        const token = document.getElementById('githubToken').value.trim();

        if (!username || !repo || !token) {
            alert('请填写所有配置信息');
            return;
        }

        this.githubConfig = { username, repo, token };
        localStorage.setItem('githubConfig', JSON.stringify(this.githubConfig));
        
        document.getElementById('configModal').style.display = 'none';
        alert('GitHub配置已保存！点击"同步数据"按钮开始同步。');
    }

    async syncData() {
        if (!this.githubConfig) {
            document.getElementById('configModal').style.display = 'block';
            return;
        }

        this.showSyncStatus('正在同步数据...');
        
        try {
            await this.loadFromGitHub();
            await this.saveToGitHub();
            this.showSyncStatus('同步完成！', 'success');
            setTimeout(() => this.hideSyncStatus(), 2000);
        } catch (error) {
            console.error('同步失败:', error);
            this.showSyncStatus('同步失败: ' + error.message, 'error');
            setTimeout(() => this.hideSyncStatus(), 3000);
        }
    }

    async loadFromGitHub() {
        const { username, repo, token } = this.githubConfig;
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/issues?labels=logos&state=all&per_page=100`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('无法加载数据，请检查配置');
        }

        const issues = await response.json();
        
        if (issues.length > 0) {
            const githubLogos = issues.map(issue => {
                const data = JSON.parse(issue.body);
                return {
                    ...data,
                    githubIssueId: issue.id,
                    githubIssueNumber: issue.number
                };
            });

            this.logos = githubLogos;
            this.saveLogos();
            this.renderLogos();
            this.updateCategoryFilters();
        }
    }

    async saveToGitHub() {
        const { username, repo, token } = this.githubConfig;
        
        for (const logo of this.logos) {
            const logoData = {
                id: logo.id,
                name: logo.name,
                category: logo.category,
                description: logo.description,
                image: logo.image,
                createdAt: logo.createdAt
            };

            if (logo.githubIssueNumber) {
                await fetch(`https://api.github.com/repos/${username}/${repo}/issues/${logo.githubIssueNumber}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify({
                        body: JSON.stringify(logoData)
                    })
                });
            } else {
                const response = await fetch(`https://api.github.com/repos/${username}/${repo}/issues`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify({
                        title: logo.name,
                        body: JSON.stringify(logoData),
                        labels: ['logos']
                    })
                });

                if (response.ok) {
                    const issue = await response.json();
                    logo.githubIssueId = issue.id;
                    logo.githubIssueNumber = issue.number;
                }
            }
        }

        this.saveLogos();
    }

    showSyncStatus(message, type = 'info') {
        const statusDiv = document.getElementById('syncStatus');
        const statusText = document.getElementById('syncStatusText');
        
        statusText.textContent = message;
        statusDiv.style.display = 'flex';
        
        if (type === 'success') {
            statusDiv.style.background = '#10b981';
        } else if (type === 'error') {
            statusDiv.style.background = '#ef4444';
        } else {
            statusDiv.style.background = '#6366f1';
        }
    }

    hideSyncStatus() {
        document.getElementById('syncStatus').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LogoCollection();
});