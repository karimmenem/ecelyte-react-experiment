# Backend Migration Plan

## Current Structure
```
encelyte-react/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── public/
└── package.json
```

## Proposed Next.js Structure
```
encelyte-next/
├── components/          # Move from src/components/
├── contexts/           # Move from src/contexts/
├── pages/
│   ├── api/           # NEW: Backend API routes
│   │   ├── contact.js
│   │   ├── insights.js
│   │   ├── careers.js
│   │   └── admin/
│   │       ├── login.js
│   │       ├── insights.js
│   │       └── careers.js
│   ├── _app.js        # NEW: App wrapper
│   ├── _document.js   # NEW: HTML document
│   ├── index.js       # NEW: Home page
│   ├── admin/
│   ├── careers.js
│   ├── privacy.js
│   └── terms.js
├── public/            # Keep as-is
├── styles/            # Move from src/styles/
├── utils/             # Move from src/utils/
├── lib/               # NEW: Database & utilities
│   ├── db.js
│   └── mail.js
└── package.json       # Updated dependencies
```

## Migration Steps

### 1. Initialize Next.js Project
```bash
npx create-next-app@latest encelyte-next --typescript --tailwind --eslint --app
# Choose: No App Router (use Pages Router for easier migration)
```

### 2. Install Additional Dependencies
```bash
npm install styled-components framer-motion nodemailer mongodb bcryptjs jsonwebtoken
npm install --save-dev @types/nodemailer
```

### 3. Key Files to Create

#### pages/api/careers.js - Career Opportunities Handler
```javascript
import { getCareers, createCareer, updateCareer, deleteCareer } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const careers = await getCareers();
      res.status(200).json(careers);
    } catch (error) {
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
      res.status(500).json({ message: 'Failed to create career' });
    }
  } else if (req.method === 'PUT') {
    // Admin only - update career
    try {
      const { id, ...updateData } = req.body;
      await updateCareer(id, updateData);
      res.status(200).json({ message: 'Career updated' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update career' });
    }
  } else if (req.method === 'DELETE') {
    // Admin only - delete career
    try {
      const { id } = req.body;
      await deleteCareer(id);
      res.status(200).json({ message: 'Career deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete career' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
```

#### pages/api/contact.js - Contact Form Handler
```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      // Your email service config
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
}
```

#### pages/api/insights.js - Live Insights Data
```javascript
import { getInsights, updateInsight } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const insights = await getInsights();
      res.status(200).json(insights);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch insights' });
    }
  } else if (req.method === 'POST') {
    // Admin only - update insights
    try {
      const { id, value } = req.body;
      await updateInsight(id, value);
      res.status(200).json({ message: 'Insight updated' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update insight' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
```

#### lib/db.js - Database Layer
```javascript
import { MongoClient } from 'mongodb';

let client = null;
let db = null;

export async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME || 'encelyte');
    
    // Initialize default insights if collection is empty
    const insightsCount = await db.collection('insights').countDocuments();
    if (insightsCount === 0) {
      await db.collection('insights').insertMany([
        {
          id: 1,
          labelKey: 'insights.labels.impact',
          descriptionKey: 'insights.descriptions.impact',
          value: 128,
          suffix: '+',
          updatedAt: new Date()
        },
        {
          id: 2,
          labelKey: 'insights.labels.growth',
          descriptionKey: 'insights.descriptions.growth',
          value: 42,
          suffix: '%',
          updatedAt: new Date()
        },
        {
          id: 3,
          labelKey: 'insights.labels.retention',
          descriptionKey: 'insights.descriptions.retention',
          value: 93,
          suffix: '%',
          updatedAt: new Date()
        },
        {
          id: 4,
          labelKey: 'insights.labels.deploys',
          descriptionKey: 'insights.descriptions.deploys',
          value: 312,
          suffix: '',
          updatedAt: new Date()
        }
      ]);
    }
  }
  return db;
}

// Insights functions
export async function getInsights() {
  const db = await getDb();
  return await db.collection('insights').find({}).sort({ id: 1 }).toArray();
}

export async function updateInsight(id, value) {
  const db = await getDb();
  return await db.collection('insights').updateOne(
    { id: parseInt(id) },
    { 
      $set: { 
        value: parseInt(value), 
        updatedAt: new Date() 
      } 
    }
  );
}

// Careers functions
export async function getCareers() {
  const db = await getDb();
  return await db.collection('careers')
    .find({ isActive: true })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createCareer(careerData) {
  const db = await getDb();
  const career = {
    ...careerData,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const result = await db.collection('careers').insertOne(career);
  return { _id: result.insertedId, ...career };
}

export async function updateCareer(id, updateData) {
  const db = await getDb();
  const { ObjectId } = require('mongodb');
  
  return await db.collection('careers').updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        ...updateData, 
        updatedAt: new Date() 
      } 
    }
  );
}

export async function deleteCareer(id) {
  const db = await getDb();
  const { ObjectId } = require('mongodb');
  
  return await db.collection('careers').updateOne(
    { _id: new ObjectId(id) },
    { $set: { isActive: false, updatedAt: new Date() } }
  );
}

// Contacts function
export async function saveContact(contactData) {
  const db = await getDb();
  const contact = {
    ...contactData,
    createdAt: new Date()
  };
  
  return await db.collection('contacts').insertOne(contact);
}

// Admin functions
export async function getContacts() {
  const db = await getDb();
  return await db.collection('contacts')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createAdminUser(username, passwordHash) {
  const db = await getDb();
  return await db.collection('admin_users').insertOne({
    username,
    passwordHash,
    createdAt: new Date()
  });
}

export async function findAdminUser(username) {
  const db = await getDb();
  return await db.collection('admin_users').findOne({ username });
}
```

