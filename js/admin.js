// ============================================
// ADMIN PANEL MANAGEMENT
// ============================================

class AdminPanel {
  constructor() {
    this.adminTabs = document.querySelectorAll('.admin-tab-btn');
    this.adminTabContents = document.querySelectorAll('.admin-tab-content');
    this.addMemberForm = document.getElementById('addMemberForm');
    this.editContentForm = document.getElementById('editContentForm');
    this.addProjectForm = document.getElementById('addProjectForm');
    this.membersList = document.getElementById('membersList');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadMembers();
  }

  setupEventListeners() {
    // Tab switching
    this.adminTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => this.switchTab(e));
    });

    // Form submissions
    if (this.addMemberForm) {
      this.addMemberForm.addEventListener('submit', (e) =>
        this.handleAddMember(e)
      );
    }

    if (this.editContentForm) {
      this.editContentForm.addEventListener('submit', (e) =>
        this.handleEditContent(e)
      );
    }

    if (this.addProjectForm) {
      this.addProjectForm.addEventListener('submit', (e) =>
        this.handleAddProject(e)
      );
    }
  }

  switchTab(e) {
    const tabName = e.target.dataset.tab;

    this.adminTabs.forEach((tab) => tab.classList.remove('active'));
    e.target.classList.add('active');

    this.adminTabContents.forEach((content) => {
      content.classList.remove('active');
      if (content.dataset.tab === tabName) {
        content.classList.add('active');
        content.style.animation = 'fadeInUp 0.3s ease-out';
      }
    });
  }

  handleAddMember(e) {
    e.preventDefault();

    const formData = new FormData(this.addMemberForm);
    const member = {
      id: Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      group: formData.get('group'),
      tenure: formData.get('tenure'),
      linkedin: formData.get('linkedin'),
      github: formData.get('github'),
      photo: formData.get('photo') || 'https://via.placeholder.com/140'
    };

    // Get existing members
    let members = JSON.parse(localStorage.getItem('members')) || {};

    if (!members[member.tenure]) {
      members[member.tenure] = {};
    }

    if (!members[member.tenure][member.group]) {
      members[member.tenure][member.group] = [];
    }

    members[member.tenure][member.group].push(member);
    localStorage.setItem('members', JSON.stringify(members));

    this.showNotification(`${member.name} added successfully!`, 'success');
    this.addMemberForm.reset();
    this.loadMembers();
  }

  handleEditContent(e) {
    e.preventDefault();

    const formData = new FormData(this.editContentForm);
    const content = {
      section: formData.get('section'),
      content: formData.get('content')
    };

    let contentData = JSON.parse(localStorage.getItem('contentData')) || {};
    contentData[content.section] = content.content;
    localStorage.setItem('contentData', JSON.stringify(contentData));

    this.showNotification('Content updated successfully!', 'success');
    this.editContentForm.reset();
  }

  handleAddProject(e) {
    e.preventDefault();

    const formData = new FormData(this.addProjectForm);
    const project = {
      id: Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      technologies: formData.get('technologies').split(',').map(t => t.trim()),
      github: formData.get('github'),
      demo: formData.get('demo'),
      status: formData.get('status'),
      contributors: ['Admin']
    };

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    this.showNotification(`Project "${project.title}" added successfully!`, 'success');
    this.addProjectForm.reset();
  }

  loadMembers() {
    const members = JSON.parse(localStorage.getItem('members')) || {};
    let html = '';

    for (const tenure in members) {
      for (const group in members[tenure]) {
        members[tenure][group].forEach((member) => {
          html += `
            <div class="member-item" style="
              padding: 1rem;
              margin-bottom: 1rem;
              background: var(--bg-tertiary);
              border-radius: 0.5rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-left: 4px solid var(--accent-primary);
            ">
              <div>
                <strong>${member.name}</strong>
                <p style="color: var(--text-secondary); margin: 0.25rem 0; font-size: 0.875rem;">
                  ${member.role} • ${member.group} • ${member.tenure}
                </p>
              </div>
              <button class="btn btn-danger" onclick="adminPanel.deleteMember(${member.id})">
                Remove
              </button>
            </div>
          `;
        });
      }
    }

    if (html) {
      this.membersList.innerHTML = html;
    } else {
      this.membersList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No members added yet.</p>';
    }
  }

  deleteMember(id) {
    const members = JSON.parse(localStorage.getItem('members')) || {};

    for (const tenure in members) {
      for (const group in members[tenure]) {
        members[tenure][group] = members[tenure][group].filter(
          (m) => m.id !== id
        );
      }
    }

    localStorage.setItem('members', JSON.stringify(members));
    this.showNotification('Member removed successfully!', 'success');
    this.loadMembers();
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
      background: ${
        type === 'success'
          ? '#10b981'
          : type === 'error'
          ? '#ef4444'
          : '#3b82f6'
      };
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

let adminPanel;

document.addEventListener('DOMContentLoaded', () => {
  adminPanel = new AdminPanel();
});