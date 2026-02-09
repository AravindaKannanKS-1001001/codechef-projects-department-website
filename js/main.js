// ============================================
// MAIN APPLICATION - THEME & CORE FUNCTIONALITY
// ============================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);

    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// ============================================
// MAIN DEPARTMENT PORTAL
// ============================================

class DepartmentPortal {
  constructor() {
    this.currentTenure = '2025-26';
    this.currentGroup = 'leads';
    this.recruitBtn = document.getElementById('recruitBtn');
    this.heroRecruitBtn = document.getElementById('heroRecruitBtn');
    this.tenureBtns = document.querySelectorAll('.tenure-btn');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileToggle = document.getElementById('mobileToggle');
    this.navMenu = document.getElementById('navMenu');
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
    // Recruitment buttons
    if (this.recruitBtn) {
      this.recruitBtn.addEventListener('click', () => this.openRecruitement());
    }
    if (this.heroRecruitBtn) {
      this.heroRecruitBtn.addEventListener('click', () => this.openRecruitement());
    }

    // Tenure buttons
    this.tenureBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleTenureChange(e));
    });

    // Carousel buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Member category tabs
    document.querySelectorAll('.category-tabs .tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleMemberTab(e));
    });

    // Project filters
    document.querySelectorAll('.project-filters .filter-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleProjectFilter(e));
    });

    // Achievement tabs
    document.querySelectorAll('.achievement-tabs .tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleAchievementTab(e));
    });

    // Game dev tabs
    document.querySelectorAll('.gamedev-tabs .tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleGameDevTab(e));
    });

    // Quest tabs
    document.querySelectorAll('.quest-tabs .tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleQuestTab(e));
    });
  }

  openRecruitement() {
    window.open('recruitment.html', '_blank', 'width=1200,height=800');
  }

  handleNavClick(e) {
    e.preventDefault();
    this.navLinks.forEach((l) => l.classList.remove('active'));
    e.target.closest('.nav-link').classList.add('active');
    if (this.navMenu) this.navMenu.classList.remove('active');
  }

  toggleMobileMenu() {
    if (this.navMenu) {
      this.navMenu.classList.toggle('active');
    }
  }

  handleTenureChange(e) {
    this.tenureBtns.forEach((btn) => btn.classList.remove('active'));
    e.target.classList.add('active');
    this.currentTenure = e.target.dataset.tenure;
    this.renderMemberDisplay(this.currentGroup);
  }

  handleMemberTab(e) {
    const group = e.target.dataset.group;
    document.querySelectorAll('.category-tabs .tab-btn').forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    this.currentGroup = group;
    this.renderMemberDisplay(group);
  }

  renderMemberDisplay(group) {
    const container = document.getElementById('memberDisplay');
    const members = appData.members[group] || [];

    container.innerHTML = members
      .filter((m) => m.tenure === this.currentTenure)
      .map((member) => this.createMemberCard(member))
      .join('');

    // Reapply animations
    const cards = container.querySelectorAll('.member-card');
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.6s ease-out forwards`;
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  createMemberCard(person) {
    return `
      <div class="card member-card">
        <img src="${person.photo}" alt="${person.name}" class="pfp" loading="lazy">
        <h3>${person.name}</h3>
        <p>${person.role}</p>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <a href="${person.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1; padding: 0.5rem;">LinkedIn</a>
          <a href="${person.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1; padding: 0.5rem;">GitHub</a>
        </div>
      </div>
    `;
  }

  handleProjectFilter(e) {
    const filter = e.target.dataset.filter;
    document.querySelectorAll('.project-filters .filter-btn').forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderProjects(filter);
  }

  renderProjects(filter) {
    const container = document.getElementById('projectDisplay');
    let projects = appData.projects;

    if (filter !== 'all') {
      projects = projects.filter((p) => p.status === filter);
    }

    container.innerHTML = projects.map((project) => this.createProjectCard(project)).join('');

    const cards = container.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.6s ease-out forwards`;
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  createProjectCard(project) {
    return `
      <div class="card project-card">
        <h3>${project.title}</h3>
        <span class="project-status status-${project.status}">
          ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
        <p>${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem;">
          <strong>Contributors:</strong> ${project.contributors.join(', ')}
        </p>
        <div style="display: flex; gap: 0.5rem;">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1;">GitHub</a>
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1;">Demo</a>
        </div>
      </div>
    `;
  }

  renderResearch() {
    const container = document.getElementById('researchDisplay');
    container.innerHTML = appData.research.map((paper) => this.createResearchCard(paper)).join('');

    const cards = container.querySelectorAll('.research-card');
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.6s ease-out forwards`;
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  createResearchCard(paper) {
    return `
      <div class="card research-card">
        <h3>${paper.title}</h3>
        <p><strong>Authors:</strong> ${paper.authors}</p>
        <p><strong>Publication:</strong> ${paper.publication} (${paper.year})</p>
        <div style="display: flex; gap: 0.5rem;">
          <a href="${paper.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">📄 PDF</a>
          <a href="${paper.arxiv}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">📖 arXiv</a>
          <a href="https://doi.org/${paper.doi}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">🔗 DOI</a>
        </div>
      </div>
    `;
  }

  handleAchievementTab(e) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.achievement-tabs .tab-btn').forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderAchievements(type);
  }

  renderAchievements(type) {
    const container = document.getElementById('achievementDisplay');
    const achievements = appData.achievements[type] || [];

    container.innerHTML = achievements.map((achievement) => this.createAchievementCard(achievement)).join('');

    const cards = container.querySelectorAll('.achievement-card');
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.6s ease-out forwards`;
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  createAchievementCard(achievement) {
    return `
      <div class="card achievement-card">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">${achievement.icon}</div>
        <h3>${achievement.title}</h3>
        <p style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">${achievement.year}</p>
        <p>${achievement.description}</p>
      </div>
    `;
  }

  handleGameDevTab(e) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.gamedev-tabs .tab-btn').forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderGameDev(type);
  }

  renderGameDev(type) {
    const container = document.getElementById('gamedevDisplay');
    const data = appData.gameDev[type] || [];
    let html = '';

    if (type === 'members') {
      html = data.map((member) => `
        <div class="card member-card">
          <img src="${member.photo}" alt="${member.name}" class="pfp" loading="lazy">
          <h3>${member.name}</h3>
        </div>
      `).join('');
    } else if (type === 'projects') {
      html = data.map((proj) => `
        <div class="card">
          <h3>${proj.title}</h3>
          <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View Project</a>
        </div>
      `).join('');
    } else if (type === 'tools') {
      html = data.map((tool) => `
        <div class="card" style="display: flex; align-items: center; justify-content: center; padding: 2rem; min-height: 150px;">
          <strong>${tool}</strong>
        </div>
      `).join('');
    } else if (type === 'events') {
      html = data.map((event) => `
        <div class="card">
          <h3>${event.title}</h3>
          <p>📅 ${event.date}</p>
        </div>
      `).join('');
    }

    container.innerHTML = html;

    const cards = container.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.6s ease-out forwards`;
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  handleQuestTab(e) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.quest-tabs .tab-btn').forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderQuestSystem(type);
  }

  renderQuestSystem(type) {
    const container = document.getElementById('questDisplay');
    const data = appData.questSystem[type] || [];
    let html = '';

    if (type === 'leaderboard') {
      html = `
        <div class="leaderboard-table" style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color);">
                <th style="padding: 1rem; text-align: left;">Rank</th>
                <th style="padding: 1rem; text-align: left;">Name</th>
                <th style="padding: 1rem; text-align: left;">Points</th>
                <th style="padding: 1rem; text-align: left;">Contributions</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((entry) => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 1rem;">#${entry.rank}</td>
                  <td style="padding: 1rem;">${entry.name}</td>
                  <td style="padding: 1rem;"><strong style="color: var(--accent-success);">${entry.points}</strong></td>
                  <td style="padding: 1rem;">${entry.contributions}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (type === 'contributions') {
      html = data.map((contrib) => `
        <div class="card">
          <h3>${contrib.user}</h3>
          <p style="color: var(--text-secondary); margin-bottom: 0.625rem;">${contrib.contribution}</p>
          <p style="color: var(--text-tertiary); font-size: 0.875rem; margin-bottom: 0.5rem;">📅 ${contrib.date}</p>
          <p style="color: var(--accent-success); font-weight: 600;">+${contrib.points} points</p>
        </div>
      `).join('');
    } else if (type === 'winners') {
      html = data.map((winner) => `
        <div class="card" style="text-align: center;">
          <h3>🏆 ${winner.month}</h3>
          <p style="color: var(--accent-success); font-size: 1.125rem; margin: 0.625rem 0;">${winner.winner}</p>
          <p style="color: var(--text-secondary);">${winner.reward}</p>
        </div>
      `).join('');
    }

    container.innerHTML = html;
  }

  previousSlide() {
    const carousel = document.getElementById('peopleCarousel');
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  nextSlide() {
    const carousel = document.getElementById('peopleCarousel');
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new DepartmentPortal();
});