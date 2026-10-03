import { AppreciationItem, InteractiveNote } from '../types';

export const BOYFRIEND_DATA = {
  boyfriendName: "Ajhai",
  partnerName: "Harshini",
  specialOccasion: "National Boyfriend Day",
  
  goldenTruth: {
    headline: "The Most Important Truth",
    subhead: "A reminder from my heart to yours, especially on tough days",
    quote: "When I'm hurt, I sometimes focus on the moments where you didn't meet my needs and forget the many moments where you genuinely tried to love me.",
    reflection: "Your effort, your vulnerability, and your heart are never unseen. Even when things aren't seamless, your love is real, deep, and deeply cherished by me."
  },

  categories: [
    {
      id: 'appreciation',
      title: 'What I Appreciate About You',
      subtitle: 'The warmth, vulnerability, and love you shower on me',
      icon: 'Heart',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
      badge: 'Emotional Connection'
    },
    {
      id: 'support',
      title: 'Ways You Have Supported Me',
      subtitle: 'How you show up for my life, my peace of mind, and my future',
      icon: 'Shield',
      color: 'from-amber-500 to-rose-400',
      bgColor: 'bg-amber-50',
      badge: 'Unwavering Backing'
    },
    {
      id: 'care',
      title: 'The Little and Big Ways You Show Care',
      subtitle: 'From thoughtful check-ins to making sure I smile',
      icon: 'Sparkles',
      color: 'from-pink-500 to-purple-500',
      bgColor: 'bg-pink-50',
      badge: 'Thoughtful Gestures'
    },
    {
      id: 'memories',
      title: "Things I've Enjoyed With You",
      subtitle: 'London adventures, thoughtful surprises, and dreaming about forever',
      icon: 'Compass',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      badge: 'Shared Joy'
    },
    {
      id: 'admiration',
      title: 'What I Admire Most In You',
      subtitle: 'Your integrity, emotional courage, and loyalty',
      icon: 'Award',
      color: 'from-indigo-500 to-rose-500',
      bgColor: 'bg-indigo-50',
      badge: 'Character'
    },
    {
      id: 'gentle-reminders',
      title: "What's Easy to Forget When Hurt",
      subtitle: 'Grounding truths when emotions run heavy',
      icon: 'Anchor',
      color: 'from-rose-600 to-amber-600',
      bgColor: 'bg-rose-50',
      badge: 'Reassurance'
    }
  ]
};

