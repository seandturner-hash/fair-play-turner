// All card illustrations as minimal line-drawing SVGs.
// Warm brown strokes (#7C4A1E), no fill, clean and charming.

const S = '#7C4A1E'   // stroke colour
const W = '1.5'       // stroke width
const R = 'round'     // line cap / join

const svg = (content, vb = '0 0 64 64') => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={vb} width="64" height="64"
       fill="none" stroke={S} strokeWidth={W} strokeLinecap={R} strokeLinejoin={R}
       aria-hidden="true">
    {content}
  </svg>
)

export const illustrations = {

  laundry: () => svg(<>
    {/* Washing machine — rectangular body, porthole drum, control panel */}
    <rect x="8" y="10" width="48" height="48" rx="5"/>
    <rect x="8" y="10" width="48" height="14" rx="5"/>
    <rect x="8" y="18" width="48" height="6"/>
    <circle cx="18" cy="17" r="2.5"/>
    <circle cx="26" cy="17" r="2.5"/>
    <circle cx="46" cy="17" r="2.5"/>
    <circle cx="32" cy="40" r="13"/>
    <circle cx="32" cy="40" r="9"/>
    <path d="M26 36c2 3 5 5 9 3" strokeWidth="1.2"/>
  </>),

  home_supplies: () => svg(<>
    {/* Shopping bag with house icon */}
    <path d="M18 24h28l-4 26H22L18 24z"/>
    <path d="M24 24v-6a8 8 0 0 1 16 0v6"/>
    <path d="M26 40l6-6 6 6"/>
    <path d="M32 34v10"/>
  </>),

  grocery_shopping: () => svg(<>
    {/* Grocery bag with produce */}
    <path d="M16 22h32l-4 28H20L16 22z"/>
    <path d="M24 22v-4a8 8 0 0 1 16 0v4"/>
    <circle cx="28" cy="36" r="4"/>
    <path d="M36 32c0 0 2-4 6-2"/>
    <path d="M36 32l1 6"/>
  </>),

  meal_planning: () => svg(<>
    {/* Calendar with fork and knife */}
    <rect x="8" y="14" width="34" height="38" rx="3"/>
    <path d="M8 22h34"/>
    <path d="M18 10v8M34 10v8"/>
    <path d="M48 20v6M48 30v14"/>
    <path d="M44 20c0 0-2 3 0 6s4 3 4 3"/>
    <path d="M52 20c0 0 2 3 0 6s-4 3-4 3"/>
    <line x1="15" y1="30" x2="28" y2="30"/>
    <line x1="15" y1="36" x2="22" y2="36"/>
  </>),

  cooking: () => svg(<>
    {/* Pot with steam */}
    <path d="M16 30h32v16a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V30z"/>
    <path d="M12 30h40"/>
    <rect x="26" y="22" width="12" height="8"/>
    <path d="M10 26h4M50 26h4"/>
    {/* Steam */}
    <path d="M22 18c0 0-2-3 0-6s0-6 0-6" strokeWidth="1.2"/>
    <path d="M30 16c0 0-2-3 0-6s0-6 0-6" strokeWidth="1.2"/>
    <path d="M38 18c0 0-2-3 0-6s0-6 0-6" strokeWidth="1.2"/>
  </>),

  dishes: () => svg(<>
    {/* Stack of plates with bubbles */}
    <ellipse cx="32" cy="46" rx="20" ry="4"/>
    <path d="M12 46c0 0 0-8 20-8s20 8 20 8"/>
    <ellipse cx="32" cy="38" rx="14" ry="3"/>
    <path d="M18 38c0 0 0-6 14-6s14 6 14 6"/>
    <circle cx="22" cy="22" r="3" strokeWidth="1.2"/>
    <circle cx="32" cy="18" r="2.5" strokeWidth="1.2"/>
    <circle cx="42" cy="24" r="2" strokeWidth="1.2"/>
  </>),

  tidying: () => svg(<>
    {/* Broom */}
    <line x1="42" y1="10" x2="24" y2="54"/>
    <path d="M16 48c0 0 2-8 10-10s14 6 18 6"/>
    <line x1="14" y1="52" x2="34" y2="48"/>
  </>),

  housecleaning: () => svg(<>
    {/* Spray bottle and cloth */}
    <path d="M36 12h-8l-2 8h-4v6h16v-6h-4l-2-8z"/>
    <path d="M22 26l-8 4"/>
    <path d="M14 30l6 22"/>
    <path d="M20 52l6-22"/>
    {/* Sparkles */}
    <path d="M44 18l2-4 2 4-4 2 4 2-2 4-2-4-4-2z" strokeWidth="1.2"/>
  </>),

  trash: () => svg(<>
    {/* Trash can with recycling arrows */}
    <path d="M14 22h36"/>
    <rect x="18" y="22" width="28" height="32" rx="3"/>
    <path d="M24 18v-4h16v4"/>
    <line x1="26" y1="30" x2="26" y2="46"/>
    <line x1="32" y1="30" x2="32" y2="46"/>
    <line x1="38" y1="30" x2="38" y2="46"/>
  </>),

  yardwork: () => svg(<>
    {/* Rake */}
    <line x1="32" y1="8" x2="32" y2="52"/>
    <path d="M18 18h28"/>
    <line x1="22" y1="18" x2="20" y2="28"/>
    <line x1="28" y1="18" x2="27" y2="28"/>
    <line x1="36" y1="18" x2="37" y2="28"/>
    <line x1="42" y1="18" x2="44" y2="28"/>
    {/* Leaf */}
    <path d="M42 44c2-6 8-8 10-6-2 6-8 8-10 6z" strokeWidth="1.2"/>
  </>),

  home_maintenance: () => svg(<>
    {/* Hammer and wrench */}
    <path d="M18 46L38 26l4 4-20 20z"/>
    <path d="M38 26l6-10 4 4-4 6-2 0-4-2 2 2z"/>
    <path d="M42 44c4-4 8-2 10 0s2 6-2 8-8 0-8-4"/>
    <path d="M44 46l-10 10"/>
  </>),

  car_maintenance: () => svg(<>
    {/* Car silhouette */}
    <path d="M10 38h44v8H10z" rx="2"/>
    <path d="M14 38l6-14h24l6 14"/>
    <circle cx="20" cy="46" r="5"/>
    <circle cx="44" cy="46" r="5"/>
    {/* Wrench */}
    <path d="M44 20c0 0 4-8 10-4-4 4-4 6-2 8 2 2 6 2 6 6s-4 4-6 2c-2-2-2-6-4-6s-4 2-4-6z" strokeWidth="1.2"/>
  </>),

  pest_control: () => svg(<>
    {/* Spray can + bug */}
    <rect x="22" y="24" width="12" height="28" rx="3"/>
    <rect x="24" y="18" width="8" height="6" rx="1"/>
    <path d="M34 32l10-4"/>
    <path d="M34 36l10 0"/>
    <path d="M34 40l10 4"/>
    {/* Bug body */}
    <ellipse cx="48" cy="24" rx="5" ry="7" strokeWidth="1.2"/>
    <path d="M44 20l-4-4M52 20l4-4" strokeWidth="1.2"/>
    <path d="M44 26l-4 0M52 26l4 0" strokeWidth="1.2"/>
  </>),

  plants: () => svg(<>
    {/* Potted plant */}
    <path d="M20 48h24l-3-14H23L20 48z"/>
    <path d="M16 50h32"/>
    <path d="M32 34v-20"/>
    <path d="M32 24c0 0-8-6-12-2 4 0 8 4 12 6z"/>
    <path d="M32 18c0 0 8-6 12-2-4 0-8 4-12 6z"/>
    <path d="M32 30c0 0-4-8 0-12"/>
  </>),

  linens: () => svg(<>
    {/* Folded bedding */}
    <rect x="10" y="28" width="44" height="22" rx="3"/>
    <rect x="10" y="28" width="44" height="8" rx="2"/>
    <path d="M10 36h44"/>
    <path d="M18 14h28l4 14H14L18 14z"/>
    {/* Pillow outline */}
    <ellipse cx="32" cy="14" rx="12" ry="5"/>
  </>),

  closet: () => svg(<>
    {/* Hanging clothes */}
    <path d="M20 16c0-4 4-6 6-4v3l-10 8h32l-10-8v-3c2-2 6 0 6 4"/>
    <line x1="32" y1="8" x2="32" y2="16"/>
    <path d="M10 24h44v30H10z"/>
    <line x1="32" y1="24" x2="32" y2="54"/>
    <path d="M16 30l6 6M22 30l-6 6"/>
    <path d="M42 30l6 6M48 30l-6 6"/>
  </>),

  home_decor: () => svg(<>
    {/* Picture frame on wall */}
    <rect x="14" y="10" width="36" height="28" rx="2"/>
    <rect x="20" y="16" width="24" height="16" rx="1"/>
    <path d="M26 46h12v-8H26z"/>
    <line x1="14" y1="46" x2="50" y2="46"/>
    {/* Small flower in frame */}
    <circle cx="32" cy="24" r="3"/>
    <circle cx="32" cy="18" r="2" strokeWidth="1.2"/>
    <circle cx="38" cy="24" r="2" strokeWidth="1.2"/>
    <circle cx="32" cy="30" r="2" strokeWidth="1.2"/>
    <circle cx="26" cy="24" r="2" strokeWidth="1.2"/>
  </>),

  electronics: () => svg(<>
    {/* Laptop */}
    <rect x="14" y="18" width="36" height="24" rx="2"/>
    <path d="M8 42h48l-4 6H12L8 42z"/>
    <rect x="20" y="24" width="24" height="14" rx="1"/>
    <circle cx="32" cy="46" r="1.5"/>
  </>),

  mail: () => svg(<>
    {/* Envelope */}
    <rect x="8" y="16" width="48" height="34" rx="3"/>
    <path d="M8 16l24 20 24-20"/>
    <path d="M8 50l18-16M56 50L38 34"/>
  </>),

  bills: () => svg(<>
    {/* Receipt with dollar sign */}
    <path d="M16 10h32v50l-6-4-6 4-6-4-6 4-6-4-2-46z"/>
    <path d="M32 22v20"/>
    <path d="M28 24c0 0 0-4 4-4s4 4 4 4-4 2-4 4 4 4 4 4-4 4-8 0"/>
    <line x1="22" y1="42" x2="42" y2="42"/>
  </>),

  // ── OUT ──────────────────────────────────────────────────────────────────

  extracurricular: () => svg(<>
    {/* Stars and activity */}
    <circle cx="32" cy="32" r="16"/>
    <path d="M32 16l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z"/>
  </>),

  transportation: () => svg(<>
    {/* Car */}
    <path d="M10 38h44v8H10z"/>
    <path d="M14 38l6-14h24l6 14"/>
    <circle cx="20" cy="46" r="5"/>
    <circle cx="44" cy="46" r="5"/>
    <path d="M20 30h24"/>
  </>),

  school_admin: () => svg(<>
    {/* School bag */}
    <path d="M16 26h32v28a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V26z"/>
    <path d="M24 26v-6a8 8 0 0 1 16 0v6"/>
    <rect x="24" y="36" width="16" height="10" rx="2"/>
    <line x1="32" y1="36" x2="32" y2="46"/>
    <line x1="24" y1="41" x2="40" y2="41"/>
  </>),

  school_communication: () => svg(<>
    {/* Speech bubble with pencil */}
    <path d="M10 16h36a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H30l-8 8v-8h-12a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z"/>
    <path d="M20 28h16M20 34h10"/>
  </>),

  tutoring: () => svg(<>
    {/* Open book with pencil */}
    <path d="M10 18h22v34H10a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2z"/>
    <path d="M54 18H32v34h22a2 2 0 0 0 2-2V20a2 2 0 0 0-2-2z"/>
    <line x1="32" y1="18" x2="32" y2="52"/>
    <path d="M44 28l8-10 4 4-8 10z"/>
    <path d="M44 28l-4 4 4-4z"/>
  </>),

  medical_admin: () => svg(<>
    {/* Clipboard with cross */}
    <rect x="16" y="14" width="32" height="40" rx="3"/>
    <rect x="24" y="10" width="16" height="8" rx="2"/>
    <path d="M28 34h8M32 30v8"/>
    <line x1="22" y1="44" x2="42" y2="44"/>
  </>),

  dental: () => svg(<>
    {/* Tooth */}
    <path d="M20 18c-4 2-6 8-4 14 1 4 3 6 4 12 1 4 4 4 5 0l1-8c2-4 4-4 6 0l1 8c1 4 4 4 5 0 1-6 3-8 4-12 2-6 0-12-4-14-2-1-4 2-8 2s-6-3-8-2h-2z"/>
  </>),

  vision: () => svg(<>
    {/* Glasses */}
    <circle cx="22" cy="34" r="10"/>
    <circle cx="42" cy="34" r="10"/>
    <path d="M32 34h0"/>
    <path d="M12 30c-2-2-6-2-8 0"/>
    <path d="M52 30c2-2 6-2 8 0"/>
  </>),

  scheduling: () => svg(<>
    {/* Calendar */}
    <rect x="10" y="14" width="44" height="40" rx="3"/>
    <path d="M10 24h44"/>
    <path d="M20 10v8M44 10v8"/>
    <circle cx="22" cy="34" r="2"/>
    <circle cx="32" cy="34" r="2"/>
    <circle cx="42" cy="34" r="2"/>
    <circle cx="22" cy="44" r="2"/>
    <circle cx="32" cy="44" r="2"/>
  </>),

  dining_out: () => svg(<>
    {/* Fork and knife */}
    <path d="M22 10v16a6 6 0 0 0 6 6v18"/>
    <path d="M18 10v8M26 10v8"/>
    <path d="M42 10v44"/>
    <path d="M38 10c0 0-2 8 4 12"/>
  </>),

  travel: () => svg(<>
    {/* Suitcase with plane */}
    <rect x="14" y="26" width="36" height="28" rx="3"/>
    <rect x="22" y="20" width="20" height="6" rx="2"/>
    <line x1="14" y1="36" x2="50" y2="36"/>
    <line x1="32" y1="36" x2="32" y2="54"/>
    <path d="M40 14l-16 6 6 2 10-4z" strokeWidth="1.2"/>
    <path d="M24 20l2-4" strokeWidth="1.2"/>
  </>),

  dry_cleaning: () => svg(<>
    {/* Clothes hanger */}
    <path d="M32 10c4 0 6 2 6 4s-4 4-6 4"/>
    <path d="M32 18l-20 22h40L32 18z"/>
    <path d="M18 44h28"/>
  </>),

  pharmacy: () => svg(<>
    {/* Pill and mortar */}
    <ellipse cx="32" cy="24" rx="14" ry="8" transform="rotate(-30 32 24)"/>
    <line x1="20" y1="30" x2="44" y2="18" strokeWidth="1.8"/>
    <path d="M16 40h32l-4 12H20L16 40z"/>
  </>),

  tailoring: () => svg(<>
    {/* Needle and thread / scissors */}
    <path d="M14 50L50 14"/>
    <circle cx="14" cy="50" r="5"/>
    <circle cx="50" cy="14" r="5"/>
    <path d="M24 24l-10 6 10 6z"/>
    <path d="M40 40l10-6-10-6z"/>
  </>),

  returns: () => svg(<>
    {/* Box with arrow */}
    <rect x="14" y="24" width="32" height="28" rx="2"/>
    <path d="M14 24l18-14 18 14"/>
    <path d="M26 36l6-8 6 8"/>
    <line x1="32" y1="28" x2="32" y2="44"/>
  </>),

  home_services: () => svg(<>
    {/* Phone with house */}
    <rect x="20" y="10" width="24" height="40" rx="4"/>
    <path d="M26 16h12M32 46v2"/>
    <path d="M28 26l4-4 4 4v8H28v-8z"/>
    <line x1="30" y1="34" x2="30" y2="30"/>
  </>),

  // ── CAREGIVING ───────────────────────────────────────────────────────────

  morning_routine: () => svg(<>
    {/* Sun rising */}
    <path d="M32 34a14 14 0 0 1 14-14"/>
    <path d="M32 34a14 14 0 0 0-14-14"/>
    <line x1="32" y1="14" x2="32" y2="8"/>
    <line x1="46" y1="20" x2="50" y2="16"/>
    <line x1="18" y1="20" x2="14" y2="16"/>
    <line x1="8" y1="34" x2="14" y2="34"/>
    <line x1="50" y1="34" x2="56" y2="34"/>
    <line x1="32" y1="34" x2="32" y2="56"/>
    <line x1="10" y1="54" x2="54" y2="54"/>
  </>),

  bedtime_routine: () => svg(<>
    {/* Moon and stars */}
    <path d="M36 14c-10 4-14 14-10 24 4 8 14 12 22 8-10 4-22-2-22-16 0-8 4-14 10-16z"/>
    <path d="M44 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" strokeWidth="1.2"/>
    <path d="M52 24l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" strokeWidth="1.2"/>
  </>),

  bathing: () => svg(<>
    {/* Bath tub */}
    <path d="M8 36h48v8a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6v-8z"/>
    <path d="M16 36V20a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v4"/>
    <path d="M8 36h48"/>
    <path d="M16 52v4M48 52v4"/>
    {/* Water ripples */}
    <path d="M22 42c2-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeWidth="1.2"/>
  </>),

  feeding: () => svg(<>
    {/* Baby bottle */}
    <path d="M26 10h12v6H26z"/>
    <path d="M24 16h16l2 8H22l2-8z"/>
    <rect x="22" y="24" width="20" height="28" rx="6"/>
    <path d="M26 36c2-2 4-2 6 0s4 2 6 0" strokeWidth="1.2"/>
  </>),

  childrens_clothing: () => svg(<>
    {/* Child's t-shirt */}
    <path d="M20 14l-12 10 8 4v24h32V28l8-4-12-10c0 4-6 8-12 8s-12-4-12-8z"/>
  </>),

  school_lunches: () => svg(<>
    {/* Lunch box with apple */}
    <rect x="12" y="28" width="40" height="26" rx="4"/>
    <path d="M12 38h40"/>
    <path d="M26 18h12a6 6 0 0 1 6 6v4H20v-4a6 6 0 0 1 6-6z"/>
    <circle cx="32" cy="34" r="4"/>
    <path d="M32 30v-4" strokeWidth="1.2"/>
  </>),

  homework: () => svg(<>
    {/* Open book with pencil */}
    <path d="M10 18h22v34H10z"/>
    <path d="M54 18H32v34h22z"/>
    <line x1="32" y1="18" x2="32" y2="52"/>
    <line x1="16" y1="28" x2="26" y2="28"/>
    <line x1="16" y1="34" x2="26" y2="34"/>
    <line x1="16" y1="40" x2="22" y2="40"/>
    <path d="M46 22l6-8 4 4-6 8z"/>
    <path d="M46 22l-4 6 4-6z"/>
  </>),

  reading: () => svg(<>
    {/* Open book with cozy lamp suggestion */}
    <path d="M12 20h20v28H12a2 2 0 0 1-2-2V22a2 2 0 0 1 2-2z"/>
    <path d="M52 20H32v28h20a2 2 0 0 0 2-2V22a2 2 0 0 0-2-2z"/>
    <line x1="32" y1="20" x2="32" y2="48"/>
    <line x1="18" y1="28" x2="26" y2="28"/>
    <line x1="18" y1="33" x2="26" y2="33"/>
    <path d="M44 14a6 6 0 0 0-12 0"/>
    <line x1="38" y1="14" x2="38" y2="20"/>
  </>),

  screen_time: () => svg(<>
    {/* Tablet with clock */}
    <rect x="14" y="10" width="36" height="44" rx="4"/>
    <rect x="18" y="16" width="28" height="32" rx="1"/>
    <circle cx="32" cy="57" r="1.5"/>
    <circle cx="32" cy="32" r="8"/>
    <path d="M32 28v4l3 3"/>
  </>),

  indoor_play: () => svg(<>
    {/* Building blocks */}
    <rect x="10" y="36" width="14" height="14" rx="1"/>
    <rect x="26" y="28" width="14" height="22" rx="1"/>
    <rect x="42" y="20" width="14" height="30" rx="1"/>
    <line x1="10" y1="54" x2="56" y2="54"/>
  </>),

  outdoor_play: () => svg(<>
    {/* Ball and sun */}
    <circle cx="32" cy="40" r="14"/>
    <path d="M24 28a14 14 0 0 1 16 0"/>
    <path d="M18 40a14 14 0 0 1 6-12"/>
    <path d="M46 40a14 14 0 0 1-6 12"/>
    <circle cx="42" cy="18" r="6"/>
    <line x1="42" y1="8" x2="42" y2="10"/>
    <line x1="42" y1="26" x2="42" y2="28"/>
    <line x1="32" y1="18" x2="34" y2="18"/>
    <line x1="50" y1="18" x2="52" y2="18"/>
  </>),

  childcare: () => svg(<>
    {/* Adult holding child's hand */}
    <circle cx="20" cy="14" r="7"/>
    <path d="M10 54V36a10 10 0 0 1 10-10h0a10 10 0 0 1 10 10v4"/>
    <circle cx="44" cy="22" r="5"/>
    <path d="M36 54V40a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8v14"/>
    <line x1="30" y1="38" x2="36" y2="36"/>
  </>),

  discipline: () => svg(<>
    {/* Raised hand — boundary/stop */}
    <path d="M24 38V18a4 4 0 0 1 8 0v12"/>
    <path d="M32 30V22a4 4 0 0 1 8 0v10"/>
    <path d="M40 32V26a4 4 0 0 1 8 0v10c0 10-6 18-16 18s-16-8-16-16V28a4 4 0 0 1 8 0v10"/>
  </>),

  emotional_support: () => svg(<>
    {/* Heart with hands */}
    <path d="M32 48s-20-12-20-24a10 10 0 0 1 20 0 10 10 0 0 1 20 0c0 12-20 24-20 24z"/>
  </>),

  pediatrician: () => svg(<>
    {/* Stethoscope */}
    <path d="M20 14v16a12 12 0 0 0 12 12h0a12 12 0 0 0 12-12V22"/>
    <circle cx="44" cy="20" r="5"/>
    <path d="M18 14a3 3 0 0 1 4 0"/>
    <path d="M20 10v4"/>
    <path d="M22 10v4"/>
    <circle cx="44" cy="42" r="4" strokeWidth="1.2"/>
  </>),

  dentist_kids: () => svg(<>
    {/* Tooth with star */}
    <path d="M22 18c-4 2-6 8-4 14 1 4 3 6 4 12 1 4 4 4 5 0l1-8c2-4 4-4 6 0l1 8c1 4 4 4 5 0 1-6 3-8 4-12 2-6 0-12-4-14-2-1-4 2-8 2s-6-3-8-2h-2z"/>
    <path d="M42 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" strokeWidth="1.2"/>
  </>),

  health_kids: () => svg(<>
    {/* Bandage / first aid */}
    <rect x="14" y="24" width="36" height="16" rx="8"/>
    <rect x="24" y="14" width="16" height="36" rx="8"/>
    <rect x="24" y="24" width="16" height="16" rx="2"/>
    <path d="M30 32h4M32 30v4" strokeWidth="1.5"/>
  </>),

  friendships_kids: () => svg(<>
    {/* Two small figures holding hands */}
    <circle cx="22" cy="20" r="5"/>
    <path d="M14 40v-8a8 8 0 0 1 8-8"/>
    <path d="M30 24a8 8 0 0 1 8 8v8"/>
    <circle cx="42" cy="20" r="5"/>
    <line x1="30" y1="30" x2="34" y2="30"/>
  </>),

  pets: () => svg(<>
    {/* Dog/cat face */}
    <circle cx="32" cy="34" r="16"/>
    <circle cx="25" cy="30" r="3"/>
    <circle cx="39" cy="30" r="3"/>
    <path d="M26 38c1 3 10 3 12 0"/>
    <circle cx="32" cy="36" r="2"/>
    <path d="M20 20l4-8M44 20l-4-8"/>
  </>),

  pet_medical: () => svg(<>
    {/* Paw with cross */}
    <circle cx="32" cy="38" r="8"/>
    <circle cx="20" cy="30" r="4"/>
    <circle cx="44" cy="30" r="4"/>
    <circle cx="26" cy="24" r="3"/>
    <circle cx="38" cy="24" r="3"/>
    <path d="M28 38h8M32 34v8" strokeWidth="1.5"/>
  </>),

  aging_parents: () => svg(<>
    {/* Elderly person with walking stick + heart above */}
    <circle cx="32" cy="14" r="7"/>
    <path d="M32 21v14"/>
    <path d="M32 28l-8 6"/>
    <path d="M32 28l8 6"/>
    <path d="M24 35v16"/>
    <path d="M40 35v16"/>
    <path d="M38 44l6 8"/>
    <path d="M38 44c0 0 4 0 6-4"/>
  </>),

  special_needs: () => svg(<>
    {/* Heart with hands reaching */}
    <path d="M32 44s-16-10-16-20a8 8 0 0 1 16 0 8 8 0 0 1 16 0c0 10-16 20-16 20z"/>
    <path d="M16 52l8-8M48 52l-8-8"/>
  </>),

  nap_schedule: () => svg(<>
    {/* Zzz and moon */}
    <path d="M34 20c-8 4-10 12-6 20 3 6 10 10 18 8-8 4-18-2-18-14 0-6 2-12 6-14z"/>
    <path d="M42 12l6-0-4 4h4" strokeWidth="1.3"/>
    <path d="M48 24l4-0-3 3h3" strokeWidth="1.1"/>
  </>),

  baby_gear: () => svg(<>
    {/* Pram / stroller */}
    <path d="M14 30h30a16 16 0 0 1-16 16"/>
    <path d="M10 18h34"/>
    <path d="M10 18l4 12"/>
    <circle cx="22" cy="50" r="5"/>
    <circle cx="42" cy="50" r="5"/>
    <line x1="44" y1="18" x2="50" y2="30"/>
  </>),

  // ── MAGIC ────────────────────────────────────────────────────────────────

  birthday_kids: () => svg(<>
    {/* Birthday cake */}
    <rect x="12" y="30" width="40" height="22" rx="3"/>
    <path d="M18 30v-6h28v6"/>
    <path d="M26 24v-8h12v8"/>
    <path d="M32 16v-8"/>
    <path d="M28 8c0 0 0-4 4-4s4 4 4 4"/>
    <path d="M18 40c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" strokeWidth="1.2"/>
  </>),

  birthday_adults: () => svg(<>
    {/* Champagne glasses clinking */}
    <path d="M22 14l6 22h-8l6-22z"/>
    <path d="M42 14l6 22h-8l6-22z"/>
    <line x1="26" y1="36" x2="26" y2="50"/>
    <line x1="46" y1="36" x2="46" y2="50"/>
    <line x1="20" y1="50" x2="32" y2="50"/>
    <line x1="40" y1="50" x2="52" y2="50"/>
    <line x1="24" y1="24" x2="40" y2="20"/>
    {/* Bubbles */}
    <circle cx="28" cy="20" r="1" strokeWidth="1.2"/>
    <circle cx="36" cy="18" r="1" strokeWidth="1.2"/>
  </>),

  holiday_traditions: () => svg(<>
    {/* Christmas tree / star */}
    <path d="M32 10l8 14h-4l8 14H18l8-14h-4L32 10z"/>
    <rect x="26" y="38" width="12" height="6"/>
    <path d="M32 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>
    <circle cx="24" cy="28" r="2" strokeWidth="1.2"/>
    <circle cx="40" cy="26" r="2" strokeWidth="1.2"/>
    <circle cx="32" cy="32" r="2" strokeWidth="1.2"/>
  </>),

  school_celebrations: () => svg(<>
    {/* Graduation cap */}
    <path d="M14 26l18-10 18 10-18 10L14 26z"/>
    <path d="M46 30v12l-14 6-14-6V30"/>
    <path d="M50 26v12"/>
    <circle cx="50" cy="40" r="3"/>
  </>),

  thank_you_notes: () => svg(<>
    {/* Letter with heart */}
    <rect x="8" y="18" width="48" height="32" rx="3"/>
    <path d="M8 18l24 18 24-18"/>
    <path d="M32 32s-6-4-6-8a4 4 0 0 1 6 2 4 4 0 0 1 6-2c0 4-6 8-6 8z" strokeWidth="1.2"/>
  </>),

  spiritual: () => svg(<>
    {/* Simple mandala / lotus */}
    <circle cx="32" cy="32" r="8"/>
    <path d="M32 24V14M32 50V40M24 32H14M50 32H40"/>
    <path d="M26 26l-8-8M46 46l-8-8M38 26l8-8M18 46l8-8"/>
  </>),

  family_meetings: () => svg(<>
    {/* Three people around table */}
    <ellipse cx="32" cy="44" rx="18" ry="6"/>
    <circle cx="18" cy="28" r="5"/>
    <circle cx="32" cy="20" r="5"/>
    <circle cx="46" cy="28" r="5"/>
    <path d="M18 33v5M32 25v13M46 33v5"/>
  </>),

  family_fun: () => svg(<>
    {/* Kite */}
    <path d="M32 10L50 32 32 54 14 32z"/>
    <line x1="32" y1="10" x2="32" y2="54"/>
    <line x1="14" y1="32" x2="50" y2="32"/>
    <path d="M32 54c0 0 4 4 0 10"/>
    <path d="M32 60l-3 3M32 60l3 3"/>
  </>),

  family_photos: () => svg(<>
    {/* Camera */}
    <rect x="8" y="20" width="48" height="34" rx="4"/>
    <circle cx="32" cy="37" r="10"/>
    <circle cx="32" cy="37" r="6"/>
    <path d="M24 14h16l4 6H20l4-6z"/>
    <circle cx="48" cy="28" r="3"/>
  </>),

  date_night: () => svg(<>
    {/* Candle and wine glass */}
    <path d="M28 20v24"/>
    <path d="M22 44h12v6H22z"/>
    <path d="M28 16c0 0-3-4 0-8 3 4 0 8 0 8z"/>
    <path d="M42 16l4 20h-6l4-20z"/>
    <line x1="44" y1="36" x2="44" y2="48"/>
    <line x1="40" y1="48" x2="48" y2="48"/>
    <path d="M22 26c2-1 4-1 6 0"/>
  </>),

  gifts: () => svg(<>
    {/* Gift box with bow */}
    <rect x="10" y="30" width="44" height="24" rx="2"/>
    <rect x="10" y="24" width="44" height="6" rx="1"/>
    <line x1="32" y1="24" x2="32" y2="54"/>
    <path d="M32 24c0 0-8-4-8-10s8-6 8 0"/>
    <path d="M32 24c0 0 8-4 8-10s-8-6-8 0"/>
  </>),

  charitable_giving: () => svg(<>
    {/* Hand holding heart */}
    <path d="M22 48l-12-6 4-8 8 2v-6a4 4 0 0 1 4-4h12l10 4 4 8-20 10H22z"/>
    <path d="M26 30s-4-3-4-7a5 5 0 0 1 4-2 5 5 0 0 1 4 2 5 5 0 0 1 4-2 5 5 0 0 1 4 2c0 4-4 7-8 10z" strokeWidth="1.2"/>
  </>),

  community: () => svg(<>
    {/* Group of people */}
    <circle cx="20" cy="22" r="5"/>
    <circle cx="32" cy="18" r="5"/>
    <circle cx="44" cy="22" r="5"/>
    <path d="M10 44v-6a10 10 0 0 1 10-10"/>
    <path d="M54 44v-6a10 10 0 0 0-10-10"/>
    <path d="M22 28a10 10 0 0 1 10-5 10 10 0 0 1 10 5v16H22V28z"/>
  </>),

  couples_friends: () => svg(<>
    {/* Two overlapping hearts */}
    <path d="M24 40s-12-8-12-16a8 8 0 0 1 12 0 8 8 0 0 1 12 0c0 8-12 16-12 16z"/>
    <path d="M40 40s-12-8-12-16a8 8 0 0 1 12 0 8 8 0 0 1 12 0c0 8-12 16-12 16z"/>
  </>),

  partnership: () => svg(<>
    {/* Two interlocking rings */}
    <circle cx="24" cy="32" r="12"/>
    <circle cx="40" cy="32" r="12"/>
    <path d="M32 22a12 12 0 0 1 0 20"/>
    <path d="M32 22a12 12 0 0 0 0 20"/>
  </>),

  financial_planning: () => svg(<>
    {/* Growing bar chart */}
    <line x1="12" y1="52" x2="52" y2="52"/>
    <line x1="12" y1="52" x2="12" y2="12"/>
    <rect x="18" y="38" width="8" height="14"/>
    <rect x="30" y="28" width="8" height="24"/>
    <rect x="42" y="18" width="8" height="34"/>
    <path d="M16 36l14-12 12 8 8-14" strokeWidth="1.5"/>
  </>),

  estate_planning: () => svg(<>
    {/* Document with seal */}
    <path d="M16 8h24l10 10v38H16V8z"/>
    <path d="M40 8v10h10"/>
    <line x1="22" y1="26" x2="42" y2="26"/>
    <line x1="22" y1="32" x2="42" y2="32"/>
    <line x1="22" y1="38" x2="34" y2="38"/>
    <circle cx="36" cy="46" r="6"/>
    <path d="M36 42l1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z" strokeWidth="1.1"/>
  </>),

  cultural: () => svg(<>
    {/* Globe with ticket */}
    <circle cx="30" cy="28" r="16"/>
    <path d="M14 28h32"/>
    <path d="M30 12c0 0-8 6-8 16s8 16 8 16"/>
    <path d="M30 12c0 0 8 6 8 16s-8 16-8 16"/>
    <rect x="38" y="40" width="16" height="10" rx="2"/>
    <line x1="42" y1="40" x2="42" y2="50"/>
  </>),

  volunteering: () => svg(<>
    {/* Hand raised */}
    <path d="M32 12v28"/>
    <path d="M26 18v22"/>
    <path d="M20 22v18"/>
    <path d="M38 20v20"/>
    <path d="M44 24v16"/>
    <path d="M20 40c0 4 4 8 12 8s12-4 12-8"/>
  </>),

  greeting_cards: () => svg(<>
    {/* Card with heart */}
    <rect x="10" y="16" width="44" height="32" rx="3"/>
    <path d="M10 28h44"/>
    <path d="M32 36s-8-4-8-10a5 5 0 0 1 8 2 5 5 0 0 1 8-2c0 6-8 10-8 10z" strokeWidth="1.3"/>
  </>),

  // ── WILD ─────────────────────────────────────────────────────────────────

  self_care: () => svg(<>
    {/* Bath / candle / bubbles */}
    <path d="M16 38h32v8a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4v-8z"/>
    <path d="M16 38h32"/>
    <path d="M24 30v8M40 30v8"/>
    <path d="M32 26v4"/>
    <path d="M32 22c0 0-2-3 0-5s0-5 0-5"/>
    <circle cx="22" cy="22" r="2" strokeWidth="1.2"/>
    <circle cx="42" cy="20" r="1.5" strokeWidth="1.2"/>
  </>),

  health_adult: () => svg(<>
    {/* Apple and heart */}
    <path d="M32 26c-2-4-10-8-14-2s0 14 6 20c4 4 6 4 8 4s4 0 8-4c6-6 10-16 6-20s-12-2-14 2z"/>
    <path d="M30 20c0-4 2-8 6-8"/>
    <path d="M36 12l4-4"/>
  </>),

  exercise: () => svg(<>
    {/* Running figure */}
    <circle cx="38" cy="14" r="5"/>
    <path d="M32 20l-6 12 6 6"/>
    <path d="M36 20l8 10 6-4"/>
    <path d="M26 32l-6 16"/>
    <path d="M38 30l4 16"/>
  </>),

  professional_dev: () => svg(<>
    {/* Certificate / diploma */}
    <rect x="10" y="16" width="44" height="32" rx="3"/>
    <path d="M20 28h24M20 34h16"/>
    <circle cx="40" cy="42" r="6"/>
    <path d="M37 50l-4 8 7-4 7 4-4-8"/>
  </>),

  tax: () => svg(<>
    {/* Calculator */}
    <rect x="16" y="10" width="32" height="44" rx="3"/>
    <rect x="20" y="14" width="24" height="10" rx="1"/>
    <circle cx="24" cy="32" r="2"/>
    <circle cx="32" cy="32" r="2"/>
    <circle cx="40" cy="32" r="2"/>
    <circle cx="24" cy="40" r="2"/>
    <circle cx="32" cy="40" r="2"/>
    <circle cx="40" cy="40" r="2"/>
    <circle cx="24" cy="48" r="2"/>
    <circle cx="32" cy="48" r="2"/>
    <rect x="36" y="44" width="8" height="8" rx="1"/>
  </>),

  insurance: () => svg(<>
    {/* Shield with tick */}
    <path d="M32 10l20 8v14c0 10-10 18-20 22-10-4-20-12-20-22V18L32 10z"/>
    <path d="M22 32l6 6 14-12"/>
  </>),

  major_purchases: () => svg(<>
    {/* Price tag with star */}
    <path d="M14 14h20l16 18-20 18-16-18V14z"/>
    <circle cx="28" cy="24" r="4"/>
    <path d="M38 28l8 8"/>
  </>),

  moving: () => svg(<>
    {/* Moving box with arrow */}
    <rect x="12" y="26" width="32" height="26" rx="2"/>
    <path d="M12 26l16-16 16 16"/>
    <line x1="22" y1="26" x2="22" y2="52"/>
    <path d="M28 36h8M32 32v8"/>
    <path d="M44 20l8-8 4 4-8 8"/>
    <path d="M52 12l4 4-2 4-6-6z"/>
  </>),

  emergency_prep: () => svg(<>
    {/* First aid kit */}
    <rect x="10" y="20" width="44" height="34" rx="4"/>
    <path d="M26 12h12v8H26z"/>
    <path d="M28 37h8M32 33v8" strokeWidth="1.8"/>
    <path d="M10 32h44"/>
  </>),

  online_safety: () => svg(<>
    {/* Shield with lock */}
    <path d="M32 10l20 8v14c0 10-10 18-20 22-10-4-20-12-20-22V18L32 10z"/>
    <rect x="26" y="32" width="12" height="10" rx="2"/>
    <path d="M28 32v-4a4 4 0 0 1 8 0v4"/>
    <circle cx="32" cy="37" r="2"/>
  </>),

  mental_health: () => svg(<>
    {/* Brain with heart */}
    <path d="M32 20c0-6 8-8 10-2 4-4 10-2 10 4 0 8-10 16-20 22-10-6-20-14-20-22 0-6 6-8 10-4 2-6 10-4 10 2z"/>
    <path d="M32 20v18"/>
    <path d="M26 26l6 6 6-6"/>
  </>),

  summer_planning: () => svg(<>
    {/* Sun with list */}
    <circle cx="22" cy="24" r="10"/>
    <line x1="22" y1="10" x2="22" y2="14"/>
    <line x1="22" y1="34" x2="22" y2="38"/>
    <line x1="8" y1="24" x2="12" y2="24"/>
    <line x1="32" y1="24" x2="36" y2="24"/>
    <line x1="12" y1="14" x2="15" y2="17"/>
    <line x1="29" y1="31" x2="32" y2="34"/>
    <line x1="12" y1="34" x2="15" y2="31"/>
    <line x1="29" y1="17" x2="32" y2="14"/>
    <line x1="40" y1="32" x2="56" y2="32"/>
    <line x1="40" y1="40" x2="56" y2="40"/>
    <line x1="40" y1="48" x2="50" y2="48"/>
    <circle cx="37" cy="32" r="2"/>
    <circle cx="37" cy="40" r="2"/>
    <circle cx="37" cy="48" r="2"/>
  </>),

  camp: () => svg(<>
    {/* Tent */}
    <path d="M8 52l24-38 24 38H8z"/>
    <path d="M20 52l12-24 12 24"/>
    <path d="M8 52h48"/>
    <path d="M28 52v-8h8v8"/>
    <circle cx="46" cy="20" r="4"/>
    <line x1="46" y1="12" x2="46" y2="14"/>
    <line x1="52" y1="14" x2="50" y2="16"/>
    <line x1="54" y1="20" x2="52" y2="20"/>
  </>),

  sports: () => svg(<>
    {/* Soccer ball */}
    <circle cx="32" cy="32" r="20"/>
    <path d="M32 12l4 8-8 6-6-8 6-8 4 2z"/>
    <path d="M48 22l-4 8-10-2v-8l8-2 6 4z"/>
    <path d="M44 42l-8-2-2-10 8-4 6 6-4 10z"/>
    <path d="M20 42l4-10 8 2 2 10-8 4-6-6z"/>
    <path d="M16 22l6 4v8l-10 2-4-8 8-6z"/>
  </>),

  music_lessons: () => svg(<>
    {/* Music notes */}
    <path d="M22 42V20l28-8v22"/>
    <circle cx="18" cy="42" r="4"/>
    <circle cx="46" cy="34" r="4"/>
    <path d="M22 20l28-8"/>
  </>),

  art: () => svg(<>
    {/* Paintbrush and palette */}
    <circle cx="30" cy="28" r="14"/>
    <path d="M30 20a6 6 0 0 0 0 16"/>
    <circle cx="24" cy="22" r="2" strokeWidth="1.2"/>
    <circle cx="36" cy="22" r="2" strokeWidth="1.2"/>
    <circle cx="36" cy="34" r="2" strokeWidth="1.2"/>
    <circle cx="24" cy="34" r="2" strokeWidth="1.2"/>
    <path d="M44 28l12-16"/>
    <path d="M44 24l4 8"/>
  </>),

  news: () => svg(<>
    {/* Newspaper */}
    <rect x="10" y="14" width="44" height="36" rx="2"/>
    <rect x="14" y="18" width="18" height="14" rx="1"/>
    <line x1="36" y1="18" x2="50" y2="18"/>
    <line x1="36" y1="23" x2="50" y2="23"/>
    <line x1="36" y1="28" x2="50" y2="28"/>
    <line x1="14" y1="36" x2="50" y2="36"/>
    <line x1="14" y1="41" x2="50" y2="41"/>
    <line x1="14" y1="46" x2="36" y2="46"/>
  </>),

  books: () => svg(<>
    {/* Stack of books */}
    <rect x="12" y="40" width="40" height="8" rx="1"/>
    <rect x="16" y="30" width="32" height="10" rx="1"/>
    <rect x="14" y="20" width="36" height="10" rx="1"/>
    <line x1="24" y1="20" x2="24" y2="30"/>
    <line x1="20" y1="30" x2="20" y2="40"/>
    <line x1="18" y1="40" x2="18" y2="48"/>
  </>),

  home_office: () => svg(<>
    {/* Desk with monitor */}
    <rect x="18" y="16" width="28" height="20" rx="2"/>
    <rect x="22" y="20" width="20" height="12" rx="1"/>
    <path d="M28 36l-2 8h12l-2-8"/>
    <line x1="24" y1="44" x2="40" y2="44"/>
    <line x1="10" y1="46" x2="54" y2="46"/>
  </>),

  grief: () => svg(<>
    {/* Candle and hands */}
    <path d="M32 14v24"/>
    <path d="M28 38h8v6H28z"/>
    <path d="M32 10c0 0-3-3 0-6 3 3 0 6 0 6z"/>
    <path d="M20 44c0 0-6 0-8 6h40c-2-6-8-6-8-6"/>
    <path d="M24 44c2-2 4-4 8-4s6 2 8 4"/>
  </>),

  // ── UNICORN SPACE ────────────────────────────────────────────────────────

  unicorn_space: () => svg(<>
    {/* Unicorn horn and stars */}
    <path d="M32 10l4 22H28L32 10z"/>
    <path d="M32 10c0 0 6-2 8 6"/>
    <circle cx="32" cy="38" r="10"/>
    <path d="M26 34a6 6 0 0 1 12 0"/>
    <path d="M28 40c1 2 3 3 4 3s3-1 4-3"/>
    <circle cx="28" cy="36" r="1.5"/>
    <circle cx="36" cy="36" r="1.5"/>
    <path d="M16 16l2 4 4 1-4 2-1 4-2-4-4-1 4-2z" strokeWidth="1.2"/>
    <path d="M46 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" strokeWidth="1.2"/>
    <path d="M14 30l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" strokeWidth="1.2"/>
    <path d="M50 34l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" strokeWidth="1.2"/>
  </>),

  // ── NEW CARDS ─────────────────────────────────────────────────────────────

  ironing: () => svg(<>
    {/* Iron body – wedge shape pointing left */}
    <path d="M10 42 L14 26 C16 18 26 18 34 18 L54 18 L54 42 Z"/>
    {/* Cord looping up from back */}
    <path d="M54 26 C60 26 60 14 54 12" strokeLinecap="round"/>
    {/* Steam holes */}
    <circle cx="28" cy="30" r="2"/>
    <circle cx="36" cy="28" r="2"/>
    <circle cx="44" cy="28" r="2"/>
    <circle cx="36" cy="36" r="2"/>
    {/* Ironing board */}
    <path d="M6 48 Q32 44 58 48"/>
    <line x1="18" y1="48" x2="16" y2="56"/>
    <line x1="46" y1="48" x2="44" y2="56"/>
  </>),

  hosting: () => svg(<>
    {/* Table */}
    <path d="M8 30 Q32 26 56 30"/>
    <line x1="14" y1="30" x2="12" y2="52"/>
    <line x1="50" y1="30" x2="52" y2="52"/>
    <line x1="12" y1="44" x2="52" y2="44"/>
    {/* Left wine glass */}
    <path d="M18 26 Q22 34 19 39"/>
    <path d="M26 26 Q22 34 25 39"/>
    <line x1="22" y1="39" x2="22" y2="44"/>
    <line x1="18" y1="44" x2="26" y2="44"/>
    {/* Right wine glass */}
    <path d="M38 26 Q42 34 39 39"/>
    <path d="M46 26 Q42 34 45 39"/>
    <line x1="42" y1="39" x2="42" y2="44"/>
    <line x1="38" y1="44" x2="46" y2="44"/>
  </>),

  diapering: () => svg(<>
    {/* Diaper outline */}
    <path d="M10 20 C18 30 46 30 54 20 L54 48 L10 48 Z"/>
    {/* Tab fasteners */}
    <rect x="8" y="16" width="8" height="8" rx="2"/>
    <rect x="48" y="16" width="8" height="8" rx="2"/>
    {/* Waistband line */}
    <path d="M10 22 Q32 26 54 22"/>
    {/* Leg gather curves */}
    <path d="M10 44 Q20 38 32 40 Q44 38 54 44"/>
  </>),

  home_purchase: () => svg(<>
    {/* House outline */}
    <path d="M8 30 L32 10 L56 30"/>
    <rect x="14" y="30" width="36" height="24" rx="2"/>
    {/* Door */}
    <rect x="26" y="40" width="12" height="14" rx="1"/>
    {/* Key */}
    <circle cx="47" cy="20" r="5"/>
    <line x1="52" y1="20" x2="58" y2="20"/>
    <line x1="56" y1="20" x2="56" y2="24"/>
    <line x1="58" y1="20" x2="58" y2="24"/>
  </>),

  cash: () => svg(<>
    {/* Wallet outline */}
    <rect x="8" y="20" width="44" height="30" rx="4"/>
    <rect x="36" y="28" width="18" height="14" rx="3"/>
    <circle cx="45" cy="35" r="3"/>
    {/* Card slot lines */}
    <line x1="14" y1="28" x2="28" y2="28"/>
    <line x1="14" y1="34" x2="28" y2="34"/>
    <line x1="14" y1="40" x2="22" y2="40"/>
  </>),

  glitch: () => svg(<>
    {/* Lightning bolt inside circle – disruption symbol */}
    <circle cx="32" cy="32" r="22"/>
    <path d="M36 14 L26 32 L33 32 L28 50 L38 32 L31 32 Z"/>
  </>),

  welcoming_child: () => svg(<>
    {/* Adult arms holding baby/bundle */}
    <circle cx="32" cy="14" r="7"/>
    <path d="M18 32 C18 24 26 22 32 22 C38 22 46 24 46 32"/>
    {/* Baby bundle */}
    <ellipse cx="32" cy="40" rx="12" ry="10"/>
    <path d="M22 36 Q32 30 42 36"/>
    <circle cx="32" cy="38" r="4"/>
  </>),

  // ── DEFAULT fallback ─────────────────────────────────────────────────────

  default: () => svg(<>
    <rect x="14" y="14" width="36" height="36" rx="4"/>
    <path d="M22 32h20M32 22v20"/>
  </>),
}

export function getIllustration(key) {
  const fn = illustrations[key] || illustrations['default']
  return fn()
}
