# ĐẤU TRƯỜNG TRI THỨC LỊCH SỬ – CREATED BY TRẦN TIẾN THÀNH

Một nền tảng thi đấu và kiểm tra kiến thức lịch sử cao cấp mang phong cách gameshow truyền hình quốc tế, tích hợp hiệu ứng điện ảnh 3D Three.js, âm thanh cinematic hào hùng và bộ câu hỏi chuẩn xác về **Văn Minh Ấn Độ Cổ Đại**.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Các quyết định đã thống nhất qua phỏng vấn (Phase 1):**
> 1. **Âm thanh & Hiệu ứng**: Tích hợp hệ thống âm thanh Web Audio API cinematic sống động (tiếng trống cổ dồn dập, chiêng vàng, hiệu ứng trả lời đúng/sai, nhạc đếm ngược) kèm nút bật/tắt âm thanh (Mute/Unmute) trên thanh điều khiển.
> 2. **Thời gian làm bài**: 20 giây mỗi câu hỏi cho chế độ Đấu trường nhằm tối đa hóa sự kịch tính và hồi hộp; có tùy chọn xáo trộn đề (Shuffle) và tạm dừng.
> 3. **Chế độ trình chiếu giáo viên (Presentation Mode)**: Tối ưu cho màn chiếu lớp học với giao diện chữ lớn siêu nét, lưới chọn nhanh câu hỏi (1-10), và nút chủ động ẩn/hiện đáp án cùng lời giải chi tiết cho giáo viên.

---

## 1. Overview & Core Concept

- **Mục tiêu sản phẩm**: Biến bài kiểm tra lịch sử truyền thống thành một đấu trường tri thức điện ảnh đẳng cấp, đưa người học và giáo viên bước vào một không gian đậm chất huyền sử Ấn Độ cổ đại với Mandala vàng kim 3D, bụi sao lấp lánh và ký tự Phạn ngữ (Sanskrit).
- **Đối tượng sử dụng**: Học sinh, sinh viên, giáo viên lịch sử và người đam mê tìm hiểu văn minh nhân loại; phục vụ cả tự học, thi đua trên lớp và trình chiếu máy chiếu trường học.
- **Giá trị cốt lõi**:
  - Tích hợp **chính xác 100%** nội dung 10 câu hỏi và 4 phương án trắc nghiệm chuẩn từ tài liệu của tác giả Trần Tiến Thành.
  - Trải nghiệm thị giác & thính giác đa giác quan với Three.js WebGL, Framer Motion và Web Audio.
  - Chuyển đổi linh hoạt giữa **Chế độ Đấu Trường (Quiz Mode)** và **Chế độ Giảng Dạy Trình Chiếu (Teacher Presentation Mode)**.

---

## 2. User Experience & Visual Design

### A. Kịch Bản Trailer Điện Ảnh (Cinematic 3D Intro)
1. **Khởi đầu (0.0s - 1.5s)**: Không gian tối tuyệt đối. Âm trầm huyền bí vang lên.
2. **Khai sáng (1.5s - 3.0s)**: Luồng sáng vàng kim chói lọi bùng nổ từ trung tâm, hàng nghìn hạt bụi vàng 3D tỏa ra xoáy tròn.
3. **Bản đồ cổ & Kỳ quan (3.0s - 5.5s)**: Bản đồ sông Ấn - sông Hằng cùng hình bóng kỳ quan đền tháp và Tháp Phật Stupa hiện ra với hiệu ứng camera zoom chậm.
4. **Mandala linh thiêng (5.5s - 7.5s)**: Vòng tròn Mandala vàng kim 3D xoay chậm, phát quang đa tầng kết hợp các ký tự chữ Phạn cổ bay lơ lửng.
5. **Đỉnh điểm (7.5s - 9.5s)**: Tiếng trống trận cổ dồn dập, logo kim loại vàng nổi 3D **"ĐẤU TRƯỜNG TRI THỨC LỊCH SỬ"** xuất hiện uy nghi.
6. **Lời đề tặng tác quyền**: Dòng chữ vàng sang trọng **"CREATED BY TRẦN TIẾN THÀNH"** bừng sáng.
*(Người dùng có thể bấm "Bỏ qua Intro" bất kỳ lúc nào hoặc xem lại qua nút Replay).*

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TOP BAR CONTRACT (ZONE 1-3)                     │
│  [ĐẤU TRƯỜNG TRI THỨC]  —  [Văn minh Ấn Độ · Chế độ · Luật chơi]  —  [🔊/🔇]│
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                       MAIN ARENA VIEWPORT                              │
│                                                                        │
│   [Three.js 3D Golden Mandala & Particle Canvas Background]           │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  CÂU HỎI 04 / 10          [ ĐỒNG HỒ 20S ⏱️ ]      ĐIỂM: 300     │   │
│   │  Tôn giáo nào ra đời ở Ấn Độ vào khoảng thế kỷ VI TCN do      │   │
│   │  Tất-đạt-đa Cồ-đàm khởi xướng?                                 │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│       ┌───────────────────────┐       ┌───────────────────────┐        │
│       │ A. Đạo Phật           │       │ B. Đạo Hin-đu         │        │
│       │ (3D Tilt Card)        │       │ (3D Tilt Card)        │        │
│       └───────────────────────┘       └───────────────────────┘        │
│       ┌───────────────────────┐       ┌───────────────────────┐        │
│       │ C. Hồi giáo           │       │ D. Đạo Xích-ha        │        │
│       │ (3D Tilt Card)        │       │ (3D Tilt Card)        │        │
│       └───────────────────────┘       └───────────────────────┘        │
│                                                                        │
│   [Thanh tiến trình phát sáng] ──────────────●──────────────          │
└────────────────────────────────────────────────────────────────────────┘
```

### B. Ngôn Ngữ Thị Giác & Bảng Màu
- **Triết lý thiết kế**: Phong cách Huyền Thoại Cổ Đại Hoàng Kim (Ancient Gold & Deep Indigo Slate). Không dùng màu neon rẻ tiền, tuân thủ nguyên tắc 60-30-10:
  - **60% Nền**: Đêm huyền bí Ấn Độ `#080B14` (Deep Night Velvet) hòa quyện ánh sương đêm.
  - **30% Khối cấu trúc**: Phiến đá sa thạch đen, viền vàng kim hairline `rgba(234, 179, 8, 0.25)` và kính mờ mạ vàng (Gold Glassmorphism).
  - **10% Điểm nhấn**: Vàng hoàng gia `#F59E0B` / `#FBBF24`, ngọc lam sông Hằng `#06B6D4` và xanh ngọc bảo vệ `#10B981`.
