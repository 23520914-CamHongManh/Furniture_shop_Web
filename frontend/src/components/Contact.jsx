import React from 'react';
import Layout from './common/Layout';

const Contact = () => {
  return (
    <Layout>
      <div className="contact-page container mx-auto px-4 py-12 lg:py-20">
        {/* Header */}
        <div className="contact-hero text-center mb-16">
          <h1 className="title font-bold text-4xl md:text-5xl text-primary-black relative inline-block">
            Liên Hệ Với DXH Furniture
            <span className="block w-20 h-1 bg-primary-color mt-6 mx-auto rounded"></span>
          </h1>
          <p className="subtitle text-gray-600 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            Ghé thăm showroom của chúng tôi để trải nghiệm trực tiếp sản phẩm hoặc liên hệ qua hotline để được tư vấn nhanh nhất.
          </p>
        </div>

        {/* Grid 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Cột trái: Thông tin */}
          <div className="contact-info space-y-12">
            {/* Thông tin kết nối */}
            <div>
              <h2 className="text-3xl font-bold text-primary-black border-l-4 border-teal-500 pl-4 mb-10">
                Thông tin kết nối
              </h2>

              <div className="space-y-10">
                {/* Địa chỉ */}
                <div className="info-item flex items-start gap-5">
                  <div className="icon-box bg-teal-50 rounded-lg w-10 h-10 flex items-center justify-center text-primary-color flex-shrink-0 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Địa chỉ showroom</h4>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      Trường ĐH Công Nghệ Thông Tin - ĐHQG TP.HCM<br />
                      Khu phố 6, P. Linh Trung, TP. Thủ Đức, TP.HCM
                    </p>
                  </div>
                </div>

                {/* Hotline */}
                <div className="info-item flex items-start gap-5">
                  <div className="icon-box bg-teal-50 rounded-lg w-10 h-10 flex items-center justify-center text-primary-color flex-shrink-0 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Hotline hỗ trợ</h4>
                    <a href="tel:0388744779" className="text-3xl font-bold text-primary-color mt-2 block hover:underline">
                      0388 744 779
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Hỗ trợ 24/7</p>
                  </div>
                </div>

                {/* Email */}
                <div className="info-item flex items-start gap-5">
                  <div className="icon-box bg-teal-50 rounded-lg w-10 h-10 flex items-center justify-center text-primary-color flex-shrink-0 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">Email</h4>
                    <a href="mailto:contact@dxhfurniture.com" className="text-gray-600 hover:text-primary-color transition-colors">
                      contact@dxhfurniture.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Giờ làm việc - Icon đồng hồ đã thu nhỏ đồng bộ */}
            <div className="working-hours bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-2xl mb-6 text-gray-800 flex items-center gap-4">
                <div className="icon-box bg-teal-50 rounded-lg w-10 h-10 flex items-center justify-center text-primary-color">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Giờ mở cửa
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex justify-between pb-3 border-b border-gray-200">
                  <span>Thứ 2 - Thứ 6:</span>
                  <span className="font-semibold text-gray-800">8:00 - 21:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Thứ 7 & Chủ Nhật:</span>
                  <span className="font-semibold text-gray-800">9:00 - 22:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cột phải: Bản đồ hình vuông hoàn hảo */}
          <div className="map-column aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
            <iframe
              title="Vị trí Showroom DXH Furniture - UIT"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.493428944465!2d106.8019696153346!3d10.87001459227453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527d0b6e3c4b3%3A0x8b8e6b2b8f3b3e6e!2sUniversity%20of%20Information%20Technology%20(VNU-HCM)!5e0!3m2!1svi!2s!4v1720000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;