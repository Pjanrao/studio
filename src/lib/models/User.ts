import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../mongodb';
import type { User } from '../types';

let client: MongoClient;
let db: Db;
let users: Collection<Omit<User, 'id'>>;

async function init() {
  if (db) {
    return;
  }
  try {
    client = await clientPromise;
    db = client.db();
    users = db.collection('users');
  } catch (error) {
    throw new Error('Failed to connect to the database.');
  }
}

(async () => {
  await init();
})();

export const findUserByEmail = async (email: string): Promise<User | null> => {
  if (!users) await init();
  
  const userDoc = await users.findOne({ email });

  if (!userDoc) {
    return null;
  }
  
  const { _id, ...rest } = userDoc;

  return {
    ...rest,
    id: _id.toHexString(),
  };
};

export const createUser = async (userData: Omit<User, 'id'>) => {
  if (!users) await init();

  const result = await users.insertOne(userData);
  return result;
}
