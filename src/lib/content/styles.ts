import type { Style } from './questions';

// All result/handout copy for each DISC style, in English and Vietnamese.
// Tone guidance (from the brief): simple, human, not corporate. No cheesy
// language, no harsh labels, no "this is who you are forever".

export type Lang = 'en' | 'vi';

export interface StyleCopy {
  // Short style label, e.g. "Direct / Decisive"
  label: string;
  // One-word-ish vibe used in headings
  tagline: string;
  // 1–2 sentence summary
  summary: string;
  strengths: string[];
  blindSpots: string[]; // possible blind spots
  underPressure: string;
  needsFromTeammates: string;
  communicateWithThem: string; // how teammates should communicate with them
  leadership: string; // leadership tendency
  problemSolving: string; // problem-solving tendency
  gamesBestRole: string; // best role during team-building games
  gamesWatchOut: string; // watch-out during team-building games
  // Handout-specific, slightly softer phrasing
  whatMayFrustrateYou: string;
  whatOthersMisunderstand: string;
  communicateBetter: string; // how you can communicate better with others
  duringGames: string; // "During team games, you may naturally…"
  growthChallenge: string; // one growth challenge for the event
}

export type StyleContent = Record<Style, Record<Lang, StyleCopy>>;

export const STYLE_LABELS: Record<Style, Record<Lang, string>> = {
  D: { en: 'Direct / Decisive', vi: 'Quyết đoán / Hành động nhanh' },
  I: { en: 'Social / Energising', vi: 'Giao tiếp / Tạo năng lượng' },
  S: { en: 'Steady / Supportive', vi: 'Ổn định / Hỗ trợ' },
  C: { en: 'Careful / Detail-focused', vi: 'Cẩn thận / Chú ý chi tiết' },
};

export const STYLE_COLORS: Record<Style, string> = {
  D: '#dc2626',
  I: '#f59e0b',
  S: '#16a34a',
  C: '#2563eb',
};

