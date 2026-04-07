export type AwardCategory = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  anchor: string;
  count: number;
  unit: string | null;
  prizeAmount: string;
  prizeNote: string | null;
  secondPrizeAmount?: string;
  secondPrizeNote?: string;
  detailDescription: string;
};

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    id: "top-talent",
    title: "Top Talent",
    description:
      "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
    imagePath: "/assets/homepage/award-top-talent.png",
    anchor: "top-talent",
    count: 10,
    unit: "Đơn vị",
    prizeAmount: "7.000.000 VNĐ",
    prizeNote: "cho mỗi giải thưởng",
    detailDescription:
      "Giải thưởng Top Talent vinh danh những cá nhân xuất sắc nhất, người đã thể hiện năng lực vượt trội trên mọi phương diện: chuyên môn, tinh thần, sự đóng góp. Với tinh thần sáng tạo, linh hoạt và khát khao phát triển, họ luôn là nguồn cảm hứng, tạo sức ảnh hưởng tích cực đến cá nhân và tập thể.",
  },
  {
    id: "top-project",
    title: "Top Project",
    description:
      "Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi bật",
    imagePath: "/assets/homepage/award-top-project.png",
    anchor: "top-project",
    count: 2,
    unit: "Tập thể",
    prizeAmount: "15.000.000 VNĐ",
    prizeNote: "cho mỗi giải thưởng",
    detailDescription:
      "Giải thưởng Top Project vinh danh các tập thể dự án xuất sắc với kết quả kinh doanh vượt kỳ vọng. Hiệu quả sản xuất tốt và sự kết hợp linh hoạt với tấm lòng, đây là các dự án đã có đủ phẩm chất kỹ thuật cao, hiệu quả tốt mà người tư vấn trên toàn bộ, đã xuất sắc ở mọi vấn đề. Bên cạnh đó, giải thưởng cũng vinh danh những dự án phát triển hiệu quả lợi nhuận tốt nhất cho khách hàng.",
  },
  {
    id: "top-project-leader",
    title: "Top Project Leader",
    description:
      "Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá",
    imagePath: "/assets/homepage/award-top-project-leader.png",
    anchor: "top-project-leader",
    count: 3,
    unit: "Cá nhân",
    prizeAmount: "7.000.000 VNĐ",
    prizeNote: "cho mỗi giải thưởng",
    detailDescription:
      'Giải thưởng Top Project Leader vinh danh những nhà quản lý dự án xuất sắc - những người biết tự sáng tạo, và lối suy "Aim High - Be Agile" trong mọi bài toán. Họ là những người dám chấp nhận rủi ro, không ngừng chủ công nhau vượt qua thử thách và đạt được mục tiêu đề ra, mà còn giữ vững giá trị nhân bản, truyền nhiệt huyết, tình thần Masterone, và truyền thành đổi sánh thành bền lâu trọn vẹn - hạnh phúc bền của Sun*.',
  },
  {
    id: "best-manager",
    title: "Best Manager",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    imagePath: "/assets/homepage/award-best-manager.png",
    anchor: "best-manager",
    count: 1,
    unit: "Cá nhân",
    prizeAmount: "10.000.000 VNĐ",
    prizeNote: null,
    detailDescription:
      "Giải thưởng Best Manager vinh danh những nhà lãnh đạo đội nhóm - người đã khi đối diện của cuộc vượt tác và khi quá vượt kỳ vọng, tạo dựng nổi bật đến hiệu quả kinh doanh và sự phát triển của cá nhân và tập thể. Đó sẽ là những nhà lãnh đạo hiệu quả, dũng cảm phát triển từ lâu dài, ứng dụng công nghệ linh hoạt trong kỳ nguyên số. Họ truyền cảm hứng để lập kế hoạch và sẵn sàng đón nhận, khảm chỉ dẫn dắt tạo ra những thay đổi và tính cách mạng.",
  },
  {
    id: "signature-creator",
    title: "Signature 2025 - Creator",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    imagePath: "/assets/homepage/award-signature-creator.png",
    anchor: "signature-creator",
    count: 1,
    unit: "Cá nhân",
    prizeAmount: "5.000.000 VNĐ",
    prizeNote: "cho giải cá nhân",
    secondPrizeAmount: "8.000.000 VNĐ",
    secondPrizeNote: "cho giải tập thể",
    detailDescription:
      'Giải thưởng Signature vinh danh và khẳn hẳn tạo ra từ bên trên nền tảng mạng, trọng mà Sun* trường để trở trong từng thật kỳ. Trong năm 2025, giải thưởng Signature vinh danh Creator - cá nhân/đã thế mang đi cùng cho những và nhiều nhóm, người đã phá cách tiện phương trong hành động. Họ là những người/nhóm ban sáng tạo cùng đi, doanh nghiệp phê duyệt cùng nâu tốt, Với lòng yêu kiến tạo và tinh thần "Creator" thật trong của Sun*, họ không chỉ giúp cho cuộc cá nhân sự thay đổi mà luôn cho những mong muốn cho các nhân Sun* tận giá trị.',
  },
  {
    id: "mvp",
    title: "MVP (Most Valuable Person)",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    imagePath: "/assets/homepage/award-mvp.png",
    anchor: "mvp",
    count: 1,
    unit: null,
    prizeAmount: "15.000.000 VNĐ",
    prizeNote: null,
    detailDescription:
      "Giải thưởng MVP vinh danh cá nhân xuất sắc nhất năm - người xuất sắc trên tất cả phương diện, gương mặt tiêu biểu đại diện cho toàn bộ tập thể. Họ là người dù thể hiện năng lực vượt bội, tinh thần cống hiến lâu dài, và luôn hết hướng mạo mọi người để tạo dấu ấn mạnh mẽ trong hành trình của Sun* vuốt năm. Không chỉ nổi bật ở hiệu suất và kết quả công việc, họ còn là nguồn cảm hứng cho tất cả các nhân Sun* trên mọi phương diện.",
  },
];