export const APPRECIATION_ITEMS: AppreciationItem[] = [
  // What I Appreciate
  {
    id: 'app-1',
    category: 'appreciation',
    title: 'You Never Stop Saying "I Love You"',
    description: 'You repeatedly tell me you love me, giving me steady reassurance when I need it most.',
    iconName: 'HeartHandshake',
    tag: 'Reassurance',
    highlight: true
  },
  {
    id: 'app-2',
    category: 'appreciation',
    title: 'You Always Fight For Us',
    description: 'You consistently tell me you want to keep trying to make this relationship work, choosing us again and again.',
    iconName: 'Flame',
    tag: 'Commitment'
  },
  {
    id: 'app-3',
    category: 'appreciation',
    title: 'Talking About Our Future and Marriage',
    description: 'You speak with warmth and certainty about building a life together, including marriage and wedding conversations that make my heart flutter.',
    iconName: 'Sparkles',
    tag: 'Our Future',
    highlight: true
  },
  {
    id: 'app-4',
    category: 'appreciation',
    title: 'Your Deep Emotional Vulnerability',
    description: 'You open up emotionally, cry in front of me, and allow me to see the truest, tenderest parts of who you are.',
    iconName: 'Eye',
    tag: 'Vulnerability'
  },
  {
    id: 'app-5',
    category: 'appreciation',
    title: 'Sharing Insecurities Honestly',
    description: 'Even when it feels scary or hard, you share your vulnerabilities and trust me with your heart.',
    iconName: 'Key',
    tag: 'Trust'
  },
  {
    id: 'app-6',
    category: 'appreciation',
    title: 'Wanting Me In Your World',
    description: 'You actively try to involve me in your life, and you genuinely want to be part of mine.',
    iconName: 'Users',
    tag: 'Belonging'
  },
  {
    id: 'app-7',
    category: 'appreciation',
    title: 'Noticing When I Drift Away',
    description: "You notice when I'm disengaged and invite me back into the conversation because you care about having my mind and heart present.",
    iconName: 'Sun',
    tag: 'Attentiveness'
  },
  {
    id: 'app-8',
    category: 'appreciation',
    title: 'Craving Real Connection',
    description: 'You ask me to ask questions and take interest in your world, because feeling truly connected to me matters so much to you.',
    iconName: 'MessageCircleHeart',
    tag: 'Intimacy'
  },

  // Ways Supported
  {
    id: 'sup-1',
    category: 'support',
    title: 'Ready to Help With My Move',
    description: 'You stepped forward and offered to help with my relocation and carry the heavy weight.',
    iconName: 'Truck',
    tag: 'Relocation'
  },
  {
    id: 'sup-2',
    category: 'support',
    title: 'Suitcase Checks and Moving Prep',
    description: 'You offered to check my suitcases and prepare everything so I would feel settled and ready.',
    iconName: 'Luggage',
    tag: 'Practical Care'
  },
  {
    id: 'sup-3',
    category: 'support',
    title: 'Accommodation and Practical Decisions',
    description: 'You offered real guidance and hands-on help navigating housing choices and life decisions.',
    iconName: 'Home',
    tag: 'Guidance'
  },
  {
    id: 'sup-4',
    category: 'support',
    title: "Opening Your Parents' Home",
    description: 'You offered your family home as a safe, comforting haven for me when I first arrived.',
    iconName: 'DoorOpen',
    tag: 'Hospitality',
    highlight: true
  },
  {
    id: 'sup-5',
    category: 'support',
    title: 'Financial Help in Hard Moments',
    description: 'You offered financial help when I was struggling, even when you were anxious about the situation yourself.',
    iconName: 'Coins',
    tag: 'Generosity'
  },
  {
    id: 'sup-6',
    category: 'support',
    title: 'Rent Support When I Needed It',
    description: 'You gave me rent money when I needed it, helping carry the load to relieve my stress.',
    iconName: 'Wallet',
    tag: 'Protection'
  },
  {
    id: 'sup-7',
    category: 'support',
    title: 'Never Giving Up on Helping',
    description: "You keep finding ways to help, even when you worry your efforts aren't enough or feel unsure. That persistence means the world.",
    iconName: 'HeartHandshake',
    tag: 'Endless Care',
    highlight: true
  },

  // Ways Shows Care
  {
    id: 'care-1',
    category: 'care',
    title: 'Checking In and Daily Calls',
    description: 'You call to hear my voice, ask how I am feeling, and hold space for my day.',
    iconName: 'PhoneCall',
    tag: 'Daily Thoughtfulness'
  },
  {
    id: 'care-2',
    category: 'care',
    title: '"I Am Happy If You Are Happy"',
    description: 'You utter the sweetest phrase that proves your joy is fundamentally intertwined with seeing a smile on my face.',
    iconName: 'Smile',
    tag: 'Selfless Love',
    highlight: true
  },
  {
    id: 'care-3',
    category: 'care',
    title: 'Putting Real Thought Into Gifts',
    description: 'You research gifts with care, wanting them to be meaningful, and keep talking about presents because you want me to enjoy what you give me.',
    iconName: 'Gift',
    tag: 'Thoughtful Gifting',
    highlight: true
  },
  {
    id: 'care-4',
    category: 'care',
    title: 'Asking How I Am Feeling',
    description: 'You tune in to my emotions and gently ask how I am doing inside, wanting to understand what I carry.',
    iconName: 'Sparkles',
    tag: 'Deep Care'
  },
  {
    id: 'care-5',
    category: 'care',
    title: 'Showing Up When Plans Change',
    description: 'Even when logistics shifted or obstacles came up, you still made sure to see me and be with me.',
    iconName: 'CalendarCheck',
    tag: 'Reliability'
  },

  // Things Enjoyed
  {
    id: 'mem-1',
    category: 'memories',
    title: 'Treating Me With Plans and Surprises in London',
    description: 'Taking me out and filling our London days with thoughtful plans, surprises, and sweet moments together.',
    iconName: 'Coffee',
    tag: 'London Days',
    highlight: true
  },
  {
    id: 'mem-2',
    category: 'memories',
    title: 'Thoughtful Activities to Connect',
    description: 'You plan creative activities and moments specifically to connect with me and share joy.',
    iconName: 'Sparkles',
    tag: 'Playful Bond'
  },
  {
    id: 'mem-3',
    category: 'memories',
    title: 'Curating Memories, Not Just Things',
    description: 'You focus on making genuine memories, laughing together, and dreaming of our shared horizon.',
    iconName: 'Image',
    tag: 'Lifelong Memories'
  },
  {
    id: 'mem-4',
    category: 'memories',
    title: 'Planning Our Adventures Ahead',
    description: 'You talk about upcoming trips, cozy dates, and shared bucket list experiences.',
    iconName: 'Compass',
    tag: 'Wanderlust'
  },

  // Things I Admire
  {
    id: 'adm-1',
    category: 'admiration',
    title: 'Tremendous Generosity',
    description: 'You give willingly of your resources, your time, and your energy without keeping score.',
    iconName: 'Heart',
    tag: 'Big Heart'
  },
  {
    id: 'adm-2',
    category: 'admiration',
    title: 'Deeply Family-Oriented',
    description: 'You love your family and ensure the people who matter to me feel included and cherished too.',
    iconName: 'Users',
    tag: 'Values'
  },
  {
    id: 'adm-3',
    category: 'admiration',
    title: 'Caring Deeply About Being a Good Partner',
    description: 'You worry about doing right by me and hold yourself to high standards of love and care.',
    iconName: 'ShieldCheck',
    tag: 'Integrity',
    highlight: true
  },
  {
    id: 'adm-4',
    category: 'admiration',
    title: "Never Running Away From Hard Talks",
    description: "You don't walk away when things get tough. Even when upset, you keep coming back to the conversation.",
    iconName: 'Flame',
    tag: 'Maturity',
    highlight: true
  },

  // Reminders
  {
    id: 'rem-1',
    category: 'gentle-reminders',
    title: 'You Never Stopped Talking About Our Future',
    description: 'Through every high and low, your vision of tomorrow has always included me.',
    iconName: 'Sunrise',
    tag: 'Certainty',
    highlight: true
  },
  {
    id: 'rem-2',
    category: 'gentle-reminders',
    title: 'You Never Stopped Investing',
    description: 'You pour time, money, care, and continuous emotional effort into our bond.',
    iconName: 'TrendingUp',
    tag: 'Devotion'
  },
  {
    id: 'rem-3',
    category: 'gentle-reminders',
    title: 'Showing Up Despite Fears and Insecurities',
    description: 'You step into bravery and show up for me even when you feel internal anxiety.',
    iconName: 'Shield',
    tag: 'Bravery'
  },
  {
    id: 'rem-4',
    category: 'gentle-reminders',
    title: "Good Intentions Matter",
    description: 'Sometimes timing or execution differs from what was envisioned, but the genuine tenderness behind it remains pure.',
    iconName: 'HeartCrack',
    tag: 'Grace'
  }
];

