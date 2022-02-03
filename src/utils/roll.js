export const rollOne = () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  return roll;
};

export const rollDice = (dice, advantage, stat) => {
  let newRolls = [];
  let advantageRolls = [];

  // create the array of rolls
  for (let i = 0; i < dice + Math.abs(advantage); i++) {
    newRolls.push(rollOne(dice));
  }

  if (advantage > 0) {
    for (let i = 0; i < advantage; i++) {
      // find the min value
      const min = Math.min(...newRolls);

      // find index of min value
      const index = newRolls.indexOf(min);

      // remove the first instance of the min value from the array
      newRolls.splice(index, 1);

      // add that min value to the advantage rolls array
      advantageRolls.push(min);
    }
  }

  if (advantage < 0) {
    for (let i = 0; i > advantage; i--) {
      // find the max value
      const max = Math.max(...newRolls);

      // find index of max value
      const index = newRolls.indexOf(max);

      // remove the first instance of the max value from the array
      newRolls.splice(index, 1);

      // add that max value to the advantage rolls array
      advantageRolls.push(max);
    }
  }

  let successes = 0;
  let sixes = 0;
  let ones = 0;
  let injured = 0;
  let disturbed = 0;
  let experience = 0;
  let crit = false;

  // set successes, sixes, and ones by looping through the rolls array
  newRolls.forEach(roll => {
    if (roll > 3) {
      successes++;

      if (roll === 6) {
        sixes++;
      }
    } else if (roll === 1) {
      ones++;
    }
  });

  // set experience, crit, and conditions based on the rolls
  if (sixes >= dice / 2) {
    successes = dice;
    experience++;
    crit = true;
  }

  if (ones >= dice / 2) {
    successes = 0;

    if (stat === 'fortitude' || stat === 'agility') {
      injured++;
    }

    if (stat === 'persona' || stat === 'aptitude') {
      disturbed++;
    }
  }

  if (successes >= dice / 2) {
    experience++;
  }

  // save the roll data
  return { rolls: newRolls, advantageRolls, successes, injured, disturbed, experience, crit, advantage, dice, stat };
};
