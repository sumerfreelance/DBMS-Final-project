document.addEventListener('DOMContentLoaded', function() {
  const adminLoginForm = document.getElementById('adminLoginForm');
  const studentLoginForm = document.getElementById('studentLoginForm');
  const loginError = document.getElementById('loginError');

  const users = [
    { email: 'admin@university.edu', password: 'adminpass', role: 'admin' },
    { email: 'student1@university.edu', password: 'password123', role: 'student' },
    { email: 'student2@university.edu', password: 'password456', role: 'student' }
  ];

  function handleLogin(e, role) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    const user = users.find(user => user.email === email && user.password === password && user.role === role);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      if (role === 'admin') {
        window.location.href = 'admin_dashboard.html';
      } else if (role === 'student') {
        window.location.href = 'student_dashboard.html';
      }
    } else {
      loginError.style.display = 'block';
    }
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
      handleLogin(e, 'admin');
    });
  }

  if (studentLoginForm) {
    studentLoginForm.addEventListener('submit', function(e) {
      handleLogin(e, 'student');
    });
  }
});