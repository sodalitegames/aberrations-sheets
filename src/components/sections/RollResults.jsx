import Notice from '../Notice';

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

export const ResultsMessages = ({
  results: {
    results: { rolls, removed, advantage, dice },
    successes,
    experience,
    critical,
    stat,
  },
}) => {
  return (
    <>
      {/* How many successes did they roll? */}
      {successes ? <Notice status="success" message={`You got ${successes} ${successes === 1 ? 'success' : 'successes'}. ${successes === rolls.length ? 'Not even a single failure!' : ''}`} /> : null}
      {!successes && !critical.fail ? <Notice status="warn" message="Wow, not even a single success. Better luck next time I guess." /> : null}

      {/* Did they get a critial? */}
      {critical.fail ? <Notice status="fail" heading="Critical Fail" message="You have critially failed, what a shame." /> : null}
      {critical.success ? <Notice status="success" heading="Critical Success" message="You have critically succeeded, how astounding." /> : null}

      {/* Did they gain or lose any experience points? */}
      {experience !== 0 ? (
        <Notice
          status={experience < 0 ? 'fail' : 'success'}
          message={`Your roll ${experience < 0 ? 'loses' : 'awards'} ${experience} experience ${experience === 1 || experience === -1 ? 'point' : 'points'}.`}
        />
      ) : null}
    </>
  );
};

const RollResults = ({
  results: {
    results: { rolls, removed, advantage, dice },
    successes,
    experience,
    injured,
    disturbed,
    critical,
    stat,
  },
}) => {
  return (
    <div className="relative px-6 py-6 mt-8 bg-gray-100 dark:bg-dark-200 sm:px-12 sm:py-12">
      <div className="flex flex-col justify-between md:flex-row">
        {/* DISPLAY ROLL DATA */}
        <div>
          {critical.success ? (
            <>
              <h2 className="text-xl font-bold">
                Critical Success! ({rolls.length} {rolls.length === 1 ? 'success' : 'successes'})
              </h2>
              <div className="flex flex-wrap text-green-600 text-8xl">
                {rolls.map((roll, index) => {
                  return <Die key={index} roll={roll} />;
                })}
              </div>
            </>
          ) : critical.fail ? (
            <>
              <h2 className="text-xl font-bold">Critical Failure! (0 successes)</h2>
              <div className="flex flex-wrap text-red-500 text-8xl">
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
                  <div className="flex flex-wrap text-green-600 text-8xl">
                    {rolls.map((roll, index) => {
                      return roll > 3 ? <Die key={index} roll={roll} /> : null;
                    })}
                  </div>
                </>
              ) : null}
              {rolls.length - successes > 0 ? (
                <>
                  <h2 className="text-xl font-bold">Fails ({rolls.length - successes})</h2>
                  <div className="flex flex-wrap text-red-500 text-8xl">
                    {rolls.map((roll, index) => {
                      return roll < 4 ? <Die key={index} roll={roll} /> : null;
                    })}
                  </div>
                </>
              ) : null}
            </>
          )}
          {removed.length ? (
            <>
              <h2 className="text-xl font-bold">Advantage ({`${removed.length} ${advantage > 0 ? 'lowest' : 'highest'} ${removed.length === 1 ? 'die' : 'dice'}`} removed)</h2>
              <div className="flex flex-wrap text-gray-400 text-8xl">
                {removed.map((roll, index) => {
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
