export interface SkillCriteria {
  skill: string;
  criteria: string;
  examples?: string[];
}

export type Rating = 'Meets the Standard' | 'Approaching' | 'Needs Improvement' | 'No Evidence Observed';

export interface ObservationPhase {
  id: string;
  label: string;
  placeholder: string;
}

export interface EvaluationItem {
  skill: string;
  rating: Rating;
  evidence: string;
}

export interface EvaluationResult {
  items: EvaluationItem[];
  missingCompetencies: string[];
  coachSummary: string;
  feedforwardSummary: string;
}

export const RUBRIC_SKILLS: SkillCriteria[] = [
  { 
    skill: 'Clarity', 
    criteria: 'The coach clearly communicates objectives and utilizes tools effectively.',
    examples: [
      'Communicates clear, measurable learning objectives and intentions to players.',
      'Utilizes coaching tools (e.g., mini-fields) to effectively present system, strategy, and tactics.',
      'Language is consistent with and reinforces established game and training model.'
    ]
  },
  { 
    skill: 'Adaptability', 
    criteria: 'The coach manages the environment effectively, modifies sessions based on player needs, adjusts difficulty to match objectives, and utilizes varied restarts to challenge players.',
    examples: [
      'Manages training environment to ensure both teams align with desired system/strategy.',
      'Modifies session to provide players with necessary repetition of moments/decisions.',
      'Adeptly adjusts difficulty (progresses/regresses) to align with player needs.',
      'Employs varied restarts to provide diverse experiences matching objectives.'
    ]
  },
  { 
    skill: 'Problem-Solving', 
    criteria: 'The coach communicates solutions effectively, understands the impact of decisions on outcomes, and recreates game moments to enhance player problem-solving.',
    examples: [
      'Communicates solutions using WHAT-WHO-WHERE-WHEN-WHY-HOW framework.',
      'Demonstrates understanding of how individual/team decisions lead to diverse outcomes.',
      'Recreates game moments making reference to ball, teammates, opponents, and team intention.'
    ]
  },
  { 
    skill: 'Organization', 
    criteria: 'The coach understands session methodologies, designs cohesive sessions, and meticulously plans all essential components, including identifying key players for unit cohesion.',
    examples: [
      'Selects most appropriate methodology (e.g., whole-part-whole) to support objectives.',
      'Designs cohesive session with logical activities reinforcing intentions.',
      'Identifies essential components: system/strategy for both teams, tactics, and skill sets.',
      'Pinpoints key primary/secondary players vital for fostering unit cohesion and relationships.'
    ]
  },
  { 
    skill: 'Time Management', 
    criteria: 'The coach communicates expectations clearly, encourages independent exploration before intervention, and provides appropriate playing time considering player needs and session objectives.',
    examples: [
      'Communicates clear and comprehensive expectations, preparing players for activities.',
      'Provides opportunities for independent exploration before offering guided interventions.',
      'Provides appropriate active playing time considering age, stage, and physical outcomes.'
    ]
  },
  { 
    skill: 'Self-Regulation', 
    criteria: 'The coach remains composed under pressure, exemplifies their values, and aligns with the club\'s philosophy.',
    examples: [
      'Acknowledges and empathizes with players\' concerns/emotions, making them feel heard.',
      'Maintains composure and manages emotions during challenging situations or frustrations.',
      'Consistently embodies individual philosophy and values as a positive role model.',
      'Demonstrates alignment with club philosophy and values through actions/interactions.'
    ]
  },
  { 
    skill: 'Empathy', 
    criteria: 'The coach creates a safe learning environment, actively seeks feedback, and allows players opportunities for practice after interventions.',
    examples: [
      'Fosters a safe environment where players feel comfortable making mistakes and learning.',
      'Actively seeks feedback from players and staff to enhance the training environment.',
      'Allows players the opportunity to practice and rehearse after providing interventions.'
    ]
  },
  { 
    skill: 'Compassion', 
    criteria: 'The coach values player input, fosters an inclusive environment, and uses a feedforward approach in feedback.',
    examples: [
      'Acknowledges and values players\' input, making them feel heard and respected.',
      'Fosters inclusive and empowering environment for sharing thoughts and ideas.',
      'Consistently utilizes a feedforward approach focusing on future-oriented solutions.'
    ]
  },
  { 
    skill: 'Critical Reflection', 
    criteria: 'The coach understands strategic positioning for effective coaching, observes key moments during sessions, and facilitates debriefing sessions for player reflection and self-evaluation.',
    examples: [
      'Strategic positioning of self and assistants to manage learning objectives.',
      'Identifies key moments within session to optimize performance per the plan.',
      'Selects suitable strategy (stop & freeze, group discussion, individual) based on needs.',
      'Facilitates debriefing sessions to encourage self-reflection and evaluate performance.'
    ]
  },
  { 
    skill: 'Authenticity', 
    criteria: 'The coach displays confidence in their vision, prioritizes personal connections with players, and shares personal anecdotes to build rapport.',
    examples: [
      'Exudes confidence and conviction in their vision for player development.',
      'Prioritizes building personal connections, fostering trust beyond the role of coach.',
      'Intentionally shares relevant personal anecdotes to forge deeper connections.'
    ]
  },
  { 
    skill: 'Engagement', 
    criteria: 'The coach engages players in understanding objectives, employs diverse coaching approaches, and creates a fun, game-like environment.',
    examples: [
      'Engages players to share understanding of objectives and reinforces them throughout.',
      'Employs diverse coaching approaches to stimulate decision-making and reflection.',
      'Creates a fun/enjoyable environment mirroring real-game situations.'
    ]
  },
  { 
    skill: 'Risk Management', 
    criteria: 'The coach prioritizes safety by assessing requirements before the session, monitoring the environment throughout, and regularly checking on players\' well-being.',
    examples: [
      'Assesses safety requirements (equipment check, EAP) before session begins.',
      'Consistently monitors environment to ensure player safety throughout entire session.',
      'Regularly assesses players\' physical and mental well-being through check-ins.'
    ]
  },
  { 
    skill: 'Communication', 
    criteria: 'The coach adapts communication style to suit players, motivates effectively through words and tone, and speaks confidently using clear language.',
    examples: [
      'Adapts communication style based on players\' age and developmental stage.',
      'Motivates through verbal/non-verbal cues (choice of words, tone, positive body language).',
      'Speaks confidently and articulately using clear coaching vocabulary.'
    ]
  },
  { 
    skill: 'Relationship Building', 
    criteria: 'The coach fosters a collaborative environment for exploring solutions and encourages active sharing and integration of knowledge during briefings.',
    examples: [
      'Encourages players to collaboratively explore and discuss solutions within/between units.',
      'Fosters environment during briefings where players actively share and integrate knowledge.'
    ]
  },
  { 
    skill: 'Conflict Resolution', 
    criteria: 'The coach addresses player disagreements and reinforces team objectives, while also demonstrating a thorough understanding of game rules.',
    examples: [
      'Addresses situations where players deviate from objectives, facilitating resolution.',
      'Demonstrates thorough understanding and application of rules and laws of the game.'
    ]
  },
];

export const PHASES: ObservationPhase[] = [
  { id: 'environment', label: '1. ENVIRONMENT\n(Planning & Organization)', placeholder: 'Notes on cones set up, arrival of players, safety checks, session design...' },
  { id: 'engageExplain', label: '2. ENGAGE-EXPLAIN\n(Setting the scene)', placeholder: 'Notes on how objectives were shared, start of session, clarity of instruction...' },
  { id: 'exitEnter', label: '3. EXIT-ENTER\n(Observation & Identification)', placeholder: 'Notes on positioning, identifying performance gaps, when the coach steps in/out...' },
  { id: 'educateEnsure', label: '4. EDUCATE-ENSURE\n(Intervention & Interaction)', placeholder: 'Notes on feedback quality, recreation of moments, player engagement...' },
];
