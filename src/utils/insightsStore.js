// Simple in-memory insights store (temporary until backend)
// Provides subscription API so components re-render when insights change.

let insights = [
  { id: 'impact', labelKey: 'insights.labels.impact', value: 128, suffix: '+', descriptionKey: 'insights.descriptions.impact' },
  { id: 'growth', labelKey: 'insights.labels.growth', value: 42, suffix: '%', descriptionKey: 'insights.descriptions.growth' },
  { id: 'retention', labelKey: 'insights.labels.retention', value: 93, suffix: '%', descriptionKey: 'insights.descriptions.retention' },
  { id: 'deploys', labelKey: 'insights.labels.deploys', value: 312, suffix: '', descriptionKey: 'insights.descriptions.deploys' },
];

const listeners = new Set();

export function getInsights() { return insights; }
export function subscribe(cb) { listeners.add(cb); return () => listeners.delete(cb); }
function notify() { listeners.forEach(l => l(insights)); }

export function updateInsight(id, patch) {
  insights = insights.map(i => i.id === id ? { ...i, ...patch } : i);
  notify();
}

export function addInsight(data) {
  insights = [...insights, { id: Date.now().toString(36), ...data }];
  notify();
}

export function removeInsight(id) {
  insights = insights.filter(i => i.id !== id);
  notify();
}

export function resetDemo() {
  insights = [
    { id: 'impact', label: 'Client Impact', value: 128, suffix: '+', description: 'Successful launches' },
    { id: 'growth', label: 'Avg Growth', value: 42, suffix: '%', description: 'Average uplift' },
    { id: 'retention', label: 'Retention', value: 93, suffix: '%', description: 'Client retention' },
    { id: 'deploys', label: 'Deploys', value: 312, suffix: '', description: 'Production deploys' },
  ];
  notify();
}
