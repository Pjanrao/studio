import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../mongodb';
import type { Category } from '../types';

let client: MongoClient;
let db: Db;
let categories: Collection<Omit<Category, 'id'>>;

async function init() {
  if (db) {
    return;
  }
  try {
    client = await clientPromise;
    db = client.db();
    categories = db.collection('categories');
  } catch (error) {
    throw new Error('Failed to connect to the database.');
  }
}

(async () => {
  await init();
})();

function toCategory(doc: any): Category {
    const { _id, ...rest } = doc;
    return { ...rest, id: _id.toHexString() } as Category;
}

export const getCategories = async (): Promise<Category[]> => {
  if (!categories) await init();
  const result = await categories.find({}).toArray();
  return result.map(toCategory);
};

export const createCategory = async (data: Omit<Category, 'id' | 'slug'>): Promise<Category> => {
    if (!categories) await init();
    
    const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const result = await categories.insertOne({
        ...data,
        slug,
    });
    
    const newCategory = await categories.findOne({ _id: result.insertedId });
    if (!newCategory) {
        throw new Error('Failed to create category');
    }
    return toCategory(newCategory);
}

export const deleteCategory = async (id: string): Promise<boolean> => {
    if (!categories) await init();
    const result = await categories.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
}