### 4. Update Components

#### Update Contact Form Component
```javascript
// In components/layout/Header.js - update the form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const formData = new FormData(e.target);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message')
      })
    });
    
    if (response.ok) {
      setSuccess(true);
      e.target.reset();
    } else {
      setError('Failed to send message');
    }
  } catch (error) {
    setError('Network error');
  } finally {
    setLoading(false);
  }
};
```

#### Update Careers Page Component
```javascript
// pages/careers.js - Dynamic careers from database
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import styled from 'styled-components';

const CareersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const JobCard = styled.div`
  background: ${({ theme }) => theme.colors.panel};
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 0.5rem 0;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMedium};
`;

const JobDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const RequirementsList = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
`;

const ApplyButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await fetch('/api/careers');
      if (response.ok) {
        const data = await response.json();
        setCareers(data);
      }
    } catch (error) {
      console.error('Failed to fetch careers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <CareersContainer>
          <h1>Loading careers...</h1>
        </CareersContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <CareersContainer>
        <h1>Career Opportunities</h1>
        {careers.length === 0 ? (
          <p>We are not hiring right now — but we love meeting talented people. Leave us a note through the contact panel and we will reach out when roles open.</p>
        ) : (
          careers.map(career => (
            <JobCard key={career._id}>
              <JobTitle>{career.title}</JobTitle>
              <JobMeta>
                <span>{career.department}</span>
                <span>•</span>
                <span>{career.location}</span>
                <span>•</span>
                <span>{career.type}</span>
                {career.salary && (
                  <>
                    <span>•</span>
                    <span>${career.salary.min?.toLocaleString()} - ${career.salary.max?.toLocaleString()}</span>
                  </>
                )}
              </JobMeta>
              <JobDescription>{career.description}</JobDescription>
              
              {career.requirements.length > 0 && (
                <>
                  <h4>Requirements:</h4>
                  <RequirementsList>
                    {career.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </RequirementsList>
                </>
              )}
              
              {career.benefits.length > 0 && (
                <>
                  <h4>Benefits:</h4>
                  <RequirementsList>
                    {career.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </RequirementsList>
                </>
              )}
              
              <ApplyButton onClick={() => window.open('mailto:careers@encelyte.com?subject=Application for ' + career.title)}>
                Apply Now
              </ApplyButton>
            </JobCard>
          ))
        )}
      </CareersContainer>
    </Layout>
  );
}
```

#### Update Insights Component
```javascript
// components/sections/Insights.js - Fetch from database
useEffect(() => {
  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/insights');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    }
  };
  
  fetchInsights();
  
  // Set up polling for real-time updates (optional)
  const interval = setInterval(fetchInsights, 30000); // Update every 30 seconds
  return () => clearInterval(interval);
}, []);
```

### 5. Admin Panel for Managing Content

Create `pages/admin/careers.js` for managing career opportunities:

```javascript
// Admin interface for managing careers
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminCareers() {
  const [careers, setCareers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCareer, setCurrentCareer] = useState({
    title: '', department: '', location: '', type: 'full-time',
    description: '', requirements: [], benefits: []
  });
  
  // CRUD operations for careers
  const createCareer = async (careerData) => {
    const response = await fetch('/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(careerData)
    });
    if (response.ok) {
      fetchCareers();
      resetForm();
    }
  };
  
  // ... more admin functions
  
  return (
    <div>
      <h1>Manage Career Opportunities</h1>
      {/* Admin interface for creating/editing careers */}
    </div>
  );
}
```

### 6. Environment Variables
Create `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/encelyte
# OR for MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/encelyte?retryWrites=true&w=majority
MONGODB_DB_NAME=encelyte

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=contact@encelyte.com
JWT_SECRET=your-jwt-secret
ADMIN_PASSWORD_HASH=your-hashed-password
```

## Benefits of This Approach

1. **Single Codebase**: Frontend and backend in one project
2. **Easy Deployment**: Deploy to Vercel, Netlify, or any Node.js host
3. **Type Safety**: Shared TypeScript types between frontend/backend
4. **Performance**: Server-side rendering capabilities
5. **Scalability**: Easy to add more API endpoints
6. **Real-time Data**: Both insights and careers update from database
7. **Admin Control**: Full CRUD operations for all content
8. **SEO Friendly**: Server-side rendered career pages

## MongoDB vs SQLite Comparison

### Why MongoDB is Great for Your Project

**MongoDB Advantages:**
- ✅ **Flexible Schema**: Perfect for career posts with varying requirements/benefits
- ✅ **Cloud Ready**: MongoDB Atlas provides hosted solution with automatic backups
- ✅ **JSON Native**: No need to stringify/parse arrays and objects
- ✅ **Scalability**: Easy to scale as your company grows
- ✅ **Rich Queries**: Advanced filtering and searching capabilities
- ✅ **Aggregation**: Perfect for analytics and reporting
- ✅ **No Migrations**: Schema changes don't require migrations

**Example Career Document Structure:**
```javascript
{
  _id: ObjectId("..."),
  title: "Senior Frontend Developer",
  department: "Engineering",
  location: "Remote",
  type: "full-time",
  description: "We're looking for...",
  requirements: [
    "5+ years React experience",
    "TypeScript proficiency",
    "Experience with Next.js"
  ],
  benefits: [
    "Competitive salary",
    "Remote work",
    "Health insurance",
    "Stock options"
  ],
  salary: {
    min: 120000,
    max: 180000,
    currency: "USD"
  },
  tags: ["react", "typescript", "remote"],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

### Setup Options

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally (macOS)
brew install mongodb-community
brew services start mongodb-community

# Connection string
MONGODB_URI=mongodb://localhost:27017/encelyte
```

**Option 2: MongoDB Atlas (Cloud) - RECOMMENDED**
- Free tier available (512MB storage)
- Automatic backups and scaling
- Global clusters for better performance
- Built-in security and monitoring

1. Sign up at https://cloud.mongodb.com
2. Create a cluster
3. Get connection string
4. Use in your `.env.local`

### Enhanced Features with MongoDB

**Advanced Career Filtering:**
```javascript
// In your API endpoint
export async function getCareersByFilter(filters = {}) {
  const db = await getDb();
  const query = { isActive: true };
  
  if (filters.department) query.department = filters.department;
  if (filters.location) query.location = filters.location;
  if (filters.type) query.type = filters.type;
  if (filters.tags) query.tags = { $in: filters.tags };
  if (filters.salaryMin) query['salary.min'] = { $gte: filters.salaryMin };
  
  return await db.collection('careers')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}
```

**Analytics Dashboard:**
```javascript
export async function getCareerAnalytics() {
  const db = await getDb();
  
  const analytics = await db.collection('careers').aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$department',
        count: { $sum: 1 },
        avgSalaryMin: { $avg: '$salary.min' }
      }
    }
  ]).toArray();
  
  return analytics;
}
```