export const STYLE_CONTENT: StyleContent = {
  D: {
    en: {
      label: 'Direct / Decisive',
      tagline: 'Action-oriented',
      summary:
        'Direct, decisive, and action-oriented. Strong at pushing things forward, making decisions, and taking initiative. May need to slow down, listen longer, and check details before moving.',
      strengths: [
        'Makes decisions quickly and takes initiative',
        'Comfortable taking charge and driving results',
        'Focuses on goals and gets things moving',
        'Stays confident under pressure',
      ],
      blindSpots: [
        'Can move too fast and skip details',
        'May come across as blunt or impatient',
        'Might not pause to hear quieter voices',
        'Can decide before everyone is aligned',
      ],
      underPressure:
        'Tends to take control, push harder, and make fast calls. Can become impatient or overly blunt.',
      needsFromTeammates:
        'Wants clear goals, autonomy, and a fast pace. Appreciates people who get to the point.',
      communicateWithThem:
        'Be brief and direct. Lead with the headline and the result. Skip long preambles and give them options to choose from.',
      leadership:
        'Leads by setting direction and driving toward results. Decisive and willing to make the hard call.',
      problemSolving:
        'Solves problems fast by choosing a path and committing. Prefers action over lengthy analysis.',
      gamesBestRole:
        'Team driver or communicator — keeps the team moving toward the goal and makes quick calls.',
      gamesWatchOut:
        'May rush, take over, or skip the details the task actually needs. Watch for leaving teammates behind.',
      whatMayFrustrateYou:
        'Slow decisions, too much discussion, and unclear goals.',
      whatOthersMisunderstand:
        'Your directness is about getting results, not about being harsh — but others may read it as impatience.',
      communicateBetter:
        'Slow down, ask one more question, and make space for quieter teammates before you decide.',
      duringGames:
        'During the games you may naturally take the lead, set the pace, and push the team toward finishing.',
      growthChallenge:
        'Today, let someone else make a key call — and really listen before you respond.',
    },
    vi: {
      label: 'Quyết đoán / Hành động nhanh',
      tagline: 'Hướng hành động',
      summary:
        'Thẳng thắn, quyết đoán và thiên về hành động. Mạnh ở việc thúc đẩy công việc tiến tới, ra quyết định và chủ động bắt tay vào làm. Có thể cần chậm lại, lắng nghe lâu hơn và kiểm tra chi tiết trước khi tiến hành.',
      strengths: [
        'Ra quyết định nhanh và chủ động bắt tay vào việc',
        'Tự tin đứng ra dẫn dắt và thúc đẩy kết quả',
        'Tập trung vào mục tiêu và làm cho mọi thứ chuyển động',
        'Giữ được sự tự tin khi chịu áp lực',
      ],
      blindSpots: [
        'Có thể đi quá nhanh và bỏ qua chi tiết',
        'Đôi khi bị xem là thẳng thừng hoặc thiếu kiên nhẫn',
        'Có thể không dừng lại để nghe những ý kiến nhỏ nhẹ',
        'Có thể quyết định trước khi mọi người thống nhất',
      ],
      underPressure:
        'Thường nắm quyền kiểm soát, thúc đẩy mạnh hơn và ra quyết định nhanh. Có thể trở nên thiếu kiên nhẫn hoặc quá thẳng thừng.',
      needsFromTeammates:
        'Mong muốn mục tiêu rõ ràng, quyền tự chủ và nhịp độ nhanh. Trân trọng những người đi thẳng vào vấn đề.',
      communicateWithThem:
        'Hãy ngắn gọn và thẳng thắn. Nói ý chính và kết quả trước. Bỏ qua phần mào đầu dài dòng và đưa ra các phương án để họ chọn.',
      leadership:
        'Dẫn dắt bằng cách định hướng và thúc đẩy hướng tới kết quả. Quyết đoán và sẵn sàng đưa ra quyết định khó.',
      problemSolving:
        'Giải quyết vấn đề nhanh bằng cách chọn một hướng đi và cam kết với nó. Thích hành động hơn là phân tích dài dòng.',
      gamesBestRole:
        'Người dẫn dắt hoặc người truyền đạt — giữ cho nhóm tiến về mục tiêu và ra quyết định nhanh.',
      gamesWatchOut:
        'Có thể làm vội, ôm việc, hoặc bỏ qua những chi tiết mà nhiệm vụ thực sự cần. Cẩn thận đừng bỏ lại đồng đội phía sau.',
      whatMayFrustrateYou:
        'Quyết định chậm chạp, bàn bạc quá nhiều và mục tiêu không rõ ràng.',
      whatOthersMisunderstand:
        'Sự thẳng thắn của bạn là để đạt kết quả, không phải để gay gắt — nhưng người khác có thể hiểu nhầm là thiếu kiên nhẫn.',
      communicateBetter:
        'Hãy chậm lại, hỏi thêm một câu, và nhường không gian cho những đồng đội ít nói trước khi bạn quyết định.',
      duringGames:
        'Trong các trò chơi, bạn có thể tự nhiên đứng ra dẫn dắt, đặt nhịp độ và thúc đẩy cả nhóm về đích.',
      growthChallenge:
        'Hôm nay, hãy để người khác đưa ra một quyết định quan trọng — và thật sự lắng nghe trước khi bạn phản hồi.',
    },
  },
  I: {
    en: {
      label: 'Social / Energising',
      tagline: 'Connecting',
      summary:
        'Social, expressive, and energetic. Strong at building connection, encouraging people, and creating momentum. May need to focus on details, follow-through, and clarity.',
      strengths: [
        'Builds connection and brings energy to the team',
        'Encourages and motivates people',
        'Communicates openly and persuasively',
        'Stays optimistic and gets people on board',
      ],
      blindSpots: [
        'Can lose focus on details and follow-through',
        'May talk more than listen',
        'Might over-promise in the moment',
        'Can avoid less exciting but necessary tasks',
      ],
      underPressure:
        'Tends to talk it out and keep spirits up. Can become scattered or skip the precise details.',
      needsFromTeammates:
        'Wants interaction, recognition, and a positive atmosphere. Appreciates people who engage warmly.',
      communicateWithThem:
        'Be friendly and open. Allow time to talk, show enthusiasm, and recognise their contribution. Confirm the details in writing afterwards.',
      leadership:
        'Leads by inspiring and energising people. Builds enthusiasm and rallies the team around a vision.',
      problemSolving:
        'Solves problems by talking with others and generating ideas. Strong at brainstorming, lighter on follow-through.',
      gamesBestRole:
        'Communicator or connector — keeps everyone talking, engaged, and motivated.',
      gamesWatchOut:
        'May create energy but skip precision, or talk over teammates. Watch for losing the details.',
      whatMayFrustrateYou:
        'Cold or rigid environments, working alone, and being ignored.',
      whatOthersMisunderstand:
        'Your enthusiasm is genuine engagement, not a lack of seriousness — but others may underestimate your focus.',
      communicateBetter:
        'Pause to listen fully, write down the key details, and follow through on what you promise.',
      duringGames:
        'During the games you may naturally energise the group, keep communication flowing, and lift everyone’s mood.',
      growthChallenge:
        'Today, listen twice as much as you speak — and write down one important detail before acting on it.',
    },
    vi: {
      label: 'Giao tiếp / Tạo năng lượng',
      tagline: 'Kết nối',
      summary:
        'Hoà đồng, cởi mở và tràn đầy năng lượng. Mạnh ở việc xây dựng kết nối, khích lệ mọi người và tạo đà cho công việc. Có thể cần chú ý hơn đến chi tiết, sự theo sát đến cùng và sự rõ ràng.',
      strengths: [
        'Xây dựng kết nối và mang năng lượng đến cho cả nhóm',
        'Khích lệ và tạo động lực cho mọi người',
        'Giao tiếp cởi mở và có sức thuyết phục',
        'Lạc quan và lôi kéo được mọi người tham gia',
      ],
      blindSpots: [
        'Có thể mất tập trung vào chi tiết và việc theo sát đến cùng',
        'Đôi khi nói nhiều hơn lắng nghe',
        'Có thể hứa quá lời trong lúc hào hứng',
        'Có thể né tránh những việc ít thú vị nhưng cần thiết',
      ],
      underPressure:
        'Thường chia sẻ ra ngoài và giữ tinh thần cho mọi người. Có thể trở nên thiếu tập trung hoặc bỏ qua những chi tiết chính xác.',
      needsFromTeammates:
        'Mong muốn sự tương tác, được ghi nhận và một bầu không khí tích cực. Trân trọng những người giao tiếp ấm áp.',
      communicateWithThem:
        'Hãy thân thiện và cởi mở. Cho họ thời gian để trò chuyện, thể hiện sự nhiệt tình và ghi nhận đóng góp của họ. Sau đó xác nhận lại chi tiết bằng văn bản.',
      leadership:
        'Dẫn dắt bằng cách truyền cảm hứng và tiếp năng lượng cho mọi người. Tạo sự hào hứng và quy tụ nhóm quanh một tầm nhìn.',
      problemSolving:
        'Giải quyết vấn đề bằng cách trao đổi với mọi người và nghĩ ra ý tưởng. Mạnh ở việc động não, nhẹ hơn ở khâu theo sát đến cùng.',
      gamesBestRole:
        'Người truyền đạt hoặc người kết nối — giữ cho mọi người trò chuyện, gắn kết và có động lực.',
      gamesWatchOut:
        'Có thể tạo năng lượng nhưng bỏ qua sự chính xác, hoặc nói lấn át đồng đội. Cẩn thận đừng để mất các chi tiết.',
      whatMayFrustrateYou:
        'Môi trường lạnh lùng hoặc cứng nhắc, làm việc một mình và bị phớt lờ.',
      whatOthersMisunderstand:
        'Sự nhiệt tình của bạn là sự gắn kết thật lòng, không phải thiếu nghiêm túc — nhưng người khác có thể đánh giá thấp sự tập trung của bạn.',
      communicateBetter:
        'Hãy dừng lại để lắng nghe trọn vẹn, ghi lại các chi tiết quan trọng và làm đến cùng điều bạn đã hứa.',
      duringGames:
        'Trong các trò chơi, bạn có thể tự nhiên tiếp năng lượng cho cả nhóm, giữ cho giao tiếp luôn trôi chảy và nâng tinh thần mọi người.',
      growthChallenge:
        'Hôm nay, hãy lắng nghe nhiều gấp đôi lúc bạn nói — và ghi lại một chi tiết quan trọng trước khi hành động.',
    },
  },
  S: {
    en: {
      label: 'Steady / Supportive',
      tagline: 'Supportive',
      summary:
        'Steady, patient, and supportive. Strong at keeping the team calm, helping others, and creating trust. May need to speak up sooner, challenge unclear decisions, and not avoid conflict.',
      strengths: [
        'Keeps the team calm and steady',
        'Supports others and builds trust',
        'Listens patiently and is dependable',
        'Helps the group stay together',
      ],
      blindSpots: [
        'May avoid conflict or hard conversations',
        'Can hold back opinions to keep the peace',
        'Might resist sudden change',
        'Can take on too much without saying so',
      ],
      underPressure:
        'Tends to stay calm and keep helping others. Can go quiet, avoid conflict, or absorb stress silently.',
      needsFromTeammates:
        'Wants stability, appreciation, and a respectful pace. Appreciates a calm, supportive environment.',
      communicateWithThem:
        'Be warm and patient. Give them time, avoid surprises, and invite their opinion directly — they may not volunteer it.',
      leadership:
        'Leads by building trust and keeping the team together. Calm, steady, and people-focused.',
      problemSolving:
        'Solves problems by keeping everyone aligned and moving together. Patient and considerate, but may avoid hard calls.',
      gamesBestRole:
        'Supporter or quality checker — keeps the team grounded and makes sure no one is left behind.',
      gamesWatchOut:
        'May hold back ideas or avoid pushing back. Watch for staying quiet when your input is needed.',
      whatMayFrustrateYou:
        'Sudden change, pressure, conflict, and being rushed.',
      whatOthersMisunderstand:
        'Your quietness is care and consideration, not agreement — but others may assume you have no concerns.',
      communicateBetter:
        'Speak up sooner, share your view even when it differs, and name a concern before it grows.',
      duringGames:
        'During the games you may naturally keep the team calm, support quieter members, and hold the group together.',
      growthChallenge:
        'Today, share one opinion early — before anyone asks for it.',
    },
    vi: {
      label: 'Ổn định / Hỗ trợ',
      tagline: 'Hỗ trợ',
      summary:
        'Điềm tĩnh, kiên nhẫn và biết hỗ trợ. Mạnh ở việc giữ cho nhóm bình tĩnh, giúp đỡ người khác và tạo dựng niềm tin. Có thể cần lên tiếng sớm hơn, đặt câu hỏi với những quyết định chưa rõ ràng và không né tránh xung đột.',
      strengths: [
        'Giữ cho cả nhóm bình tĩnh và ổn định',
        'Hỗ trợ người khác và xây dựng niềm tin',
        'Kiên nhẫn lắng nghe và đáng tin cậy',
        'Giúp cả nhóm gắn bó với nhau',
      ],
      blindSpots: [
        'Có thể né tránh xung đột hoặc những cuộc trò chuyện khó',
        'Đôi khi giữ ý kiến lại để giữ hoà khí',
        'Có thể ngại sự thay đổi đột ngột',
        'Có thể ôm quá nhiều việc mà không nói ra',
      ],
      underPressure:
        'Thường giữ bình tĩnh và tiếp tục giúp đỡ người khác. Có thể trở nên trầm lặng, né tránh xung đột hoặc âm thầm gánh chịu căng thẳng.',
      needsFromTeammates:
        'Mong muốn sự ổn định, được trân trọng và một nhịp độ tôn trọng. Trân trọng một môi trường bình tĩnh và biết hỗ trợ.',
      communicateWithThem:
        'Hãy ấm áp và kiên nhẫn. Cho họ thời gian, tránh gây bất ngờ, và mời họ nêu ý kiến một cách trực tiếp — họ có thể sẽ không tự nói ra.',
      leadership:
        'Dẫn dắt bằng cách xây dựng niềm tin và giữ cho nhóm gắn bó. Điềm tĩnh, ổn định và lấy con người làm trọng tâm.',
      problemSolving:
        'Giải quyết vấn đề bằng cách giữ mọi người thống nhất và cùng tiến tới. Kiên nhẫn và chu đáo, nhưng có thể né những quyết định khó.',
      gamesBestRole:
        'Người hỗ trợ hoặc người kiểm tra chất lượng — giữ cho nhóm vững vàng và bảo đảm không ai bị bỏ lại.',
      gamesWatchOut:
        'Có thể giữ ý tưởng lại hoặc ngại phản biện. Cẩn thận đừng im lặng khi ý kiến của bạn đang cần thiết.',
      whatMayFrustrateYou:
        'Thay đổi đột ngột, áp lực, xung đột và bị hối thúc.',
      whatOthersMisunderstand:
        'Sự trầm lặng của bạn là sự quan tâm và chu đáo, không phải là đồng ý — nhưng người khác có thể nghĩ rằng bạn không có băn khoăn gì.',
      communicateBetter:
        'Hãy lên tiếng sớm hơn, chia sẻ quan điểm ngay cả khi nó khác biệt, và nêu băn khoăn trước khi nó lớn lên.',
      duringGames:
        'Trong các trò chơi, bạn có thể tự nhiên giữ cho nhóm bình tĩnh, hỗ trợ những thành viên ít nói và giữ cả nhóm gắn kết.',
      growthChallenge:
        'Hôm nay, hãy chia sẻ một ý kiến thật sớm — trước khi có ai hỏi đến.',
    },
  },
  C: {
    en: {
      label: 'Careful / Detail-focused',
      tagline: 'Quality-focused',
      summary:
        'Careful, analytical, and quality-focused. Strong at accuracy, documentation, risk awareness, and process. May need to avoid overthinking, communicate simply, and move forward before everything feels perfect.',
      strengths: [
        'Pays close attention to detail and accuracy',
        'Thinks ahead about risks and quality',
        'Documents and follows a clear process',
        'Stays objective and well-prepared',
      ],
      blindSpots: [
        'Can overthink and slow things down',
        'May get stuck seeking perfection',
        'Might over-explain or over-analyse',
        'Can seem distant or overly critical',
      ],
      underPressure:
        'Tends to slow down and double-check everything. Can become stuck in analysis or overly cautious.',
      needsFromTeammates:
        'Wants clarity, accuracy, and time to do things right. Appreciates well-prepared, logical teammates.',
      communicateWithThem:
        'Be clear and specific. Give them facts, reasons, and time to think. Avoid pushing for an instant answer.',
      leadership:
        'Leads by setting high standards and clear processes. Thorough, fair, and quality-driven.',
      problemSolving:
        'Solves problems by analysing the root cause carefully before acting. Thorough, but can be slow to commit.',
      gamesBestRole:
        'Quality checker or architect — makes sure the plan is accurate and the details are right.',
      gamesWatchOut:
        'May over-analyse, slow the team down, or over-explain. Watch for losing time to perfectionism.',
      whatMayFrustrateYou:
        'Sloppiness, missing details, unclear rules, and rushed decisions.',
      whatOthersMisunderstand:
        'Your questions are about getting it right, not about doubting people — but others may read them as criticism.',
      communicateBetter:
        'Keep it simple, share your conclusion first, and accept that “good enough” is sometimes the right call.',
      duringGames:
        'During the games you may naturally check the details, spot mistakes, and keep the work accurate.',
      growthChallenge:
        'Today, make one quick decision with the information you already have — and let it be good enough.',
    },
    vi: {
      label: 'Cẩn thận / Chú ý chi tiết',
      tagline: 'Chú trọng chất lượng',
      summary:
        'Cẩn thận, phân tích kỹ và chú trọng chất lượng. Mạnh ở sự chính xác, lập tài liệu, nhận biết rủi ro và quy trình. Có thể cần tránh suy nghĩ quá nhiều, giao tiếp đơn giản hơn và tiến tới trước khi mọi thứ thật hoàn hảo.',
      strengths: [
        'Chú ý kỹ đến chi tiết và sự chính xác',
        'Nghĩ trước về rủi ro và chất lượng',
        'Lập tài liệu và tuân theo một quy trình rõ ràng',
        'Giữ sự khách quan và chuẩn bị chu đáo',
      ],
      blindSpots: [
        'Có thể suy nghĩ quá nhiều và làm chậm tiến độ',
        'Đôi khi bị kẹt lại vì muốn mọi thứ hoàn hảo',
        'Có thể giải thích hoặc phân tích quá mức',
        'Có thể bị xem là xa cách hoặc quá khắt khe',
      ],
      underPressure:
        'Thường chậm lại và kiểm tra kỹ lại mọi thứ. Có thể bị kẹt trong phân tích hoặc trở nên quá thận trọng.',
      needsFromTeammates:
        'Mong muốn sự rõ ràng, chính xác và thời gian để làm cho đúng. Trân trọng những đồng đội logic và chuẩn bị kỹ.',
      communicateWithThem:
        'Hãy rõ ràng và cụ thể. Đưa ra dữ kiện, lý do và thời gian để họ suy nghĩ. Tránh hối thúc một câu trả lời tức thì.',
      leadership:
        'Dẫn dắt bằng cách đặt ra tiêu chuẩn cao và quy trình rõ ràng. Kỹ lưỡng, công bằng và hướng đến chất lượng.',
      problemSolving:
        'Giải quyết vấn đề bằng cách phân tích kỹ nguyên nhân gốc rễ trước khi hành động. Kỹ lưỡng, nhưng có thể chậm trong việc cam kết.',
      gamesBestRole:
        'Người kiểm tra chất lượng hoặc kiến trúc sư — bảo đảm kế hoạch chính xác và các chi tiết đều đúng.',
      gamesWatchOut:
        'Có thể phân tích quá mức, làm chậm cả nhóm hoặc giải thích quá dài. Cẩn thận đừng để mất thời gian vì cầu toàn.',
      whatMayFrustrateYou:
        'Sự cẩu thả, thiếu chi tiết, quy tắc không rõ ràng và những quyết định vội vàng.',
      whatOthersMisunderstand:
        'Những câu hỏi của bạn là để làm cho đúng, không phải để nghi ngờ mọi người — nhưng người khác có thể hiểu nhầm là chỉ trích.',
      communicateBetter:
        'Hãy nói đơn giản, đưa ra kết luận trước, và chấp nhận rằng “đủ tốt” đôi khi là lựa chọn đúng.',
      duringGames:
        'Trong các trò chơi, bạn có thể tự nhiên kiểm tra chi tiết, phát hiện lỗi và giữ cho công việc chính xác.',
      growthChallenge:
        'Hôm nay, hãy đưa ra một quyết định nhanh với thông tin bạn đang có — và để nó “đủ tốt” là được.',
    },
  },
};

// Short blend descriptions, keyed by "Primary/Secondary" e.g. "D/C".
// Falls back to a generic sentence if a specific blend is not listed.
export function blendDescription(
  primary: Style,
  secondary: Style,
  lang: Lang
): string {
  const p = STYLE_CONTENT[primary][lang].tagline.toLowerCase();
  const s = STYLE_CONTENT[secondary][lang].tagline.toLowerCase();
  if (lang === 'vi') {
    return `Bạn dẫn dắt bằng phong cách "${STYLE_LABELS[primary].vi}", được cân bằng bởi nét "${STYLE_LABELS[secondary].vi}". Bạn kết hợp xu hướng ${p} với ${s}.`;
  }
  return `You lead with a "${STYLE_LABELS[primary].en}" style, balanced by "${STYLE_LABELS[secondary].en}". You blend a ${p} tendency with a ${s} one.`;
}
