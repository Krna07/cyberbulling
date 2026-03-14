import { useState } from 'react';

const STORIES = [
  {
    id: 1,
    name: 'Priya S.',
    avatar: '👩',
    age: 17,
    location: 'Mumbai',
    tag: 'Online Harassment',
    tagColor: 'bg-red-100 text-red-700',
    title: 'From Victim to Advocate',
    preview: 'I was bullied on Instagram for months. Every post I made got hateful comments...',
    story: `I was bullied on Instagram for months. Every post I made got hateful comments and people would screenshot and mock me in group chats. I stopped posting, stopped going out, and my grades dropped.

One day my teacher noticed and helped me report it to the school counselor. I also used a detection tool to document all the toxic messages as evidence. Slowly, with support from my family and friends, I started healing.

Today I run a small awareness page about cyberbullying. If I can help even one person feel less alone, it's worth it. You are stronger than the words people throw at you.`,
    likes: 142,
    comments: 38,
    timeAgo: '2 days ago',
  },
  {
    id: 2,
    name: 'Arjun M.',
    avatar: '👦',
    age: 19,
    location: 'Hyderabad',
    tag: 'Identity Hate',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'Finding My Tribe',
    preview: 'People online mocked me for my accent and background. I almost quit social media entirely...',
    story: `People online mocked me for my accent and background. Gaming forums, comment sections — everywhere I went someone had something cruel to say. I almost quit social media entirely.

What helped me was finding a small Discord community of people who had been through the same thing. We talked, shared experiences, and reminded each other that the problem was never us.

I also started documenting every incident. Having evidence made me feel less powerless. Eventually I reported the worst offenders and two accounts were banned. Don't suffer in silence — there are people who understand.`,
    likes: 98,
    comments: 21,
    timeAgo: '5 days ago',
  },
  {
    id: 3,
    name: 'Sneha R.',
    avatar: '👩‍🦱',
    age: 22,
    location: 'Bangalore',
    tag: 'Workplace Bullying',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Standing Up at Work',
    preview: 'My coworker would send passive-aggressive messages and CC my manager on everything...',
    story: `My coworker would send passive-aggressive messages and CC my manager on everything to make me look incompetent. It was subtle but constant. I started dreading opening my inbox every morning.

I began saving every message and used an AI tool to flag the toxic patterns. When I finally brought it to HR with documented evidence, they took it seriously.

The situation improved significantly. What I learned: document everything, trust your instincts, and don't minimize what you're going through just because it's "not physical." Emotional harm is real harm.`,
    likes: 211,
    comments: 54,
    timeAgo: '1 week ago',
  },
  {
    id: 4,
    name: 'Rahul K.',
    avatar: '🧑',
    age: 16,
    location: 'Delhi',
    tag: 'School Bullying',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'The Day I Spoke Up',
    preview: 'A group in my class made a fake profile of me and posted embarrassing things...',
    story: `A group in my class made a fake profile of me and posted embarrassing things. Everyone was laughing and I had no idea until a friend told me. I felt humiliated and didn't want to go to school.

My parents helped me report the fake account and we went to the school principal together. It was scary but the accounts were taken down within a week.

The hardest part was telling someone. Once I did, things moved fast. If you're going through this — tell a trusted adult. You don't have to handle it alone. Speaking up was the bravest thing I ever did.`,
    likes: 176,
    comments: 43,
    timeAgo: '1 week ago',
  },
  {
    id: 5,
    name: 'Meera T.',
    avatar: '👩‍🦰',
    age: 24,
    location: 'Chennai',
    tag: 'Stress & Recovery',
    tagColor: 'bg-green-100 text-green-700',
    title: 'Healing Takes Time — And That\'s Okay',
    preview: 'After years of online abuse I thought I\'d never feel normal again. Therapy changed everything...',
    story: `After years of online abuse I thought I'd never feel normal again. I had anxiety, trust issues, and I'd flinch every time my phone buzzed. Therapy changed everything.

My therapist helped me understand that my reactions were normal responses to abnormal situations. I wasn't broken — I was healing.

I also joined an online support group where people shared their stories. Reading about others who had come through similar experiences gave me so much hope. Recovery isn't linear, but it is possible. Be patient with yourself.`,
    likes: 289,
    comments: 67,
    timeAgo: '2 weeks ago',
  },
  {
    id: 6,
    name: 'Vikram N.',
    avatar: '🧔',
    age: 21,
    location: 'Pune',
    tag: 'Threats & Intimidation',
    tagColor: 'bg-yellow-100 text-yellow-700',
    title: 'Taking Back Control',
    preview: 'Someone was sending me threatening messages anonymously. I felt paralyzed with fear...',
    story: `Someone was sending me threatening messages anonymously. I felt paralyzed with fear and didn't know what to do. I didn't even know if I should take it seriously.

A friend suggested I use a detection tool to analyze and document the messages. Having them flagged as threats gave me the confidence to go to the police with actual evidence.

The case is still ongoing but I feel so much safer now. The most important thing I did was stop suffering alone and start taking action. Fear is what they want — don't give it to them.`,
    likes: 134,
    comments: 29,
    timeAgo: '3 weeks ago',
  },
];

