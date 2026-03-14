const PORTALS = [
  {
    id: 1,
    country: 'India',
    flag: '🇮🇳',
    name: 'National Cyber Crime Reporting Portal',
    org: 'Ministry of Home Affairs, Govt. of India',
    description: 'Official portal to report cybercrime including cyberbullying, online harassment, threats, and identity theft. Cases are forwarded to the relevant state police.',
    url: 'https://cybercrime.gov.in',
    helpline: '1930',
    helplineLabel: 'Cyber Crime Helpline',
    tags: ['Cyberbullying', 'Harassment', 'Threats', 'Identity Theft'],
    color: 'border-orange-300 bg-orange-50',
    badgeColor: 'bg-orange-100 text-orange-700',
    btnColor: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    id: 2,
    country: 'India',
    flag: '🇮🇳',
    name: 'iReport — NCPCR Child Helpline',
    org: 'National Commission for Protection of Child Rights',
    description: 'Report online child abuse, cyberbullying targeting minors, and exploitation of children. NCPCR takes strict action on complaints involving children.',
    url: 'https://ncpcr.gov.in',
    helpline: '1098',
    helplineLabel: 'Child Helpline (CHILDLINE)',
    tags: ['Child Safety', 'Minor Cyberbullying', 'Online Abuse'],
    color: 'border-red-300 bg-red-50',
    badgeColor: 'bg-red-100 text-red-700',
    btnColor: 'bg-red-600 hover:bg-red-700',
  },
  {
    id: 3,
    country: 'India',
    flag: '🇮🇳',
    name: 'Cyber Dost — MHA Social Media',
    org: 'Ministry of Home Affairs',
    description: 'Official government initiative for cyber safety awareness. Report cybercrime tips and get guidance on staying safe online via their social channels.',
    url: 'https://twitter.com/cyberdost',
    helpline: null,
    tags: ['Awareness', 'Guidance', 'Social Media Safety'],
    color: 'border-blue-300 bg-blue-50',
    badgeColor: 'bg-blue-100 text-blue-700',
    btnColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 4,
    country: 'USA',
    flag: '🇺🇸',
    name: 'FBI Internet Crime Complaint Center',
    org: 'Federal Bureau of Investigation (FBI)',
    description: 'File complaints about internet-facilitated criminal activity including cyberstalking, online threats, and harassment. Used for serious cybercrime cases.',
    url: 'https://ic3.gov',
    helpline: null,
    tags: ['Cyberstalking', 'Online Threats', 'Internet Crime'],
    color: 'border-indigo-300 bg-indigo-50',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    btnColor: 'bg-indigo-600 hover:bg-indigo-700',
  },
  {
    id: 5,
    country: 'USA',
    flag: '🇺🇸',
    name: 'StopBullying.gov',
    org: 'U.S. Department of Health & Human Services',
    description: 'Federal resource for bullying prevention with guides on how to report cyberbullying to schools, law enforcement, and social media platforms.',
    url: 'https://stopbullying.gov',
    helpline: null,
    tags: ['Cyberbullying', 'School Bullying', 'Prevention'],
    color: 'border-green-300 bg-green-50',
    badgeColor: 'bg-green-100 text-green-700',
    btnColor: 'bg-green-600 hover:bg-green-700',
  },
  {
    id: 6,
    country: 'USA',
    flag: '🇺🇸',
    name: 'NCMEC CyberTipline',
    org: 'National Center for Missing & Exploited Children',
    description: 'Report online exploitation, cyberbullying, and threats targeting children. NCMEC works directly with law enforcement and tech companies to act on reports.',
    url: 'https://www.missingkids.org/gethelpnow/cybertipline',
    helpline: '1-800-843-5678',
    helplineLabel: '24/7 Hotline',
    tags: ['Child Safety', 'Online Exploitation', 'Threats'],
    color: 'border-purple-300 bg-purple-50',
    badgeColor: 'bg-purple-100 text-purple-700',
    btnColor: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 7,
    country: 'Global',
    flag: '🌐',
    name: 'Report to Social Media Platforms',
    org: 'Meta · Google · Twitter/X · YouTube',
    description: 'Most platforms have built-in reporting tools. Report abusive content directly on Instagram, Facebook, YouTube, Twitter/X, and WhatsApp for quick takedowns.',
    url: 'https://www.facebook.com/help/reportlinks',
    helpline: null,
    tags: ['Instagram', 'Facebook', 'YouTube', 'Twitter/X'],
    color: 'border-gray-300 bg-gray-50',
    badgeColor: 'bg-gray-200 text-gray-700',
    btnColor: 'bg-gray-700 hover:bg-gray-800',
    extraLinks: [
      { label: 'Instagram', url: 'https://help.instagram.com/contact/383679321740945' },
      { label: 'YouTube', url: 'https://support.google.com/youtube/answer/2802268' },
      { label: 'Twitter/X', url: 'https://help.twitter.com/en/safety-and-security/report-abusive-behavior' },
      { label: 'WhatsApp', url: 'https://www.whatsapp.com/contact/?subject=harassment' },
    ],
  },
];

