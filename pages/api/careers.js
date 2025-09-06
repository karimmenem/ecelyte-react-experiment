import { getCareers, createCareer, updateCareer, deleteCareer } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const careers = await getCareers();
      res.status(200).json(careers);
    } catch (error) {
      console.error('Failed to fetch careers:', error);
      res.status(500).json({ message: 'Failed to fetch careers' });
    }
  } else if (req.method === 'POST') {
    // Admin only - create new career
    try {
      const { title, department, location, type, description, requirements, benefits } = req.body;
      const career = await createCareer({
        title, department, location, type, description, requirements, benefits
      });
      res.status(201).json(career);
    } catch (error) {
      console.error('Failed to create career:', error);
      res.status(500).json({ message: 'Failed to create career' });
    }
  } else if (req.method === 'PUT') {
    // Admin only - update career
    try {
      const { id, ...updateData } = req.body;
      await updateCareer(id, updateData);
      res.status(200).json({ message: 'Career updated' });
    } catch (error) {
      console.error('Failed to update career:', error);
      res.status(500).json({ message: 'Failed to update career' });
    }
  } else if (req.method === 'DELETE') {
    // Admin only - delete career
    try {
      const { id } = req.body;
      await deleteCareer(id);
      res.status(200).json({ message: 'Career deleted' });
    } catch (error) {
      console.error('Failed to delete career:', error);
      res.status(500).json({ message: 'Failed to delete career' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
