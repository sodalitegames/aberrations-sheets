import { rollOne, calcRollData } from './roll';

describe('rolling dice', () => {
  it('should return a number between 1 and 6 when rolling one die', () => {
    let timesRolled;

    for (timesRolled = 0; timesRolled < 50; timesRolled++) {
      let roll = rollOne();
      expect(roll).toBeGreaterThan(0);
      expect(roll).toBeLessThan(7);
    }

    expect(timesRolled).toBe(50);
  });

  // Finish this test
  it('should correctly calculate roll data', () => {
    const rollResults = {
      rolls: [1, 1, 1, 1, 1, 1],
      advantageRolls: [2, 2],
      dice: 6,
      advantage: 2,
      stat: 'fortitude',
    };

    const rollData = calcRollData(rollResults);

    expect(rollData).toHaveProperty('injured', 1);
  });

  // Test more about rolling the dice
});
