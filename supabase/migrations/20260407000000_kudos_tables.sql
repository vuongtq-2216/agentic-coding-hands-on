-- ============================================================
-- Kudos Feature: Database Schema
-- ============================================================

-- User profiles extension (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  department_code TEXT DEFAULT '',
  department_name TEXT DEFAULT '',
  badge_type TEXT CHECK (badge_type IN ('Rising Hero', 'Legend Hero', 'New Hero', 'Super Hero') OR badge_type IS NULL),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Kudos posts
CREATE TABLE IF NOT EXISTS public.kudos_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL CHECK (char_length(message) > 0 AND char_length(message) <= 2000),
  category TEXT,
  hashtags TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  is_highlighted BOOLEAN DEFAULT false,
  like_count INTEGER DEFAULT 0 CHECK (like_count >= 0),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT no_self_kudos CHECK (sender_id != receiver_id)
);

-- Kudos likes (join table)
CREATE TABLE IF NOT EXISTS public.kudos_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudos_id UUID NOT NULL REFERENCES public.kudos_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(kudos_id, user_id)
);

-- Secret boxes
CREATE TABLE IF NOT EXISTS public.secret_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  is_opened BOOLEAN DEFAULT false,
  prize_description TEXT,
  opened_at TIMESTAMPTZ
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_kudos_posts_created_at ON public.kudos_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kudos_posts_sender ON public.kudos_posts(sender_id);
CREATE INDEX IF NOT EXISTS idx_kudos_posts_receiver ON public.kudos_posts(receiver_id);
CREATE INDEX IF NOT EXISTS idx_kudos_posts_highlighted ON public.kudos_posts(is_highlighted) WHERE is_highlighted = true;
CREATE INDEX IF NOT EXISTS idx_kudos_likes_kudos_id ON public.kudos_likes(kudos_id);
CREATE INDEX IF NOT EXISTS idx_kudos_likes_user_id ON public.kudos_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_secret_boxes_user_id ON public.secret_boxes(user_id);
-- Enable pg_trgm for fuzzy name search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_user_profiles_name ON public.user_profiles USING gin(full_name gin_trgm_ops);

-- ============================================================
-- RLS Policies
-- ============================================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kudos_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kudos_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secret_boxes ENABLE ROW LEVEL SECURITY;

-- User profiles: anyone authenticated can read, users can update their own
CREATE POLICY "profiles_select" ON public.user_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update" ON public.user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Kudos posts: anyone authenticated can read, authenticated users can insert
CREATE POLICY "kudos_select" ON public.kudos_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudos_insert" ON public.kudos_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- Kudos likes: anyone can read, users can insert/delete their own
CREATE POLICY "likes_select" ON public.kudos_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "likes_insert" ON public.kudos_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete" ON public.kudos_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Secret boxes: users can only see/update their own
CREATE POLICY "boxes_select" ON public.secret_boxes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "boxes_update" ON public.secret_boxes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
