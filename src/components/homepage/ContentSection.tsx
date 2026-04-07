import Image from "next/image";

export function ContentSection() {
  return (
    <section className="w-full lg:w-[1152px] max-w-full rounded-lg flex flex-col items-center gap-8 lg:gap-8 px-6 py-10 sm:px-10 sm:py-15 md:px-15 md:py-20 lg:px-[104px] lg:py-[120px]">
      {/* Root Further decorative logos — large centered composition */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-4 lg:mb-8">
        <Image
          src="/assets/homepage/root-text-logo.png"
          alt="Root"
          width={189}
          height={67}
          className="w-[140px] sm:w-[160px] lg:w-[189px] h-auto"
        />
        <span className="hidden sm:block font-[family-name:var(--font-montserrat)] text-4xl lg:text-5xl font-light text-white/30">
          /
        </span>
        <Image
          src="/assets/homepage/further-text-logo.png"
          alt="Further"
          width={290}
          height={67}
          className="w-[200px] sm:w-[250px] lg:w-[290px] h-auto"
        />
      </div>

      {/* Body text */}
      <div className="w-full font-[family-name:var(--font-montserrat)] text-base sm:text-lg lg:text-2xl font-bold leading-7 sm:leading-8 lg:leading-8 text-white text-justify space-y-6">
        <p>
          Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu
          ngày càng cao từ khách hàng, Sun* lựa chọn chiến lược đa dạng hóa
          năng lực để không chỉ nỗ lực trở thành tinh anh trong lĩnh vực của
          mình, mà còn hướng đến một cái đích cao hơn, nơi mỗi Sunner đều là
          &quot;problem-solver&quot; - chuyên gia trong việc giải quyết mọi vấn
          đề, tìm lời giải cho mọi bài toán của dự án, khách hàng và xã hội.
        </p>
        <p>
          Lấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt
          cùng tinh thần đào sâu để bứt phá trong kỷ nguyên AI, &quot;Root
          Further&quot; đã được chọn để trở thành chủ đề chính thức của Lễ trao
          giải Sun* Annual Awards 2025.
        </p>
        <p>
          Vươn xa khỏi nét nghĩa bề mặt, &quot;Root Further&quot; chính là hành
          trình chúng ta không ngừng vươn xa hơn, cắm rễ mạnh hơn, chạm đến
          những tầng &quot;địa chất&quot; ẩn sâu để tiếp tục tồn tại, vươn lên
          và nuôi dưỡng đam mê kiến tạo giá trị luôn cháy bỏng của người Sun*.
        </p>

        {/* English quote */}
        <div className="text-center py-6">
          <p className="font-[family-name:var(--font-montserrat)] text-lg lg:text-xl font-bold text-white italic">
            &quot;A tree with deep roots fears no storm&quot;
          </p>
          <p className="font-[family-name:var(--font-montserrat)] text-sm lg:text-base font-bold text-white/70 mt-1">
            (Cây sâu bền rễ, bão giông chẳng nề - Ngạn ngữ Anh)
          </p>
        </div>

        <p>
          Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ
          vững. Một tổ chức vững mạnh cũng vậy – không chỉ cần những cá nhân tự
          tin vào năng lực đa dạng, sẵn sàng kiến tạo và đón nhận thử thách,
          làm chủ sự thay đổi là tổ chức không chỉ vững vàng trước biến động,
          mà còn khai thác được mọi lợi thế, chinh phục các thách thức của thời
          cuộc. Không đơn thuần là tên gọi của chương trình phát triển tổ chức,
          &quot;Root Further&quot; còn như một lời có vẻ, đồng viên mỗi chúng ta
          hãy dám tin vào bản thân, dám đào sâu, khai mở mọi tiềm năng, dám
          phá bỏ giới hạn, dám trở thành phiên bản đa nhiệm và xuất sắc nhất
          của mình.
        </p>
      </div>
    </section>
  );
}