const STEPS = [
  { icon: '📸', title: 'Document Evidence', desc: 'Use our analyzer to flag and save toxic messages as evidence before reporting.' },
  { icon: '📋', title: 'Download Report', desc: 'Download a PDF report from your analysis history to attach to your complaint.' },
  { icon: '🌐', title: 'Choose Portal', desc: 'Select the appropriate portal below based on your country and type of incident.' },
  { icon: '✅', title: 'File Complaint', desc: 'Submit your complaint with the evidence. Keep the complaint ID for follow-up.' },
];

function PortalCard({ portal }) {
  return (
    <div className={`rounded-xl border-2 ${portal.color} p-5 flex flex-col gap-3 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{portal.flag}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{portal.country}</span>
        </div>
        {portal.helpline && (
          <div className="text-right">
            <p className="text-xs text-gray-500">{portal.helplineLabel}</p>
            <p className="font-bold text-gray-800 text-sm">{portal.helpline}</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-bold text-gray-800 text-base leading-snug mb-1">{portal.name}</h3>
        <p className="text-xs text-gray-500 font-medium mb-2">{portal.org}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{portal.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {portal.tags.map(tag => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${portal.badgeColor}`}>
            {tag}
          </span>
        ))}
      </div>

      {portal.extraLinks && (
        <div className="flex flex-wrap gap-2">
          {portal.extraLinks.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 hover:border-gray-500 transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}

      <a
        href={portal.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto w-full text-center py-2.5 rounded-lg text-white text-sm font-semibold transition-colors ${portal.btnColor}`}
      >
        Visit Portal ↗
      </a>
    </div>
  );
}

function ComplaintsPortal() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🚨</span>
          <h2 className="text-2xl font-bold text-gray-800">Official Complaints Portal</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Report cyberbullying and online harassment to official authorities. Use our platform to document evidence first, then file your complaint.
        </p>
      </div>

      {/* How to report steps */}
      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-5 mb-8">
        <h3 className="font-bold text-indigo-800 mb-4 text-sm uppercase tracking-wide">How to File a Complaint</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center text-2xl shadow-sm">
                {step.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-800">Step {i + 1}</p>
                <p className="text-xs font-semibold text-gray-700">{step.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-bold text-red-700 text-sm">Immediate Danger?</p>
          <p className="text-sm text-red-600">
            If you or someone else is in immediate danger, call <strong>112</strong> (India) or your local emergency number immediately. For cyber threats call the National Cyber Crime Helpline: <strong>1930</strong>.
          </p>
        </div>
      </div>

      {/* Portal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PORTALS.map(portal => (
          <PortalCard key={portal.id} portal={portal} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-600">Disclaimer:</strong> CyberGuard is an independent detection platform and is not affiliated with any government body. The portals listed above are official third-party resources. Always verify URLs before submitting personal information.
      </div>
    </div>
  );
}

export default ComplaintsPortal;
