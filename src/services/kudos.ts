import type {
  KudosFeedResponse,
  HighlightsResponse,
  UserStats,
  SpotlightData,
  LeaderboardEntry,
  UserProfile,
  KudosPost,
  SecretBox,
} from "@/types/kudos";

const API_BASE = "/api";

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: "Request failed" })) as { message?: string };
    throw new Error(errorBody.message || `API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchKudosFeed(
  cursor?: string,
  limit = 10
): Promise<KudosFeedResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  return apiFetch(`${API_BASE}/kudos?${params}`);
}

export async function createKudos(data: {
  receiverId: string;
  message: string;
  category?: string;
  hashtags?: string[];
  imageUrls?: string[];
}): Promise<KudosPost> {
  return apiFetch(`${API_BASE}/kudos`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchHighlights(
  hashtag?: string,
  department?: string,
  page = 1,
  limit = 5
): Promise<HighlightsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (hashtag) params.set("hashtag", hashtag);
  if (department) params.set("department", department);
  return apiFetch(`${API_BASE}/kudos/highlights?${params}`);
}

export async function fetchUserStats(): Promise<UserStats> {
  return apiFetch(`${API_BASE}/kudos/stats`);
}

export async function likeKudos(
  kudosId: string
): Promise<{ likeCount: number }> {
  return apiFetch(`${API_BASE}/kudos/${kudosId}/like`, { method: "POST" });
}

export async function unlikeKudos(
  kudosId: string
): Promise<{ likeCount: number }> {
  return apiFetch(`${API_BASE}/kudos/${kudosId}/like`, { method: "DELETE" });
}

export async function fetchSpotlightData(): Promise<SpotlightData> {
  return apiFetch(`${API_BASE}/kudos/spotlight`);
}

export async function openSecretBox(): Promise<SecretBox> {
  return apiFetch(`${API_BASE}/secret-box/open`, { method: "POST" });
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  return apiFetch(`${API_BASE}/sunner-leaderboard`);
}

export async function searchUsers(query: string): Promise<UserProfile[]> {
  const params = new URLSearchParams({ q: query, limit: "10" });
  return apiFetch(`${API_BASE}/users/search?${params}`);
}

export async function uploadKudosImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}/kudos/upload-image`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Image upload failed");
  return res.json();
}
