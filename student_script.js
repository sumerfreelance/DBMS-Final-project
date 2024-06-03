document.addEventListener('DOMContentLoaded', function() {
    const submitComplaintForm = document.getElementById('submitComplaint');
    let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
  
    submitComplaintForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const category = document.getElementById('category').value;
      const complaint = document.getElementById('complaint').value;
  
      const newComplaint = { username, email, category, complaint, status: 'pending' };
  
      complaints.push(newComplaint);
      localStorage.setItem('complaints', JSON.stringify(complaints));
  
      alert('Complaint submitted successfully!');
      submitComplaintForm.reset();
    });
  });  