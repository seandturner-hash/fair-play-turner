import { useState, useEffect, useCallback } from 'react'
import { supabase } from './lib/supabase'

import Header from './components/Header'
import TabBar from './components/TabBar'
import PlayerTab from './components/PlayerTab'
import DiscardedTab from './components/DiscardedTab'
import RulesTab from './components/RulesTab'
import AddCardModal from './components/AddCardModal'

export default function App() {
  const [cards, setCards] = useState([])
  const [checkinDate, setCheckinDate] = useState('')
  const [lastCheckinDate, setLastCheckinDate] = useState('')
  const [activeTab, setActiveTab] = useState('rules')
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [dbError, setDbError] = useState(null)

  // ── Load all data on mount ──────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      // Load cards
      const { data: cardData, error: cardError } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: true })

      if (cardError) {
        setDbError(cardError.message)
        setLoading(false)
        return
      }

      setCards(cardData || [])

      // Seed if empty, or re-seed if the card names are from the old version
      const needsReseed =
        !cardData || cardData.length === 0 ||
        !cardData.some(c => c.title === 'Childcare Helpers (Kids)')

      if (needsReseed) {
        // Clear ALL cards before re-seeding (unicorn space cards are re-inserted by seedCards)
        if (cardData && cardData.length > 0) {
          await supabase.from('cards').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        }
        await seedCards()
        const { data: seeded } = await supabase
          .from('cards')
          .select('*')
          .order('created_at', { ascending: true })
        setCards(seeded || [])
      } else {
        // Deduplicate unicorn space cards (can appear if reseed ran more than once)
        const unicorns = (cardData || []).filter(c => c.is_unicorn_space)
        const seen = new Set()
        const dupeIds = []
        for (const u of unicorns) {
          if (seen.has(u.title)) { dupeIds.push(u.id) } else { seen.add(u.title) }
        }
        if (dupeIds.length > 0) {
          await supabase.from('cards').delete().in('id', dupeIds)
          setCards(prev => prev.filter(c => !dupeIds.includes(c.id)))
        }
      }

      // Load settings
      const { data: settings } = await supabase
        .from('settings')
        .select('*')

      const checkin = settings?.find(s => s.key === 'next_checkin_date')
      setCheckinDate(checkin?.value || '')
      const lastCheckin = settings?.find(s => s.key === 'last_checkin_date')
      setLastCheckinDate(lastCheckin?.value || '')

      setLoading(false)
    }

    load()
  }, [])

  // ── Real-time subscription ──────────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel('fair-play-cards')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cards' }, payload => {
        if (payload.eventType === 'INSERT') {
          setCards(prev => [...prev, payload.new])
        } else if (payload.eventType === 'UPDATE') {
          setCards(prev => prev.map(c => c.id === payload.new.id ? { ...c, ...payload.new } : c))
        } else if (payload.eventType === 'DELETE') {
          setCards(prev => prev.filter(c => c.id !== payload.old.id))
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, payload => {
        if (payload.new?.key === 'next_checkin_date') {
          setCheckinDate(payload.new.value || '')
        }
        if (payload.new?.key === 'last_checkin_date') {
          setLastCheckinDate(payload.new.value || '')
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // ── Optimistic owner change ─────────────────────────────────────────────
  const handleOwnerChange = useCallback((cardId, newOwner) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, owner: newOwner } : c))
  }, [])

  // ── Custom card created ─────────────────────────────────────────────────
  const handleCardCreated = useCallback((card) => {
    setCards(prev => {
      // Avoid duplicate if real-time subscription already added it
      if (prev.some(c => c.id === card.id)) return prev
      return [...prev, card]
    })
  }, [])

  // ── Derived state ───────────────────────────────────────────────────────
  const seanCards      = cards.filter(c => c.owner === 'Sean')
  const tarragonCards  = cards.filter(c => c.owner === 'Tarragon')
  const discardedCards = cards.filter(c => c.owner === 'Discarded')
  const unassignedCards = cards.filter(c => c.owner === 'Unassigned')

  // ── Error state ─────────────────────────────────────────────────────────
  if (dbError) {
    return (
      <div className="loading-screen">
        <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 1rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
            Can't connect to database
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--brown-light)' }}>
            Make sure you've added <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file and
            applied the Supabase migration and seed. See README for setup steps.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--brown-pale)', marginTop: '0.5rem' }}>
            Error: {dbError}
          </p>
        </div>
      </div>
    )
  }

  // ── Loading state ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" aria-label="Loading"/>
        <p style={{ fontSize: '0.85rem' }}>Loading your cards…</p>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Header
        seanCount={seanCards.length}
        tarragonCount={tarragonCards.length}
        inPlayCount={seanCards.length + tarragonCards.length}
        checkinDate={checkinDate}
        onCheckinChange={setCheckinDate}
        lastCheckinDate={lastCheckinDate}
        onLastCheckinChange={setLastCheckinDate}
      />
      <TabBar active={activeTab} onChange={setActiveTab}/>

      {activeTab === 'sean' && (
        <PlayerTab
          player="Sean"
          cards={seanCards}
          onOwnerChange={handleOwnerChange}
          onAddCard={() => setShowAddModal(true)}
        />
      )}
      {activeTab === 'tarragon' && (
        <PlayerTab
          player="Tarragon"
          cards={tarragonCards}
          onOwnerChange={handleOwnerChange}
          onAddCard={() => setShowAddModal(true)}
        />
      )}
      {activeTab === 'discarded' && (
        <DiscardedTab
          unassignedCards={unassignedCards}
          discardedCards={discardedCards}
          onOwnerChange={handleOwnerChange}
        />
      )}
      {activeTab === 'rules' && <RulesTab/>}

      {showAddModal && (
        <AddCardModal
          defaultOwner={activeTab === 'tarragon' ? 'Tarragon' : 'Sean'}
          onClose={() => setShowAddModal(false)}
          onCreated={handleCardCreated}
        />
      )}
    </div>
  )
}

