import { getInsights, updateInsight } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const insights = await getInsights();
      res.status(200).json(insights);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
      res.status(500).json({ message: 'Failed to fetch insights' });
    }
  } else if (req.method === 'POST') {
    // Admin only - update insights
    try {
      const { id, value } = req.body;
      await updateInsight(id, value);
      res.status(200).json({ message: 'Insight updated' });
    } catch (error) {
      console.error('Failed to update insight:', error);
      res.status(500).json({ message: 'Failed to update insight' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
