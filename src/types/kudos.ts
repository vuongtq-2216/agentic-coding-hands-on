export type BadgeType =
  | "Rising Hero"
  | "Legend Hero"
  | "New Hero"
  | "Super Hero"
  | null;

export type UserProfile = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  departmentCode: string;
  departmentName: string;
  badgeType: BadgeType;
};

export type KudosPost = {
  id: string;
  sender: UserProfile;
  receiver: UserProfile;
  message: string;
  category: string | null;
  hashtags: string[];
  imageUrls: string[];
  isHighlighted: boolean;
  likeCount: number;
  createdAt: string;
};

export type UserStats = {
  kudosReceived: number;
  kudosSent: number;
  heartsReceived: number;
  heartsMultiplier: number;
  secretBoxesOpened: number;
  secretBoxesRemaining: number;
};

export type SecretBox = {
  id: string;
  isOpened: boolean;
  prizeDescription: string | null;
  openedAt: string | null;
};

export type KudosLike = {
  id: string;
  kudosId: string;
  userId: string;
  createdAt: string;
};

export type LeaderboardEntry = {
  userId: string;
  fullName: string;
  avatarUrl: string | null;
  prizeDescription: string;
  awardedAt: string;
};

export type KudosFeedResponse = {
  data: KudosPost[];
  nextCursor: string | null;
};

export type HighlightsResponse = {
  data: KudosPost[];
  totalPages: number;
  currentPage: number;
};

export type SpotlightNode = {
  userId: string;
  name: string;
  avatarUrl: string | null;
  x: number;
  y: number;
};

export type SpotlightEdge = {
  from: string;
  to: string;
  weight: number;
};

export type SpotlightData = {
  totalKudos: number;
  nodes: SpotlightNode[];
  edges: SpotlightEdge[];
};
