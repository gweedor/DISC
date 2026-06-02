// DISC-style assessment questions.
//
// These are intentionally stored here as editable data. To add, remove, or
// reword questions, edit this file. Each question must keep exactly four
// answers, one mapped to each style (D, I, S, C), so scoring stays balanced.
//
// This is a "DISC-style team communication assessment" for internal
// team-building use only. It is not a licensed or clinical DISC instrument.

export type Style = 'D' | 'I' | 'S' | 'C';

export interface Answer {
  text_en: string;
  text_vi: string;
  style: Style;
}

export interface Question {
  id: number;
  topic: string; // short English label, admin-facing only
  question_en: string;
  question_vi: string;
  answers: Answer[]; // exactly 4, one per style
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Starting a project',
    question_en: 'When starting a new project, I usually prefer to:',
    question_vi: 'Khi bắt đầu một dự án mới, tôi thường thích:',
    answers: [
      {
        text_en: 'Make a quick decision and start moving.',
        text_vi: 'Đưa ra quyết định nhanh và bắt đầu làm ngay.',
        style: 'D',
      },
      {
        text_en: 'Talk with the team and create energy around the work.',
        text_vi: 'Trao đổi với đội nhóm và tạo năng lượng cho công việc.',
        style: 'I',
      },
      {
        text_en: 'Make sure everyone understands the plan and feels supported.',
        text_vi: 'Đảm bảo mọi người hiểu kế hoạch và cảm thấy được hỗ trợ.',
        style: 'S',
      },
      {
        text_en: 'Review the details and make sure the plan is correct.',
        text_vi: 'Xem kỹ chi tiết và đảm bảo kế hoạch chính xác.',
        style: 'C',
      },
    ],
  },
  {
    id: 2,
    topic: 'Making decisions',
    question_en: 'When I need to make an important decision, I tend to:',
    question_vi: 'Khi cần đưa ra một quyết định quan trọng, tôi có xu hướng:',
    answers: [
      {
        text_en: 'Decide quickly and take responsibility for the outcome.',
        text_vi: 'Quyết định nhanh và chịu trách nhiệm về kết quả.',
        style: 'D',
      },
      {
        text_en: 'Gather all the facts and analyse them carefully first.',
        text_vi: 'Thu thập đầy đủ thông tin và phân tích kỹ trước đã.',
        style: 'C',
      },
      {
        text_en: 'Ask others for their opinions and talk it through.',
        text_vi: 'Hỏi ý kiến mọi người và cùng nhau trao đổi.',
        style: 'I',
      },
      {
        text_en: 'Take time so the decision feels right for everyone.',
        text_vi: 'Dành thời gian để quyết định phù hợp với tất cả mọi người.',
        style: 'S',
      },
    ],
  },
  {
    id: 3,
    topic: 'Handling pressure',
    question_en: 'When I am under pressure, I usually:',
    question_vi: 'Khi chịu áp lực, tôi thường:',
    answers: [
      {
        text_en: 'Take charge and push hard to fix the situation.',
        text_vi: 'Đứng ra nhận trách nhiệm và quyết liệt xử lý tình huống.',
        style: 'D',
      },
      {
        text_en: 'Stay calm and keep the team steady.',
        text_vi: 'Giữ bình tĩnh và giúp cả nhóm ổn định.',
        style: 'S',
      },
      {
        text_en: 'Talk it out and try to keep morale up.',
        text_vi: 'Chia sẻ ra ngoài và cố gắng giữ tinh thần cho mọi người.',
        style: 'I',
      },
      {
        text_en: 'Slow down and double-check everything carefully.',
        text_vi: 'Chậm lại và kiểm tra kỹ lại mọi thứ.',
        style: 'C',
      },
    ],
  },
  {
    id: 4,
    topic: 'Handling deadlines',
    question_en: 'When a deadline is close, I am most likely to:',
    question_vi: 'Khi gần đến hạn chót, tôi có nhiều khả năng sẽ:',
    answers: [
      {
        text_en: 'Push everyone to focus and get it done fast.',
        text_vi: 'Thúc đẩy mọi người tập trung và hoàn thành thật nhanh.',
        style: 'D',
      },
      {
        text_en: 'Rally the team and keep the mood positive.',
        text_vi: 'Khích lệ cả nhóm và giữ không khí tích cực.',
        style: 'I',
      },
      {
        text_en: 'Help wherever I am needed and keep things calm.',
        text_vi: 'Hỗ trợ ở bất cứ đâu cần và giữ mọi thứ êm ả.',
        style: 'S',
      },
      {
        text_en: 'Protect quality and make sure nothing is missed.',
        text_vi: 'Bảo đảm chất lượng và chắc chắn không bỏ sót điều gì.',
        style: 'C',
      },
    ],
  },
  {
    id: 5,
    topic: 'Giving feedback',
    question_en: 'When I give feedback to a colleague, I usually:',
    question_vi: 'Khi góp ý cho đồng nghiệp, tôi thường:',
    answers: [
      {
        text_en: 'Get straight to the point about what needs to change.',
        text_vi: 'Nói thẳng vào vấn đề cần thay đổi.',
        style: 'D',
      },
      {
        text_en: 'Keep it warm and encouraging so they stay motivated.',
        text_vi: 'Nói nhẹ nhàng, khích lệ để họ giữ động lực.',
        style: 'I',
      },
      {
        text_en: 'Be gentle and careful about their feelings.',
        text_vi: 'Nói tế nhị và để ý đến cảm xúc của họ.',
        style: 'S',
      },
      {
        text_en: 'Use specific examples and facts to explain.',
        text_vi: 'Dùng ví dụ và dữ kiện cụ thể để giải thích.',
        style: 'C',
      },
    ],
  },
  {
    id: 6,
    topic: 'Receiving feedback',
    question_en: 'When someone gives me feedback, I tend to:',
    question_vi: 'Khi có người góp ý cho tôi, tôi có xu hướng:',
    answers: [
      {
        text_en: 'Want it direct and quick so I can act on it.',
        text_vi: 'Muốn nghe thẳng và gọn để tôi xử lý ngay.',
        style: 'D',
      },
      {
        text_en: 'Appreciate it most when it is delivered in a friendly way.',
        text_vi: 'Cảm thấy dễ tiếp nhận nhất khi được nói một cách thân thiện.',
        style: 'I',
      },
      {
        text_en: 'Take it quietly and think about it for a while.',
        text_vi: 'Lắng nghe trong im lặng và suy nghĩ về nó một thời gian.',
        style: 'S',
      },
      {
        text_en: 'Want the details and reasons so I understand fully.',
        text_vi: 'Muốn biết chi tiết và lý do để hiểu thật rõ.',
        style: 'C',
      },
    ],
  },
  {
    id: 7,
    topic: 'Solving problems',
    question_en: 'When the team hits a problem, my first instinct is to:',
    question_vi: 'Khi cả nhóm gặp một vấn đề, phản xạ đầu tiên của tôi là:',
    answers: [
      {
        text_en: 'Decide on a fix and drive it forward.',
        text_vi: 'Chọn ra một cách giải quyết và đẩy nó tiến tới.',
        style: 'D',
      },
      {
        text_en: 'Get people talking and brainstorm ideas together.',
        text_vi: 'Khơi gợi mọi người cùng nói chuyện và nghĩ ý tưởng.',
        style: 'I',
      },
      {
        text_en: 'Make sure no one is overwhelmed and we move together.',
        text_vi: 'Bảo đảm không ai bị quá tải và cả nhóm cùng tiến.',
        style: 'S',
      },
      {
        text_en: 'Study the root cause before choosing a solution.',
        text_vi: 'Tìm hiểu nguyên nhân gốc rễ trước khi chọn giải pháp.',
        style: 'C',
      },
    ],
  },
  {
    id: 8,
    topic: 'Unclear instructions',
    question_en: 'When instructions are unclear, I usually:',
    question_vi: 'Khi hướng dẫn không rõ ràng, tôi thường:',
    answers: [
      {
        text_en: 'Just decide how to proceed and start.',
        text_vi: 'Tự quyết định cách làm và bắt đầu luôn.',
        style: 'D',
      },
      {
        text_en: 'Ask around and chat with people to figure it out.',
        text_vi: 'Hỏi xung quanh và trò chuyện với mọi người để hiểu.',
        style: 'I',
      },
      {
        text_en: 'Wait, observe, and ask quietly when the moment is right.',
        text_vi: 'Chờ đợi, quan sát và hỏi nhẹ nhàng vào lúc thích hợp.',
        style: 'S',
      },
      {
        text_en: 'Ask precise questions until everything is clear.',
        text_vi: 'Đặt câu hỏi cụ thể cho đến khi mọi thứ rõ ràng.',
        style: 'C',
      },
    ],
  },
  {
    id: 9,
    topic: 'Working with conflict',
    question_en: 'When there is conflict in the team, I tend to:',
    question_vi: 'Khi trong nhóm có mâu thuẫn, tôi có xu hướng:',
    answers: [
      {
        text_en: 'Address it head-on and push for a resolution.',
        text_vi: 'Đối diện trực tiếp và thúc đẩy giải quyết dứt điểm.',
        style: 'D',
      },
      {
        text_en: 'Lighten the mood and help people reconnect.',
        text_vi: 'Làm dịu không khí và giúp mọi người gắn kết lại.',
        style: 'I',
      },
      {
        text_en: 'Try to keep the peace and avoid escalation.',
        text_vi: 'Cố gắng giữ hoà khí và tránh để căng thẳng leo thang.',
        style: 'S',
      },
      {
        text_en: 'Step back, look at the facts, and stay objective.',
        text_vi: 'Lùi lại, nhìn vào sự thật và giữ sự khách quan.',
        style: 'C',
      },
    ],
  },
  {
    id: 10,
    topic: 'Leading a team',
    question_en: 'When I lead a team, I focus most on:',
    question_vi: 'Khi dẫn dắt một nhóm, tôi tập trung nhất vào:',
    answers: [
      {
        text_en: 'Setting direction and getting results.',
        text_vi: 'Định hướng và đạt được kết quả.',
        style: 'D',
      },
      {
        text_en: 'Inspiring people and building enthusiasm.',
        text_vi: 'Truyền cảm hứng và tạo sự hào hứng cho mọi người.',
        style: 'I',
      },
      {
        text_en: 'Creating trust and keeping the team together.',
        text_vi: 'Xây dựng niềm tin và giữ cho nhóm gắn bó.',
        style: 'S',
      },
      {
        text_en: 'Setting clear standards and doing things properly.',
        text_vi: 'Đặt ra tiêu chuẩn rõ ràng và làm mọi việc bài bản.',
        style: 'C',
      },
    ],
  },
  {
    id: 11,
    topic: 'Supporting others',
    question_en: 'When a teammate is struggling, I usually:',
    question_vi: 'Khi một đồng đội đang gặp khó khăn, tôi thường:',
    answers: [
      {
        text_en: 'Tell them clearly what to do to get back on track.',
        text_vi: 'Nói rõ cho họ biết cần làm gì để trở lại đúng hướng.',
        style: 'D',
      },
      {
        text_en: 'Cheer them up and remind them of their strengths.',
        text_vi: 'Động viên họ và nhắc họ nhớ về điểm mạnh của mình.',
        style: 'I',
      },
      {
        text_en: 'Listen patiently and offer steady support.',
        text_vi: 'Kiên nhẫn lắng nghe và hỗ trợ một cách bền bỉ.',
        style: 'S',
      },
      {
        text_en: 'Help them analyse the problem and find the cause.',
        text_vi: 'Giúp họ phân tích vấn đề và tìm ra nguyên nhân.',
        style: 'C',
      },
    ],
  },
  {
    id: 12,
    topic: 'Checking quality',
    question_en: 'When checking the quality of work, I:',
    question_vi: 'Khi kiểm tra chất lượng công việc, tôi:',
    answers: [
      {
        text_en: 'Check that it delivers the result, then move on.',
        text_vi: 'Kiểm tra xem nó có ra kết quả không, rồi đi tiếp.',
        style: 'D',
      },
      {
        text_en: 'Trust the team and focus on the big picture.',
        text_vi: 'Tin tưởng cả nhóm và tập trung vào bức tranh tổng thể.',
        style: 'I',
      },
      {
        text_en: 'Make sure it works for everyone and nothing was rushed.',
        text_vi: 'Bảo đảm nó ổn cho tất cả và không có gì bị làm vội.',
        style: 'S',
      },
      {
        text_en: 'Inspect every detail carefully against the standard.',
        text_vi: 'Soi kỹ từng chi tiết theo đúng tiêu chuẩn.',
        style: 'C',
      },
    ],
  },
  {
    id: 13,
    topic: 'Asking questions',
    question_en: 'In meetings, I am the kind of person who:',
    question_vi: 'Trong các cuộc họp, tôi là kiểu người:',
    answers: [
      {
        text_en: 'Pushes the group to reach a decision.',
        text_vi: 'Thúc đẩy cả nhóm đi đến một quyết định.',
        style: 'D',
      },
      {
        text_en: 'Talks a lot and keeps the conversation lively.',
        text_vi: 'Nói nhiều và giữ cho cuộc trò chuyện sôi nổi.',
        style: 'I',
      },
      {
        text_en: 'Listens more than I talk and supports others.',
        text_vi: 'Lắng nghe nhiều hơn là nói và ủng hộ người khác.',
        style: 'S',
      },
      {
        text_en: 'Asks careful questions to make sure we are right.',
        text_vi: 'Đặt câu hỏi kỹ lưỡng để chắc chắn chúng tôi làm đúng.',
        style: 'C',
      },
    ],
  },
  {
    id: 14,
    topic: 'Dealing with change',
    question_en: 'When plans change suddenly, I usually:',
    question_vi: 'Khi kế hoạch thay đổi đột ngột, tôi thường:',
    answers: [
      {
        text_en: 'Adapt fast and push forward with the new plan.',
        text_vi: 'Thích nghi nhanh và tiến tới với kế hoạch mới.',
        style: 'D',
      },
      {
        text_en: 'See it as exciting and help others get on board.',
        text_vi: 'Xem đó là điều thú vị và giúp mọi người hoà nhịp.',
        style: 'I',
      },
      {
        text_en: 'Prefer some time to adjust before changing.',
        text_vi: 'Cần một chút thời gian để thích ứng trước khi thay đổi.',
        style: 'S',
      },
      {
        text_en: 'Want to understand why before I accept the change.',
        text_vi: 'Muốn hiểu lý do trước khi chấp nhận sự thay đổi.',
        style: 'C',
      },
    ],
  },
  {
    id: 15,
    topic: 'Communicating with clients',
    question_en: 'When dealing with a client or customer, I focus on:',
    question_vi: 'Khi làm việc với khách hàng, tôi tập trung vào:',
    answers: [
      {
        text_en: 'Getting to results and solving their problem fast.',
        text_vi: 'Đạt kết quả và giải quyết vấn đề của họ thật nhanh.',
        style: 'D',
      },
      {
        text_en: 'Building a warm relationship and good rapport.',
        text_vi: 'Xây dựng mối quan hệ ấm áp và sự thiện cảm.',
        style: 'I',
      },
      {
        text_en: 'Being dependable and making them feel looked after.',
        text_vi: 'Đáng tin cậy và làm cho họ cảm thấy được quan tâm.',
        style: 'S',
      },
      {
        text_en: 'Being accurate and giving them correct information.',
        text_vi: 'Chính xác và cung cấp cho họ thông tin đúng đắn.',
        style: 'C',
      },
    ],
  },
  {
    id: 16,
    topic: 'Documenting work',
    question_en: 'When it comes to writing things down and documenting, I:',
    question_vi: 'Khi nói đến việc ghi chép và lập tài liệu, tôi:',
    answers: [
      {
        text_en: 'Keep it short — I would rather act than document.',
        text_vi: 'Ghi ngắn gọn — tôi thích hành động hơn là viết tài liệu.',
        style: 'D',
      },
      {
        text_en: 'Prefer talking it through over writing it down.',
        text_vi: 'Thích trao đổi miệng hơn là viết ra giấy.',
        style: 'I',
      },
      {
        text_en: 'Write enough so the team is comfortable and aligned.',
        text_vi: 'Ghi đủ để cả nhóm thấy thoải mái và thống nhất.',
        style: 'S',
      },
      {
        text_en: 'Document thoroughly so nothing is lost or unclear.',
        text_vi: 'Ghi chép đầy đủ để không có gì bị mất hay mập mờ.',
        style: 'C',
      },
    ],
  },
  {
    id: 17,
    topic: 'Training others',
    question_en: 'When I train or onboard someone new, I:',
    question_vi: 'Khi đào tạo hoặc hướng dẫn người mới, tôi:',
    answers: [
      {
        text_en: 'Show them the goal and let them figure out the rest.',
        text_vi: 'Cho họ thấy mục tiêu và để họ tự tìm ra phần còn lại.',
        style: 'D',
      },
      {
        text_en: 'Make it fun and keep them encouraged.',
        text_vi: 'Làm cho việc học vui vẻ và luôn khích lệ họ.',
        style: 'I',
      },
      {
        text_en: 'Go at their pace and check in often.',
        text_vi: 'Đi theo nhịp của họ và thường xuyên hỏi thăm.',
        style: 'S',
      },
      {
        text_en: 'Walk them through each step in the correct order.',
        text_vi: 'Hướng dẫn họ từng bước theo đúng trình tự.',
        style: 'C',
      },
    ],
  },
  {
    id: 18,
    topic: 'Working with mistakes',
    question_en: 'When a mistake happens, I tend to:',
    question_vi: 'Khi xảy ra sai sót, tôi có xu hướng:',
    answers: [
      {
        text_en: 'Fix it quickly and keep things moving.',
        text_vi: 'Sửa nhanh và giữ cho công việc tiếp tục.',
        style: 'D',
      },
      {
        text_en: 'Keep spirits up so no one feels too bad.',
        text_vi: 'Giữ tinh thần mọi người để không ai cảm thấy quá tệ.',
        style: 'I',
      },
      {
        text_en: 'Stay supportive and avoid blaming anyone.',
        text_vi: 'Giữ thái độ hỗ trợ và tránh đổ lỗi cho ai.',
        style: 'S',
      },
      {
        text_en: 'Find out exactly what went wrong to prevent it again.',
        text_vi: 'Tìm chính xác điều gì đã sai để ngăn nó lặp lại.',
        style: 'C',
      },
    ],
  },
  {
    id: 19,
    topic: 'Planning a project',
    question_en: 'When planning how to do the work, I prefer to:',
    question_vi: 'Khi lên kế hoạch cách thực hiện công việc, tôi thích:',
    answers: [
      {
        text_en: 'Set the goal, keep it simple, and start.',
        text_vi: 'Đặt mục tiêu, giữ đơn giản và bắt tay vào làm.',
        style: 'D',
      },
      {
        text_en: 'Picture the vision and get people excited about it.',
        text_vi: 'Hình dung tầm nhìn và khiến mọi người hào hứng với nó.',
        style: 'I',
      },
      {
        text_en: 'Build a steady, realistic plan everyone can follow.',
        text_vi: 'Xây dựng kế hoạch ổn định, thực tế mà ai cũng theo được.',
        style: 'S',
      },
      {
        text_en: 'Map out every step and prepare for what could go wrong.',
        text_vi: 'Vạch ra từng bước và chuẩn bị cho những gì có thể sai.',
        style: 'C',
      },
    ],
  },
  {
    id: 20,
    topic: 'Deciding with limited information',
    question_en: 'When I have to act with limited information, I:',
    question_vi: 'Khi phải hành động với ít thông tin, tôi:',
    answers: [
      {
        text_en: 'Trust my judgement and move forward anyway.',
        text_vi: 'Tin vào phán đoán của mình và vẫn cứ tiến tới.',
        style: 'D',
      },
      {
        text_en: 'Talk to people quickly to fill in the gaps.',
        text_vi: 'Nhanh chóng hỏi mọi người để lấp khoảng trống.',
        style: 'I',
      },
      {
        text_en: 'Prefer to wait until things feel more certain.',
        text_vi: 'Thích chờ cho đến khi mọi việc chắc chắn hơn.',
        style: 'S',
      },
      {
        text_en: 'Feel uneasy and want more data before acting.',
        text_vi: 'Cảm thấy không yên tâm và muốn thêm dữ liệu trước khi làm.',
        style: 'C',
      },
    ],
  },
  {
    id: 21,
    topic: 'Energy and motivation',
    question_en: 'I feel most motivated at work when I can:',
    question_vi: 'Tôi cảm thấy có động lực nhất khi tôi được:',
    answers: [
      {
        text_en: 'Win, achieve goals, and see clear progress.',
        text_vi: 'Chiến thắng, đạt mục tiêu và thấy tiến triển rõ ràng.',
        style: 'D',
      },
      {
        text_en: 'Work with people and be recognised for it.',
        text_vi: 'Làm việc với mọi người và được ghi nhận.',
        style: 'I',
      },
      {
        text_en: 'Have a stable routine and a supportive team.',
        text_vi: 'Có nhịp làm việc ổn định và một nhóm biết hỗ trợ.',
        style: 'S',
      },
      {
        text_en: 'Do high-quality, accurate work I can be proud of.',
        text_vi: 'Làm ra công việc chất lượng, chính xác mà tôi tự hào.',
        style: 'C',
      },
    ],
  },
  {
    id: 22,
    topic: 'My communication style',
    question_en: 'People would describe my communication style as:',
    question_vi: 'Mọi người sẽ mô tả phong cách giao tiếp của tôi là:',
    answers: [
      {
        text_en: 'Direct and to the point.',
        text_vi: 'Thẳng thắn và đi vào trọng tâm.',
        style: 'D',
      },
      {
        text_en: 'Friendly, expressive, and enthusiastic.',
        text_vi: 'Thân thiện, cởi mở và đầy nhiệt huyết.',
        style: 'I',
      },
      {
        text_en: 'Calm, warm, and a good listener.',
        text_vi: 'Điềm tĩnh, ấm áp và biết lắng nghe.',
        style: 'S',
      },
      {
        text_en: 'Precise, careful, and well thought-out.',
        text_vi: 'Chính xác, cẩn thận và được cân nhắc kỹ.',
        style: 'C',
      },
    ],
  },
  {
    id: 23,
    topic: 'Leading under pressure',
    question_en: 'When the team is stuck and looking to me, I:',
    question_vi: 'Khi cả nhóm bế tắc và trông cậy vào tôi, tôi:',
    answers: [
      {
        text_en: 'Take control and make the call.',
        text_vi: 'Nắm quyền và đưa ra quyết định.',
        style: 'D',
      },
      {
        text_en: 'Lift the energy and get everyone believing again.',
        text_vi: 'Nâng tinh thần và khiến mọi người tin tưởng trở lại.',
        style: 'I',
      },
      {
        text_en: 'Steady everyone and help us regroup calmly.',
        text_vi: 'Giúp mọi người bình tĩnh và tập hợp lại một cách nhẹ nhàng.',
        style: 'S',
      },
      {
        text_en: 'Lay out the options clearly and weigh them.',
        text_vi: 'Trình bày rõ các phương án và cân nhắc chúng.',
        style: 'C',
      },
    ],
  },
  {
    id: 24,
    topic: 'Disagreement',
    question_en: 'When I disagree with a decision, I usually:',
    question_vi: 'Khi tôi không đồng ý với một quyết định, tôi thường:',
    answers: [
      {
        text_en: 'Say so directly and argue my case.',
        text_vi: 'Nói thẳng và bảo vệ quan điểm của mình.',
        style: 'D',
      },
      {
        text_en: 'Express it openly but try to keep it positive.',
        text_vi: 'Bày tỏ một cách cởi mở nhưng cố giữ sự tích cực.',
        style: 'I',
      },
      {
        text_en: 'Go along with it to keep harmony, even if unsure.',
        text_vi: 'Làm theo để giữ hoà khí, dù trong lòng còn băn khoăn.',
        style: 'S',
      },
      {
        text_en: 'Quietly gather evidence before raising it.',
        text_vi: 'Lặng lẽ thu thập bằng chứng trước khi lên tiếng.',
        style: 'C',
      },
    ],
  },
  {
    id: 25,
    topic: 'Pace of work',
    question_en: 'The pace I am most comfortable working at is:',
    question_vi: 'Nhịp làm việc mà tôi thấy thoải mái nhất là:',
    answers: [
      {
        text_en: 'Fast — I like momentum and quick wins.',
        text_vi: 'Nhanh — tôi thích sự dồn dập và những thắng lợi nhanh.',
        style: 'D',
      },
      {
        text_en: 'Lively and varied — I like a bit of everything.',
        text_vi: 'Sôi động và đa dạng — tôi thích mỗi thứ một chút.',
        style: 'I',
      },
      {
        text_en: 'Steady and consistent — I like a predictable rhythm.',
        text_vi: 'Đều đặn và ổn định — tôi thích một nhịp điệu dễ đoán.',
        style: 'S',
      },
      {
        text_en: 'Measured and careful — I like time to do it right.',
        text_vi: 'Chậm rãi và cẩn thận — tôi thích có thời gian để làm cho đúng.',
        style: 'C',
      },
    ],
  },
  {
    id: 26,
    topic: 'Recognition and reward',
    question_en: 'The kind of recognition that means the most to me is:',
    question_vi: 'Kiểu ghi nhận có ý nghĩa nhất với tôi là:',
    answers: [
      {
        text_en: 'Being trusted with bigger responsibility.',
        text_vi: 'Được tin tưởng giao trách nhiệm lớn hơn.',
        style: 'D',
      },
      {
        text_en: 'Public praise and appreciation from the team.',
        text_vi: 'Lời khen công khai và sự trân trọng từ cả nhóm.',
        style: 'I',
      },
      {
        text_en: 'A quiet, sincere thank-you.',
        text_vi: 'Một lời cảm ơn chân thành, nhẹ nhàng.',
        style: 'S',
      },
      {
        text_en: 'Acknowledgement that my work was accurate and high-quality.',
        text_vi: 'Sự công nhận rằng công việc của tôi chính xác và chất lượng.',
        style: 'C',
      },
    ],
  },
  {
    id: 27,
    topic: 'Working in a group',
    question_en: 'In a group task, the role I naturally fall into is:',
    question_vi: 'Trong một nhiệm vụ nhóm, vai trò tôi tự nhiên đảm nhận là:',
    answers: [
      {
        text_en: 'The driver who keeps us moving toward the goal.',
        text_vi: 'Người dẫn dắt, giữ cho cả nhóm tiến về mục tiêu.',
        style: 'D',
      },
      {
        text_en: 'The connector who keeps everyone talking and engaged.',
        text_vi: 'Người kết nối, giữ cho mọi người trò chuyện và gắn kết.',
        style: 'I',
      },
      {
        text_en: 'The supporter who makes sure no one is left behind.',
        text_vi: 'Người hỗ trợ, bảo đảm không ai bị bỏ lại phía sau.',
        style: 'S',
      },
      {
        text_en: 'The checker who makes sure we get it right.',
        text_vi: 'Người kiểm tra, bảo đảm chúng tôi làm đúng.',
        style: 'C',
      },
    ],
  },
  {
    id: 28,
    topic: 'What frustrates me',
    question_en: 'At work, I get most frustrated by:',
    question_vi: 'Trong công việc, điều khiến tôi khó chịu nhất là:',
    answers: [
      {
        text_en: 'Slowness, indecision, and too much talking.',
        text_vi: 'Sự chậm chạp, do dự và nói quá nhiều.',
        style: 'D',
      },
      {
        text_en: 'Cold, rigid environments with no energy.',
        text_vi: 'Môi trường lạnh lùng, cứng nhắc và thiếu năng lượng.',
        style: 'I',
      },
      {
        text_en: 'Sudden change, pressure, and conflict.',
        text_vi: 'Thay đổi đột ngột, áp lực và xung đột.',
        style: 'S',
      },
      {
        text_en: 'Sloppiness, missing details, and unclear rules.',
        text_vi: 'Sự cẩu thả, thiếu chi tiết và quy tắc không rõ ràng.',
        style: 'C',
      },
    ],
  },
];

export const STYLE_ORDER: Style[] = ['D', 'I', 'S', 'C'];
