import Notice from './Notice';

const Die = ({ roll }) => {
  return (
    <>
      {roll === 1 ? (
        <span>&#9856;</span>
      ) : roll === 2 ? (
        <span>&#9857;</span>
      ) : roll === 3 ? (
        <span>&#9858;</span>
      ) : roll === 4 ? (
        <span>&#9859;</span>
      ) : roll === 5 ? (
        <span>&#9860;</span>
      ) : roll === 6 ? (
        <span>&#9861;</span>
      ) : (
        'ERROR'
      )}
    </>
  );
};

export const ResultsMessages = ({ results: { rolls, advantageRolls, successes, experience, injured, disturbed, crit, advantage, dice, stat } }) => {
  return (
    <>
      {/* How many successes did they roll? */}
      {successes ? <Notice status="success" message={`You got ${successes} ${successes === 1 ? 'success' : 'successes'}. ${successes === rolls.length ? 'Not even a single failure!' : ''}`} /> : null}
      {!successes && !injured && !disturbed ? <Notice status="warn" message="Wow, not even a single success. Better luck next time I guess." /> : null}

      {/* Did they gain any conditions? */}
      {injured ? <Notice status="fail" heading="Critical Fail" message={`You have gained ${injured} Injured`} /> : null}
      {disturbed ? <Notice status="fail" heading="Critical Fail" message={`You have gained ${disturbed} Disturbed`} /> : null}

      {/* Did they gain any experience points? */}
      {!crit && experience ? <Notice status="success" message={`You have gained ${experience} experience point.`} /> : null}
      {crit ? <Notice status="success" heading="Critical Success" message={`You have gained ${experience} experience points .`} /> : null}
    </>
  );
};

const RollResults = ({ results: { rolls, advantageRolls, successes, experience, injured, disturbed, crit, advantage, dice, stat } }) => {
  return (
    <div className="relative px-6 py-6 bg-gray-100 dark:bg-dark-200 sm:px-12 sm:py-12 mt-8">
      <div className="flex flex-col md:flex-row justify-between">
        {/* DISPLAY ROLL DATA */}
        <div>
          {crit ? (
            <>
              <h2 className="text-xl font-bold">
                Critical Success! ({rolls.length} {rolls.length === 1 ? 'success' : 'successes'})
              </h2>
              <div className="text-8xl text-green-600 flex flex-wrap">
                {rolls.map((roll, index) => {
                  return <Die key={index} roll={roll} />;
                })}
              </div>
            </>
          ) : injured || disturbed ? (
            <>
              <h2 className="text-xl font-bold">Critical Failure! (0 successes)</h2>
              <div className="text-8xl text-red-500 flex flex-wrap">
                {rolls.map((roll, index) => {
                  return <Die key={index} roll={roll} />;
                })}
              </div>
            </>
          ) : (
            <>
              {successes ? (
                <>
                  <h2 className="text-xl font-bold">Successes ({successes})</h2>
                  <div className="text-8xl text-green-600 flex flex-wrap">
                    {rolls.map((roll, index) => {
                      return roll > 3 ? <Die key={index} roll={roll} /> : null;
                    })}
                  </div>
                </>
              ) : null}
              {rolls.length - successes > 0 ? (
                <>
                  <h2 className="text-xl font-bold">Fails ({rolls.length - successes})</h2>
                  <div className="text-8xl text-red-500 flex flex-wrap">
                    {rolls.map((roll, index) => {
                      return roll < 4 ? <Die key={index} roll={roll} /> : null;
                    })}
                  </div>
                </>
              ) : null}
            </>
          )}
          {advantageRolls.length ? (
            <>
              <h2 className="text-xl font-bold">Advantage ({`${advantageRolls.length} ${advantage > 0 ? 'lowest' : 'highest'} ${advantageRolls.length === 1 ? 'die' : 'dice'}`} removed)</h2>
              <div className="text-8xl text-gray-400 flex flex-wrap">
                {advantageRolls.map((roll, index) => {
                  return <Die key={index} roll={roll} />;
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RollResults;