- **Typography**:
  - Tiêu đề & Logo: Font phong cách sử thi sang trọng (`Cinzel` / `Playfair Display` serif kết hợp `Plus Jakarta Sans`).
  - Nội dung câu hỏi & phương án: `Plus Jakarta Sans` cỡ lớn, độ tương phản chuẩn WCAG AAA, chống mỏi mắt.
- **Hiệu ứng tương tác**:
  - Thẻ phương án 3D Card Tilt phản ứng theo tọa độ chuột.
  - Hiệu ứng Liquid Light Sweep quét qua viền thẻ khi rê chuột.
  - Khi chọn đáp án: hiệu ứng sáng bừng hào quang vàng kim + nổ pháo hoa hạt 3D (nếu đúng) hoặc viền đỏ hổ phách kèm rung nhẹ tinh tế và hiện lời giải (nếu sai).

---

## 3. Key Product Decisions & Architecture

### Quyết định 1: Tích Hợp Chính Xác Bộ 10 Câu Hỏi Văn Minh Ấn Độ
- **Triển khai**: Đưa toàn bộ 10 câu hỏi nguyên văn theo tài liệu gốc vào cơ sở dữ liệu `ancientIndiaQuizData.ts`.
- **Dữ liệu kèm theo**: Mỗi câu có đáp án chuẩn xác (`correctAnswer`), trích dẫn lịch sử và lời giải chi tiết phục vụ nâng cao kiến thức sau khi hoàn thành.
- **Bảo mật đáp án**: Đáp án được kiểm tra logic nội bộ, không hiển thị trong DOM trước khi người chơi bấm chọn.

### Quyết định 2: Hai Chế Độ Hoạt Động Chuyên Nghiệp
- **Chế độ 1 - Đấu Trường Trắc Nghiệm (Arena Quiz)**:
  - Đồng hồ tròn 20s đếm ngược với âm thanh hồi hộp.
  - Tự động chuyển câu khi hết giờ hoặc sau khi trả lời.
  - Tùy chọn xáo trộn ngẫu nhiên thứ tự câu hỏi (Shuffle mode).
  - Bảng tổng kết kết quả với điểm số đếm tăng dần, tỷ lệ chính xác, phân loại danh hiệu dũng sĩ lịch sử và xem lại toàn bộ câu hỏi.
- **Chế độ 2 - Trình Chiếu Giảng Dạy (Teacher Presentation Mode)**:
  - Chế độ toàn màn hình tối ưu máy chiếu / TV lớp học.
  - Ẩn điểm số cá nhân và đồng hồ gấp rút.
  - Chữ lớn rõ nét từ khoảng cách xa 10-15 mét.
  - Thanh công cụ cho giáo viên: Nút "Hiện Đáp Án", Nút "Xem Lời Giải Chi Tiết", Lưới nhảy nhanh đến câu bất kỳ (1-10).