// ── Seed function (runs client-side if the DB is empty) ──────────────────────
async function seedCards() {
  const SEED = [
    // ── HOME ──────────────────────────────────────────────────────────────────
    { title: 'Childcare Helpers (Kids)',                  category: 'Home',       illustration_key: 'childcare'          },
    { title: 'Cleaning',                                  category: 'Home',       illustration_key: 'housecleaning'      },
    { title: 'Dishes',                                    category: 'Home',       illustration_key: 'dishes'             },
    { title: 'Ironing',                                   category: 'Home',       illustration_key: 'ironing'            },
    { title: 'Rubbish',                                   category: 'Home',       illustration_key: 'trash'              },
    { title: 'Groceries',                                 category: 'Home',       illustration_key: 'grocery_shopping'   },
    { title: 'Home Furnishings',                          category: 'Home',       illustration_key: 'home_decor'         },
    { title: 'Home Goods and Supplies',                   category: 'Home',       illustration_key: 'home_supplies'      },
    { title: 'Home Maintenance',                          category: 'Home',       illustration_key: 'home_maintenance'   },
    { title: 'Home Purchase (Rental, Mortgage, Insurance)', category: 'Home',     illustration_key: 'home_purchase'      },
    { title: 'Hosting',                                   category: 'Home',       illustration_key: 'hosting'            },
    { title: 'Laundry',                                   category: 'Home',       illustration_key: 'laundry'            },
    { title: 'Lawn and Plants',                           category: 'Home',       illustration_key: 'yardwork'           },
    { title: 'Mail',                                      category: 'Home',       illustration_key: 'mail'               },
    { title: 'Meals (Kids: School Lunches)',               category: 'Home',       illustration_key: 'school_lunches'     },
    { title: 'Meals (Weekday Breakfast)',                  category: 'Home',       illustration_key: 'meal_planning'      },
    { title: 'Meals (Weekday Dinner)',                     category: 'Home',       illustration_key: 'cooking'            },
    { title: 'Meals (Weekend Dinner)',                     category: 'Home',       illustration_key: 'cooking'            },
    { title: 'Memories and Photos',                       category: 'Home',       illustration_key: 'family_photos'      },
    { title: 'Money Manager',                             category: 'Home',       illustration_key: 'bills'              },
    { title: 'Storage, Garage & Seasonality',             category: 'Home',       illustration_key: 'closet'             },
    { title: 'Tidying, Organising & Donations',           category: 'Home',       illustration_key: 'tidying'            },
    // ── OUT ───────────────────────────────────────────────────────────────────
    { title: 'Cars',                                      category: 'Out',        illustration_key: 'car_maintenance'    },
    { title: 'Birthday Celebrations (Other kids)',         category: 'Out',        illustration_key: 'birthday_kids'      },
    { title: 'Calendar Keeper',                           category: 'Out',        illustration_key: 'scheduling'         },
    { title: 'Cash',                                      category: 'Out',        illustration_key: 'cash'               },
    { title: 'Charity, Community & Good Deeds',           category: 'Out',        illustration_key: 'charitable_giving'  },
    { title: 'Civic Engagement & Cultural Enrichment',    category: 'Out',        illustration_key: 'community'          },
    { title: 'Electronics and IT',                        category: 'Out',        illustration_key: 'electronics'        },
    { title: 'Extra-Curricular (Kids: Non Sports)',        category: 'Out',        illustration_key: 'extracurricular'    },
    { title: 'Extra-Curricular (Kids: Sports)',            category: 'Out',        illustration_key: 'sports'             },
    { title: 'First Aid, Safety and Emergency',           category: 'Out',        illustration_key: 'emergency_prep'     },
    { title: 'Packing & Unpacking (kids local)',           category: 'Out',        illustration_key: 'moving'             },
    { title: 'Packing and Unpacking (travel)',             category: 'Out',        illustration_key: 'travel'             },
    { title: 'Points, Miles & Coupons',                   category: 'Out',        illustration_key: 'bills'              },
    { title: 'Returns & Store Credits',                   category: 'Out',        illustration_key: 'returns'            },
    { title: 'School Breaks (Kids: Non Summer)',           category: 'Out',        illustration_key: 'camp'               },
    { title: 'School Breaks (Kids: Summer)',               category: 'Out',        illustration_key: 'summer_planning'    },
    { title: 'School Forms (Kids)',                        category: 'Out',        illustration_key: 'school_admin'       },
    { title: 'Social Plans (Couples)',                    category: 'Out',        illustration_key: 'date_night'         },
    { title: 'Transportation (Kids)',                      category: 'Out',        illustration_key: 'transportation'     },
    { title: 'Travel',                                    category: 'Out',        illustration_key: 'travel'             },
    { title: 'Tutoring and Coaching (Kids)',               category: 'Out',        illustration_key: 'tutoring'           },
    { title: 'Weekend Plans',                             category: 'Out',        illustration_key: 'family_fun'         },
    // ── CAREGIVING ────────────────────────────────────────────────────────────
    { title: 'Bathing & Grooming (Kids)',                 category: 'Caregiving', illustration_key: 'bathing'            },
    { title: 'Bedtime Routine (Kids)',                    category: 'Caregiving', illustration_key: 'bedtime_routine'    },
    { title: 'Clothes and Accessories (Kids)',            category: 'Caregiving', illustration_key: 'childrens_clothing'  },
    { title: 'Dental (Kids)',                             category: 'Caregiving', illustration_key: 'dentist_kids'       },
    { title: 'Diapering & Potty Training (Kids)',         category: 'Caregiving', illustration_key: 'diapering'          },
    { title: 'Estate Planning & Life Insurance',          category: 'Caregiving', illustration_key: 'estate_planning'    },
    { title: 'Birth Control & Family Planning',           category: 'Caregiving', illustration_key: 'health_adult'       },
    { title: 'Friendships & Social Media (Kids)',         category: 'Caregiving', illustration_key: 'friendships_kids'   },
    { title: 'Grooming & Wardrobe (Sean)',                category: 'Caregiving', illustration_key: 'self_care'          },
    { title: 'Grooming & Wardrobe (Tarragon)',            category: 'Caregiving', illustration_key: 'self_care'          },
    { title: 'Health Insurance',                          category: 'Caregiving', illustration_key: 'insurance'          },
    { title: 'Homework, Projects & School Supplies (Kids)', category: 'Caregiving', illustration_key: 'homework'         },
    { title: 'Medical & Healthy Living (Kids)',           category: 'Caregiving', illustration_key: 'health_kids'        },
    { title: 'Morning Routine (Kids)',                    category: 'Caregiving', illustration_key: 'morning_routine'    },
    { title: 'Parents & In-Laws',                         category: 'Caregiving', illustration_key: 'aging_parents'      },
    { title: 'Pets',                                      category: 'Caregiving', illustration_key: 'pets'               },
    { title: 'School Service (Kids)',                     category: 'Caregiving', illustration_key: 'school_admin'       },
    { title: 'School Transitions (Kids)',                 category: 'Caregiving', illustration_key: 'school_admin'       },
    { title: 'Self-Care (Sean)',                          category: 'Caregiving', illustration_key: 'self_care'          },
    { title: 'Self-Care (Tarragon)',                      category: 'Caregiving', illustration_key: 'self_care'          },
    { title: 'Special Need & Mental Health (Kids)',       category: 'Caregiving', illustration_key: 'special_needs'      },
    { title: 'Teacher Communication (Kids)',              category: 'Caregiving', illustration_key: 'school_communication'},
    { title: 'Watching (Kids)',                           category: 'Caregiving', illustration_key: 'childcare'          },
    // ── MAGIC ─────────────────────────────────────────────────────────────────
    { title: 'Adult Friendships (Sean)',                  category: 'Magic',      illustration_key: 'couples_friends'    },
    { title: 'Adult Friendships (Tarragon)',              category: 'Magic',      illustration_key: 'couples_friends'    },
    { title: 'Birthday Celebrations (Your kids)',         category: 'Magic',      illustration_key: 'birthday_kids'      },
    { title: 'Discipline & Screen-Time (Kids)',           category: 'Magic',      illustration_key: 'discipline'         },
    { title: 'Extended Family',                          category: 'Magic',      illustration_key: 'aging_parents'      },
    { title: 'Fun & Playing (Kids)',                      category: 'Magic',      illustration_key: 'indoor_play'        },
    { title: 'Gestures of Love (Kids)',                   category: 'Magic',      illustration_key: 'emotional_support'  },
    { title: 'Gifts (Family)',                            category: 'Magic',      illustration_key: 'gifts'              },
    { title: 'Gifts (VIPs)',                              category: 'Magic',      illustration_key: 'gifts'              },
    { title: 'Hard Questions (Kids)',                     category: 'Magic',      illustration_key: 'family_meetings'    },
    { title: 'Holiday Cards',                            category: 'Magic',      illustration_key: 'greeting_cards'     },
    { title: 'Christmas',                                category: 'Magic',      illustration_key: 'holiday_traditions'  },
    { title: 'Informal Education (Kids)',                 category: 'Magic',      illustration_key: 'tutoring'           },
    { title: 'Magical Beings (Kids)',                    category: 'Magic',      illustration_key: 'unicorn_space'      },
    { title: 'Marriage & Romance',                       category: 'Magic',      illustration_key: 'partnership'        },
    { title: 'Middle of the Night Comfort (Kids)',        category: 'Magic',      illustration_key: 'bedtime_routine'    },
    { title: 'Partner Coach',                            category: 'Magic',      illustration_key: 'partnership'        },
    { title: 'Showing-Up and Participating (Kids)',       category: 'Magic',      illustration_key: 'extracurricular'    },
    { title: 'Spirituality',                             category: 'Magic',      illustration_key: 'spiritual'          },
    { title: 'Thank You Notes',                          category: 'Magic',      illustration_key: 'thank_you_notes'    },
    { title: 'Values & Good Deeds (Kids)',               category: 'Magic',      illustration_key: 'charitable_giving'  },
    // ── WILD ──────────────────────────────────────────────────────────────────
    { title: 'Aging',                                    category: 'Wild',       illustration_key: 'aging_parents'      },
    { title: 'Ailing Parent',                            category: 'Wild',       illustration_key: 'aging_parents'      },
    { title: 'Death',                                    category: 'Wild',       illustration_key: 'grief'              },
    { title: "First Year of Infant's Life",              category: 'Wild',       illustration_key: 'baby_gear'          },
    { title: 'Glitch in the Matrix or Daily Disruption', category: 'Wild',       illustration_key: 'glitch'             },
    { title: 'Home Renovation',                          category: 'Wild',       illustration_key: 'home_maintenance'   },
    { title: 'Job Loss & Money Problems',                category: 'Wild',       illustration_key: 'financial_planning'  },
    { title: 'Moving',                                   category: 'Wild',       illustration_key: 'moving'             },
    { title: 'New Job',                                  category: 'Wild',       illustration_key: 'professional_dev'   },
    { title: 'Serious Illness',                          category: 'Wild',       illustration_key: 'health_adult'       },
    { title: 'Welcoming a Child into the Home',          category: 'Wild',       illustration_key: 'welcoming_child'    },
    // ── UNICORN SPACE ─────────────────────────────────────────────────────────
    { title: 'Unicorn Space — Sean',     category: 'Magic', owner: 'Sean',     illustration_key: 'unicorn_space', is_unicorn_space: true },
    { title: 'Unicorn Space — Tarragon', category: 'Magic', owner: 'Tarragon', illustration_key: 'unicorn_space', is_unicorn_space: true },
  ]

  // Insert in batches of 20 to stay within Supabase limits
  const BATCH = 20
  for (let i = 0; i < SEED.length; i += BATCH) {
    const batch = SEED.slice(i, i + BATCH).map(c => ({
      owner: 'Unassigned',
      msc: '',
      cpe_conception: '',
      cpe_planning: '',
      cpe_execution: '',
      personal_notes: '',
      is_custom: false,
      is_unicorn_space: false,
      ...c,
    }))
    await supabase.from('cards').insert(batch)
  }

  // Ensure settings row exists
  await supabase
    .from('settings')
    .upsert({ key: 'next_checkin_date', value: '' }, { onConflict: 'key' })
}
