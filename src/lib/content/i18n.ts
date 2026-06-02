import type { Lang } from './styles';

// UI strings for the employee-facing pages, in English and Vietnamese.
// Admin pages are English-only (desktop, internal) per the brief.

export type UIKey = keyof typeof STRINGS.en;

export const STRINGS = {
  en: {
    appName: 'Team Communication Assessment',
    eventName: 'Vietnam Team-Building Event',

    // Landing
    landingTitle: 'Team Communication Assessment',
    landingSubtitle:
      'A short, friendly questionnaire to help our team understand how we communicate, lead, solve problems, and support each other.',
    landingStart: 'Start the assessment',
    landingTime: 'Takes about 5–10 minutes • 28 questions',
    chooseLanguage: 'Choose your language',

    // Privacy / instructions
    privacyTitle: 'Before you begin',
    privacyNote:
      'Your answers will be used only for the team-building event and internal team communication development. This is not a performance review, HR evaluation, or psychological test.',
    notLabelNote:
      'This is not a label. It is a tool to help us understand how we communicate, lead, solve problems, and support each other.',
    howItWorksTitle: 'How it works',
    howItWorks1: 'You will answer 28 quick questions about how you tend to work.',
    howItWorks2:
      'For each question, choose the option that is MOST like you, and (optionally) the one that is LEAST like you.',
    howItWorks3:
      'There are no right or wrong answers. Just pick what feels most natural.',
    howItWorks4:
      'You will not see your result right away. Results are shared during the event.',
    disclaimerOfficial:
      'Note: this is a "DISC-style" team communication tool for internal team-building. It is not an official or licensed DISC assessment, and is not intended for clinical use.',
    iUnderstand: 'I understand — continue',

    // Form fields
    yourDetails: 'Your details',
    fullName: 'Full name',
    department: 'Department or team',
    role: 'Role / title',
    email: 'Email (optional)',
    language: 'Preferred language',
    english: 'English',
    vietnamese: 'Tiếng Việt',
    required: 'required',
    optional: 'optional',

    // Questions
    questionsTitle: 'The questions',
    mostLikeMe: 'MOST like me',
    leastLikeMe: 'LEAST like me (optional)',
    questionProgress: 'Question {n} of {total}',
    pickMost: 'Pick the one statement that is most like you.',
    pickLeastOptional:
      'Optionally, pick the one that is least like you. This helps fairness but is not required.',

    // Validation
    errNameRequired: 'Please enter your full name.',
    errDeptRequired: 'Please enter your department or team.',
    errRoleRequired: 'Please enter your role or title.',
    errAnswersIncomplete:
      'Please choose a "most like me" answer for every question.',
    errMostLeastSame:
      'Your "most" and "least" answers for a question cannot be the same.',
    errSubmit: 'Something went wrong submitting your answers. Please try again.',

    submit: 'Submit my assessment',
    submitting: 'Submitting…',
    back: 'Back',

    // Completion
    completeTitle: 'Thank you!',
    completeMessage:
      'Your assessment has been completed. Your results will be shared during the team-building event.',
    completeSub:
      'You can close this page now. See you at the event!',

    privacyLink: 'Privacy note',
  },
  vi: {
    appName: 'Bài Đánh Giá Phong Cách Giao Tiếp Nhóm',
    eventName: 'Sự Kiện Team-Building Đội Ngũ Việt Nam',

    landingTitle: 'Bài Đánh Giá Phong Cách Giao Tiếp Nhóm',
    landingSubtitle:
      'Một bảng câu hỏi ngắn gọn, thân thiện giúp đội ngũ hiểu rõ hơn về cách chúng ta giao tiếp, dẫn dắt, giải quyết vấn đề và hỗ trợ lẫn nhau.',
    landingStart: 'Bắt đầu làm bài',
    landingTime: 'Khoảng 5–10 phút • 28 câu hỏi',
    chooseLanguage: 'Chọn ngôn ngữ của bạn',

    privacyTitle: 'Trước khi bắt đầu',
    privacyNote:
      'Câu trả lời của bạn chỉ được dùng cho sự kiện team-building và để phát triển giao tiếp nội bộ trong nhóm. Đây không phải là đánh giá hiệu suất, đánh giá nhân sự hay bài kiểm tra tâm lý.',
    notLabelNote:
      'Đây không phải là một cái nhãn. Đây là một công cụ giúp chúng ta hiểu cách mình giao tiếp, dẫn dắt, giải quyết vấn đề và hỗ trợ lẫn nhau.',
    howItWorksTitle: 'Cách thực hiện',
    howItWorks1: 'Bạn sẽ trả lời 28 câu hỏi nhanh về cách bạn thường làm việc.',
    howItWorks2:
      'Với mỗi câu, hãy chọn phương án GIỐNG bạn nhất, và (tuỳ chọn) phương án ÍT GIỐNG bạn nhất.',
    howItWorks3:
      'Không có câu trả lời đúng hay sai. Chỉ cần chọn điều cảm thấy tự nhiên nhất.',
    howItWorks4:
      'Bạn sẽ không thấy kết quả ngay. Kết quả sẽ được chia sẻ trong sự kiện.',
    disclaimerOfficial:
      'Lưu ý: đây là công cụ giao tiếp nhóm theo "phong cách DISC" dành cho team-building nội bộ. Đây không phải là bài đánh giá DISC chính thức hay có bản quyền, và không dùng cho mục đích lâm sàng.',
    iUnderstand: 'Tôi đã hiểu — tiếp tục',

    yourDetails: 'Thông tin của bạn',
    fullName: 'Họ và tên',
    department: 'Phòng ban hoặc nhóm',
    role: 'Vị trí / chức danh',
    email: 'Email (không bắt buộc)',
    language: 'Ngôn ngữ ưa thích',
    english: 'English',
    vietnamese: 'Tiếng Việt',
    required: 'bắt buộc',
    optional: 'không bắt buộc',

    questionsTitle: 'Các câu hỏi',
    mostLikeMe: 'GIỐNG tôi nhất',
    leastLikeMe: 'ÍT GIỐNG tôi nhất (tuỳ chọn)',
    questionProgress: 'Câu {n} trên {total}',
    pickMost: 'Chọn một phát biểu giống bạn nhất.',
    pickLeastOptional:
      'Tuỳ chọn, hãy chọn phát biểu ít giống bạn nhất. Điều này giúp kết quả công bằng hơn nhưng không bắt buộc.',

    errNameRequired: 'Vui lòng nhập họ và tên của bạn.',
    errDeptRequired: 'Vui lòng nhập phòng ban hoặc nhóm của bạn.',
    errRoleRequired: 'Vui lòng nhập vị trí hoặc chức danh của bạn.',
    errAnswersIncomplete:
      'Vui lòng chọn câu trả lời "giống tôi nhất" cho mỗi câu hỏi.',
    errMostLeastSame:
      'Phương án "giống nhất" và "ít giống nhất" của một câu không thể trùng nhau.',
    errSubmit: 'Đã có lỗi khi gửi câu trả lời. Vui lòng thử lại.',

    submit: 'Gửi bài đánh giá',
    submitting: 'Đang gửi…',
    back: 'Quay lại',

    completeTitle: 'Cảm ơn bạn!',
    completeMessage:
      'Bạn đã hoàn thành bài đánh giá. Kết quả của bạn sẽ được chia sẻ trong sự kiện team-building.',
    completeSub:
      'Bạn có thể đóng trang này. Hẹn gặp bạn tại sự kiện!',

    privacyLink: 'Ghi chú quyền riêng tư',
  },
} as const;

export function t(lang: Lang, key: UIKey, vars?: Record<string, string | number>): string {
  let s: string = (STRINGS[lang] as Record<string, string>)[key] ?? (STRINGS.en as Record<string, string>)[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return s;
}
