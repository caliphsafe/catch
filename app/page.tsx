"use client";
import { useState } from "react";
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  Bell,
  Ship as Boat,
  Camera,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileText,
  HelpCircle,
  Home,
  Menu,
  Plus,
  Receipt,
  Search,
  Settings,
  ShipWheel,
  Users,
  WalletCards,
  X,
} from "lucide-react";
type View = "home" | "trips" | "boats" | "crew" | "settle";
const people = [
  ["Tom Costa", "Captain", "1.5", "TC", "#ef705b"],
  ["Miguel Santos", "Deckhand", "1.0", "MS", "#dfa94f"],
  ["Andre Pires", "Engineer", "1.25", "AP", "#5ea897"],
  ["David Lima", "Deckhand", "1.0", "DL", "#739bc7"],
];
const stepNames = ["Boat", "Trip", "Crew", "Fish sales", "Costs", "Review"];
export default function Page() {
  const [view, setView] = useState<View>("home"),
    [step, setStep] = useState(0),
    [drawer, setDrawer] = useState(false),
    [toast, setToast] = useState("");
  const notify = (s: string) => {
      setToast(s);
      setTimeout(() => setToast(""), 2400);
    },
    start = () => {
      setStep(0);
      setView("settle");
    },
    nav = (v: View) => {
      setView(v);
      setDrawer(false);
    };
  return (
    <div className="shell">
      <aside className={drawer ? "side open" : "side"}>
        <div className="logo">
          <span>
            <Anchor />
          </span>
          Catch!
          <button onClick={() => setDrawer(false)}>
            <X />
          </button>
        </div>
        <div className="fleet">
          <small>YOUR FLEET</small>
          <b>Atlantic Dawn Co.</b>
          <ChevronRight />
        </div>
        <nav>
          <small>WORKSPACE</small>
          <Nav
            icon={<Home />}
            label="Home"
            active={view === "home"}
            onClick={() => nav("home")}
          />
          <Nav
            icon={<FileText />}
            label="Trips"
            active={view === "trips"}
            badge="3"
            onClick={() => nav("trips")}
          />
          <Nav
            icon={<Boat />}
            label="Boats"
            active={view === "boats"}
            onClick={() => nav("boats")}
          />
          <Nav
            icon={<Users />}
            label="Crew"
            active={view === "crew"}
            onClick={() => nav("crew")}
          />
          <small>MANAGE</small>
          <Nav
            icon={<CircleDollarSign />}
            label="Reports"
            onClick={() =>
              notify("Reports are ready when live trip data is connected.")
            }
          />
          <Nav
            icon={<Settings />}
            label="Settings"
            onClick={() => notify("Settings opened in practice mode.")}
          />
        </nav>
        <div className="help">
          <HelpCircle />
          <b>Need a hand?</b>
          <p>Call us and a real person will walk you through it.</p>
          <button onClick={() => notify("Support request started.")}>
            Get help
          </button>
        </div>
        <div className="user">
          <span>JC</span>
          <div>
            <b>James Costa</b>
            <small>Fleet owner</small>
          </div>
        </div>
      </aside>
      <main>
        <header>
          <button className="hamb" onClick={() => setDrawer(true)}>
            <Menu />
          </button>
          <b className="mobile-logo">
            <Anchor />
            Catch!
          </b>
          <div>
            <button>
              <Search />
            </button>
            <button>
              <Bell />
            </button>
            <span className="online">
              <i />
              All systems ready
            </span>
          </div>
        </header>
        {view === "home" && <Dashboard start={start} notify={notify} />}{" "}
        {view === "settle" && (
          <Wizard
            step={step}
            setStep={setStep}
            exit={() => setView("home")}
            finish={() => {
              setView("home");
              notify("Practice settlement completed and saved.");
            }}
          />
        )}{" "}
        {view === "trips" && <Trips start={start} />}{" "}
        {view === "boats" && <Boats start={start} />}{" "}
        {view === "crew" && <Crew />}
      </main>
      {toast && (
        <div className="toast">
          <Check />
          {toast}
        </div>
      )}
    </div>
  );
}
function Nav({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button className={active ? "nav active" : "nav"} onClick={onClick}>
      {icon}
      {label}
      {badge && <em>{badge}</em>}
    </button>
  );
}
function Dashboard({
  start,
  notify,
}: {
  start: () => void;
  notify: (s: string) => void;
}) {
  return (
    <div className="page">
      <div className="welcome">
        <div>
          <small>MONDAY, AUGUST 31</small>
          <h1>Good afternoon, James.</h1>
          <p>Here’s what’s happening across your fleet.</p>
        </div>
        <button className="primary" onClick={start}>
          <Plus />
          Settle a trip
        </button>
      </div>
      <section className="ready">
        <div className="wheel">
          <ShipWheel />
        </div>
        <div>
          <span className="status">
            <i />
            READY TO SETTLE
          </span>
          <h2>F/V Northern Star</h2>
          <p>Trip 24-081 · Returned Aug 30 · 4 crew</p>
          <div className="numbers">
            <label>
              Fish sold<b>$42,680.75</b>
            </label>
            <label>
              Trip costs<b>$8,214.20</b>
            </label>
            <label>
              To be divided<b>$34,466.55</b>
            </label>
          </div>
        </div>
        <button className="primary" onClick={start}>
          Continue settlement
          <ArrowRight />
        </button>
      </section>
      <div className="metrics">
        <Metric
          icon={<Boat />}
          title="Boats out"
          value="2"
          sub="of 4 vessels"
        />
        <Metric
          icon={<FileText />}
          title="Trips to finish"
          value="3"
          sub="1 ready now"
        />
        <Metric
          icon={<WalletCards />}
          title="Paid this month"
          value="$128,440"
          sub="7 settlements"
        />
      </div>
      <div className="columns">
        <section className="card">
          <Heading top="LATEST" title="Recent trips" action="View all" />
          <Trip
            boat="Northern Star"
            meta="Trip 24-081 · Aug 24–30"
            amount="$42,680.75"
            state="Ready"
          />
          <Trip
            boat="Sea Venture"
            meta="Trip 24-080 · Aug 20–27"
            amount="$31,215.40"
            state="Needs costs"
          />
          <Trip
            boat="Blue Harbor"
            meta="Trip 24-079 · Aug 18–25"
            amount="$55,902.10"
            state="Paid"
          />
        </section>
        <section className="card actions">
          <Heading top="SHORTCUTS" title="Quick actions" />
          <Action
            icon={<Camera />}
            title="Upload a dealer sheet"
            sub="Start from a photo or PDF"
            onClick={start}
          />
          <Action
            icon={<Receipt />}
            title="Add trip costs"
            sub="Photograph your receipts"
            onClick={() => notify("Receipt capture is ready.")}
          />
          <Action
            icon={<Users />}
            title="Add a crew member"
            sub="Set up pay and shares"
            onClick={() => notify("Crew setup opened.")}
          />
        </section>
      </div>
      <section className="promise">
        <Anchor />
        <div>
          <small>THE CATCH! PROMISE</small>
          <b>You give us the trip facts. We handle the settlement math.</b>
        </div>
      </section>
    </div>
  );
}
function Metric({
  icon,
  title,
  value,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="metric">
      <span>{icon}</span>
      <div>
        <small>{title}</small>
        <b>{value}</b>
        <em>{sub}</em>
      </div>
    </div>
  );
}
function Heading({
  top,
  title,
  action,
}: {
  top: string;
  title: string;
  action?: string;
}) {
  return (
    <div className="heading">
      <div>
        <small>{top}</small>
        <h3>{title}</h3>
      </div>
      {action && (
        <button>
          {action}
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
function Trip({
  boat,
  meta,
  amount,
  state,
}: {
  boat: string;
  meta: string;
  amount: string;
  state: string;
}) {
  return (
    <button className="trip">
      <span>
        <Boat />
      </span>
      <div>
        <b>F/V {boat}</b>
        <small>{meta}</small>
      </div>
      <strong>{amount}</strong>
      <em className={state.replace(" ", "").toLowerCase()}>{state}</em>
      <ChevronRight />
    </button>
  );
}
function Action({
  icon,
  title,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button className="action" onClick={onClick}>
      <span>{icon}</span>
      <div>
        <b>{title}</b>
        <small>{sub}</small>
      </div>
      <ChevronRight />
    </button>
  );
}
function Wizard({
  step,
  setStep,
  exit,
  finish,
}: {
  step: number;
  setStep: (n: number) => void;
  exit: () => void;
  finish: () => void;
}) {
  return (
    <div className="wizard">
      <div className="wizardbar">
        <button onClick={exit}>
          <X />
          Save & exit
        </button>
        <span>● Practice settlement</span>
      </div>
      <div className="steps">
        {stepNames.map((n, i) => (
          <button
            key={n}
            className={i === step ? "now" : i < step ? "done" : ""}
            onClick={() => i <= step && setStep(i)}
          >
            <span>{i < step ? <Check /> : i + 1}</span>
            <small>{n}</small>
          </button>
        ))}
      </div>
      <section className="wizardcard">
        {step === 0 && <BoatStep />}
        {step === 1 && <DateStep />}
        {step === 2 && <CrewStep />}
        {step === 3 && <SalesStep />}
        {step === 4 && <CostStep />}
        {step === 5 && <Review />}
        <footer>
          {step > 0 ? (
            <button className="back" onClick={() => setStep(step - 1)}>
              <ArrowLeft />
              Back
            </button>
          ) : (
            <i />
          )}
          <button
            className="primary"
            onClick={() => (step < 5 ? setStep(step + 1) : finish())}
          >
            {step < 5 ? "Continue" : "Finish practice settlement"}
            <ArrowRight />
          </button>
        </footer>
      </section>
      <p className="saved">
        <Check />
        Your work saves automatically
      </p>
    </div>
  );
}
function Intro({
  num,
  title,
  copy,
}: {
  num: number;
  title: string;
  copy: string;
}) {
  return (
    <>
      <small className="kicker">STEP {num} OF 6</small>
      <h1>{title}</h1>
      <p className="intro">{copy}</p>
    </>
  );
}
function BoatStep() {
  const [pick, setPick] = useState(0);
  return (
    <div className="step">
      <Intro
        num={1}
        title="Which boat is this for?"
        copy="Choose the boat that just returned."
      />
      <div className="choices">
        {[
          ["Northern Star", "Captain Tom Costa · 78 ft"],
          ["Sea Venture", "Captain Louis Martin · 72 ft"],
          ["Blue Harbor", "Captain Mike Pires · 65 ft"],
        ].map((b, i) => (
          <button
            key={b[0]}
            className={pick === i ? "picked" : ""}
            onClick={() => setPick(i)}
          >
            <span>
              <Boat />
            </span>
            <div>
              <b>F/V {b[0]}</b>
              <small>{b[1]}</small>
            </div>
            {i === 0 && <em>Usually selected</em>}
            <i>{pick === i && <Check />}</i>
          </button>
        ))}
      </div>
    </div>
  );
}
function DateStep() {
  return (
    <div className="step">
      <Intro
        num={2}
        title="When was the trip?"
        copy="We filled in the most likely dates. Change them if needed."
      />
      <div className="dates">
        <label>
          Left the dock
          <input type="date" defaultValue="2026-08-24" />
        </label>
        <label>
          Returned
          <input type="date" defaultValue="2026-08-30" />
        </label>
      </div>
      <div className="note">
        <ShipWheel />6 days at sea · Trip number 24-081
      </div>
    </div>
  );
}
function CrewStep() {
  const [selected, setSelected] = useState([0, 1, 2, 3]);
  const toggle = (i: number) =>
    setSelected(
      selected.includes(i) ? selected.filter((x) => x !== i) : [...selected, i],
    );
  return (
    <div className="step">
      <Intro
        num={3}
        title="Who was on the boat?"
        copy="Tap a person to add or remove them. Their usual shares are already filled in."
      />
      <div className="crewgrid">
        {people.map((p, i) => (
          <button
            key={p[0]}
            className={selected.includes(i) ? "picked" : ""}
            onClick={() => toggle(i)}
          >
            <span style={{ background: p[4] }}>{p[3]}</span>
            <div>
              <b>{p[0]}</b>
              <small>
                {p[1]} · {p[2]} share
              </small>
            </div>
            <i>{selected.includes(i) && <Check />}</i>
          </button>
        ))}
      </div>
      <button className="add">
        <Plus />
        Someone else was onboard
      </button>
    </div>
  );
}
function SalesStep() {
  const [read, setRead] = useState(false);
  return (
    <div className="step">
      <Intro
        num={4}
        title="Add the fish-sale sheet."
        copy="Take a clear photo or choose a PDF. We’ll read the numbers for you."
      />
      {!read ? (
        <button className="upload" onClick={() => setRead(true)}>
          <span>
            <Camera />
          </span>
          <b>Take a photo</b>
          <small>or choose a PDF from your phone</small>
          <em>Tap to try the sample dealer sheet</em>
        </button>
      ) : (
        <div className="found">
          <span>
            <Check />
          </span>
          <div>
            <small>WE FOUND</small>
            <b>$42,680.75 in fish sales</b>
            <p>12 line items · Atlantic Seafood Exchange</p>
          </div>
          <button onClick={() => setRead(false)}>Change</button>
        </div>
      )}
    </div>
  );
}
function CostStep() {
  return (
    <div className="step">
      <Intro
        num={5}
        title="What did this trip cost?"
        copy="These regular costs were found. Check that they look right."
      />
      <div className="costs">
        <Cost name="Fuel" amount="$5,860.20" />
        <Cost name="Ice" amount="$824.00" />
        <Cost name="Food & supplies" amount="$690.00" />
        <Cost name="Unloading" amount="$840.00" />
      </div>
      <button className="add">
        <Plus />
        Add another cost
      </button>
    </div>
  );
}
function Cost({ name, amount }: { name: string; amount: string }) {
  return (
    <div>
      <span>
        <Receipt />
      </span>
      <b>{name}</b>
      <input aria-label={name} defaultValue={amount} />
      <i>
        <Check />
      </i>
    </div>
  );
}
function Review() {
  return (
    <div className="step review">
      <span className="status">
        <i />
        READY TO FINISH
      </span>
      <Intro
        num={6}
        title="Here’s how the trip divides."
        copy="Check the big numbers. Tap any line if you want to see the exact math."
      />
      <div className="summary">
        <p>
          <span>Fish sold</span>
          <b>$42,680.75</b>
        </p>
        <p>
          <span>Trip costs</span>
          <b>− $8,214.20</b>
        </p>
        <hr />
        <p className="total">
          <span>Amount being divided</span>
          <b>$34,466.55</b>
        </p>
      </div>
      <div className="split">
        <div>
          <small>Boat receives</small>
          <b>$17,233.28</b>
          <span>50% boat share</span>
        </div>
        <div>
          <small>Crew receives</small>
          <b>$17,233.27</b>
          <span>Across 4 crew</span>
        </div>
      </div>
      <button className="math">
        See exactly how this was calculated
        <ChevronRight />
      </button>
      <div className="warning">
        <HelpCircle />
        Practice only. No real payment will be sent.
      </div>
    </div>
  );
}
function Trips({ start }: { start: () => void }) {
  return (
    <div className="page">
      <div className="welcome">
        <div>
          <small>TRIP LOG</small>
          <h1>Every trip, in one place.</h1>
          <p>Continue a trip or open its finished records.</p>
        </div>
        <button className="primary" onClick={start}>
          <Plus />
          Settle a trip
        </button>
      </div>
      <section className="card list">
        <Heading top="ALL TRIPS" title="Trip history" />
        {[
          ["Northern Star", "Aug 24–30", "$42,680.75", "Ready"],
          ["Sea Venture", "Aug 20–27", "$31,215.40", "Needs costs"],
          ["Blue Harbor", "Aug 18–25", "$55,902.10", "Paid"],
          ["Northern Star", "Aug 10–16", "$47,118.82", "Paid"],
          ["Sea Venture", "Aug 3–9", "$29,880.30", "Paid"],
        ].map((t, i) => (
          <Trip
            key={i}
            boat={t[0]}
            meta={`Trip 24-0${81 - i} · ${t[1]}`}
            amount={t[2]}
            state={t[3]}
          />
        ))}
      </section>
    </div>
  );
}
function Boats({ start }: { start: () => void }) {
  return (
    <div className="page">
      <div className="welcome">
        <div>
          <small>ATLANTIC DAWN CO.</small>
          <h1>Your boats</h1>
          <p>Each boat remembers its normal crew, costs, and share rules.</p>
        </div>
        <button className="primary">
          <Plus />
          Add boat
        </button>
      </div>
      <div className="boatgrid">
        {[
          ["Northern Star", "78 ft · Groundfish", "Tom Costa"],
          ["Sea Venture", "72 ft · Scallop", "Louis Martin"],
          ["Blue Harbor", "65 ft · Groundfish", "Mike Pires"],
        ].map((b, i) => (
          <article key={b[0]}>
            <div>
              <Boat />
            </div>
            <span className="status">
              <i />
              ACTIVE
            </span>
            <h2>F/V {b[0]}</h2>
            <p>{b[1]}</p>
            <dl>
              <dt>Captain</dt>
              <dd>{b[2]}</dd>
              <dt>Usual crew</dt>
              <dd>4 people</dd>
            </dl>
            <button onClick={i === 0 ? start : undefined}>
              {i === 0 ? "Start settlement" : "View boat"}
              <ArrowRight />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
function Crew() {
  return (
    <div className="page">
      <div className="welcome">
        <div>
          <small>YOUR PEOPLE</small>
          <h1>Crew</h1>
          <p>Usual shares and payment readiness at a glance.</p>
        </div>
        <button className="primary">
          <Plus />
          Add crew member
        </button>
      </div>
      <div className="directory">
        {people
          .concat([
            ["Louis Martin", "Captain", "1.5", "LM", "#a27fbd"],
            ["João Silva", "Deckhand", "1.0", "JS", "#4e94a6"],
          ])
          .map((p, i) => (
            <article key={p[0]}>
              <span style={{ background: p[4] }}>{p[3]}</span>
              <b>{p[0]}</b>
              <p>{p[1]}</p>
              <dl>
                <dt>Usual share</dt>
                <dd>{p[2]}</dd>
              </dl>
              <small>
                {i === 5 ? "Payment setup needed" : "✓ Ready to be paid"}
              </small>
              <button>
                View details
                <ChevronRight />
              </button>
            </article>
          ))}
      </div>
    </div>
  );
}
