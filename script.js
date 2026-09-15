// Mapping texte -> emoji
const typeEmojis = {
  "video": "🎥",
  "article": "📄",
  "etude": "📊",
  "reglementation": "⚖️",
  "ressource": "🗺️",
  "social": "🐦"
};

// Normaliser category: string ou array → toujours array
function normalizeCategory(category) {
  return Array.isArray(category) ? category : [category];
}

// Extraire les catégories uniques de linksData
function getCategories() {
  const categories = new Set();
  linksData.forEach(link => {
    if (link.category) {
      const cats = normalizeCategory(link.category);
      cats.forEach(cat => categories.add(cat));
    }
  });
  return Array.from(categories);
}

// Extraire les sous-catégories uniques de linksData
function getSubcategories(category = null) {
  const subcategories = new Set();
  linksData.forEach(link => {
    if (category === null) {
      if (link.subcategory) {
        subcategories.add(link.subcategory);
      }
    } else {
      const cats = normalizeCategory(link.category);
      if (cats.includes(category) && link.subcategory) {
        subcategories.add(link.subcategory);
      }
    }
  });
  return Array.from(subcategories);
}

// Obtenir le nom d'affichage (avec fallback sur le nom variable)
function getDisplayName(name) {
  return displayNames[name] || name;
}

