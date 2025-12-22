import React from 'react'
import Layout from './common/Layout'
// Import các hình ảnh thành viên
import ConchoCHM from '../assets/images/ConchoCHM.jpg';
import Luan from '../assets/images/Luan.jpg';
import ConChoNhatMinh from '../assets/images/Concho24h.jpg';
import ConChoJuLong from '../assets/images/Conchojulong.jpg';

const About = () => {
  return (
    <Layout>
      <div className="about-page container mx-auto px-4 py-12">

        {/* === PHẦN 1: GIỚI THIỆU CHUNG === */}
        <div className="about-hero text-center mb-16">
          <h1 className="title font-bold mb-4">Về Chúng Tôi</h1>
          <p className="subtitle text-gray-600 max-w-2xl mx-auto">
            Chào mừng bạn đến với nơi hội tụ của những người bạn thân giành những tình cảm đặc biệt cho nhau.
          </p>
        </div>

        {/* === PHẦN 2: CÂU CHUYỆN & SỨ MỆNH === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">

          {/* Cột hình ảnh */}
          <div className="flex justify-center w-full">
            <div className="story-image-wrapper rounded-lg overflow-hidden shadow-lg h-80 md:h-96 w-full max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team working"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Nội dung chữ */}
          <div className="story-content text-center md:text-left">
            <h2 className="section-title font-bold mb-4">Câu chuyện của DXH</h2>
            <p className="mb-6 text-gray-700 leading-relaxed text-lg">
              Được thành lập từ những con người vô tình tìm thấy nhau giữa cuộc sống rộng lớn này, chúng tôi đến với nhau một cách rất tự nhiên và giản dị. Ban đầu chỉ là những trận game giải trí trong khu quân sự, những phút giây thư giãn hiếm hoi giữa lịch sinh hoạt đều đặn và có phần khô khan. Từ vài câu nói đùa, vài lần cười lớn vì thắng thua không quan trọng, chúng tôi dần trở nên thân thiết hơn lúc nào không hay. Rồi từ game, chúng tôi cùng nhau làm dự án, cùng chia sẻ áp lực, cùng lo lắng cho deadline, cùng trải qua những lúc mệt mỏi và bế tắc. Có những khi bất đồng ý kiến, có lúc căng thẳng tưởng chừng không thể tiếp tục, nhưng sau tất cả, chúng tôi vẫn ở đó, hỗ trợ và tin tưởng nhau. Tình cảm cứ thế lớn lên qua từng ngày, không ồn ào nhưng bền chặt. Tôi thật sự hạnh phúc khi được chung team với những người bạn này, bởi không chỉ là đồng đội trong công việc, họ còn là những người đã cùng tôi tạo nên những kỷ niệm đáng nhớ trong một giai đoạn rất đặc biệt của cuộc đời.
            </p>
          </div>
        </div>

        {/* === PHẦN 3: ĐỘI NGŨ (4 ẢNH) === */}
        <div className="team-section">
          <h2 className="text-center font-bold mb-12 section-title">Các thành viên</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* --- THÀNH VIÊN 1 --- */}
            <div className="team-member text-center">
              {/* CHỈNH SỬA: Sử dụng h-56 w-56 để tạo khung vuông cố định nhỏ hơn */}
              <div className="member-img">
                {/* Class w-full h-full object-cover sẽ đảm bảo ảnh lấp đầy khung vuông này */}
                <img src={ConchoCHM} alt="Cam Hồng Mạnh" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-2xl mb-2">Con chó Cam Hồng Mạnh</h4>
              <p className="text-lg font-medium primary-text uppercase tracking-wide">Leader</p>
            </div>

            {/* --- THÀNH VIÊN 2 --- */}
            <div className="team-member text-center">
              {/* CHỈNH SỬA: h-56 w-56 */}
              <div className="member-img">
                <img src={Luan} alt="Nhật Luân Đẹp Trai" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-2xl mb-2">Nhật Luân Đẹp Trai</h4>
              <p className="text-lg font-medium primary-text uppercase tracking-wide">Người đẹp trai nhất</p>
            </div>

            {/* --- THÀNH VIÊN 3 --- */}
            <div className="team-member text-center">
              {/* CHỈNH SỬA: h-56 w-56 */}
              <div className="member-img">
                <img src={ConChoNhatMinh} alt="Nhật Minh (24h)" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-2xl mb-2">Con Chó Nhật Minh (24h)</h4>
              <p className="text-lg font-medium primary-text uppercase tracking-wide">Trưởng phòng ngủ</p>
            </div>

            {/* --- THÀNH VIÊN 4 --- */}
            <div className="team-member text-center">
              {/* CHỈNH SỬA: h-56 w-56 */}
              <div className="member-img">
                <img src={ConChoJuLong} alt="JuLong" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-2xl mb-2">Con Chó JuLong</h4>
              <p className="text-lg font-medium primary-text uppercase tracking-wide">Quản lý Nhân sinh</p>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  )
}

export default About