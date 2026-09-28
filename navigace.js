// Společné položky hráčské nabídky.
(() => {
  const menu = document.getElementById('mainMenu');
  if (!menu) return;
  const players = document.createElement('a');
  players.href = 'hraci.html';
  players.textContent = 'Hráči';
  menu.insertBefore(players, document.getElementById('adminLink'));

  const logout = document.createElement('button');
  logout.type = 'button';
  logout.textContent = 'Odhlásit se';
  logout.style.cssText = 'display:block;width:100%;padding:12px 14px;border:0;background:transparent;color:#f1d398;text-align:left;font:inherit;cursor:pointer;';
  logout.addEventListener('click', async () => {
    logout.disabled = true;
    try {
      const client = supabase.createClient('https://qgnallfqanixepfvrzjn.supabase.co', 'sb_publishable_Y7QqWlRF_op6jq2CLVYKPQ_af2NsMJi');
      const { error } = await client.auth.signOut();
      if (error) throw error;
      window.location.replace('index.html');
    } catch {
      logout.textContent = 'Odhlášení selhalo. Zkus to znovu.';
      logout.disabled = false;
    }
  });
  menu.append(logout);
})();
