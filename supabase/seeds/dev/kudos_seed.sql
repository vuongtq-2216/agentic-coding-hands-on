-- ============================================================
-- Kudos Feature: Seed Data for Development
-- ============================================================
-- Note: This seed requires auth.users to exist first.
-- For local dev, create test users via Supabase Auth or use
-- the service_role key to insert directly.
-- ============================================================

-- Step 1: Create test auth users (using Supabase's internal function)
-- These are fake users for development only
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at, instance_id, aud, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'huynhduong@sun-asterisk.com', '{"full_name": "Huỳnh Dương Xuân Nhật"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('22222222-2222-2222-2222-222222222222', 'nguyenvan@sun-asterisk.com', '{"full_name": "Nguyễn Văn Hoàng"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('33333333-3333-3333-3333-333333333333', 'tranthimai@sun-asterisk.com', '{"full_name": "Trần Thị Mai"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('44444444-4444-4444-4444-444444444444', 'lequangminh@sun-asterisk.com', '{"full_name": "Lê Quang Minh"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('55555555-5555-5555-5555-555555555555', 'phamthuhang@sun-asterisk.com', '{"full_name": "Phạm Thu Hằng"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('66666666-6666-6666-6666-666666666666', 'vothanhson@sun-asterisk.com', '{"full_name": "Võ Thanh Sơn"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('77777777-7777-7777-7777-777777777777', 'dangthilan@sun-asterisk.com', '{"full_name": "Đặng Thị Lan"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('88888888-8888-8888-8888-888888888888', 'buiminhtuan@sun-asterisk.com', '{"full_name": "Bùi Minh Tuấn"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('99999999-9999-9999-9999-999999999999', 'hoangthinga@sun-asterisk.com', '{"full_name": "Hoàng Thị Nga"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dothanhdat@sun-asterisk.com', '{"full_name": "Đỗ Thành Đạt"}', now(), now(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create user profiles
INSERT INTO public.user_profiles (id, full_name, avatar_url, department_code, department_name, badge_type)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Huỳnh Dương Xuân Nhật', NULL, 'CECV10', 'Phòng SAA', 'Legend Hero'),
  ('22222222-2222-2222-2222-222222222222', 'Nguyễn Văn Hoàng', NULL, 'DEVN03', 'Phòng Development', 'Rising Hero'),
  ('33333333-3333-3333-3333-333333333333', 'Trần Thị Mai', NULL, 'CECV05', 'Phòng HR', 'New Hero'),
  ('44444444-4444-4444-4444-444444444444', 'Lê Quang Minh', NULL, 'DEVN01', 'Phòng Development', 'Super Hero'),
  ('55555555-5555-5555-5555-555555555555', 'Phạm Thu Hằng', NULL, 'CECV03', 'Phòng Marketing', NULL),
  ('66666666-6666-6666-6666-666666666666', 'Võ Thanh Sơn', NULL, 'DEVN07', 'Phòng QA', 'Rising Hero'),
  ('77777777-7777-7777-7777-777777777777', 'Đặng Thị Lan', NULL, 'CECV08', 'Phòng Design', 'New Hero'),
  ('88888888-8888-8888-8888-888888888888', 'Bùi Minh Tuấn', NULL, 'DEVN02', 'Phòng Infrastructure', NULL),
  ('99999999-9999-9999-9999-999999999999', 'Hoàng Thị Nga', NULL, 'CECV01', 'Phòng Finance', 'Legend Hero'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Đỗ Thành Đạt', NULL, 'DEVN05', 'Phòng Mobile', 'Super Hero')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  department_code = EXCLUDED.department_code,
  department_name = EXCLUDED.department_name,
  badge_type = EXCLUDED.badge_type;

-- Step 3: Create kudos posts (20 posts, 5 highlighted)
INSERT INTO public.kudos_posts (id, sender_id, receiver_id, message, category, hashtags, image_urls, is_highlighted, like_count, created_at)
VALUES
  -- Highlighted posts
  ('a0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222',
   'Cảm ơn người em bình thường nhưng phì thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. <3 và cuộc sống...',
   'IDOL GIỚI TRẺ', ARRAY['#Dedicated', '#Inspiring', '#Dedicated', '#Inspiring', '#Dedicated', '#Inspiring'], ARRAY[]::TEXT[],
   true, 1000, now() - interval '2 hours'),

  ('a0000002-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444',
   'Anh Minh ơi, cảm ơn anh đã luôn hỗ trợ team trong những lúc khó khăn nhất. Tinh thần lạc quan và sự tận tâm của anh là nguồn động viên lớn cho cả phòng!',
   'LEADER CỦA NĂM', ARRAY['#Leadership', '#Teamwork', '#Dedication'], ARRAY[]::TEXT[],
   true, 856, now() - interval '5 hours'),

  ('a0000003-0000-0000-0000-000000000003', '55555555-5555-5555-5555-555555555555', '77777777-7777-7777-7777-777777777777',
   'Chị Lan là người designer tuyệt vời nhất mà em từng làm việc cùng! Mỗi design đều có sức sáng tạo và chất lượng vượt mong đợi.',
   'IDOL GIỚI TRẺ', ARRAY['#Creative', '#Design', '#Excellence'], ARRAY[]::TEXT[],
   true, 723, now() - interval '8 hours'),

  ('a0000004-0000-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', '88888888-8888-8888-8888-888888888888',
   'Tuấn đã giúp fix production issue lúc 2 giờ sáng mà không hề phàn nàn. Đây mới đúng tinh thần Sun* - không ngại khó, không ngại khổ!',
   'HERO ĐÊM KHUYA', ARRAY['#Dedicated', '#Reliability', '#ProblemSolver'], ARRAY[]::TEXT[],
   true, 645, now() - interval '12 hours'),

  ('a0000005-0000-0000-0000-000000000005', '99999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111111',
   'Cảm ơn anh Nhật đã organize team building tuyệt vời vào cuối tuần. Mọi người đều rất vui và gắn kết hơn sau event đó!',
   'NGƯỜI TỔ CHỨC', ARRAY['#TeamBuilding', '#Fun', '#Connection'], ARRAY[]::TEXT[],
   true, 534, now() - interval '1 day'),

  -- Normal posts
  ('a0000006-0000-0000-0000-000000000006', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333',
   'Cảm ơn chị Mai đã hỗ trợ onboarding cho các bạn mới. Sự tận tâm của chị giúp mọi người hòa nhập nhanh hơn rất nhiều!',
   'HR TUYỆT VỜI', ARRAY['#HR', '#Onboarding', '#Support'], ARRAY[]::TEXT[],
   false, 234, now() - interval '1 day 3 hours'),

  ('a0000007-0000-0000-0000-000000000007', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555',
   'Hằng đã làm chiến dịch marketing quá xuất sắc! Số lượng lead tăng 200% so với quý trước. Incredible work!',
   'MARKETING STAR', ARRAY['#Marketing', '#Growth', '#Achievement'], ARRAY[]::TEXT[],
   false, 189, now() - interval '1 day 6 hours'),

  ('a0000008-0000-0000-0000-000000000008', '77777777-7777-7777-7777-777777777777', '66666666-6666-6666-6666-666666666666',
   'Anh Sơn luôn review code rất kỹ lưỡng và cho feedback constructive. Nhờ anh mà team QA ngày càng chuyên nghiệp hơn.',
   'CODE REVIEWER', ARRAY['#QA', '#CodeReview', '#Quality'], ARRAY[]::TEXT[],
   false, 167, now() - interval '2 days'),

  ('a0000009-0000-0000-0000-000000000009', '88888888-8888-8888-8888-888888888888', '99999999-9999-9999-9999-999999999999',
   'Chị Nga quản lý tài chính team rất minh bạch và hiệu quả. Mọi thắc mắc đều được giải đáp nhanh chóng!',
   'FINANCE HERO', ARRAY['#Finance', '#Transparency', '#Efficiency'], ARRAY[]::TEXT[],
   false, 145, now() - interval '2 days 4 hours'),

  ('a0000010-0000-0000-0000-000000000010', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111',
   'Anh Nhật share kiến thức rất generous. Buổi tech talk về AI tuần trước quá hay, em học được rất nhiều!',
   'KNOWLEDGE SHARER', ARRAY['#Learning', '#TechTalk', '#AI', '#Sharing'], ARRAY[]::TEXT[],
   false, 312, now() - interval '2 days 8 hours'),

  ('a0000011-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444',
   'Minh đã deliver project đúng deadline trong điều kiện scope thay đổi liên tục. Khả năng adapt và manage expectation của em rất tốt!',
   'PROJECT HERO', ARRAY['#ProjectManagement', '#Adaptability', '#Delivery'], ARRAY[]::TEXT[],
   false, 278, now() - interval '3 days'),

  ('a0000012-0000-0000-0000-000000000012', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   'Đạt đã phát triển mobile app mới chỉ trong 2 tuần! Tốc độ và chất lượng đều impressive.',
   'SPEED DEMON', ARRAY['#Mobile', '#FastDelivery', '#Quality'], ARRAY[]::TEXT[],
   false, 201, now() - interval '3 days 5 hours'),

  ('a0000013-0000-0000-0000-000000000013', '55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222',
   'Cảm ơn Hoàng đã giúp debug issue phức tạp trong hệ thống payment. Không có anh chắc team phải work overtime cả tuần!',
   'DEBUG MASTER', ARRAY['#Debug', '#Payment', '#Teamwork'], ARRAY[]::TEXT[],
   false, 156, now() - interval '3 days 10 hours'),

  ('a0000014-0000-0000-0000-000000000014', '66666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777',
   'Design system mới mà chị Lan xây dựng giúp team dev tiết kiệm rất nhiều thời gian. Consistency across products tăng đáng kể!',
   'DESIGN SYSTEM', ARRAY['#DesignSystem', '#Consistency', '#Productivity'], ARRAY[]::TEXT[],
   false, 189, now() - interval '4 days'),

  ('a0000015-0000-0000-0000-000000000015', '99999999-9999-9999-9999-999999999999', '33333333-3333-3333-3333-333333333333',
   'Chị Mai tổ chức workshop Communication Skills rất bổ ích. Cả team đều cải thiện kỹ năng giao tiếp rõ rệt!',
   'TRAINER', ARRAY['#Workshop', '#Communication', '#Learning'], ARRAY[]::TEXT[],
   false, 134, now() - interval '4 days 6 hours'),

  ('a0000016-0000-0000-0000-000000000016', '22222222-2222-2222-2222-222222222222', '88888888-8888-8888-8888-888888888888',
   'Tuấn set up CI/CD pipeline mới giúp deploy time giảm từ 30 phút xuống còn 5 phút. Game changer!',
   'DEVOPS HERO', ARRAY['#DevOps', '#CICD', '#Automation', '#Efficiency'], ARRAY[]::TEXT[],
   false, 267, now() - interval '5 days'),

  ('a0000017-0000-0000-0000-000000000017', '44444444-4444-4444-4444-444444444444', '66666666-6666-6666-6666-666666666666',
   'Anh Sơn luôn test rất kỹ trước khi release. Nhờ đó mà bug rate của team giảm 80% so với quý trước!',
   'QUALITY GUARDIAN', ARRAY['#Testing', '#Quality', '#ZeroBug'], ARRAY[]::TEXT[],
   false, 198, now() - interval '5 days 8 hours'),

  ('a0000018-0000-0000-0000-000000000018', '77777777-7777-7777-7777-777777777777', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   'Đạt rất creative trong việc giải quyết vấn đề UX trên mobile. User satisfaction score tăng 40%!',
   'UX INNOVATOR', ARRAY['#UX', '#Mobile', '#Innovation', '#UserSatisfaction'], ARRAY[]::TEXT[],
   false, 145, now() - interval '6 days'),

  ('a0000019-0000-0000-0000-000000000019', '88888888-8888-8888-8888-888888888888', '55555555-5555-5555-5555-555555555555',
   'Hằng viết content marketing hay quá! Blog posts của Hằng mang lại traffic organic tăng 150%. Keep it up!',
   'CONTENT CREATOR', ARRAY['#Content', '#Marketing', '#SEO', '#Writing'], ARRAY[]::TEXT[],
   false, 112, now() - interval '6 days 12 hours'),

  ('a0000020-0000-0000-0000-000000000020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '99999999-9999-9999-9999-999999999999',
   'Chị Nga luôn xử lý expense report nhanh chóng và chính xác. Team rất appreciate sự hỗ trợ của chị!',
   'FINANCE SUPPORT', ARRAY['#Finance', '#Support', '#Accuracy'], ARRAY[]::TEXT[],
   false, 98, now() - interval '7 days')
ON CONFLICT (id) DO NOTHING;

-- Step 4: Create kudos likes (varied likes for different posts)
INSERT INTO public.kudos_likes (kudos_id, user_id)
VALUES
  ('a0000001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333'),
  ('a0000001-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444'),
  ('a0000001-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555'),
  ('a0000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111'),
  ('a0000002-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555'),
  ('a0000003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111'),
  ('a0000003-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222'),
  ('a0000004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111'),
  ('a0000005-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222'),
  ('a0000005-0000-0000-0000-000000000005', '44444444-4444-4444-4444-444444444444'),
  ('a0000006-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111'),
  ('a0000007-0000-0000-0000-000000000007', '33333333-3333-3333-3333-333333333333'),
  ('a0000010-0000-0000-0000-000000000010', '22222222-2222-2222-2222-222222222222'),
  ('a0000010-0000-0000-0000-000000000010', '44444444-4444-4444-4444-444444444444'),
  ('a0000010-0000-0000-0000-000000000010', '66666666-6666-6666-6666-666666666666')
ON CONFLICT (kudos_id, user_id) DO NOTHING;

-- Step 5: Create secret boxes (10 boxes for various users)
INSERT INTO public.secret_boxes (user_id, is_opened, prize_description, opened_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', true, 'Nhận được 1 áo phông SAA', now() - interval '3 days'),
  ('11111111-1111-1111-1111-111111111111', true, 'Nhận được 1 ly cà phê Starbucks', now() - interval '1 day'),
  ('11111111-1111-1111-1111-111111111111', false, NULL, NULL),
  ('11111111-1111-1111-1111-111111111111', false, NULL, NULL),
  ('11111111-1111-1111-1111-111111111111', false, NULL, NULL),
  ('22222222-2222-2222-2222-222222222222', true, 'Nhận được 1 voucher Grab 100K', now() - interval '2 days'),
  ('22222222-2222-2222-2222-222222222222', false, NULL, NULL),
  ('33333333-3333-3333-3333-333333333333', true, 'Nhận được 1 áo phông SAA', now() - interval '4 days'),
  ('44444444-4444-4444-4444-444444444444', true, 'Nhận được 1 voucher CGV 200K', now() - interval '5 days'),
  ('55555555-5555-5555-5555-555555555555', false, NULL, NULL);