### Quyết định 3: Công Nghệ Đồ Họa 3D & Âm Thanh Web Audio
- **Three.js Scene Canvas**: Mandala vàng hình học thiêng liêng, hệ thống 1.500 hạt ánh sáng vàng 3D trôi trong không gian, chuyển động camera zoom cinematic. Tối ưu 60fps, hỗ trợ tắt hiệu ứng nếu máy cấu hình thấp hoặc bật chế độ giảm chuyển động (`prefers-reduced-motion`).
- **Sound Engine (Web Audio API)**: Tự tạo bằng bộ dao động tần số và tiếng trống tổng hợp (không lo gãy link nhạc mp3 bên ngoài), gồm: trống trận, chiêng đồng khai mạc, chuông vàng mừng chiến thắng, âm báo sai và tiếng tích tắc đồng hồ.

---

## 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│  State: activeMode (intro | quiz | presentation | res) │
│  State: soundEnabled, currentQuestion, userAnswers     │
└───────────┬────────────────────────────────┬───────────┘
            │                                │
    ┌───────▼────────┐               ┌───────▼────────┐
    │ ThreeScene.tsx │               │ AudioEngine.ts │
    │ 3D Mandala &   │               │ Web Audio API  │
    │ Star Particles │               │ Sound Synthesis│
    └────────────────┘               └────────────────┘
            │
    ┌───────┴────────────────────────────────────────┐
    │                                                │
┌───▼────────────┐   ┌────────────────┐   ┌──────────▼─────────┐
│ CinematicIntro │   │ ArenaQuizView  │   │ PresentationView   │
│ 10-step trailer│   │ 3D Tilt Cards  │   │ Teacher classroom  │
│ Title & Author │   │ 20s Timer & HUD│   │ Big font, Controls │
└───┬────────────┘   └───┬────────────┘   └────────────────────┘
    │                    │
    └───────────────┬────┘
                    │
            ┌───────▼────────────┐
            │ ResultsScreen.tsx  │
            │ Golden Confetti    │
            │ Review Answers     │
            │ Detailed Explains  │
            └────────────────────┘
```

---

## 5. Danh Sách Câu Hỏi Chuẩn Văn Minh Ấn Độ Cổ Đại

1. **Câu 1**: Hệ thống chữ viết cổ nào được xem là tiền thân của phần lớn các loại chữ viết hiện nay ở Ấn Độ và Nam Á? -> **D. Chữ Brà-mi**
2. **Câu 2**: Hai bộ sử thi nổi tiếng, vĩ đại và có tầm ảnh hưởng sâu sắc nhất của văn minh Ấn Độ cổ đại là gì? -> **C. Ma-ha-bha-ra-ta và Ra-ma-ya-na**
3. **Câu 3**: Hai bộ sử thi nổi tiếng và vĩ đại nhất của văn minh Ấn Độ thời cổ đại là gì? -> **D. Ma-ha-bha-ra-ta và Ra-ma-ya-na**
4. **Câu 4**: Tôn giáo nào ra đời ở Ấn Độ vào khoảng thế kỷ VI TCN do Tất-đạt-đa Cồ-đàm khởi xướng? -> **A. Đạo Phật**
5. **Câu 5**: Kiến trúc tiêu biểu và độc đáo nhất của Phật giáo Ấn Độ thời cổ đại, thường dùng làm nơi bảo tồn xá lợi của Phật, là công trình nào? -> **D. Tháp Stupa (Tháp Phật)**
6. **Câu 6**: Y học Ấn Độ cổ đại đã đạt được thành tựu xuất sắc nào trong việc chăm sóc sức khỏe con người? -> **D. Biết dùng phẫu thuật để chữa bệnh và luyện các loại dược thảo**
7. **Câu 7**: Nền văn minh Ấn Độ cổ đại được hình thành và phát triển chủ yếu lưu vực của hai con sông lớn nào? -> **C. Sông Ấn và sông Hằng**
8. **Câu 8**: Ngoài hai bộ sử thi lớn, văn học Ấn Độ cổ đại còn đạt thành tựu xuất sắc nào trong các lĩnh vực thơ ca và kịch tác? -> **D. Kịch và thơ ca trữ tình nổi tiếng**
9. **Câu 9**: Những công trình kiến trúc đá nổi tiếng được khoét sâu vào vách núi ở Ấn Độ cổ đại chủ yếu phục vụ mục đích gì? -> **D. Làm nơi sinh hoạt tôn giáo**
10. **Câu 10**: Bên cạnh hai bộ sử thi nổi tiếng, tên tuổi nhà thơ và nhà soạn kịch vĩ đại nào dưới đây được xem là niềm tự hào của nền văn học Ấn Độ cổ đại? -> **B. Ka-li-đa-sa**
