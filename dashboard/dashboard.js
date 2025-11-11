// Dashboard functionality for Fintech Hub Türkiye

const API_BASE_URL = '/api';

// Check authentication on load
document.addEventListener('DOMContentLoaded', async () => {
  await checkAuthentication();
  await loadDashboardData();
});

// Check if user is authenticated
async function checkAuthentication() {
  const token = localStorage.getItem('fintechhub_auth_token');
  
  if (!token) {
    // Redirect to login
    window.location.href = '/?login=required';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    updateUserDisplay(data.user);
  } catch (error) {
    console.error('Authentication error:', error);
    localStorage.removeItem('fintechhub_auth_token');
    window.location.href = '/?login=required';
  }
}

// Update user display
function updateUserDisplay(user) {
  const userNameDisplay = document.getElementById('user-name-display');
  if (userNameDisplay) {
    userNameDisplay.textContent = user.name || user.email;
  }
}

// Load all dashboard data
async function loadDashboardData() {
  const token = localStorage.getItem('fintechhub_auth_token');
  
  if (!token) return;

  try {
    // Load favorites
    await loadFavorites(token);
    
    // Load comparison history
    await loadComparisonHistory(token);
    
    // Update stats
    updateStats();
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
}

// Load user favorites
async function loadFavorites(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to load favorites');

    const data = await response.json();
    displayFavorites(data.favorites);
  } catch (error) {
    console.error('Error loading favorites:', error);
    showFavoritesEmpty();
  }
}

// Display favorites
function displayFavorites(favorites) {
  const grid = document.getElementById('favorites-grid');
  const empty = document.getElementById('favorites-empty');

  if (!favorites || favorites.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  empty.style.display = 'none';

  grid.innerHTML = favorites.map(provider => createProviderCard(provider, true)).join('');
}

// Show empty favorites state
function showFavoritesEmpty() {
  const grid = document.getElementById('favorites-grid');
  const empty = document.getElementById('favorites-empty');
  
  grid.style.display = 'none';
  empty.style.display = 'block';
}

// Load comparison history
async function loadComparisonHistory(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/comparison-history`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to load history');

    const data = await response.json();
    displayComparisonHistory(data.history);
  } catch (error) {
    console.error('Error loading comparison history:', error);
    showHistoryEmpty();
  }
}

// Display comparison history
function displayComparisonHistory(history) {
  const list = document.getElementById('history-list');
  const empty = document.getElementById('history-empty');

  if (!history || history.length === 0) {
    list.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  list.style.display = 'grid';
  empty.style.display = 'none';

  list.innerHTML = history.map(item => createHistoryCard(item)).join('');
}

// Show empty history state
function showHistoryEmpty() {
  const list = document.getElementById('history-list');
  const empty = document.getElementById('history-empty');
  
  list.style.display = 'none';
  empty.style.display = 'block';
}

// Create provider card
function createProviderCard(provider, isFavorite = false) {
  const favoriteClass = isFavorite ? 'is-favorite' : '';
  
  return `
    <article class="provider-card ${favoriteClass}">
      <header class="provider-header">
        <div class="provider-logo">
          <div class="logo-img">${provider.logo}</div>
        </div>
        <div class="provider-info">
          <h3>${provider.name}</h3>
          <span class="provider-type">${provider.type}</span>
        </div>
        <div class="provider-rating">
          <div class="stars">${renderStars(provider.rating)}</div>
          <span>${provider.rating.toFixed(1)}/5</span>
        </div>
      </header>
      <p class="provider-description">${provider.card_description || provider.cardDescription}</p>
      <div class="provider-pricing">
        <span class="pricing-label">Ücretlendirme:</span>
        <span class="pricing-value">${provider.pricing?.headline || 'Teklif Alın'}</span>
      </div>
      <div class="provider-actions">
        <button class="btn-outline" onclick="viewProvider('${provider.id}')">Detaylı Bilgi</button>
        <button class="btn-primary" onclick="removeFavorite('${provider.id}')">
          <i class="fas fa-star-minus"></i> Favorilerden Çıkar
        </button>
      </div>
    </article>
  `;
}

// Create history card
function createHistoryCard(item) {
  const date = new Date(item.created_at).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const providerCount = item.provider_ids?.length || 0;

  return `
    <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: var(--shadow-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="margin: 0;">Karşılaştırma</h3>
        <span style="font-size: 0.875rem; color: var(--gray-500);">${date}</span>
      </div>
      <p style="color: var(--gray-600); margin-bottom: 1rem;">
        ${providerCount} sağlayıcı karşılaştırıldı
      </p>
      <button class="btn-outline" onclick="viewComparison(${item.id})">
        <i class="fas fa-eye"></i> Karşılaştırmayı Görüntüle
      </button>
    </div>
  `;
}

// Update dashboard stats
function updateStats() {
  const favoritesGrid = document.getElementById('favorites-grid');
  const historyList = document.getElementById('history-list');

  const favCount = favoritesGrid?.children.length || 0;
  const histCount = historyList?.children.length || 0;

  const statsFavorites = document.getElementById('stats-favorites');
  const statsComparisons = document.getElementById('stats-comparisons');

  if (statsFavorites) statsFavorites.textContent = favCount;
  if (statsComparisons) statsComparisons.textContent = histCount;
}

// Remove from favorites
async function removeFavorite(providerId) {
  const token = localStorage.getItem('fintechhub_auth_token');
  
  if (!token) return;

  try {
    const response = await fetch(`${API_BASE_URL}/users/favorites/${providerId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to remove favorite');

    // Reload favorites
    await loadFavorites(token);
    updateStats();
  } catch (error) {
    console.error('Error removing favorite:', error);
    alert('Favorilerden çıkarılırken bir hata oluştu');
  }
}

// View provider details
function viewProvider(providerId) {
  window.location.href = `/#provider-${providerId}`;
}

// View comparison
function viewComparison(comparisonId) {
  window.location.href = `/#comparison-${comparisonId}`;
}

// Render stars (shared function)
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i += 1) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i += 1) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

