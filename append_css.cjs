const fs = require('fs');

const css = `
/* --- Admin Panel --- */
.admin-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 8px;
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;
  align-self: flex-start;
}
.admin-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
.admin-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.admin-modal-content {
  background: rgba(25, 25, 35, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 90%;
  max-width: 1000px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  overflow: hidden;
  color: white;
}
.admin-modal-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-modal-header h2 { margin: 0; font-size: 1.5rem; }
.admin-close-btn {
  background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;
}
.admin-modal-body {
  padding: 20px;
  overflow-y: auto;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.admin-table th, .admin-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.admin-table th {
  color: rgba(255,255,255,0.5);
  font-weight: normal;
}
.admin-table tbody tr:hover {
  background: rgba(255,255,255,0.03);
}
.admin-table input {
  background: transparent;
  border: 1px solid transparent;
  color: white;
  width: 100%;
  padding: 4px;
}
.admin-table input:focus {
  border: 1px solid rgba(255,255,255,0.3);
  outline: none;
  background: rgba(0,0,0,0.2);
}
.admin-action-btn {
  background: none; border: none; cursor: pointer; padding: 4px; color: #aaa;
}
.admin-action-btn:hover { color: white; }
.admin-delete-btn:hover { color: #ff4444; }
`;

fs.appendFileSync('src/style.css', css);
console.log('Appended to style.css');
