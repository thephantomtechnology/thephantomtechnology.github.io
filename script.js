// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 添加页面载入动画
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// 数字增长动画
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const number = stat.querySelector('.stat-number');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const interval = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            number.textContent = Math.floor(current);
        }, interval);
    });
}

// 监听滚动事件，当统计部分进入视图时启动动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.querySelector('.stats'));

// 添加滚动渐入效果
const fadeElements = document.querySelectorAll('.service-card, .team-member, .showcase-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
    fadeObserver.observe(element);
});

// 筛选功能
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 筛选内容
            const filter = btn.getAttribute('data-filter');
            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 课程卡片动画
function initCourseCards() {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.course-icon').style.transform = 'rotate(360deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.course-icon').style.transform = 'rotate(0deg)';
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.filter-btn')) {
        initFilters();
    }
    if (document.querySelector('.course-card')) {
        initCourseCards();
    }
});

// 添加页面过渡动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 0);
});

// FAQ交互
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 关闭其他打开的FAQ
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // 切换当前FAQ的状态
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// 客户评价轮播
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(card => card.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    // 初始显示第一个评价
    showTestimonial(0);
    
    // 自动轮播
    setInterval(nextTestimonial, 5000);
}

// 统一的页面滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animation');
                entry.target.classList.add(`animate-${animation}`);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 统一的返回顶部按钮
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 统一的页面加载进度条
function initProgressBar() {
    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progress.style.width = `${scrolled}%`;
    });
}

// 移动端菜单
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-content')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}

// 表单验证和交互
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (validateForm(form)) {
                showLoading();
                
                try {
                    // 模拟表单提交
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // 显示成功消息
                    showMessage('提交成功！我们会尽快与您联系。', 'success');
                    form.reset();
                } catch (error) {
                    showMessage('提交失败，请稍后重试。', 'error');
                } finally {
                    hideLoading();
                }
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showInputError(input, '此字段不能为空');
        } else {
            clearInputError(input);
        }
    });
    
    return isValid;
}

function showInputError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    
    clearInputError(input);
    input.parentNode.appendChild(errorDiv);
    input.classList.add('error');
}

function clearInputError(input) {
    const error = input.parentNode.querySelector('.input-error');
    if (error) {
        error.remove();
        input.classList.remove('error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFormValidation();
    initFAQ();
    initTestimonials();
    initScrollAnimations();
    initBackToTop();
    initProgressBar();
}); 