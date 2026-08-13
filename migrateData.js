const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');

const mongoUri = 'mongodb://smferdousahmmed19_db_user:a2S8PTkOFDKtyjtc@ac-w7oeevs-shard-00-00.v2ikrma.mongodb.net:27017,ac-w7oeevs-shard-00-01.v2ikrma.mongodb.net:27017,ac-w7oeevs-shard-00-02.v2ikrma.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-9x1u5x-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to MongoDB...');
  const mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  const db = mongoClient.db('portfolio'); // The DB name based on the URI
  console.log('Connected to MongoDB.');

  const collections = [
    { name: 'User', model: prisma.user },
    { name: 'Hero', model: prisma.hero },
    { name: 'About', model: prisma.about },
    { name: 'Education', model: prisma.education },
    { name: 'Journey', model: prisma.journey },
    { name: 'Skill', model: prisma.skill },
    { name: 'Project', model: prisma.project },
    { name: 'Contact', model: prisma.contact },
    { name: 'Message', model: prisma.message },
    { name: 'CV', model: prisma.cV },
    { name: 'Hobby', model: prisma.hobby }
  ];

  for (const { name, model } of collections) {
    console.log(`Migrating ${name}...`);
    const collection = db.collection(name);
    const docs = await collection.find({}).toArray();

    if (docs.length === 0) {
      console.log(`No documents found in ${name}.`);
      continue;
    }

    const newDocs = docs.map(doc => {
      // Map MongoDB _id to Prisma id
      const { _id, ...rest } = doc;
      
      // Some Prisma models might have specific Date casting
      // MongoDB stores dates as ISODate, which maps directly to JS Date
      // The rest of the fields should map identically
      return {
        id: _id.toString(), // Convert ObjectId to String
        ...rest
      };
    });

    try {
      await model.createMany({
        data: newDocs,
        skipDuplicates: true // Just in case
      });
      console.log(`Successfully migrated ${newDocs.length} documents for ${name}.`);
    } catch (err) {
      console.error(`Failed to migrate ${name}:`, err);
    }
  }

  await mongoClient.close();
  await prisma.$disconnect();
  console.log('Migration completed!');
}

main().catch(console.error);
