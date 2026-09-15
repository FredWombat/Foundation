// État global de l'éditeur
let currentEditingLink = null;
let editorLinksData = JSON.parse(JSON.stringify(linksData)); // Copie pour localStorage

// Initialiser localStorage
function initializeLocalStorage() {
  const stored = localStorage.getItem('editorLinksData');
  if (stored) {
    try {
      editorLinksData = JSON.parse(stored);
    } catch (e) {
      console.error('Erreur lors de la lecture de localStorage:', e);
    }
  }
}

// Sauvegarder dans localStorage
function saveToLocalStorage() {
  localStorage.setItem('editorLinksData', JSON.stringify(editorLinksData));
}

// Remplir les dropdowns de catégories
function populateCategories() {
  const categories = getCategories();
  const addCategorySelect = document.getElementById('addCategory');
  
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = getDisplayName(cat);
    addCategorySelect.appendChild(option);
  });

  // Event listener pour mettre à jour les sous-catégories
  addCategorySelect.addEventListener('change', () => {
    populateSubcategories('add', addCategorySelect.value);
  });
}

// Remplir les dropdowns de sous-catégories
function populateSubcategories(mode, category) {
  const subcategories = getSubcategories(category);
  const subcatSelect = document.getElementById(`${mode}Subcategory`);
  
  subcatSelect.innerHTML = '<option value="">-- Sélectionner --</option>';
  
  subcategories.forEach(subcat => {
    const option = document.createElement('option');
    option.value = subcat;
    option.textContent = getDisplayName(subcat);
    subcatSelect.appendChild(option);
  });
}

// Remplir les checkboxes de types
function populateTypes() {
  const typeGroup = document.getElementById('addTypeGroup');
  typeGroup.innerHTML = '';
  
  Object.keys(typeEmojis).forEach(type => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = type;
    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${typeEmojis[type]} ${type}`));
    typeGroup.appendChild(label);
  });
}

// Obtenir l'ID suivant
function getNextId() {
  const maxId = Math.max(...editorLinksData.map(l => l.id), 0);
  return maxId + 1;
}

// Ajouter un lien
function addLink(e) {
  e.preventDefault();
  
  const category = document.getElementById('addCategory').value;
  const subcategory = document.getElementById('addSubcategory').value;
  const title = document.getElementById('addTitle').value;
  const url = document.getElementById('addUrl').value;
  const source = document.getElementById('addSource').value;
  const level = parseInt(document.getElementById('addLevel').value);
  const tagsInput = document.getElementById('addTags').value;
  
  // Récupérer les types cochés
  const typeCheckboxes = document.querySelectorAll('#addTypeGroup input[type="checkbox"]:checked');
  const type = Array.from(typeCheckboxes).map(cb => cb.value);
  
  // Traiter les tags
  const tags = tagsInput.trim().split(',').map(t => t.trim()).filter(t => t);
  
  if (!category || !subcategory || !title || !url || type.length === 0) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }
  
  const newLink = {
    category,
    subcategory,
    id: getNextId(),
    title,
    url,
    level,
    type,
    source,
    tags
  };
  
  editorLinksData.push(newLink);
  saveToLocalStorage();
  
  // Réinitialiser le formulaire
  document.getElementById('addLinkForm').reset();
  
  alert(`Lien créé avec l'ID ${newLink.id}`);
  refreshSearchResults();
}

// Afficher les résultats de recherche
function refreshSearchResults(query = '') {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
  
  const filtered = editorLinksData.filter(link => {
    const searchStr = query.toLowerCase();
    return link.title.toLowerCase().includes(searchStr) ||
           link.id.toString().includes(searchStr) ||
           link.category.toLowerCase().includes(searchStr);
  });
  
  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<p class="empty-message">Aucun résultat</p>';
    return;
  }
  
  filtered.forEach(link => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    if (currentEditingLink && currentEditingLink.id === link.id) {
      item.classList.add('selected');
    }
    item.innerHTML = `
      <strong>#${link.id}</strong> - ${link.title}
      <div class="search-result-meta">${getDisplayName(link.category)} > ${getDisplayName(link.subcategory)}</div>
    `;
    item.addEventListener('click', () => selectLink(link));
    resultsContainer.appendChild(item);
  });
}

