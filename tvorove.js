// Veřejně viditelní tvorové se odvozují jen ze schválených řešení.
window.creatureArt = Object.freeze({
  jednooky_blatnik: { name: 'Jednooký blatník', file: 'tvor-jednooky-blatnik.webp' },
  kridlaty_skret: { name: 'Křídlatý skřet', file: 'tvor-kridlaty-skret.webp' }
});

window.loadEarnedCreatures = async function (client) {
  const { data, error } = await client.rpc('list_earned_creatures');
  if (error) throw error;
  const byCharacter = new Map();
  for (const item of Array.isArray(data) ? data : []) {
    if (!window.creatureArt[item.creature_code]) continue;
    const list = byCharacter.get(item.character_id) || [];
    list.push(item.creature_code);
    byCharacter.set(item.character_id, list);
  }
  return byCharacter;
};

window.createCreatureIcons = function (codes, size = 'large') {
  const wrap = document.createElement('div');
  wrap.className = 'creature-icons ' + (size === 'small' ? 'small' : 'large');
  for (const code of codes || []) {
    const creature = window.creatureArt[code];
    if (!creature) continue;
    const image = document.createElement('img');
    image.className = 'creature-icon';
    image.src = creature.file;
    image.alt = creature.name;
    image.title = creature.name;
    image.loading = 'lazy';
    wrap.append(image);
  }
  return wrap;
};
