// ============================================
// THEME MANAGEMENT
// ============================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// ============================================
// MAIN APPLICATION
// ============================================

class DepartmentPortal {
  constructor() {
    this.mobileToggle = document.getElementById('mobileToggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.recruitBtn = document.getElementById('recruitBtn');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.adminToggle = document.getElementById('adminToggle');
    this.adminModal = document.getElementById('adminModal');
    this.closeModal = document.querySelector('.close-modal');
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderMemberDisplay('leads');
    this.renderProjects('all');
    this.renderResearch();
    this.renderAchievements('awards');
    this.renderGameDev('members');
    this.renderQuestSystem('leaderboard');
  }

  setupEventListeners() {
    // Mobile menu toggle
    this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());

    // Navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Recruitment button
    this.recruitBtn?.addEventListener('click', () => this.openRecruitmentForm());

    // Member tabs
    document.querySelectorAll('.category-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleMemberTab(e));
    });

    // Project filters
    document.querySelectorAll('.project-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleProjectFilter(e));
    });

    // Achievement tabs
    document.querySelectorAll('.achievement-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAchievementTab(e));
    });

    // Game dev tabs
    document.querySelectorAll('.gamedev-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleGameDevTab(e));
    });

    // Quest tabs
    document.querySelectorAll('.quest-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleQuestTab(e));
    });

    // Admin panel
    this.adminToggle?.addEventListener('click', () => this.openAdminModal());
    this.closeModal?.addEventListener('click', () => this.closeAdminModal());

    // Close modal on background click
    this.adminModal?.addEventListener('click', (e) => {
      if (e.target === this.adminModal) this.closeAdminModal();
    });
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
  }

  handleNavClick(e) {
    e.preventDefault();
    this.navLinks.forEach(l => l.classList.remove('active'));
    e.target.closest('.nav-link').classList.add('active');
    this.navMenu.classList.remove('active');
  }

  openRecruitmentForm() {
    window.open('recruitment.html', '_blank');
  }

  // ============================================
  // RENDERING METHODS
  // ============================================

  handleMemberTab(e) {
    const group = e.target.dataset.group;
    document.querySelectorAll('.category-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderMemberDisplay(group);
  }

  renderMemberDisplay(group) {
    const container = document.getElementById('memberDisplay');
    const members = appData.members[group] || [];
    container.innerHTML = members.map(member => this.createMemberCard(member)).join('');
  }

  createMemberCard(person) {
    return `
      <div class="card member-card">
        <img src="${person.photo}" alt="${person.name}" class="pfp">
        <strong>${person.name}</strong>
        <p>${person.role || 'Member'}</p>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <a href="${person.linkedin}" target="_blank" style="flex: 1; padding: 0.5rem; background-color: var(--bg-tertiary); border-radius: 0.5rem; text-decoration: none; color: var(--text-primary); font-size: 0.75rem; text-align: center;">LinkedIn</a>
          <a href="${person.github}" target="_blank" style="flex: 1; padding: 0.5rem; background-color: var(--bg-tertiary); border-radius: 0.5rem; text-decoration: none; color: var(--text-primary); font-size: 0.75rem; text-align: center;">GitHub</a>
        </div>
      </div>
    `;
  }

  handleProjectFilter(e) {
    const filter = e.target.dataset.filter;
    document.querySelectorAll('.project-filters .filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderProjects(filter);
  }

  renderProjects(filter) {
    const container = document.getElementById('projectDisplay');
    let projects = appData.projects;

    if (filter !== 'all') {
      projects = projects.filter(p => p.status === filter);
    }

    container.innerHTML = projects.map(project => this.createProjectCard(project)).join('');
  }

  createProjectCard(project) {
    return `
      <div class="card project-card">
        <div class="project-header">
          <span class="project-status status-${project.status}">
            ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <h3>${project.title}</h3>
        </div>
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">
          <strong>Contributors:</strong> ${project.contributors.join(', ')}
        </p>
        <div class="project-links">
          <a href="${project.github}" target="_blank">View on GitHub</a>
          <a href="${project.demo}" target="_blank">Live Demo</a>
        </div>
      </div>
    `;
  }

  renderResearch() {
    const container = document.getElementById('researchDisplay');
    container.innerHTML = appData.research.map(paper => this.createResearchCard(paper)).join('');
  }

  createResearchCard(paper) {
    return `
      <div class="card research-card">
        <div class="paper-title">${paper.title}</div>
        <div class="paper-authors">${paper.authors}</div>
        <div class="paper-publication">${paper.publication}</div>
        <div class="paper-actions">
          <a href="${paper.pdf}" target="_blank">📄 PDF</a>
          <a href="${paper.arxiv}" target="_blank">📖 arXiv</a>
          <a href="https://doi.org/${paper.doi}" target="_blank">🔗 DOI</a>
        </div>
      </div>
    `;
  }

  handleAchievementTab(e) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.achievement-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderAchievements(type);
  }

  renderAchievements(type) {
    const container = document.getElementById('achievementDisplay');
    const achievements = appData.achievements[type] || [];
    container.innerHTML = achievements.map(achievement => this.createAchievementCard(achievement)).join('');
  }

  createAchievementCard(achievement) {
    return `
      <div class="card achievement-card">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-title">${achievement.title}</div>
        <div class="achievement-year">${achievement.year}</div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
    `;
  }

  handleGameDevTab(e) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.gamedev-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderGameDev(type);
  }

  renderGameDev(type) {
    const container = document.getElementById('gamedevDisplay');
    const data = appData.gameDev[type] || [];
    let html = '';

    if (type === 'members') {
      html = data.map(member => `
        <div class="card member-card">
          <img src="${member.photo}" alt="${member.name}" class="pfp">
          <strong>${member.name}</strong>
        </div>
      `).join('');
    } else if (type === 'projects') {
      html = data.map(proj => `
        <div class="card">
          <h3>${proj.title}</h3>
          <a href="${proj.link}" class="btn btn-secondary">View Project</a>
        </div>
      `).join('');
    } else if (type === 'tools') {
      html = data.map(tool => `
        <div class="card" style="display: flex; align-items: center; justify-content: center; padding: 2rem; min-height: 150px;">
          <strong>${tool}</strong>
        </div>
      `).join('');
    } else if (type === 'events') {
      html = data.map(event => `
        <div class="card">
          <h3>${event.title}</h3>
          <p>📅 ${event.date}</p>
        </div>
      `).join('');
    }

    container.innerHTML = html;
  }

  handleQuestTab(e) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.quest-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderQuestSystem(type);
  }

  renderQuestSystem(type) {
    const container = document.getElementById('questDisplay');
    const data = appData.questSystem[type] || [];
    let html = '';

    if (type === 'leaderboard') {
      html = `
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
              <th>Contributions</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(entry => `
              <tr>
                <td>#${entry.rank}</td>
                <td>${entry.name}</td>
                <td><strong style="color: var(--accent-success);">${entry.points}</strong></td>
                <td>${entry.contributions}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (type === 'contributions') {
      html = data.map(contrib => `
        <div class="card">
          <h3>${contrib.user}</h3>
          <p style="color: var(--text-secondary); margin-bottom: 0.625rem;">${contrib.contribution}</p>
          <p style="color: var(--text-tertiary); font-size: 0.75rem; margin-bottom: 0.5rem;">📅 ${contrib.date}</p>
          <p style="color: var(--accent-success); font-weight: 600;">+${contrib.points} points</p>
        </div>
      `).join('');
    } else if (type === 'winners') {
      html = data.map(winner => `
        <div class="card" style="text-align: center;">
          <h3>🏆 ${winner.month}</h3>
          <p style="color: var(--accent-success); font-size: 1.125rem; margin: 0.625rem 0;">${winner.winner}</p>
          <p style="color: var(--text-secondary);">${winner.reward}</p>
        </div>
      `).join('');
    }

    container.innerHTML = html;
  }

  // ============================================
  // ADMIN PANEL
  // ============================================

  openAdminModal() {
    this.adminModal.style.display = 'flex';
  }

  closeAdminModal() {
    this.adminModal.style.display = 'none';
  }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new DepartmentPortal();
});
