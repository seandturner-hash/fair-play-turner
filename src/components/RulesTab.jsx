export default function RulesTab() {
  return (
    <div className="main-content">
      <div className="rules-page">

        <div className="rules-hero">
          <h1>The Fair Play System</h1>
          <p>
            Based on Eve Rodsky's <em>Fair Play</em> — a framework for redistributing
            domestic labour so both partners can live full, purposeful lives.
          </p>
        </div>

        {/* ── Four Ground Rules ──────────────────────────────────────── */}
        <section className="rules-section" aria-label="Four ground rules">
          <h2>The Four Rules</h2>

          <div className="rule-card">
            <div className="rule-number">Rule One</div>
            <div className="rule-title">All Time Is Created Equal</div>
            <p className="rule-body">
              Your time and your partner's time are of equal value. Neither of you has
              "work time" that automatically outranks "home time." When one person's hours
              are assumed to be worth more, the invisible load accumulates invisibly for the
              other. Both partners deserve time to be full human beings — not just
              contributors to a household machine.
            </p>
          </div>

          <div className="rule-card">
            <div className="rule-number">Rule Two</div>
            <div className="rule-title">Reclaim Your Right to Be Interesting</div>
            <p className="rule-body">
              Every person holds a "Unicorn Space" — the thing that makes you <em>you</em>
              when you strip away your roles as parent, partner, and employee. Protecting
              this space isn't selfish; it's the foundation of a vibrant partnership. When
              you're interesting to yourself, you're interesting to everyone around you.
              This card is non-negotiable, and it belongs to both of you.
            </p>
          </div>

          <div className="rule-card">
            <div className="rule-number">Rule Three</div>
            <div className="rule-title">Start Where You Are Now</div>
            <p className="rule-body">
              This isn't about blame for the past — it's about building something better
              from today. Resentment lives in the past; Fair Play lives in the present.
              Look at how your cards are currently dealt without judging how they got
              that way. The point is an honest, mutual renegotiation — not a trial.
            </p>
          </div>

          <div className="rule-card">
            <div className="rule-number">Rule Four</div>
            <div className="rule-title">Establish Your Values and Standards</div>
            <p className="rule-body">
              The Minimum Standard of Care (MSC) for each card belongs to both of you —
              agreed on together, not imposed by one partner on the other. When you define
              what "good enough" looks like in advance, you eliminate the resentment that
              comes from invisible expectations and the criticism that comes from diverging
              standards. The person who owns a card owns it fully: no checking in, no
              reminders, no supervision.
            </p>
          </div>
        </section>

        {/* ── CPE Explained ─────────────────────────────────────────── */}
        <section className="rules-section" aria-label="CPE explained">
          <h2>CPE — Full Ownership</h2>
          <p style={{ fontSize: '0.87rem', color: 'var(--brown-light)', marginBottom: '1rem' }}>
            Holding a card means owning <em>all three stages</em> — Conception, Planning,
            and Execution. Delegating only the doing while retaining the thinking is the
            root of the invisible load.
          </p>

          <div className="cpe-row">
            <div className="cpe-card">
              <div className="cpe-letter">C</div>
              <div className="cpe-name">Conception</div>
              <p className="cpe-body">
                Noticing that something needs to happen. Holding the awareness, the mental
                note, the background hum of "this needs doing." This is the stage most often
                left with one partner even when execution has been "shared."
              </p>
            </div>

            <div className="cpe-card">
              <div className="cpe-letter">P</div>
              <div className="cpe-name">Planning</div>
              <p className="cpe-body">
                Researching, scheduling, coordinating, deciding. The invisible labour of
                figuring out <em>how</em> something will happen — booking, organising,
                communicating, anticipating. Not just knowing it needs to happen, but
                working out the how and when.
              </p>
            </div>

            <div className="cpe-card">
              <div className="cpe-letter">E</div>
              <div className="cpe-name">Execution</div>
              <p className="cpe-body">
                Actually doing the thing. This is the only visible stage, which is why it's
                the only one that tends to get counted. But without C and P, execution is
                just following instructions — not owning the card.
              </p>
            </div>
          </div>
        </section>

        {/* ── MSC Explained ─────────────────────────────────────────── */}
        <section className="rules-section" aria-label="MSC explained">
          <h2>MSC — Minimum Standard of Care</h2>

          <div className="rule-card">
            <div className="rule-title" style={{ marginBottom: '0.6rem' }}>What is an MSC?</div>
            <p className="rule-body">
              A Minimum Standard of Care is a mutually agreed definition of what it means
              to do a card "well enough." It is not about perfection — it is about
              establishing a floor below which neither partner falls, and a ceiling above
              which neither partner is compelled to aspire.
            </p>
          </div>

          <div className="rule-card">
            <div className="rule-title" style={{ marginBottom: '0.6rem' }}>Why agree on it in advance?</div>
            <p className="rule-body">
              Unspoken standards are the single biggest source of resentment in domestic
              partnerships. When you write the MSC together before the card is handed over,
              you both know what success looks like. There's no room for silent criticism,
              no expectation management to do after the fact, and no "I thought you meant…"
              The card-holder can act with confidence; the non-holder can trust without
              monitoring.
            </p>
          </div>

          <div className="rule-card">
            <div className="rule-title" style={{ marginBottom: '0.6rem' }}>How to set one together</div>
            <p className="rule-body">
              At a check-in, open the card and talk through what this task actually
              involves. Ask: <em>What would good look like? What would bad look like?
              What matters most to each of us?</em> Write the answer in the MSC field —
              in plain language, specific enough to be actionable, loose enough that the
              card-holder has genuine ownership. Revisit it whenever life changes.
            </p>
          </div>
        </section>

        {/* ── How to use this app ───────────────────────────────────── */}
        <section className="rules-section" aria-label="How to use this app">
          <h2>Using This App</h2>
          <div className="rule-card">
            <p className="rule-body">
              <strong>Deal your hand.</strong> Start with all 100 cards in the Discarded
              pile (or Unassigned). At your first check-in, go through each card together
              and decide: does this belong to Sean, Tarragon, or is it discarded because
              it genuinely doesn't apply to your household?
            </p>
            <p className="rule-body">
              <strong>Fill in each card.</strong> For every card you deal, write the MSC
              and CPE notes together. This is the work of the system — the conversation,
              not just the assignment.
            </p>
            <p className="rule-body">
              <strong>Set a check-in date.</strong> Use the date in the header to schedule
              your next review. A quarterly check-in is a good start — more often when
              life is in flux.
            </p>
            <p className="rule-body">
              <strong>Pass cards when life changes.</strong> Cards aren't permanent.
              When a season changes, use "Pass to…" to renegotiate. The system is designed
              to flex, not to lock you in.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