// Sélectionner un lien pour édition
function selectLink(link) {
  currentEditingLink = JSON.parse(JSON.stringify(link));
  refreshSearchResults(document.getElementById('searchInput').value);
  displayEditForm();
}

// Afficher le formulaire d'édition
function displayEditForm() {
  const editContent = document.getElementById('editContent');
  
  if (!currentEditingLink) {
    editContent.innerHTML = '<p class="empty-message">Sélectionnez un lien pour l\'éditer</p>';
    return;
  }
  
  const link = currentEditingLink;
  
  const typeOptions = Object.keys(typeEmojis)
    .map(type => `
      <label>
        <input type="checkbox" value="${type}" ${link.type.includes(type) ? 'checked' : ''}>
        ${typeEmojis[type]} ${type}
      </label>
    `).join('');
  
  editContent.innerHTML = `
    <div class="edit-form">
      <h2>Éditer le lien #${link.id}</h2>
      
      <div class="edit-form-group">
        <label>ID (non-modifiable)</label>
        <input type="text" value="${link.id}" disabled>
      </div>
      
      <div class="edit-form-group">
        <label>Catégorie</label>
        <select id="editCategory">
          ${getCategories().map(cat => `
            <option value="${cat}" ${cat === link.category ? 'selected' : ''}>
              ${getDisplayName(cat)}
            </option>
          `).join('')}
        </select>
      </div>
      
      <div class="edit-form-group">
        <label>Sous-catégorie</label>
        <select id="editSubcategory">
          ${getSubcategories(link.category).map(subcat => `
            <option value="${subcat}" ${subcat === link.subcategory ? 'selected' : ''}>
              ${getDisplayName(subcat)}
            </option>
          `).join('')}
        </select>
      </div>
      
      <div class="edit-form-group">
        <label>Titre</label>
        <input type="text" id="editTitle" value="${link.title}">
      </div>
      
      <div class="edit-form-group">
        <label>URL</label>
        <input type="url" id="editUrl" value="${link.url}">
      </div>
      
      <div class="edit-form-group">
        <label>Source</label>
        <input type="text" id="editSource" value="${link.source}">
      </div>
      
      <div class="edit-form-group">
        <label>Niveau</label>
        <select id="editLevel">
          <option value="1" ${link.level === 1 ? 'selected' : ''}>Débutant</option>
          <option value="2" ${link.level === 2 ? 'selected' : ''}>Intermédiaire</option>
          <option value="3" ${link.level === 3 ? 'selected' : ''}>Spécialiste</option>
        </select>
      </div>
      
      <div class="edit-form-group">
        <label>Types</label>
        <div class="checkbox-group">
          ${typeOptions}
        </div>
      </div>
      
      <div class="edit-form-group">
        <label>Tags (séparés par virgule)</label>
        <input type="text" id="editTags" value="${link.tags.join(', ')}">
      </div>
      
      <div class="edit-form-actions">
        <button class="btn btn-save" id="saveEditBtn">💾 Sauvegarder</button>
        <button class="btn btn-delete" id="deleteEditBtn">🗑️ Supprimer</button>
      </div>
    </div>
  `;
  
  // Event listeners
  document.getElementById('editCategory').addEventListener('change', (e) => {
    const subSelect = document.getElementById('editSubcategory');
    const subcats = getSubcategories(e.target.value);
    subSelect.innerHTML = subcats.map(subcat => `
      <option value="${subcat}">${getDisplayName(subcat)}</option>
    `).join('');
  });
  
  document.getElementById('saveEditBtn').addEventListener('click', saveEdit);
  document.getElementById('deleteEditBtn').addEventListener('click', deleteLink);
}

// Sauvegarder l'édition
function saveEdit() {
  if (!currentEditingLink) return;
  
  const category = document.getElementById('editCategory').value;
  const subcategory = document.getElementById('editSubcategory').value;
  const title = document.getElementById('editTitle').value;
  const url = document.getElementById('editUrl').value;
  const source = document.getElementById('editSource').value;
  const level = parseInt(document.getElementById('editLevel').value);
  const tagsInput = document.getElementById('editTags').value;
  
  const typeCheckboxes = document.querySelectorAll('.edit-form-group .checkbox-group input[type="checkbox"]:checked');
  const type = Array.from(typeCheckboxes).map(cb => cb.value);
  
  const tags = tagsInput.trim().split(',').map(t => t.trim()).filter(t => t);
  
  if (!category || !subcategory || !title || !url || type.length === 0) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }
  
  // Trouver et mettre à jour le lien
  const index = editorLinksData.findIndex(l => l.id === currentEditingLink.id);
  if (index !== -1) {
    editorLinksData[index] = {
      category,
      subcategory,
      id: currentEditingLink.id,
      title,
      url,
      level,
      type,
      source,
      tags
    };
    
    currentEditingLink = editorLinksData[index];
    saveToLocalStorage();
    alert('Lien sauvegardé!');
    displayEditForm();
  }
}

