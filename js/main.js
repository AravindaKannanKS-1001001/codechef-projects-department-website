// ============================================
// MAIN APPLICATION LOGIC
// ============================================

class DepartmentPortal {
  constructor() {
    this.currentGroup = 'leads';
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

  // ============================================
  // EVENT LISTENERS
  // ============================================

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Member category tabs
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

    // Quest system tabs
    document.querySelectorAll('.quest-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleQuestTab(e));
    });

    // Recruitment form
    const recruitForm = document.getElementById('recruitForm');
    if (recruitForm) {
      recruitForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Admin panel
    document.getElementById('adminToggle').addEventListener('click', () => this.openAdminModal());
    document.querySelector('.close-modal').addEventListener('click', () => this.closeAdminModal());
  }

  // ============================================
  // NAVIGATION
  // ============================================

  handleNavClick(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    e.target.closest('.nav-link').classList.add('active');
  }

  // ============================================
  // MEMBERS RENDERING
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

    container.innerHTML = members
      .map(member => this.createMemberCard(member))
      .join('');
  }

  createMemberCard(person) {
    return `
      <div class="card member-card">
        <img src="${person.photo}" alt="${person.name}" class="pfp">
        <strong>${person.name}</strong>
        <p>${person.role || 'Member'}</p>
        <div class="overlay">
          <a class="linkedin" href="${person.linkedin}" target="_blank">
            <svg viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.05 0 6 3.3 6 7.6V24h-5v-7.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24H8z"/></svg> LinkedIn
          </a>
          <a class="github" href="${person.github}" target="_blank">
            <svg viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.5-.3-5.1-1.3-5.1-5.7 0-1.3.4-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.4-2.6 5.4-5.1 5.7.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg> GitHub
          </a>
        </div>
      </div>
    `;
  }

  // ============================================
  // PROJECTS RENDERING
  // ============================================

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

    container.innerHTML = projects
      .map(project => this.createProjectCard(project))
      .join('');
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
        <p style="color: #9ca3af; font-size: 12px; margin-bottom: 12px;">
          <strong>Contributors:</strong> ${project.contributors.join(', ')}
        </p>
        <div class="project-links">
          <a href="${project.github}" target="_blank">View on GitHub</a>
          <a href="${project.demo}" target="_blank">Live Demo</a>
        </div>
      </div>
    `;
  }

  // ============================================
  // RESEARCH RENDERING
  // ============================================

  renderResearch() {
    const container = document.getElementById('researchDisplay');
    
    container.innerHTML = appData.research
      .map(paper => this.createResearchCard(paper))
      .join('');
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

  // ============================================
  // ACHIEVEMENTS RENDERING
  // ============================================

  handleAchievementTab(e) {
    const type = e.target.dataset.type;
    document.querySelectorAll('.achievement-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    this.renderAchievements(type);
  }

  renderAchievements(type) {
    const container = document.getElementById('achievementDisplay');
    const achievements = appData.achievements[type] || [];

    container.innerHTML = achievements
      .map(achievement => this.createAchievementCard(achievement))
      .join('');
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

  // ============================================
  // GAME DEV RENDERING
  // ============================================

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
        <div class="card" style="display: flex; align-items: center; justify-content: center; padding: 30px;">
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

  // ============================================
  // QUEST SYSTEM RENDERING
  // ============================================

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
        <table class="leaderboard-table" style="width: 100%; margin-top: 20px;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255,255,255,0.1);">
              <th style="padding: 12px; text-align: left;">Rank</th>
              <th style="padding: 12px; text-align: left;">Name</th>
              <th style="padding: 12px; text-align: left;">Points</th>
              <th style="padding: 12px; text-align: left;">Contributions</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(entry => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 12px;">#${entry.rank}</td>
                <td style="padding: 12px;">${entry.name}</td>
                <td style="padding: 12px;"><strong style="color: #4ade80;">${entry.points}</strong></td>
                <td style="padding: 12px;">${entry.contributions}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (type === 'contributions') {
      html = data.map(contrib => `
        <div class="card">
          <h3>${contrib.user}</h3>
          <p style="color: #d1d5db; margin-bottom: 10px;">${contrib.contribution}</p>
          <p style="color: #6b7280; font-size: 12px; margin-bottom: 8px;">📅 ${contrib.date}</p>
          <p style="color: #4ade80; font-weight: 600;">+${contrib.points} points</p>
        </div>
      `).join('');
    } else if (type === 'winners') {
      html = data.map(winner => `
        <div class="card" style="text-align: center;">
          <h3>🏆 ${winner.month}</h3>
          <p style="color: #4ade80; font-size: 18px; margin: 10px 0;">${winner.winner}</p>
          <p style="color: #d1d5db;">${winner.reward}</p>
        </div>
      `).join('');
    }

    container.innerHTML = html;
  }

  // ============================================
  // FORM HANDLING
  // ============================================

  handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(document.getElementById('recruitForm'));
    const data = Object.fromEntries(formData);

    console.log('Application submitted:', data);
    alert('Thank you for your application! We will review it and contact you soon.');
    
    document.getElementById('recruitForm').reset();
  }

  // ============================================
  // ADMIN PANEL
  // ============================================

  openAdminModal() {
    document.getElementById('adminModal').style.display = 'flex';
  }

  closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
  }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  new DepartmentPortal();
});