// ============================================
// AUTHENTICATION SYSTEM
// ============================================

class AuthManager {
  constructor() {
    this.loginModal = document.getElementById('loginModal');
    this.adminModal = document.getElementById('adminModal');
    this.loginForm = document.getElementById('loginForm');
    this.adminToggle = document.getElementById('adminToggle');
    this.closeAdminModal = document.getElementById('closeAdminModal');
    this.adminLogout = document.getElementById('adminLogout');
    this.currentUser = null;
    this.admins = [
      {
        email: 'admin@codechef-projects.com',
        password: 'Admin@123'
      },
      {
        email: 'lead@codechef-projects.com',
        password: 'Lead@123'
      }
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkLoginStatus();
  }

  setupEventListeners() {
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    if (this.adminToggle) {
      this.adminToggle.addEventListener('click', () => this.openAdminPanel());
    }

    if (this.closeAdminModal) {
      this.closeAdminModal.addEventListener('click', () => this.closeAdmin());
    }

    if (this.adminLogout) {
      this.adminLogout.addEventListener('click', () => this.logout());
    }

    // Close modal on background click
    if (this.adminModal) {
      this.adminModal.addEventListener('click', (e) => {
        if (e.target === this.adminModal) {
          this.closeAdmin();
        }
      });
    }

    if (this.loginModal) {
      this.loginModal.addEventListener('click', (e) => {
        if (e.target === this.loginModal) {
          this.closeLogin();
        }
      });
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const admin = this.admins.find(
      (a) => a.email === email && a.password === password
    );

    if (admin) {
      this.currentUser = {
        email: email,
        role: 'admin',
        loginTime: new Date()
      };

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.showNotification('Login successful! Welcome back.', 'success');
      this.loginModal.style.display = 'none';
      this.adminModal.style.display = 'flex';
      this.loginForm.reset();
    } else {
      this.showNotification('Invalid email or password. Try again.', 'error');
    }
  }

  checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  openAdminPanel() {
    if (!this.currentUser) {
      this.loginModal.style.display = 'flex';
    } else {
      this.adminModal.style.display = 'flex';
    }
  }

  closeAdmin() {
    this.adminModal.style.display = 'none';
  }

  closeLogin() {
    this.loginModal.style.display = 'none';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.adminModal.style.display = 'none';
    this.showNotification('Logged out successfully!', 'success');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideInDown 0.4s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideInUp 0.4s ease-out forwards';
      setTimeout(() => notification.remove(), 400);
    }, 3000);
  }
}

// Initialize Auth Manager
document.addEventListener('DOMContentLoaded', () => {
  new AuthManager();
});