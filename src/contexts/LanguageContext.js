import React, { createContext, useContext, useState, useMemo } from 'react';

// Simple i18n context with English and Arabic translations
// Keep layout/look unchanged by NOT forcing RTL to avoid layout shifts.

const translations = {
  en: {
    hero: {
      title: 'CRAFTING DIGITAL\nEXCELLENCE\nWORLDWIDE',
      description: 'We transform ambitious ideas into powerful digital solutions, serving clients across Europe and the Middle East with cutting-edge technology and strategic innovation.'
    },
    approach: { title: 'Our Philosophy', quote: 'We believe in the power of human-centered design and technological innovation. Based in Cyprus and Lebanon, we blend local expertise with global perspectives to create solutions that drive real business transformation.' },
    services: {
      eyebrow: 'Services',
      title: 'Delivering innovative IT solutions across regional markets',
      cards: {
        1: { title: 'IT & AI Solutions', desc: 'Encelyte developers are ready to implement visual aesthetics into code, adopting the latest technologies to ensure a cutting-edge result. We provide regular updates ensuring the final product surpasses expectations.', tags: ['AI Solutions','IT Consulting','Technology Strategy','Digital Transformation','System Integration'] },
        2: { title: 'Strategic Consulting', desc: 'Encelyte crafts strategies that resonate with brand essence. Blending creativity with strategic storytelling, we create interactions that are visually engaging and memorable.', tags: ['Business Strategy','Technology Planning','Process Optimization','Risk Assessment','Market Analysis'] },
        3: { title: 'Web & App Development', desc: 'We work collaboratively to build unified digital experiences ensuring every deliverable aligns with your objectives and user expectations.', tags: ['Web Development','Mobile Apps','E-commerce','API Integration','Cloud Solutions'] },
        4: { title: 'Regional Market Access', desc: 'We enhance visibility through data-driven approaches—adapting quickly to trends to keep your brand competitive and impactful across regions.', tags: ['Europe Market Entry','MEA Expansion','Cross-Regional Strategy'] }
      },
      toggleAllOpen: 'View all services',
      toggleAllClose: 'Collapse view'
    },
    recognition: {
      eyebrow: 'Recognition',
      title: 'Trusted technology partner across Europe and MEA regions',
      items: {
        1: { title: 'Regional Excellence', subtitle: 'Leading IT Consulting Firm - Cyprus' },
        2: { title: 'Client Success', subtitle: '95% Client Satisfaction Rate' },
        3: { title: 'Technology Leadership', subtitle: 'AI Solutions Expert' }
      }
    },
    insights: {
      title: 'Real-Time Performance',
      subtitle: 'Live metrics showcasing our impact across projects and client outcomes. These numbers reflect our commitment to delivering measurable results in technology innovation and strategic growth.',
      labels: { impact: 'Client Impact', growth: 'Avg Growth', retention: 'Retention', deploys: 'Deploys' },
      descriptions: { impact: 'Successful launches', growth: 'Average uplift', retention: 'Client retention', deploys: 'Production deploys' }
    },
    footer: {
      headline: 'Curious how Encelyte can help?',
      quick: { home: 'Home', services: 'Services', contact: 'Contact', terms: 'Terms of Use', privacy: 'Privacy Policy' },
      legal: 'Encelyte, LLC © 2025. All rights reserved.',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy'
    },
    marquee: {
      rightText: 'EXPLORE OUR WORK',
      leftText: 'BOLD SOLUTIONS!'
    },
    header: { cta: "Let's Build Together!", menu: 'Menu', close: 'Close', admin: 'Admin', careers: 'Careers', home: 'Home', services: 'Services', connect: 'Connect', technologyAI: 'Technology & AI' },
    contact: { title: 'Contact', headline: "Have a project you'd like to talk about?", nameQ: 'What is your name?', emailQ: 'What is your email?', companyQ: 'What is the name of your company/organisation?', messageQ: 'Tell us a bit more about your project', send: 'Send message', whatsapp: 'WhatsApp', bookCall: 'Book a call', location: 'Nicosia, Cyprus', local: 'Local' },
    generic: { bookCall: 'Book a call' },
    langToggle: { en: 'EN', ar: 'AR', aria: 'Toggle language' },
    terms: {
      title: 'Terms and Conditions',
      article1: {
        title: 'Article 1 – Scope and Definitions',
        p1: '1.1 These Terms and Conditions govern the provision of IT consulting and development services by Encelyte, a consulting and development firm specializing in IT, technology, and artificial intelligence solutions.',
        p2: '1.2 Encelyte operates with branches in Cyprus and Lebanon, strategically connecting European and Middle East and Africa (MEA) markets.',
        p3: '1.3 These terms apply to all services provided by Encelyte, including but not limited to IT consulting, AI development, website development, application development, and strategic technological planning.'
      },
      article2: {
        title: 'Article 2 – Service Definitions',
        encelyte: 'Encelyte: Refers to Encelyte, LLC, a consulting and development firm providing IT, technology, and AI solutions.',
        client: 'Client: Any natural or legal person who enters into a service agreement with Encelyte.',
        services: 'Services: All consulting, development, and technological services provided by Encelyte, including:',
        servicesList: [
          'Custom IT and AI consulting services',
          'Website development and design',
          'Application development (mobile and web applications)',
          'Strategic technological planning and integration',
          'AI solution development and implementation',
          'Cross-regional market technology consulting'
        ],
        project: 'Project: Any specific assignment or engagement undertaken by Encelyte for a Client.'
      },
      article3: {
        title: 'Article 3 – Service Delivery and Scope',
        p1: '3.1 Encelyte provides comprehensive consulting and development services that address business challenges by leveraging localized market knowledge and cross-regional expertise.',
        p2: '3.2 Services are delivered through project-based contracts, retainer consulting agreements, and technology development services for clients in both MEA and European markets.',
        p3: '3.3 Each project will be defined by a detailed scope of work, timeline, and deliverables agreed upon between Encelyte and the Client.',
        p4: '3.4 Encelyte reserves the right to subcontract certain aspects of the work to qualified third-party providers while maintaining overall project responsibility.'
      },
      article4: {
        title: 'Article 4 – Client Responsibilities',
        p1: '4.1 The Client agrees to provide accurate and complete information necessary for the successful delivery of services.',
        p2: '4.2 The Client is responsible for:',
        responsibilities: [
          'Providing timely feedback and approvals',
          'Ensuring compliance with applicable laws and regulations',
          'Maintaining appropriate security measures for any systems or data provided',
          'Obtaining necessary licenses and permissions for third-party content or services'
        ],
        p3: '4.3 The Client acknowledges that delays in providing required information or approvals may impact project timelines and delivery dates.'
      },
      article5: {
        title: 'Article 5 – Intellectual Property Rights',
        p1: '5.1 All intellectual property created by Encelyte during the course of providing services remains the property of Encelyte unless otherwise specified in writing.',
        p2: '5.2 Encelyte grants the Client a non-exclusive, non-transferable license to use the deliverables for the intended purpose as specified in the project agreement.',
        p3: '5.3 The Client retains ownership of any pre-existing intellectual property provided to Encelyte for the project.',
        p4: '5.4 Any third-party intellectual property incorporated into deliverables will be subject to the respective third-party license terms.'
      },
      article6: {
        title: 'Article 6 – Confidentiality and Data Protection',
        p1: '6.1 Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement.',
        p2: '6.2 Encelyte will implement appropriate security measures to protect Client data and information.',
        p3: '6.3 The Client is responsible for ensuring compliance with applicable data protection laws and regulations in their jurisdiction.',
        p4: '6.4 Confidentiality obligations survive the termination of the service agreement.'
      },
      article7: {
        title: 'Article 7 – Payment Terms',
        p1: '7.1 Payment terms will be specified in individual project agreements and may include:',
        paymentTypes: [
          'Project-based pricing with milestone payments',
          'Retainer agreements with monthly or quarterly billing',
          'Hourly rates for consulting services'
        ],
        p2: '7.2 Invoices are due within 30 days of issuance unless otherwise specified.',
        p3: '7.3 Late payments may result in suspension of services and may incur additional charges.',
        p4: '7.4 All fees are exclusive of applicable taxes, which will be added to invoices as required by law.'
      },
      article8: {
        title: 'Article 8 – Limitation of Liability',
        p1: '8.1 Encelyte\'s liability is limited to the amount paid by the Client for the specific services giving rise to the claim.',
        p2: '8.2 Encelyte is not liable for any indirect, incidental, or consequential damages.',
        p3: '8.3 Encelyte does not guarantee specific business outcomes or results from the implementation of technology solutions.',
        p4: '8.4 The Client acknowledges that technology solutions may require ongoing maintenance and updates.'
      },
      article9: {
        title: 'Article 9 – Termination',
        p1: '9.1 Either party may terminate the service agreement with 30 days written notice.',
        p2: '9.2 Encelyte may terminate immediately if the Client fails to make timely payments or breaches material terms of the agreement.',
        p3: '9.3 Upon termination, the Client will pay for all services rendered up to the termination date.'
      },
      article10: {
        title: 'Article 10 – Force Majeure',
        p1: '10.1 Neither party shall be liable for any delay or failure to perform due to circumstances beyond their reasonable control, including but not limited to natural disasters, government actions, or technological failures.',
        p2: '10.2 The affected party will notify the other party promptly of any force majeure event and its expected duration.'
      },
      article11: {
        title: 'Article 11 – Governing Law and Dispute Resolution',
        p1: '11.1 These terms are governed by the laws of the jurisdiction where Encelyte\'s primary office is located.',
        p2: '11.2 Any disputes will be resolved through good faith negotiations between the parties.',
        p3: '11.3 If negotiations fail, disputes may be resolved through mediation or arbitration as specified in individual agreements.'
      },
      article12: {
        title: 'Article 12 – Amendments and Updates',
        p1: '12.1 Encelyte reserves the right to update these terms and conditions from time to time.',
        p2: '12.2 Clients will be notified of any material changes to these terms.',
        p3: '12.3 Continued use of services after notification of changes constitutes acceptance of the updated terms.'
      },
      article13: {
        title: 'Article 13 – Contact Information',
        intro: 'For questions regarding these terms and conditions, please contact Encelyte at:',
        email: 'Email: contact@encelyte.com',
        website: 'Website: https://encelyte.com'
      },
      lastUpdated: 'Last Updated: August 2025'
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'At Encelyte, we are committed to protecting your privacy and safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect the data you provide to us through our IT consulting and development services, website interactions, and client communications. As a consulting and development firm specializing in IT, technology, and artificial intelligence solutions, we understand the importance of data security and privacy in today\'s digital landscape.',
      infoWeCollect: {
        title: 'Information We Collect',
        intro: 'We collect information that you provide directly to us, including:',
        contactInfo: 'Contact Information: Name, email address, phone number, and company details when you engage our consulting services or request information about our IT and AI development solutions.',
        projectInfo: 'Project Information: Technical requirements, business objectives, and project specifications when you seek our development or consulting services.',
        commData: 'Communication Data: Correspondence, feedback, and support requests related to our services.',
        websiteUsage: 'Website Usage: Information about how you interact with our website, including pages visited, time spent, and technical data such as IP address and browser type.',
        serviceData: 'Service Delivery Data: Information necessary for providing our IT consulting, website development, application development, and AI solution services.'
      },
      howWeUse: {
        title: 'How We Use Your Information',
        intro: 'We use the collected information for the following purposes:',
        serviceDelivery: 'Service Delivery: To provide and maintain our IT consulting and development services, including website development, application development, and AI solution implementation.',
        clientComm: 'Client Communication: To communicate with you about project progress, service updates, and respond to inquiries about our technology solutions.',
        serviceImprovement: 'Service Improvement: To analyze usage patterns and improve our consulting and development services based on client feedback and market trends.',
        businessOps: 'Business Operations: To manage client relationships, process payments, and maintain our service quality across our Cyprus and Lebanon operations.',
        legalCompliance: 'Legal Compliance: To comply with applicable laws and regulations governing our consulting and development services.'
      },
      contactInfo: {
        title: 'Contact Information',
        email: 'Email: contact@encelyte.com',
        website: 'Website: https://encelyte.com',
        note: 'We are committed to responding to inquiries and addressing any privacy concerns.'
      },
      lastUpdated: 'Last Updated: August 2025'
    }
  },
  ar: {
    hero: {
      title: 'نبتكر التميز\nالرقمي\nحول العالم',
      description: 'نحوّل الأفكار الطموحة إلى حلول رقمية قوية، ونخدم العملاء في أوروبا والشرق الأوسط بتقنيات مبتكرة واستراتيجيات متقدمة.'
    },
    approach: { title: 'فلسفتنا', quote: 'نؤمن بقوة التصميم المرتكز على الإنسان والابتكار التكنولوجي. من مقرّنا في قبرص ولبنان نمزج الخبرة المحلية برؤية عالمية لابتكار حلول تُحدث تحولاً حقيقياً للأعمال.' },
    services: {
      eyebrow: 'الخدمات',
      title: 'تقديم حلول تقنية مبتكرة عبر الأسواق الإقليمية',
      cards: {
        1: { title: 'حلول التقنية والذكاء الاصطناعي', desc: 'مطوّرو Encelyte مستعدون لتحويل الجماليات البصرية إلى كود مع اعتماد أحدث التقنيات لضمان نتيجة متقدمة تتجاوز التوقعات.', tags: ['حلول ذكاء اصطناعي','استشارات تقنية','استراتيجية تقنية','تحول رقمي','تكامل الأنظمة'] },
        2: { title: 'الاستشارات الاستراتيجية', desc: 'نصوغ استراتيجيات تنسجم مع جوهر العلامة. نمزج الإبداع بسرد استراتيجي لصناعة تجارب مرئية مؤثرة ولا تُنسى.', tags: ['استراتيجية أعمال','تخطيط تقني','تحسين العمليات','تقييم المخاطر','تحليل السوق'] },
        3: { title: 'تطوير الويب والتطبيقات', desc: 'نعمل بتعاون لبناء تجارب رقمية موحّدة تضمن توافق كل مخرجات مع أهدافك وتوقعات المستخدم.', tags: ['تطوير مواقع','تطبيقات جوال','تجارة إلكترونية','تكامل واجهات برمجة','حلول سحابية'] },
        4: { title: 'الوصول إلى الأسواق الإقليمية', desc: 'نعزز الظهور باستخدام نهج قائم على البيانات ونواكب الاتجاهات بسرعة لنضمن بقاء علامتك منافسة وفعّالة.', tags: ['دخول سوق أوروبا','التوسع بالشرق الأوسط وأفريقيا','استراتيجية عابرة للمناطق'] }
      },
      toggleAllOpen: 'عرض جميع الخدمات',
      toggleAllClose: 'إغلاق العرض'
    },
    recognition: {
      eyebrow: 'الإنجازات',
      title: 'شريك تقني موثوق في أوروبا ومنطقة الشرق الأوسط وأفريقيا',
      items: {
        1: { title: 'تميز إقليمي', subtitle: 'رائدة في استشارات تكنولوجيا المعلومات - قبرص' },
        2: { title: 'نجاح العملاء', subtitle: 'معدل رضا 95%' },
        3: { title: 'ريادة تقنية', subtitle: 'خبير حلول الذكاء الاصطناعي' }
      }
    },
    insights: {
      title: 'مؤشرات مباشرة',
      subtitle: 'مؤشرات تأثير تتحدث لحظياً مع تقدم الفريق. (عرض تجريبي – الربط الخلفي لاحقاً)',
      labels: { impact: 'أثر العملاء', growth: 'متوسط النمو', retention: 'الاحتفاظ', deploys: 'نشرات' },
      descriptions: { impact: 'إطلاقات ناجحة', growth: 'متوسط الزيادة', retention: 'احتفاظ العملاء', deploys: 'نشرات إنتاج' }
    },
    footer: {
      headline: 'هل تريد معرفة كيف نساعدك؟',
      quick: { home: 'الرئيسية', services: 'الخدمات', contact: 'تواصل', terms: 'شروط الاستخدام', privacy: 'سياسة الخصوصية' },
      legal: 'جميع الحقوق محفوظة 2025 © Encelyte',
      terms: 'شروط الاستخدام',
      privacy: 'سياسة الخصوصية'
    },
    marquee: {
      rightText: 'استكشف أعمالنا',
      leftText: 'حلول جريئة!'
    },
    header: { cta: 'لنَبنِ معاً!', menu: 'القائمة', close: 'إغلاق', admin: 'الإدارة', careers: 'الوظائف', home: 'الرئيسية', services: 'الخدمات', connect: 'تواصل', technologyAI: 'التقنية والذكاء الاصطناعي' },
    contact: { title: 'تواصل', headline: 'هل لديك مشروع تود مناقشته؟', nameQ: 'ما اسمك؟', emailQ: 'ما بريدك الإلكتروني؟', companyQ: 'ما اسم شركتك أو منظمتك؟', messageQ: 'اخبرنا أكثر عن مشروعك', send: 'إرسال الرسالة', whatsapp: 'واتساب', bookCall: 'احجز مكالمة', location: 'نيقوسيا، قبرص', local: 'محلي' },
    generic: { bookCall: 'احجز مكالمة' },
    langToggle: { en: 'EN', ar: 'AR', aria: 'تبديل اللغة' },
    terms: {
      title: 'الشروط والأحكام',
      article1: {
        title: 'المادة 1 – النطاق والتعريفات',
        p1: '1.1 تحكم هذه الشروط والأحكام تقديم خدمات الاستشارات والتطوير في تكنولوجيا المعلومات من قبل Encelyte، وهي شركة استشارات وتطوير متخصصة في تكنولوجيا المعلومات والتكنولوجيا وحلول الذكاء الاصطناعي.',
        p2: '1.2 تعمل Encelyte من خلال فروع في قبرص ولبنان، وتربط استراتيجياً بين الأسواق الأوروبية والشرق الأوسط وأفريقيا.',
        p3: '1.3 تنطبق هذه الشروط على جميع الخدمات المقدمة من Encelyte، بما في ذلك على سبيل المثال لا الحصر الاستشارات التقنية، وتطوير الذكاء الاصطناعي، وتطوير المواقع الإلكترونية، وتطوير التطبيقات، والتخطيط التكنولوجي الاستراتيجي.'
      },
      article2: {
        title: 'المادة 2 – تعريفات الخدمات',
        encelyte: 'Encelyte: تشير إلى Encelyte, LLC، وهي شركة استشارات وتطوير تقدم حلول تكنولوجيا المعلومات والتكنولوجيا والذكاء الاصطناعي.',
        client: 'العميل: أي شخص طبيعي أو اعتباري يدخل في اتفاقية خدمة مع Encelyte.',
        services: 'الخدمات: جميع خدمات الاستشارات والتطوير والتكنولوجيا المقدمة من Encelyte، بما في ذلك:',
        servicesList: [
          'خدمات استشارات تكنولوجيا المعلومات والذكاء الاصطناعي المخصصة',
          'تطوير وتصميم المواقع الإلكترونية',
          'تطوير التطبيقات (تطبيقات الجوال والويب)',
          'التخطيط والتكامل التكنولوجي الاستراتيجي',
          'تطوير وتنفيذ حلول الذكاء الاصطناعي',
          'استشارات التكنولوجيا عبر الأسواق الإقليمية'
        ],
        project: 'المشروع: أي مهمة أو التزام محدد تقوم به Encelyte للعميل.'
      },
      article3: {
        title: 'المادة 3 – تسليم الخدمات والنطاق',
        p1: '3.1 تقدم Encelyte خدمات استشارية وتطويرية شاملة تعالج تحديات الأعمال من خلال الاستفادة من المعرفة المحلية والخبرة عبر الإقليمية.',
        p2: '3.2 يتم تقديم الخدمات من خلال عقود قائمة على المشاريع، واتفاقيات الاستشارة المتواصلة، وخدمات التطوير التكنولوجي للعملاء في أسواق الشرق الأوسط وأفريقيا وأوروبا.',
        p3: '3.3 سيتم تحديد كل مشروع بنطاق عمل مفصل وجدولة زمنية ومخرجات متفق عليها بين Encelyte والعميل.',
        p4: '3.4 تحتفظ Encelyte بالحق في التعاقد من الباطن لبعض جوانب العمل مع مقدمي خدمات مؤهلين من أطراف ثالثة مع الحفاظ على المسؤولية الشاملة للمشروع.'
      },
      article4: {
        title: 'المادة 4 – مسؤوليات العميل',
        p1: '4.1 يوافق العميل على تقديم معلومات دقيقة وكاملة ضرورية لتسليم الخدمات بنجاح.',
        p2: '4.2 العميل مسؤول عن:',
        responsibilities: [
          'تقديم التعليقات والموافقات في الوقت المناسب',
          'ضمان الامتثال للقوانين واللوائح المعمول بها',
          'الحفاظ على تدابير أمنية مناسبة لأي أنظمة أو بيانات مقدمة',
          'الحصول على التراخيص والأذونات اللازمة لمحتوى الطرف الثالث أو الخدمات',
          'تقديم الوصول إلى الأنظمة والمعلومات اللازمة لإنجاز المشروع'
        ]
      },
      article5: {
        title: 'المادة 5 – الدفع والفواتير',
        p1: '5.1 تستند أسعار الخدمات إلى نطاق العمل المتفق عليه ويتم تحديدها في مقترح المشروع أو بيان العمل.',
        p2: '5.2 شروط الدفع:',
        paymentTerms: [
          'الفواتير مستحقة الدفع خلال 30 يومًا من تاريخ الإصدار',
          'قد تتطلب المشاريع دفعة مقدمة أو مدفوعات على مراحل',
          'الرسوم المتأخرة قد تطبق على المدفوعات المتأخرة',
          'جميع الرسوم مذكورة بالدولار الأمريكي ما لم يُذكر خلاف ذلك'
        ]
      },
      article6: {
        title: 'المادة 6 – الملكية الفكرية',
        p1: '6.1 تحتفظ Encelyte بجميع الحقوق والملكية والمصلحة في:',
        encelyteFights: [
          'المنهجيات والعمليات والأدوات المطورة مسبقًا',
          'المعرفة العامة والخبرة المستخدمة في تقديم الخدمات',
          'أي تحسينات على الممتلكات الفكرية الموجودة لـ Encelyte'
        ],
        p2: '6.2 يحتفظ العميل بالملكية في:',
        clientRights: [
          'البيانات والمحتوى المقدم إلى Encelyte',
          'العمل المخصص المطور خصيصًا للعميل (عند دفع الرسوم بالكامل)',
          'الملكية الفكرية الموجودة للعميل'
        ]
      },
      article7: {
        title: 'المادة 7 – السرية',
        p1: '7.1 قد تشارك كلا الطرفين معلومات سرية أثناء تسليم الخدمات.',
        p2: '7.2 تلتزم كلا الطرفين بـ:',
        obligations: [
          'الحفاظ على سرية المعلومات الحساسة',
          'استخدام المعلومات السرية فقط لأغراض المشروع',
          'تنفيذ تدابير حماية مناسبة',
          'إرجاع أو تدمير المعلومات السرية عند الطلب'
        ]
      },
      article8: {
        title: 'المادة 8 – الضمانات والمسؤولية',
        p1: '8.1 تضمن Encelyte أن الخدمات ستُؤدى بطريقة مهنية وفقًا لمعايير الصناعة.',
        p2: '8.2 حدود المسؤولية:',
        limitations: [
          'المسؤولية الإجمالية محدودة بالرسوم المدفوعة للمشروع',
          'لا مسؤولية عن الأضرار التبعية أو غير المباشرة',
          'العميل مسؤول عن النسخ الاحتياطي للبيانات والاسترداد',
          'الضمانات محدودة بفترة 90 يومًا بعد التسليم'
        ]
      },
      article9: {
        title: 'المادة 9 – إنهاء العقد',
        p1: '9.1 يمكن لأي من الطرفين إنهاء هذه الاتفاقية:',
        terminationReasons: [
          'بإشعار مكتوب مدته 30 يومًا دون سبب',
          'فورًا في حالة الإخلال الجوهري',
          'في حالة الإفلاس أو الإعسار',
          'انتهاك شروط السرية أو الأمان'
        ],
        p2: '9.2 عند الإنهاء، يبقى العميل مسؤولاً عن الرسوم المستحقة للعمل المكتمل.'
      },
      article10: {
        title: 'المادة 10 – القانون الحاكم',
        p1: '10.1 تحكم هذه الاتفاقية قوانين قبرص ولبنان حسب الاقتضاء.',
        p2: '10.2 أي نزاعات ستحل من خلال:',
        disputeResolution: [
          'التفاوض بحسن نية أولاً',
          'الوساطة إذا لزم الأمر',
          'التحكيم أو الإجراءات القضائية كملاذ أخير'
        ]
      },
      article11: {
        title: 'المادة 11 – تعديل الشروط',
        p1: '11.1 قد تحدث Encelyte هذه الشروط والأحكام بإشعار مكتوب.',
        p2: '11.2 التحديثات تصبح سارية المفعول:',
        effectiveTerms: [
          '30 يومًا بعد الإشعار للعملاء الحاليين',
          'فورًا للمشاريع الجديدة',
          'مع موافقة صريحة للتغييرات الجوهرية'
        ]
      },
      article12: {
        title: 'المادة 12 – أحكام متنوعة',
        p1: '12.1 أحكام إضافية:',
        provisions: [
          'إذا كان أي بند غير قابل للتنفيذ، تبقى الأحكام الأخرى سارية',
          'هذه الاتفاقية تشكل الاتفاق الكامل بين الطرفين',
          'التعديلات يجب أن تكون مكتوبة وموقعة',
          'لا تنازل عن الحقوق ما لم يكن مكتوبًا'
        ]
      },
      article13: {
        title: 'المادة 13 – معلومات الاتصال',
        p1: '13.1 للأسئلة حول هذه الشروط والأحكام، يرجى الاتصال بـ:',
        contactInfo: {
          email: 'البريد الإلكتروني: contact@encelyte.com',
          website: 'الموقع الإلكتروني: www.encelyte.com'
        },
        p2: '13.2 نحن ملتزمون بالاستجابة للاستفسارات ومعالجة أي مخاوف قانونية.'
      },
      lastUpdated: 'آخر تحديث: أغسطس 2025'
    },
    privacy: {
      title: 'سياسة الخصوصية',
      intro: 'في Encelyte، نحن ملتزمون بحماية خصوصيتك وحماية معلوماتك الشخصية. تشرح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي البيانات التي تقدمها لنا من خلال خدمات الاستشارات والتطوير التقني، والتفاعلات على الموقع الإلكتروني، والتواصل مع العملاء. كشركة استشارات وتطوير متخصصة في تكنولوجيا المعلومات والتكنولوجيا وحلول الذكاء الاصطناعي، نحن ندرك أهمية أمان البيانات والخصوصية في المشهد الرقمي اليوم.',
      infoWeCollect: {
        title: 'المعلومات التي نجمعها',
        intro: 'نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:',
        contactInfo: 'معلومات الاتصال: الاسم وعنوان البريد الإلكتروني ورقم الهاتف وتفاصيل الشركة عندما تتعامل مع خدماتنا الاستشارية أو تطلب معلومات حول حلول تكنولوجيا المعلومات والذكاء الاصطناعي.',
        projectInfo: 'معلومات المشروع: المتطلبات التقنية وأهداف العمل ومواصفات المشروع عندما تسعى للحصول على خدماتنا التطويرية أو الاستشارية.',
        commData: 'بيانات التواصل: المراسلات والتعليقات وطلبات الدعم المتعلقة بخدماتنا.',
        websiteUsage: 'استخدام الموقع الإلكتروني: معلومات حول كيفية تفاعلك مع موقعنا الإلكتروني، بما في ذلك الصفحات المُزارة والوقت المُستغرق والبيانات التقنية مثل عنوان IP ونوع المتصفح.',
        serviceData: 'بيانات تقديم الخدمة: المعلومات اللازمة لتقديم خدمات الاستشارات التقنية وتطوير المواقع الإلكترونية وتطوير التطبيقات وحلول الذكاء الاصطناعي.'
      },
      howWeUse: {
        title: 'كيف نستخدم معلوماتك',
        intro: 'نستخدم المعلومات المجمعة للأغراض التالية:',
        serviceDelivery: 'تقديم الخدمة: لتقديم والحفاظ على خدمات الاستشارات والتطوير التقني، بما في ذلك تطوير المواقع الإلكترونية وتطوير التطبيقات وتنفيذ حلول الذكاء الاصطناعي.',
        clientComm: 'التواصل مع العملاء: للتواصل معك حول تقدم المشروع وتحديثات الخدمة والرد على الاستفسارات حول حلولنا التكنولوجية.',
        serviceImprovement: 'تحسين الخدمة: لتحليل أنماط الاستخدام وتحسين خدماتنا الاستشارية والتطويرية بناءً على تعليقات العملاء واتجاهات السوق.',
        businessOps: 'العمليات التجارية: لإدارة علاقات العملاء ومعالجة المدفوعات والحفاظ على جودة خدماتنا عبر عملياتنا في قبرص ولبنان.',
        legalCompliance: 'الامتثال القانوني: للامتثال للقوانين واللوائح المعمول بها التي تحكم خدماتنا الاستشارية والتطويرية.'
      },
      contactInfo: {
        title: 'معلومات الاتصال',
        email: 'البريد الإلكتروني: contact@encelyte.com',
        website: 'الموقع الإلكتروني: https://encelyte.com',
        note: 'نحن ملتزمون بالرد على الاستفسارات ومعالجة أي مخاوف تتعلق بالخصوصية.'
      },
      lastUpdated: 'آخر تحديث: أغسطس 2025'
    }
  }
};

const LanguageContext = createContext({ language: 'en', setLanguage: () => {}, toggleLanguage: () => {}, t: (k) => k, langCode: 'en' });

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const toggleLanguage = () => setLanguage(l => l === 'en' ? 'ar' : 'en');
  const t = useMemo(() => {
    return (key) => {
      const dict = translations[language];
      if (!key) return '';
      return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict) || key;
    };
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage, toggleLanguage, t, langCode: language }), [language, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