// Extract YouTube video ID from URL
function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Get YouTube thumbnail URL
function getYouTubeThumbnail(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

// Get emoji from type array
function getEmojiFallback(types) {
  if (types && types.length > 0) {
    return typeEmojis[types[0]] || "🔗";
  }
  return "🔗";
}

// Generate thumbnail for a link
function createThumbnailCard(link) {
  const card = document.createElement('a');
  card.href = link.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = `thumbnail-card level-${link.level}`;
  card.dataset.level = link.level;
  card.id = link.id;

  // Check if URL is YouTube
  const youtubeId = extractYouTubeId(link.url);
  
  if (youtubeId) {
    // YouTube video
    const img = document.createElement('img');
    img.src = getYouTubeThumbnail(youtubeId);
    img.alt = link.title;
    img.className = 'thumbnail-image';
    card.appendChild(img);
  } else if (link.thumbnailUrl) {
    // Custom thumbnail
    const img = document.createElement('img');
    img.src = link.thumbnailUrl;
    img.alt = link.title;
    img.className = 'thumbnail-image';
    card.appendChild(img);
  } else {
    // Fallback icon from type
    const icon = document.createElement('div');
    icon.className = 'thumbnail-icon';
    icon.textContent = getEmojiFallback(link.type);
    card.appendChild(icon);
  }

  // Afficher l'ID
  const idBadge = document.createElement('div');
  idBadge.className = 'thumbnail-id-badge';
  idBadge.textContent = link.id;
  card.appendChild(idBadge);

  // Title
  const title = document.createElement('div');
  title.className = 'thumbnail-title';
  title.textContent = link.title;
  card.appendChild(title);

  return card;
}

// Filter cards by level
function filterCardsByLevel(level) {
  const cards = document.querySelectorAll('.thumbnail-card');
  cards.forEach(card => {
    if (level === 'all' || card.dataset.level === level) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Réorganiser les données plates en structure hiérarchique
// MODIFIER la fonction reorganizeData pour exclure les liens sidebar
function reorganizeData(flatLinks) {
  const organized = {};
  
  // Récupérer toutes les catégories
  const categories = getCategories();
  
  categories.forEach(cat => {
    organized[cat] = {
      name: getDisplayName(cat),
      description: "",
      categories: {}
    };
    
    // Récupérer les sous-catégories pour cette catégorie
    const subcats = getSubcategories(cat);
    subcats.forEach(subcat => {
      organized[cat].categories[subcat] = {
        name: getDisplayName(subcat),
        links: []
      };
    });
  });
  
  // Ajouter les liens (en excluant ceux de la sidebar)
  flatLinks.forEach(link => {
    // ← AJOUTER CETTE CONDITION
    if (link.sidebar) {
      return; // Sauter les liens sidebar
    }
    
    const cats = normalizeCategory(link.category);
    const subcat = link.subcategory;
    
    // Ajouter le lien à chaque catégorie
    cats.forEach(cat => {
      if (organized[cat] && organized[cat].categories[subcat]) {
        organized[cat].categories[subcat].links.push(link);
      }
    });
  });
  
  return organized;
}

// NOUVELLE FONCTION pour charger les liens de la sidebar
function loadSidebarLinks() {
  const sidebarLinksLocal = document.getElementById('sidebarLinksLocal');
  const sidebarLinksReseau = document.getElementById('sidebarLinksReseau');
  
  // Vider les listes existantes
  if (sidebarLinksLocal) sidebarLinksLocal.innerHTML = '';
  if (sidebarLinksReseau) sidebarLinksReseau.innerHTML = '';
  
  // Parcourir tous les liens et placer ceux avec sidebar
  linksData.forEach(link => {
    if (!link.sidebar) return;
    
    let targetContainer = null;
    
    if (link.sidebar === 'local') {
      targetContainer = sidebarLinksLocal;
    } else if (link.sidebar === 'reseau') {
      targetContainer = sidebarLinksReseau;
    }
    
    if (targetContainer) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = link.title;
      li.appendChild(a);
      targetContainer.appendChild(li);
    }
  });
}

// MODIFIER le DOMContentLoaded pour appeler la nouvelle fonction
window.addEventListener('DOMContentLoaded', () => {
  loadSidebarLinks(); // ← AJOUTER CETTE LIGNE
  loadCategory('ia'); // ou 'datacenter', selon ta préférence
});


// Reorganize flat data to hierarchical
const organizedData = reorganizeData(linksData);

// Load category with sub-categories
function loadCategory(categoryId) {
  const category = organizedData[categoryId];
  if (!category) return;

  // Vérifier que les éléments existent
  const titleElement = document.getElementById('category-title');
  const descElement = document.getElementById('category-description');
  const gridElement = document.getElementById('thumbnailGrid');
  
  if (!titleElement || !descElement || !gridElement) {
    console.warn('Éléments HTML non trouvés');
    return;
  }

  // Update title and description
  titleElement.textContent = category.name;
  descElement.textContent = category.description;

  // Get container for all content
  const grid = gridElement;
  grid.innerHTML = '';

  // Check if category has sub-categories
  if (category.categories) {
    Object.entries(category.categories).forEach(([subCatId, subCategory]) => {
      // Create column wrapper
      const columnGroup = document.createElement('div');
      columnGroup.className = 'column-group';
      
      // Create section title
      const sectionTitle = document.createElement('h3');
      sectionTitle.className = 'subcategory-title';
      sectionTitle.textContent = subCategory.name;
      columnGroup.appendChild(sectionTitle);

      // Create container for links in this sub-category
      const subGrid = document.createElement('div');
      subGrid.className = 'thumbnail-grid-section';

      // Add links
      subCategory.links.forEach(link => {
        subGrid.appendChild(createThumbnailCard(link));
      });

      columnGroup.appendChild(subGrid);
      grid.appendChild(columnGroup);
    });
  }

  // Apply current level filter
  const activeLevel = document.querySelector('.level-btn.active');
  if (activeLevel) {
    filterCardsByLevel(activeLevel.dataset.level);
  }
}

// Category button event listeners
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadCategory(btn.dataset.category);
  });
});

// Level filter button event listeners
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCardsByLevel(btn.dataset.level);
  });
});

// Load default category on page load
window.addEventListener('DOMContentLoaded', () => {
  loadCategory('datacenter');
});



//POUR LES CATEGORIES DANS LA SIDE BAR
function loadSubcategoriesInSidebar(categoryId) {
  const subcategoryList = document.getElementById('subcategoryList');
  subcategoryList.innerHTML = '';
  
  const subcats = getSubcategories(categoryId);
  
  subcats.forEach(subcat => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'sidebar-subcategory-btn active';
    btn.textContent = getDisplayName(subcat);
    btn.dataset.subcategory = subcat;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-subcategory-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    
    li.appendChild(btn);
    subcategoryList.appendChild(li);
  });
}

