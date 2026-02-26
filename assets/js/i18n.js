'use strict';

window.I18n = (() => {

  const LANGS  = ['ja', 'en', 'zh'];
  const LABELS = { ja: '日本語', en: 'English', zh: '中文' };

  /* ── Translation dictionary ─────────────────────────────── */
  const T = {

    /* ====================================================== */
    ja: {
      /* shared nav / footer */
      nav_about:    'About',
      nav_privacy:  'プライバシーポリシー',
      nav_contact:  'お問い合わせ',
      footer_copy:  '© 2026 BaconPomodoro by iroiro',

      /* page titles */
      page_title_index:   'BaconPomodoro - ポモドーロタイマー & TODOリスト',
      page_title_about:   'About - BaconPomodoro',
      page_title_privacy: 'プライバシーポリシー - BaconPomodoro',
      page_title_contact: 'お問い合わせ - BaconPomodoro',

      /* mode tabs */
      mode_pomodoro: 'ポモドーロ',
      mode_short:    '短い休憩',
      mode_long:     '長い休憩',

      /* ring center label (set dynamically by app.js) */
      label_pomodoro: '集中',
      label_short:    '短い休憩',
      label_long:     '長い休憩',

      /* control buttons (dynamic text via app.js) */
      btn_start:  'スタート',
      btn_pause:  '一時停止',
      btn_resume: '再開',

      /* icon button titles */
      btn_reset_title:       'リセット',
      btn_skip_title:        'スキップ',
      reset_session_title:   'セッション数をリセット',

      /* session counter */
      sessions_done: '{n} セッション完了',

      /* settings panel */
      settings_label:   '⚙ 時間設定',
      set_pomo:         'ポモドーロ（分）',
      set_short_label:  '短い休憩（分）',
      set_long_label:   '長い休憩（分）',
      set_interval:     '長い休憩の間隔',
      set_auto_break:   '休憩を自動スタート',
      set_auto_pomo:    'ポモドーロを自動スタート',
      set_volume:       '音量',
      set_end_sound:    '終了音',
      sound_hato:       '鳩時計',
      sound_niwatori:   'ニワトリの鳴き声',
      sound_inu:        '犬の鳴き声',
      sound_neko:       '猫の鳴き声',
      btn_apply:        '適用',

      /* todo */
      todo_title:      'タスク',
      btn_clear_done:  '完了済みを削除',
      todo_placeholder:'タスクを追加...',
      todo_empty:      'タスクがありません。<br>上に追加してください。',
      btn_focus:       '集中',
      btn_focusing:    '🎯 集中中',

      /* confirm / toast */
      confirm_reset_session: 'セッション数をリセットしますか？',
      toast_session_reset:   'セッション数をリセットしました',
      toast_settings_saved:  '設定を保存しました ✓',
      toast_work_done:       '🍅 お疲れさまです！休憩しましょう。',
      toast_break_done:      '☕ 休憩終了！集中しましょう。',

      /* browser notifications */
      notif_work_title: 'ポモドーロ完了！',
      notif_work_body:  '休憩を始めましょう。',
      notif_break_title:'休憩終了！',
      notif_break_body: '次のポモドーロを始めましょう。',

      /* ── about.html ── */
      about_h1:        'About',
      about_subtitle:  'BaconPomodoro — 集中と休息のリズムを作るタイマー',
      about_h_what:    'BaconPomodoroとは',
      about_p_what:    'BaconPomodoroは、ポモドーロテクニックを取り入れたシンプルなWebタイマーです。余計な機能を省き、「集中すること」「タスクを管理すること」の2点に絞った設計になっています。アカウント登録不要で、すべてのデータはお使いのブラウザのローカルストレージに保存されます。',
      about_h_tech:    'ポモドーロテクニックとは',
      about_p_tech:    'ポモドーロテクニックは、1980年代にFrancesco Cirillo氏が考案した時間管理術です。「25分間の集中作業」と「5分間の短い休憩」を1セットとして繰り返すことで、集中力を持続させ、作業効率を高めることができます。4セット終了後は15〜30分の長い休憩を取ります。',
      about_ul_tech:   '<li>タスクを一つ選ぶ</li><li>タイマーを25分にセットする（1ポモドーロ）</li><li>タイマーが鳴るまで集中して作業する</li><li>5分間休憩する</li><li>4ポモドーロ完了したら長い休憩（15〜30分）を取る</li>',
      about_h_features:'主な機能',
      about_ul_features:'<li>ポモドーロタイマー（作業・短い休憩・長い休憩の3モード）</li><li>時間のカスタマイズ（各モードの時間を自由に変更可能）</li><li>TODOリスト（タスクの追加・完了管理・集中タスクの選択）</li><li>セッション数の記録</li><li>ブラウザ通知（セッション完了時）</li><li>全データをローカルストレージで保存（次回訪問時も引き継ぎ）</li><li>スマートフォン・タブレット対応（レスポンシブデザイン）</li>',
      about_h_dev:     '開発者について',
      about_p_dev:     'BaconPomodoroは iroiro が個人で開発・運営しているWebサービスです。日々の作業効率を上げるために「自分が使いたいツール」を作る精神で制作しました。',
      about_p_contact: 'ご意見・ご要望・不具合報告は <a href="contact.html">お問い合わせページ</a> または X（旧Twitter）の <a href="https://x.com/iroiro_GameDev" target="_blank" rel="noopener">@iroiro_GameDev</a> までお気軽にどうぞ。',
      about_h_disclaimer: '免責事項',
      about_p_disclaimer: '本サービスは無償で提供しており、内容の正確性・動作の保証はいたしません。サービス利用によって生じた損害について、開発者は一切の責任を負いません。予告なくサービス内容の変更・停止を行う場合があります。',

      /* ── privacy.html ── */
      privacy_h1:        'プライバシーポリシー',
      privacy_updated:   '最終更新日：2026年2月27日',
      privacy_intro:     'BaconPomodoro（以下「本サービス」）は、iroiro（以下「運営者」）が運営するWebサービスです。本プライバシーポリシーは、本サービスにおける利用者情報の取り扱いについて定めるものです。',
      privacy_h_collect: '1. 収集する情報',
      privacy_p1_collect:'本サービスは、タイマー設定・TODOリスト・セッション数などのデータをお使いのブラウザのローカルストレージに保存します。これらのデータは運営者のサーバーには送信されず、お使いのデバイス上にのみ保存されます。',
      privacy_p2_collect:'本サービス自体が氏名・メールアドレスなどの個人を特定できる情報を直接収集することはありません。',
      privacy_h_cookie:  '2. Cookieおよびトラッキング技術の使用',
      privacy_p_cookie:  '本サービスでは、アクセス解析および広告配信を目的として、第三者サービスによるCookieやトラッキング技術が使用される場合があります。',
      privacy_ul_cookie: '<li><strong>Google AdSense：</strong>本サービスはGoogle AdSenseを利用した広告を掲載しています。Googleはユーザーの閲覧情報をもとにパーソナライズド広告を配信するためにCookieを使用します。詳細はGoogleの<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">広告ポリシー</a>をご確認ください。</li><li><strong>Google Analytics：</strong>アクセス解析のためにGoogle Analyticsを利用する場合があります。収集されるデータは匿名化されており、個人を特定するものではありません。詳細は<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Googleプライバシーポリシー</a>をご確認ください。</li>',
      privacy_h_optout:  '3. パーソナライズド広告のオプトアウト',
      privacy_p_optout:  'Google AdSenseによるパーソナライズド広告の配信を希望されない場合は、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Googleの広告設定</a>からオプトアウトすることができます。また、<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">Digital Advertising Alliance</a> でも設定を変更できます。',
      privacy_h_third:   '4. 第三者へのデータ提供',
      privacy_p_third:   '運営者は、法令に基づく場合を除き、利用者の情報を第三者に提供・開示することはありません。ただし、上記の第三者サービス（Google等）は各社のプライバシーポリシーに基づいてデータを収集・使用します。',
      privacy_h_links:   '5. 外部リンクについて',
      privacy_p_links:   '本サービスには外部Webサイトへのリンクが含まれる場合があります。リンク先のサービスにおけるプライバシーの取り扱いについては、各サービスのプライバシーポリシーをご確認ください。',
      privacy_h_minor:   '6. 未成年者のプライバシー',
      privacy_p_minor:   '本サービスは13歳未満の方を対象としたサービスではありません。13歳未満の方の個人情報を意図的に収集することはありません。',
      privacy_h_changes: '7. プライバシーポリシーの変更',
      privacy_p_changes: '本ポリシーは必要に応じて変更されることがあります。変更後のポリシーは本ページに掲載し、掲載をもって効力を生じるものとします。定期的にご確認いただくことをお勧めします。',
      privacy_h_contact: '8. お問い合わせ',
      privacy_p_contact: '本プライバシーポリシーに関するご質問は、<a href="contact.html">お問い合わせページ</a>またはメールにてご連絡ください。',

      /* ── contact.html ── */
      contact_h1:       'お問い合わせ',
      contact_subtitle: '不具合報告・ご意見・ご要望をお気軽にどうぞ',
      contact_intro:    'BaconPomodoroに関するご意見・ご要望・不具合のご報告は、以下の連絡先までお送りください。できる限り対応いたしますが、個人運営のため返信にお時間をいただく場合があります。',
      contact_label_dev:  '開発者',
      contact_val_dev:    'iroiro',
      contact_label_x:    'X (Twitter)',
      contact_val_x:      '<a href="https://x.com/iroiro_GameDev" target="_blank" rel="noopener">@iroiro_GameDev</a>',
      contact_label_email:'メール',
      contact_val_email:  '<a href="mailto:tadayohu@gmail.com">tadayohu@gmail.com</a>',
      contact_note:       '📌 X（旧Twitter）のDMまたはリプライが最も返信が早いです。メールの場合、迷惑メールフォルダをご確認のうえ、数日お待ちください。',
      contact_h_examples: 'お問い合わせ例',
      contact_ul_examples:'<li>タイマーやTODOリストが正常に動作しない</li><li>特定のブラウザ・デバイスで表示がおかしい</li><li>新機能のリクエスト・改善提案</li><li>広告に関するご意見</li><li>その他、サービスについてのご質問</li>',
      contact_h_other:    'その他',
      contact_p_other:    'プライバシーポリシーに関するお問い合わせも同様の連絡先にて受け付けています。詳細は <a href="privacy.html">プライバシーポリシー</a> をご確認ください。',
    },

    /* ====================================================== */
    en: {
      nav_about:    'About',
      nav_privacy:  'Privacy Policy',
      nav_contact:  'Contact',
      footer_copy:  '© 2026 BaconPomodoro by iroiro',

      page_title_index:   'BaconPomodoro - Pomodoro Timer & Todo List',
      page_title_about:   'About - BaconPomodoro',
      page_title_privacy: 'Privacy Policy - BaconPomodoro',
      page_title_contact: 'Contact - BaconPomodoro',

      mode_pomodoro: 'Pomodoro',
      mode_short:    'Short Break',
      mode_long:     'Long Break',

      label_pomodoro: 'Focus',
      label_short:    'Short Break',
      label_long:     'Long Break',

      btn_start:  'Start',
      btn_pause:  'Pause',
      btn_resume: 'Resume',

      btn_reset_title:     'Reset',
      btn_skip_title:      'Skip',
      reset_session_title: 'Reset session count',

      sessions_done: '{n} sessions done',

      settings_label:  '⚙ Timer Settings',
      set_pomo:        'Pomodoro (min)',
      set_short_label: 'Short Break (min)',
      set_long_label:  'Long Break (min)',
      set_interval:    'Long Break Interval',
      set_auto_break:  'Auto-start Breaks',
      set_auto_pomo:   'Auto-start Pomodoro',
      set_volume:      'Volume',
      set_end_sound:   'End Sound',
      sound_hato:      'Cuckoo Clock',
      sound_niwatori:  'Rooster',
      sound_inu:       'Dog Bark',
      sound_neko:      'Cat Meow',
      btn_apply:       'Apply',

      todo_title:      'Tasks',
      btn_clear_done:  'Clear Completed',
      todo_placeholder:'Add a task...',
      todo_empty:      'No tasks yet.<br>Add one above.',
      btn_focus:       'Focus',
      btn_focusing:    '🎯 Focusing',

      confirm_reset_session: 'Reset session count?',
      toast_session_reset:   'Session count reset',
      toast_settings_saved:  'Settings saved ✓',
      toast_work_done:       '🍅 Great work! Time for a break.',
      toast_break_done:      '☕ Break over! Back to focus.',

      notif_work_title: 'Pomodoro Complete!',
      notif_work_body:  'Time to take a break.',
      notif_break_title:'Break Over!',
      notif_break_body: 'Start the next Pomodoro.',

      about_h1:        'About',
      about_subtitle:  'BaconPomodoro — A timer for focus and rest rhythm',
      about_h_what:    'What is BaconPomodoro?',
      about_p_what:    'BaconPomodoro is a simple web-based Pomodoro timer. We stripped away unnecessary features and focused on just two things: staying focused and managing tasks. No account needed — all data is stored in your browser\'s local storage.',
      about_h_tech:    'What is the Pomodoro Technique?',
      about_p_tech:    'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the 1980s. By repeating cycles of 25-minute focused work and 5-minute short breaks, you can sustain concentration and boost productivity. After four cycles, take a longer 15–30 minute break.',
      about_ul_tech:   '<li>Choose a task to work on</li><li>Set the timer to 25 minutes (1 Pomodoro)</li><li>Work until the timer rings</li><li>Take a 5-minute break</li><li>After 4 Pomodoros, take a long break (15–30 min)</li>',
      about_h_features:'Features',
      about_ul_features:'<li>Pomodoro timer (3 modes: focus, short break, long break)</li><li>Customizable durations for each mode</li><li>Todo list (add, complete, delete, set a focus task)</li><li>Session counter</li><li>Browser notifications on session completion</li><li>All data saved to localStorage (persists between visits)</li><li>Responsive design for mobile and tablet</li>',
      about_h_dev:     'About the Developer',
      about_p_dev:     'BaconPomodoro is independently developed and maintained by iroiro. Built with the philosophy of creating tools I personally want to use to improve daily productivity.',
      about_p_contact: 'For feedback, feature requests, or bug reports, visit the <a href="contact.html">Contact page</a> or reach out on X (Twitter) at <a href="https://x.com/iroiro_GameDev" target="_blank" rel="noopener">@iroiro_GameDev</a>.',
      about_h_disclaimer: 'Disclaimer',
      about_p_disclaimer: 'This service is provided free of charge with no warranties on accuracy or functionality. The developer is not liable for any damages resulting from use of this service. Features and availability may change without notice.',

      privacy_h1:        'Privacy Policy',
      privacy_updated:   'Last updated: February 27, 2026',
      privacy_intro:     'BaconPomodoro ("the Service") is a web service operated by iroiro ("the Operator"). This Privacy Policy describes how user information is handled on this Service.',
      privacy_h_collect: '1. Information We Collect',
      privacy_p1_collect:'The Service stores data such as timer settings, todo list items, and session counts in your browser\'s local storage. This data is never sent to the operator\'s servers and remains only on your device.',
      privacy_p2_collect:'The Service itself does not directly collect personally identifiable information such as names or email addresses.',
      privacy_h_cookie:  '2. Cookies and Tracking Technologies',
      privacy_p_cookie:  'The Service may use cookies and tracking technologies provided by third-party services for analytics and advertising purposes.',
      privacy_ul_cookie: '<li><strong>Google AdSense:</strong> This Service displays ads through Google AdSense. Google uses cookies to serve personalized ads based on your browsing history. See Google\'s <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Advertising Policy</a> for details.</li><li><strong>Google Analytics:</strong> Google Analytics may be used for traffic analysis. Collected data is anonymized and cannot identify individuals. See the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a> for details.</li>',
      privacy_h_optout:  '3. Opting Out of Personalized Ads',
      privacy_p_optout:  'To opt out of personalized ads served by Google AdSense, visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google\'s Ad Settings</a>. You can also adjust preferences via the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">Digital Advertising Alliance</a>.',
      privacy_h_third:   '4. Sharing Data with Third Parties',
      privacy_p_third:   'The Operator will not share user information with third parties except as required by law. However, third-party services listed above (such as Google) collect and use data under their own privacy policies.',
      privacy_h_links:   '5. External Links',
      privacy_p_links:   'The Service may contain links to external websites. The Operator is not responsible for the privacy practices of linked sites. Please review the privacy policy of each site you visit.',
      privacy_h_minor:   '6. Children\'s Privacy',
      privacy_p_minor:   'This Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.',
      privacy_h_changes: '7. Changes to This Policy',
      privacy_p_changes: 'This policy may be updated from time to time. Changes will be posted on this page and take effect upon publication. We recommend checking this page periodically.',
      privacy_h_contact: '8. Contact',
      privacy_p_contact: 'For questions about this Privacy Policy, please reach out via the <a href="contact.html">Contact page</a> or by email.',

      contact_h1:       'Contact',
      contact_subtitle: 'Bug reports, feedback, and feature requests welcome',
      contact_intro:    'For any questions, feedback, or bug reports regarding BaconPomodoro, please reach out via the contacts below. We\'ll do our best to respond, though please allow some time as this is an independently operated service.',
      contact_label_dev:  'Developer',
      contact_val_dev:    'iroiro',
      contact_label_x:    'X (Twitter)',
      contact_val_x:      '<a href="https://x.com/iroiro_GameDev" target="_blank" rel="noopener">@iroiro_GameDev</a>',
      contact_label_email:'Email',
      contact_val_email:  '<a href="mailto:tadayohu@gmail.com">tadayohu@gmail.com</a>',
      contact_note:       '📌 Replies via X (Twitter) DM or mention are usually fastest. For emails, check your spam folder and allow a few days for a response.',
      contact_h_examples: 'Types of Inquiries',
      contact_ul_examples:'<li>Timer or todo list not working correctly</li><li>Display issues on a specific browser or device</li><li>Feature requests or improvement suggestions</li><li>Feedback about ads</li><li>Any other questions about the service</li>',
      contact_h_other:    'Other',
      contact_p_other:    'Privacy-related inquiries are also welcome through the same channels. See our <a href="privacy.html">Privacy Policy</a> for details.',
    },

    /* ====================================================== */
    zh: {
      nav_about:    '关于',
      nav_privacy:  '隐私政策',
      nav_contact:  '联系我们',
      footer_copy:  '© 2026 BaconPomodoro by iroiro',

      page_title_index:   'BaconPomodoro - 番茄钟计时器 & 待办列表',
      page_title_about:   '关于 - BaconPomodoro',
      page_title_privacy: '隐私政策 - BaconPomodoro',
      page_title_contact: '联系我们 - BaconPomodoro',

      mode_pomodoro: '番茄钟',
      mode_short:    '短暂休息',
      mode_long:     '长时休息',

      label_pomodoro: '专注',
      label_short:    '短暂休息',
      label_long:     '长时休息',

      btn_start:  '开始',
      btn_pause:  '暂停',
      btn_resume: '继续',

      btn_reset_title:     '重置',
      btn_skip_title:      '跳过',
      reset_session_title: '重置会话数',

      sessions_done: '已完成 {n} 个番茄钟',

      settings_label:  '⚙ 时间设置',
      set_pomo:        '番茄钟（分钟）',
      set_short_label: '短暂休息（分钟）',
      set_long_label:  '长时休息（分钟）',
      set_interval:    '长休息间隔',
      set_auto_break:  '自动开始休息',
      set_auto_pomo:   '自动开始番茄钟',
      set_volume:      '音量',
      set_end_sound:   '结束音',
      sound_hato:      '布谷鸟钟',
      sound_niwatori:  '公鸡叫声',
      sound_inu:       '狗叫声',
      sound_neko:      '猫叫声',
      btn_apply:       '应用',

      todo_title:      '任务',
      btn_clear_done:  '清除已完成',
      todo_placeholder:'添加任务...',
      todo_empty:      '暂无任务。<br>请在上方添加。',
      btn_focus:       '专注',
      btn_focusing:    '🎯 专注中',

      confirm_reset_session: '确认重置会话数？',
      toast_session_reset:   '会话数已重置',
      toast_settings_saved:  '设置已保存 ✓',
      toast_work_done:       '🍅 辛苦了！休息一下吧。',
      toast_break_done:      '☕ 休息结束！继续专注吧。',

      notif_work_title: '番茄钟完成！',
      notif_work_body:  '开始休息吧。',
      notif_break_title:'休息结束！',
      notif_break_body: '开始下一个番茄钟。',

      about_h1:        '关于',
      about_subtitle:  'BaconPomodoro — 打造专注与休息的节奏',
      about_h_what:    '什么是 BaconPomodoro？',
      about_p_what:    'BaconPomodoro 是一款基于番茄工作法的简洁网页计时器。我们去除了多余的功能，专注于两件事：保持专注和管理任务。无需注册账号，所有数据均保存在您浏览器的本地存储中。',
      about_h_tech:    '什么是番茄工作法？',
      about_p_tech:    '番茄工作法是由 Francesco Cirillo 在 1980 年代开发的时间管理方法。通过重复"25分钟专注工作"和"5分钟短暂休息"的循环，可以持续保持注意力并提高工作效率。完成四个番茄钟后，进行15至30分钟的长时休息。',
      about_ul_tech:   '<li>选择一个要完成的任务</li><li>将计时器设为25分钟（1个番茄钟）</li><li>专注工作直到计时器响起</li><li>休息5分钟</li><li>完成4个番茄钟后，进行长时休息（15～30分钟）</li>',
      about_h_features:'主要功能',
      about_ul_features:'<li>番茄钟计时器（3种模式：专注、短休息、长休息）</li><li>可自定义每种模式的时间</li><li>待办列表（添加、完成、删除任务，设定专注任务）</li><li>会话计数</li><li>会话完成时的浏览器通知</li><li>所有数据保存到本地存储（下次访问时继续）</li><li>响应式设计，适配手机和平板</li>',
      about_h_dev:     '关于开发者',
      about_p_dev:     'BaconPomodoro 由 iroiro 独立开发和运营。秉持"制作自己想用的工具"的理念，旨在提升日常工作效率。',
      about_p_contact: '如有意见、功能建议或错误报告，请访问<a href="contact.html">联系页面</a>，或通过 X（Twitter）联系 <a href="https://x.com/iroiro_GameDev" target="_blank" rel="noopener">@iroiro_GameDev</a>。',
      about_h_disclaimer: '免责声明',
      about_p_disclaimer: '本服务免费提供，不对内容的准确性或功能的正常运行作任何保证。因使用本服务而造成的任何损失，开发者概不负责。服务内容可能随时更改或停止，恕不另行通知。',

      privacy_h1:        '隐私政策',
      privacy_updated:   '最后更新：2026年2月27日',
      privacy_intro:     'BaconPomodoro（以下简称"本服务"）由 iroiro（以下简称"运营者"）运营。本隐私政策说明本服务对用户信息的处理方式。',
      privacy_h_collect: '1. 收集的信息',
      privacy_p1_collect:'本服务将计时器设置、待办列表、会话数等数据保存在您浏览器的本地存储中。这些数据不会发送到运营者的服务器，仅存储在您的设备上。',
      privacy_p2_collect:'本服务本身不直接收集姓名、电子邮件地址等可识别个人身份的信息。',
      privacy_h_cookie:  '2. Cookie 及跟踪技术',
      privacy_p_cookie:  '本服务可能使用第三方服务提供的 Cookie 和跟踪技术，用于流量分析和广告投放。',
      privacy_ul_cookie: '<li><strong>Google AdSense：</strong>本服务通过 Google AdSense 展示广告。Google 使用 Cookie 根据您的浏览记录投放个性化广告。详情请参阅 Google 的<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">广告政策</a>。</li><li><strong>Google Analytics：</strong>本服务可能使用 Google Analytics 进行访问分析。收集的数据经过匿名处理，无法识别个人身份。详情请参阅 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 隐私政策</a>。</li>',
      privacy_h_optout:  '3. 退出个性化广告',
      privacy_p_optout:  '如果您不希望接收 Google AdSense 的个性化广告，可以通过 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google 广告设置</a> 选择退出。您也可以通过 <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">Digital Advertising Alliance</a> 更改偏好设置。',
      privacy_h_third:   '4. 向第三方提供数据',
      privacy_p_third:   '除法律要求外，运营者不会向第三方提供或披露用户信息。但上述第三方服务（如 Google 等）将依据各自的隐私政策收集和使用数据。',
      privacy_h_links:   '5. 外部链接',
      privacy_p_links:   '本服务可能包含指向外部网站的链接。运营者对链接网站的隐私实践不承担责任。请查阅您所访问的每个网站的隐私政策。',
      privacy_h_minor:   '6. 未成年人隐私',
      privacy_p_minor:   '本服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。',
      privacy_h_changes: '7. 政策变更',
      privacy_p_changes: '本政策可能会不时更新。更新后的政策将发布在本页面，发布即生效。建议您定期查阅本页面。',
      privacy_h_contact: '8. 联系方式',
      privacy_p_contact: '如对本隐私政策有任何疑问，请通过<a href="contact.html">联系页面</a>或发送电子邮件与我们联系。',

      contact_h1:       '联系我们',
      contact_subtitle: '欢迎提交错误报告、意见和功能建议',
      contact_intro:    '如您有关于 BaconPomodoro 的任何意见、建议或错误报告，请通过以下联系方式与我们联系。我们将尽力回复，但由于是个人运营，请允许一定的回复时间。',
      contact_label_dev:  '开发者',
      contact_val_dev:    'iroiro',
      contact_label_x:    'X (Twitter)',
      contact_val_x:      '<a href="https://x.com/iroiro_GameDev" target="_blank" rel="noopener">@iroiro_GameDev</a>',
      contact_label_email:'电子邮件',
      contact_val_email:  '<a href="mailto:tadayohu@gmail.com">tadayohu@gmail.com</a>',
      contact_note:       '📌 通过 X（Twitter）私信或提及回复最快。电子邮件请检查垃圾邮件文件夹，并允许数天的回复时间。',
      contact_h_examples: '咨询类型',
      contact_ul_examples:'<li>计时器或待办列表无法正常运行</li><li>在特定浏览器或设备上显示异常</li><li>功能请求或改进建议</li><li>关于广告的意见</li><li>其他关于服务的问题</li>',
      contact_h_other:    '其他',
      contact_p_other:    '有关隐私政策的问题也可通过相同的联系方式提交。详情请参阅我们的<a href="privacy.html">隐私政策</a>。',
    },
  };

  /* ── Core logic ─────────────────────────────────────────── */
  let _lang = 'ja';

  function _detect() {
    const saved = localStorage.getItem('bp_lang');
    if (saved && LANGS.includes(saved)) return saved;
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('en')) return 'en';
    return 'ja';
  }

  function _applyDOM(lang) {
    const dict = T[lang];

    // <title>
    const page = document.body.dataset.page || 'index';
    const titleKey = `page_title_${page}`;
    if (dict[titleKey]) document.title = dict[titleKey];

    // data-i18n  →  textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });

    // data-i18n-html  →  innerHTML
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = dict[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });

    // data-i18n-placeholder  →  placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = dict[el.dataset.i18nPlaceholder];
      if (v !== undefined) el.placeholder = v;
    });

    // data-i18n-title  →  title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const v = dict[el.dataset.i18nTitle];
      if (v !== undefined) el.title = v;
    });

    // lang button label
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = LABELS[lang];

    // html[lang] attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
  }

  function t(key) {
    return (T[_lang] && T[_lang][key] !== undefined)
      ? T[_lang][key]
      : (T.ja[key] !== undefined ? T.ja[key] : key);
  }

  function cycle() {
    _lang = LANGS[(LANGS.indexOf(_lang) + 1) % LANGS.length];
    localStorage.setItem('bp_lang', _lang);
    _applyDOM(_lang);
    document.dispatchEvent(new CustomEvent('bp:langchange', { detail: { lang: _lang } }));
  }

  function init() {
    _lang = _detect();
    _applyDOM(_lang);
    const btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', cycle);
  }

  return {
    init,
    t,
    cycle,
    get currentLang() { return _lang; },
  };
})();

document.addEventListener('DOMContentLoaded', () => I18n.init());