const TAGS = ['All', 'Online Harassment', 'Identity Hate', 'School Bullying', 'Workplace Bullying', 'Stress & Recovery', 'Threats & Intimidation'];

function StoryCard({ story, onRead }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
          {story.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm">{story.name}, {story.age}</p>
          <p className="text-xs text-gray-500">{story.location} · {story.timeAgo}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${story.tagColor}`}>
          {story.tag}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-1">{story.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{story.preview}</p>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>❤️ {story.likes}</span>
          <span>💬 {story.comments}</span>
        </div>
        <button
          onClick={() => onRead(story)}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Read full story →
        </button>
      </div>
    </div>
  );
}

function StoryModal({ story, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${story.tagColor}`}>
              {story.tag}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
              {story.avatar}
            </div>
            <div>
              <p className="font-bold text-gray-800">{story.name}, {story.age}</p>
              <p className="text-sm text-gray-500">{story.location} · {story.timeAgo}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">{story.title}</h2>

          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
            {story.story}
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
            <span>❤️ {story.likes} found this helpful</span>
            <span>💬 {story.comments} comments</span>
          </div>

          <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-sm text-indigo-700 font-medium">
              💙 You are not alone. If you're going through something similar, use our detection tool to document evidence and reach out for support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Community() {
  const [activeTag, setActiveTag] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = STORIES.filter(s => {
    const matchTag = activeTag === 'All' || s.tag === activeTag;
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🤝</span>
          <h2 className="text-2xl font-bold text-gray-800">Community Support</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Real stories from people who faced cyberbullying and came out stronger. You are not alone.
        </p>
      </div>

      {/* Stats banner */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-indigo-50 rounded-xl p-3 text-center border border-indigo-100">
          <p className="text-2xl font-bold text-indigo-700">1.2k+</p>
          <p className="text-xs text-indigo-600">Stories Shared</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
          <p className="text-2xl font-bold text-green-700">8.4k+</p>
          <p className="text-xs text-green-600">Members Helped</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100">
          <p className="text-2xl font-bold text-purple-700">94%</p>
          <p className="text-xs text-purple-600">Feel Less Alone</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stories..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
        />
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
              activeTag === tag
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Stories grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">🔍</p>
          <p>No stories found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(story => (
            <StoryCard key={story.id} story={story} onRead={setSelectedStory} />
          ))}
        </div>
      )}

      {/* Share CTA */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 text-center">
        <p className="text-sm font-semibold text-gray-700 mb-1">Have a story to share?</p>
        <p className="text-xs text-gray-500 mb-3">Your experience could inspire and help someone going through the same thing.</p>
        <button className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
          Share Your Story (Coming Soon)
        </button>
      </div>

      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </div>
  );
}

export default Community;