// Supprimer un lien
function deleteLink() {
  if (!currentEditingLink) return;
  
  if (!confirm(`Êtes-vous sûr de vouloir supprimer le lien "${currentEditingLink.title}"?`)) {
    return;
  }
  
  editorLinksData = editorLinksData.filter(l => l.id !== currentEditingLink.id);
  saveToLocalStorage();
  currentEditingLink = null;
  alert('Lien supprimé');
  refreshSearchResults();
  document.getElementById('editContent').innerHTML = '<p class="empty-message">Sélectionnez un lien pour l\'éditer</p>';
}

// Générer le code .js complet (CORRIGÉ)
function generateJSCode() {
  // Générer displayNames comme objet JavaScript propre
  let displayNamesCode = '{\n';
  const displayNamesEntries = Object.entries(displayNames);
  displayNamesEntries.forEach(([key, value], index) => {
    // Échapper les guillemets et caractères spéciaux
    const escapedValue = value.replace(/"/g, '\\"');
    const isLast = index === displayNamesEntries.length - 1;
    displayNamesCode += `  "${key}": "${escapedValue}"${isLast ? '' : ','}\n`;
  });
  displayNamesCode += '}';
  
  // Générer linksData avec JSON.stringify
  const linksDataCode = JSON.stringify(editorLinksData, null, 2);
  
  return `// Mapping: variable name → affichage français
const displayNames = ${displayNamesCode};

const linksData = ${linksDataCode};
`;
}

// Exporter en .js
function exportJS() {
  const jsCode = generateJSCode();
  const dataBlob = new Blob([jsCode], { type: 'text/javascript' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'link-data.js';
  link.click();
  URL.revokeObjectURL(url);
}

// Importer .js ou .json
function importFile() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
  
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        let imported = null;
        
        if (file.name.endsWith('.json')) {
          // Import JSON directement
          imported = JSON.parse(content);
        } else if (file.name.endsWith('.js')) {
          // Essayer de trouver const linksData
          let match = content.match(/const linksData = (\[[\s\S]*\]);/);
          if (!match) {
            // Si pas trouvé, chercher juste le tableau JSON
            match = content.match(/(\[[\s\S]*\]);/);
          }
          if (match) {
            imported = JSON.parse(match[1]);
          } else {
            throw new Error('Format .js non reconnu: const linksData = [...] introuvable');
          }
        }
        
        if (Array.isArray(imported)) {
          editorLinksData = imported;
          saveToLocalStorage();
          alert('Données importées avec succès!');
          refreshSearchResults();
        } else {
          alert('Format invalide');
        }
      } catch (e) {
        alert('Erreur lors de la lecture du fichier: ' + e.message);
      }
    };
    reader.readAsText(file);
  }, { once: true });
}

// Réinitialiser
function reset() {
  if (confirm('Êtes-vous sûr? Cette action supprimera tous vos changements locaux.')) {
    editorLinksData = JSON.parse(JSON.stringify(linksData));
    saveToLocalStorage();
    alert('Réinitialisé');
    currentEditingLink = null;
    refreshSearchResults();
    document.getElementById('editContent').innerHTML = '<p class="empty-message">Sélectionnez un lien pour l\'éditer</p>';
  }
}

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
  initializeLocalStorage();
  
  // Remplir les catégories
  populateCategories();
  populateTypes();
  
  // Event listeners
  document.getElementById('addLinkForm').addEventListener('submit', addLink);
  document.getElementById('searchInput').addEventListener('input', (e) => {
    refreshSearchResults(e.target.value);
  });
  
  document.getElementById('exportBtn').addEventListener('click', exportJS);
  document.getElementById('importBtn').addEventListener('click', importFile);
  document.getElementById('resetBtn').addEventListener('click', reset);
  
  // Afficher les résultats initialement
  refreshSearchResults();
});