export const GRATITUDE_JAR_NOTES: InteractiveNote[] = [
  { id: '1', text: "You have repeatedly told me you love me.", category: "Love", emoji: "❤️" },
  { id: '2', text: "You told me you are happy if I am happy.", category: "Selfless", emoji: "🥰" },
  { id: '3', text: "You offered to help with my move and check my suitcases.", category: "Support", emoji: "🧳" },
  { id: '4', text: "You offered your parents' home as a place to stay when I first arrived.", category: "Family", emoji: "🏡" },
  { id: '5', text: "You gave me rent money when I needed it, helping me through a stressful time.", category: "Support", emoji: "🤲" },
  { id: '6', text: "You filled our days in London with thoughtful plans and sweet surprises.", category: "London", emoji: "🇬🇧" },
  { id: '7', text: "You opened up emotionally, cried in front of me, and showed true vulnerability.", category: "Vulnerability", emoji: "🥺" },
  { id: '8', text: "You talk about a future with me, including marriage and wedding conversations.", category: "Forever", emoji: "💍" },
  { id: '9', text: "You consistently tell me you want to keep trying to make our relationship work.", category: "Commitment", emoji: "🔥" },
  { id: '10', text: "You create thoughtful activities and moments just to connect with me.", category: "Joy", emoji: "✨" },
  { id: '11', text: "Even when upset, you keep coming back to the conversation and do not walk away.", category: "Strength", emoji: "🫂" },
  { id: '12', text: "You research gifts and put genuine thought into everything you give me.", category: "Care", emoji: "🎁" },
  { id: '13', text: "You notice when I am disengaged and bring me back because you value our connection.", category: "Attentive", emoji: "✨" },
  { id: '14', text: "When I am hurt, I remember: You genuinely try to love me with all your heart.", category: "Truth", emoji: "💖" }
];
