class LogoCollection {
    constructor() {
        this.logos = JSON.parse(localStorage.getItem('logos')) || [];
        this.customCategories = JSON.parse(localStorage.getItem('customCategories')) || {};
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
        document.getElementById('uploadForm').addEventListener('submit', (e) => this.handleUpload(e));
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
}

document.addEventListener('DOMContentLoaded', () => {
    new LogoCollection();
});