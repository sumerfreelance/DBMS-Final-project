document.addEventListener('DOMContentLoaded', function() {
    const pendingComplaintsTableBody = document.getElementById('pendingComplaintsTableBody');
    const resolvedComplaintsTableBody = document.getElementById('resolvedComplaintsTableBody');
  
    let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
  
    function addComplaintToTable(complaint, tableBody, status) {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${complaint.username}</td>
        <td>${complaint.email}</td>
        <td>${complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}</td>
        <td>${complaint.complaint}</td>
        <td><span class="badge ${status === 'pending' ? 'badge-warning' : 'badge-success'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
        ${status === 'pending' ? `
          <td>
            <button class="btn btn-success btn-sm mark-resolved">Resolve</button>
            <button class="btn btn-danger btn-sm delete-complaint">Delete</button>
          </td>
        ` : '<td></td>'}
      `;
  
      if (status === 'pending') {
        // Add event listeners for the buttons
        row.querySelector('.mark-resolved').addEventListener('click', () => {
          complaint.status = 'resolved';
          localStorage.setItem('complaints', JSON.stringify(complaints));
          renderTables();
        });
  
        row.querySelector('.delete-complaint').addEventListener('click', () => {
          complaints = complaints.filter(c => c !== complaint);
          localStorage.setItem('complaints', JSON.stringify(complaints));
          renderTables();
        });
      }
  
      tableBody.appendChild(row);
    }
  
    function renderTables() {
      pendingComplaintsTableBody.innerHTML = '';
      resolvedComplaintsTableBody.innerHTML = '';
  
      complaints.forEach(complaint => {
        if (complaint.status === 'resolved') {
          addComplaintToTable(complaint, resolvedComplaintsTableBody, 'resolved');
        } else {
          addComplaintToTable(complaint, pendingComplaintsTableBody, 'pending');
        }
      });
    }
  
    complaints.forEach(complaint => {
      if (!complaint.status) complaint.status = 'pending';
    });
  
    renderTables();
  });  