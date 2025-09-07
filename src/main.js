import { supabase } from './supabaseClient.js';

const loadBtn = document.getElementById('loadBtn');
const playersDiv = document.getElementById('players');

loadBtn.addEventListener('click', async () => {
  playersDiv.textContent = 'Chargement...';
  const { data, error } = await supabase.from('joueurs').select('*').limit(100);
  if (error) {
    playersDiv.textContent = 'Erreur : ' + error.message;
    console.error(error);
    return;
  }
  if (!data || data.length === 0) {
    playersDiv.textContent = 'Aucun joueur trouvé.';
    return;
  }
  playersDiv.innerHTML = data.map(p => `
    <div class="player">
      <strong>${p.prenom || ''} ${p.nom || ''}</strong> — ${p.poste || '—'}
    </div>
  `).join('');
});
