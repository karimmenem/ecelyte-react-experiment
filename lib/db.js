import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'database.json');

// Ensure database file exists
async function ensureDatabase() {
  try {
    await fs.access(dbPath);
  } catch {
    const initialData = {
      insights: [
        {
          id: 1,
          labelKey: 'insights.labels.impact',
          descriptionKey: 'insights.descriptions.impact',
          value: 128,
          suffix: '+',
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          labelKey: 'insights.labels.growth',
          descriptionKey: 'insights.descriptions.growth',
          value: 42,
          suffix: '%',
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          labelKey: 'insights.labels.retention',
          descriptionKey: 'insights.descriptions.retention',
          value: 93,
          suffix: '%',
          updatedAt: new Date().toISOString()
        },
        {
          id: 4,
          labelKey: 'insights.labels.deploys',
          descriptionKey: 'insights.descriptions.deploys',
          value: 312,
          suffix: '',
          updatedAt: new Date().toISOString()
        }
      ],
      careers: [],
      contacts: [],
      admin_users: []
    };
    
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2));
  }
}

// Read database
async function readDatabase() {
  await ensureDatabase();
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

// Write database
async function writeDatabase(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function getDb() {
  // For file-based system, we just return a success indicator
  await ensureDatabase();
  return { connected: true };
}

// Insights functions
export async function getInsights() {
  const data = await readDatabase();
  return data.insights.sort((a, b) => a.id - b.id);
}

export async function updateInsight(id, value) {
  const data = await readDatabase();
  const insight = data.insights.find(item => item.id === parseInt(id));
  if (insight) {
    insight.value = parseInt(value);
    insight.updatedAt = new Date().toISOString();
    await writeDatabase(data);
    return { acknowledged: true, modifiedCount: 1 };
  }
  return { acknowledged: false, modifiedCount: 0 };
}

// Careers functions
export async function getCareers() {
  const data = await readDatabase();
  return data.careers
    .filter(career => career.isActive)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createCareer(careerData) {
  const data = await readDatabase();
  const career = {
    _id: `career_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...careerData,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.careers.push(career);
  await writeDatabase(data);
  return career;
}

export async function updateCareer(id, updateData) {
  const data = await readDatabase();
  const careerIndex = data.careers.findIndex(career => career._id === id);
  if (careerIndex !== -1) {
    data.careers[careerIndex] = {
      ...data.careers[careerIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    await writeDatabase(data);
    return { acknowledged: true, modifiedCount: 1 };
  }
  return { acknowledged: false, modifiedCount: 0 };
}

export async function deleteCareer(id) {
  const data = await readDatabase();
  const careerIndex = data.careers.findIndex(career => career._id === id);
  if (careerIndex !== -1) {
    data.careers[careerIndex].isActive = false;
    data.careers[careerIndex].updatedAt = new Date().toISOString();
    await writeDatabase(data);
    return { acknowledged: true, modifiedCount: 1 };
  }
  return { acknowledged: false, modifiedCount: 0 };
}

// Contacts function
export async function saveContact(contactData) {
  const data = await readDatabase();
  const contact = {
    _id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...contactData,
    createdAt: new Date().toISOString()
  };
  
  data.contacts.push(contact);
  await writeDatabase(data);
  return { acknowledged: true, insertedId: contact._id };
}

// Admin functions
export async function getContacts() {
  const data = await readDatabase();
  return data.contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createAdminUser(username, passwordHash) {
  const data = await readDatabase();
  const adminUser = {
    _id: `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    username,
    passwordHash,
    createdAt: new Date().toISOString()
  };
  
  data.admin_users.push(adminUser);
  await writeDatabase(data);
  return { acknowledged: true, insertedId: adminUser._id };
}

export async function findAdminUser(username) {
  const data = await readDatabase();
  return data.admin_users.find(user => user.username === username) || null;
}
