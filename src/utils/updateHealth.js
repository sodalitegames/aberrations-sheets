export const takeDamage = (current, updated, max) => {
  let results = {
    currentHp: updated,
    injured: 0,
  };

  // Check if they are already dead
  if (current <= 0) {
    results.alreadyDead = true;
  }

  // Check if they just became bloodied
  if (current >= max / 2) {
    if (updated < max / 2) {
      results.justBloodied = true;
      results.injured = results.injured + 1;
    }
  }

  // Check if they just became mauled
  if (current >= max / 5) {
    if (updated < max / 5) {
      results.justMauled = true;
      results.injured = results.injured + 1;
    }
  }

  // Check if they are already mauled
  if (current < max / 5 && current > 0) {
    if (updated < max / 5) {
      results.injured = results.injured + 1;
    }
  }

  // Check if they become nearly dead
  if (current > 0) {
    if (updated <= 0) {
      results.nearlyDead = true;
    }
  }

  // Check if they become totally dead
  if (current > -max) {
    if (updated < -max) {
      results.totallyDead = true;
    }
  }

  return results;
};

export const healDamage = (updated, max) => {
  // Current health cannot be more than max health
  if (updated > max) return max;

  return updated;
};
