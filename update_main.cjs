const fs = require('fs');

const mainJsPath = 'src/main.js';
let content = fs.readFileSync(mainJsPath, 'utf8');

// 1. Add imports to the top
const imports = `import { db } from './firebase.js';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
`;
content = imports + content;

// 2. Add ADMIN button
const searchStr = `<span class="demobook-card-arrow">➔</span>
            </div>
          </a>`;
const replaceStr = `<span class="demobook-card-arrow">➔</span>
            </div>
          </a>
          <button class="admin-btn" id="openAdminBtn">ADMIN</button>`;
content = content.replace(searchStr, replaceStr);

// 3. Append Admin Panel logic at the very end
const adminLogic = `
// --- Admin Panel Logic ---
window.openAdminModal = async function() {
  let overlay = document.getElementById('adminModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'adminModal';
    overlay.className = 'admin-modal-overlay';
    overlay.innerHTML = \`
      <div class="admin-modal-content">
        <div class="admin-modal-header">
          <h2>Registros de Bienestar</h2>
          <button class="admin-close-btn" onclick="closeAdminModal()">×</button>
        </div>
        <div class="admin-modal-body">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Asesor</th>
                <th>Padre/Madre</th>
                <th>Celular</th>
                <th>Hijo/a</th>
                <th>Edad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="adminTableBody">
              <tr><td colspan="6">Cargando datos...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    \`;
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  await fetchAdminData();
};

window.closeAdminModal = function() {
  const overlay = document.getElementById('adminModal');
  if (overlay) overlay.style.display = 'none';
};

window.fetchAdminData = async function() {
  const tbody = document.getElementById('adminTableBody');
  try {
    const querySnapshot = await getDocs(collection(db, "bienestar_diagnostics"));
    let html = '';
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      html += \`
        <tr id="row-\${doc.id}">
          <td><input type="text" value="\${data.asesor || ''}" onchange="updateRecord('\${doc.id}', 'asesor', this.value)" /></td>
          <td>\${data.nombrePadres || ''}</td>
          <td>\${data.celular || ''}</td>
          <td>\${data.nombreHijo || ''}</td>
          <td>\${data.edadHijo || ''}</td>
          <td>
            <button class="admin-action-btn admin-delete-btn" onclick="deleteRecord('\${doc.id}')">🗑️</button>
          </td>
        </tr>
      \`;
    });
    tbody.innerHTML = html || '<tr><td colspan="6">No hay registros</td></tr>';
  } catch(e) {
    tbody.innerHTML = \`<tr><td colspan="6" style="color:red">Error al cargar datos: \${e.message}</td></tr>\`;
  }
};

window.deleteRecord = async function(id) {
  if (confirm('¿Seguro que deseas eliminar este registro?')) {
    try {
      await deleteDoc(doc(db, "bienestar_diagnostics", id));
      document.getElementById('row-' + id).remove();
    } catch(e) {
      alert('Error eliminando: ' + e.message);
    }
  }
};

window.updateRecord = async function(id, field, value) {
  try {
    const ref = doc(db, "bienestar_diagnostics", id);
    await updateDoc(ref, { [field]: value });
  } catch(e) {
    alert('Error editando: ' + e.message);
  }
};

// Listen for clicks on the newly added openAdminBtn (which might be destroyed and recreated)
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'openAdminBtn') {
    openAdminModal();
  }
});
`;

content += adminLogic;

fs.writeFileSync(mainJsPath, content);
console.log('Successfully updated main.js');
