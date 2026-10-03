export type StoryCategory = 
  | 'appreciation'
  | 'support'
  | 'care'
  | 'admiration'
  | 'memories'
  | 'gentle-reminders';

export interface AppreciationItem {
  id: string;
  category: StoryCategory;
  title: string;
  description: string;
  iconName: string;
  quote?: string;
  highlight?: boolean;
  tag?: string;
}

export interface InteractiveNote {
  id: string;
  text: string;
  category: string;
  emoji: string;
}
