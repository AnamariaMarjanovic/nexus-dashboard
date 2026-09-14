import { useEffect, useState } from 'react';

const teamMembers = [
  { name: 'Anamaria Oršulić', role: 'Frontend Lead', initials: 'AO' },
  { name: 'Marco Rossi', role: 'Backend Developer', initials: 'MR' },
  { name: 'Elena Bianchi', role: 'UX Designer', initials: 'EB' },
  { name: 'Luka Kovač', role: 'QA Engineer', initials: 'LK' },
];

export function App() {
  const [activeOrg, setActiveOrg] = useState<string>(
    (window as any).__nexusState?.activeOrg ?? 'Acme Inc.'
  );

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.activeOrg) {
        setActiveOrg(detail.activeOrg);
      }
    };

    window.addEventListener('nexus-state-change', handler);
    return () => window.removeEventListener('nexus-state-change', handler);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Team</h1>
      <p className="text-gray-500 mb-2">Members working on this project.</p>
      <p className="text-sm text-indigo-600 font-medium mb-8">
        Viewing team for: {activeOrg}
      </p>

      <div className="grid grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              {member.initials}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;