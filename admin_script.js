document.addEventListener('DOMContentLoaded', function() {
  const pendingComplaintsTableBody = document.getElementById('pendingComplaintsTableBody');
  const resolvedComplaintsTableBody = document.getElementById('resolvedComplaintsTableBody');
  const deletedComplaintsTableBody = document.getElementById('deletedComplaintsTableBody');

  let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

  function addComplaintToTable(complaint, tableBody, status) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${complaint.username}</td>
      <td>${complaint.email}</td>
      <td>${complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}</td>
      <td>${complaint.complaint}</td>
      <td><span class="badge ${status === 'pending' ? 'badge-warning' : status === 'resolved' ? 'badge-success' : 'badge-danger'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
      ${status === 'pending' ? `
        <td>
          <button class="btn btn-success btn-sm mark-resolved">Resolve</button>
          <button class="btn btn-danger btn-sm delete-complaint">Delete</button>
        </td>
      ` : '<td></td>'}
    `;

    if (status === 'pending') {
      row.querySelector('.mark-resolved').addEventListener('click', () => {
        complaint.status = 'resolved';
        localStorage.setItem('complaints', JSON.stringify(complaints));
        renderTables();
      });

      row.querySelector('.delete-complaint').addEventListener('click', () => {
        complaint.status = 'deleted';
        localStorage.setItem('complaints', JSON.stringify(complaints));
        renderTables();
      });
    }

    tableBody.appendChild(row);
  }

  function renderTables() {
    pendingComplaintsTableBody.innerHTML = '';
    resolvedComplaintsTableBody.innerHTML = '';
    deletedComplaintsTableBody.innerHTML = '';

    complaints.forEach(complaint => {
      if (complaint.status === 'resolved') {
        addComplaintToTable(complaint, resolvedComplaintsTableBody, 'resolved');
      } else if (complaint.status === 'deleted') {
        addComplaintToTable(complaint, deletedComplaintsTableBody, 'deleted');
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