export interface QuestionItem {
  id: number;
  questionNumberLabel: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: string;
  tag: string;
}

export const ANCIENT_INDIA_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    questionNumberLabel: "Câu hỏi 1",
    question: "Hệ thống chữ viết cổ nào được xem là tiền thân của phần lớn các loại chữ viết hiện nay ở Ấn Độ và Nam Á?",
    options: [
      { key: 'A', text: "Chữ hình nêm" },
      { key: 'B', text: "Chữ Phạn" },
      { key: 'C', text: "Chữ tượng hình Ai Cập" },
      { key: 'D', text: "Chữ Brà-mi" }
    ],
    correctAnswer: 'D',
    explanation: "Chữ Brà-mi (Brahmi) xuất hiện vào khoảng thế kỷ VI - V TCN, được xem là cội nguồn phát triển của hầu hết các hệ chữ viết ở Ấn Độ (bao gồm cả chữ Devanagari dùng viết chữ Phạn và Hindi hiện đại) cùng nhiều hệ chữ viết cổ ở khu vực Nam Á và Đông Nam Á.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Chữ viết & Ngôn ngữ"
  },
  {
    id: 2,
    questionNumberLabel: "Câu 2",
    question: "Hai bộ sử thi nổi tiếng, vĩ đại và có tầm ảnh hưởng sâu sắc nhất của văn minh Ấn Độ cổ đại là gì?",
    options: [
      { key: 'A', text: "I-li-át và Ô-đi-xê" },
      { key: 'B', text: "Tây du ký và Tam quốc diễn nghĩa" },
      { key: 'C', text: "Ma-ha-bha-ra-ta và Ra-ma-ya-na" },
      { key: 'D', text: "Hịch tướng sĩ và Nam quốc sơn hà" }
    ],
    correctAnswer: 'C',
    explanation: "Ma-ha-bha-ra-ta (Mahabharata - bản trường ca dài nhất thế giới cổ đại với hơn 110.000 khổ thơ) và Ra-ma-ya-na (Ramayana) là hai viên ngọc sáng chói của nền văn học cổ điển Ấn Độ, chứa đựng triết lý nhân sinh, tôn giáo, lịch sử và đạo đức sống.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Văn học & Sử thi"
  },
  {
    id: 3,
    questionNumberLabel: "câu 3",
    question: "Hai bộ sử thi nổi tiếng và vĩ đại nhất của văn minh Ấn Độ thời cổ đại là gì?",
    options: [
      { key: 'A', text: "I-li-át và Ô-đi-xê" },
      { key: 'B', text: "Sử thi Gilgamesh" },
      { key: 'C', text: "Kinh Thi và Kinh Thư" },
      { key: 'D', text: "Ma-ha-bha-ra-ta và Ra-ma-ya-na" }
    ],
    correctAnswer: 'D',
    explanation: "Sử thi Ma-ha-bha-ra-ta và Ra-ma-ya-na được lưu truyền qua nhiều thế hệ, phản ánh toàn cảnh đời sống xã hội, cuộc đấu tranh giữa chính nghĩa và gian tà, là niềm tự hào bất hủ của nền văn minh thung lũng sông Ấn - sông Hằng.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Văn học & Sử thi"
  },
  {
    id: 4,
    questionNumberLabel: "câu 4",
    question: "Tôn giáo nào ra đời ở Ấn Độ vào khoảng thế kỷ VI TCN do Tất-đạt-đa Cồ-đàm khởi xướng?",
    options: [
      { key: 'A', text: "Đạo Phật" },
      { key: 'B', text: "Đạo Hin-đu" },
      { key: 'C', text: "Hồi giáo" },
      { key: 'D', text: "Đạo Xích-ha" }
    ],
    correctAnswer: 'A',
    explanation: "Đạo Phật (Phật giáo) ra đời tại miền Bắc Ấn Độ vào khoảng thế kỷ VI TCN do Thái tử Tất-đạt-đa Cồ-đàm (Siddhartha Gautama - Thích Ca Mâu Ni) sáng lập, chủ trương bình đẳng, hướng thiện, từ bi và thoát khỏi khổ đau luân hồi.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Tôn giáo & Triết học"
  },
  {
    id: 5,
    questionNumberLabel: "Câu hỏi 5",
    question: "Kiến trúc tiêu biểu và độc đáo nhất của Phật giáo Ấn Độ thời cổ đại, thường dùng làm nơi bảo tồn xá lợi của Phật, là công trình nào?",
    options: [
      { key: 'A', text: "Đền Pát-tê-nông" },
      { key: 'B', text: "Kim tự tháp bậc thang" },
      { key: 'C', text: "Vạn Lý Trường Thành" },
      { key: 'D', text: "Tháp Stupa (Tháp Phật)" }
    ],
    correctAnswer: 'D',
    explanation: "Tháp Stupa (Tháp Phật) là loại hình kiến trúc Phật giáo đặc thù hình bán cầu úp ngược hoặc mái vòm, được xây dựng phổ biến từ thời vua A-sô-ka (Asoka) để thờ xá lợi của Đức Phật và các bậc giác ngộ. Tiêu biểu nhất là Đại tháp Sanchi.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Kiến trúc & Điêu khắc"
  },
  {
    id: 6,
    questionNumberLabel: "Câu hỏi 6",
    question: "Y học Ấn Độ cổ đại đã đạt được thành tựu xuất sắc nào trong việc chăm sóc sức khỏe con người?",
    options: [
      { key: 'A', text: "Chỉ dùng bùa chú và phép thuật tâm linh" },
      { key: 'B', text: "Chỉ chuyên tâm chữa bệnh bằng phương pháp châm cứu" },
      { key: 'C', text: "Phát minh ra máy chụp X-quang sơ khai" },
      { key: 'D', text: "Biết dùng phẫu thuật để chữa bệnh và luyện các loại dược thảo" }
    ],
    correctAnswer: 'D',
    explanation: "Nền y học cổ truyền Ấn Độ (Ayurveda) phát triển rất sớm với những danh y lừng danh như Charaka và Sushruta. Danh y Sushruta được xem là cha đẻ của ngành phẫu thuật cổ đại, từng thực hiện phẫu thuật tạo hình, mổ sỏi, đục thủy tinh thể và kết hợp hàng trăm vị thảo dược quý.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Khoa học & Y thuật"
  },
  {
    id: 7,
    questionNumberLabel: "Câu hỏi 7",
    question: "Nền văn minh Ấn Độ cổ đại được hình thành và phát triển chủ yếu lưu vực của hai con sông lớn nào?",
    options: [
      { key: 'A', text: "Sông Tiê-gơ-rít và sông Ơ-phơ-rát" },
      { key: 'B', text: "Sông Hoàng Hà và sông Trường Giang" },
      { key: 'C', text: "Sông Ấn và sông Hằng" },
      { key: 'D', text: "Sông Nin và sông Ơ-phơ-rát" }
    ],
    correctAnswer: 'C',
    explanation: "Văn minh Ấn Độ cổ đại nảy nở trên lưu vực sông Ấn (Indus) - nơi hình thành nền văn minh Harappa - Mohenjo-Daro rực rỡ và sau đó mở rộng sang lưu vực sông Hằng (Ganges) màu mỡ, cái nôi của văn hóa Vệ-đà và Phật giáo.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Địa lý & Nguồn gốc"
  },
  {
    id: 8,
    questionNumberLabel: "câu 8:",
    question: "Ngoài hai bộ sử thi lớn, văn học Ấn Độ cổ đại còn đạt thành tựu xuất sắc nào trong các lĩnh vực thơ ca và kịch tác?",
    options: [
      { key: 'A', text: "Tiểu thuyết chương hồi dài tập" },
      { key: 'B', text: "Truyện ngụ ngôn thần thoại Hy Lạp" },
      { key: 'C', text: "Hệ thống các bản anh hùng ca bi kịch" },
      { key: 'D', text: "Kịch và thơ ca trữ tình nổi tiếng" }
    ],
    correctAnswer: 'D',
    explanation: "Bên cạnh các trường ca sử thi đồ sộ, văn học Ấn Độ thời cổ đại rực rỡ với dòng thơ ca trữ tình và nghệ thuật kịch sân khấu bằng chữ Phạn. Các vở kịch giàu thi cảm, tinh tế và thấm đẫm mỹ học Rasa (cảm xúc thẩm mỹ) là đỉnh cao nghệ thuật của thời kỳ này.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Văn học nghệ thuật"
  },
  {
    id: 9,
    questionNumberLabel: "câu 9:",
    question: "Những công trình kiến trúc đá nổi tiếng được khoét sâu vào vách núi ở Ấn Độ cổ đại chủ yếu phục vụ mục đích gì?",
    options: [
      { key: 'A', text: "Làm pháo đài phòng thủ quân sự" },
      { key: 'B', text: "Làm cung điện cho nhà vua ở" },
      { key: 'C', text: "Làm kho chứa lương thực quốc gia" },
      { key: 'D', text: "Làm nơi sinh hoạt tôn giáo" }
    ],
    correctAnswer: 'D',
    explanation: "Các quần thể kiến trúc chùa hang khoét sâu vào vách đá Bazan như Ajanta, Ellora hay Karla được dựng nên làm tịnh xá (vihara) và điện thờ (chaitya), là trung tâm tu học thiền định và sinh hoạt tôn giáo của các tăng ni tín đồ Phật giáo, Hin-đu giáo và Kì-na giáo.",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Kiến trúc hang đá"
  },
  {
    id: 10,
    questionNumberLabel: "câu 10:",
    question: "Bên cạnh hai bộ sử thi nổi tiếng, tên tuổi nhà thơ và nhà soạn kịch vĩ đại nào dưới đây được xem là niềm tự hào của nền văn học Ấn Độ cổ đại?",
    options: [
      { key: 'A', text: "A-sô-ka" },
      { key: 'B', text: "Ka-li-đa-sa" },
      { key: 'C', text: "Gô-tát-ma" },
      { key: 'D', text: "Vê-da" }
    ],
    correctAnswer: 'B',
    explanation: "Ka-li-đa-sa (Kalidasa, thế kỷ IV - V dưới triều đại Gúp-ta) được tôn vinh là đại thi hào và kịch gia vĩ đại nhất của văn học Ấn Độ cổ đại, tương đương như Shakespeare của phương Tây. Kiệt tác bất hủ của ông là vở kịch trữ tình 'Sơ-kun-tơ-la' (Shakuntala).",
    category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
    tag: "Đại thi hào văn học"
  }
];

export const BRAND_INFO = {
  title: "ĐẤU TRƯỜNG TRI THỨC LỊCH SỬ",
  creator: "CREATED BY TRẦN TIẾN THÀNH",
  category: "VĂN MINH ẤN ĐỘ CỔ ĐẠI",
  categorySubtitle: "Huyền thoại lưu vực Sông Ấn & Sông Hằng",
  durationPerQuestion: 20, // 20s as selected in interview
  totalQuestions: 10
};
