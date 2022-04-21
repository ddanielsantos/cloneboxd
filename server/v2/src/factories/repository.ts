import { db } from '../db/mongo'
import {
  WithId,
  Filter,
  ObjectId,
  DeleteResult,
  UpdateResult,
  InsertOneResult,
  OptionalUnlessRequiredId,
  MatchKeysAndValues
} from 'mongodb'

type Repository<T> = {
  findAll: () => Promise<WithId<T>[]>,
  findOne: (id: string) => Promise<WithId<T> | null>,
  findSpecific: (id: string, attributes: (keyof T)[]) => Promise<any[]>,
  insertOne: (document: OptionalUnlessRequiredId<T>) => Promise<InsertOneResult<T>>,
  deleteOne: (id: string) => Promise<DeleteResult>,
  updateOne: (id: string, document: MatchKeysAndValues<T>) => Promise<UpdateResult>,
  findByProperty: (fields: Partial<T>) => Promise<WithId<T>[]>,
  findMany: (ids: string[]) => Promise<WithId<T>[]>
}

function repositoryFactory<T>(collectionName: string): Repository<T> {
  const COLLECTION = db.collection<T>(collectionName)

  const repository: Repository<T> = {
    findAll: async function (): Promise<WithId<T>[]> {
      const documents = await COLLECTION.find({}).toArray()

      return documents
    },

    findOne: async function (id: string): Promise<WithId<T> | null> {
      const query = new ObjectId(id)

      const document = await COLLECTION.findOne(query as Filter<T>)

      return document
    },

    findMany: async function (ids: string[]): Promise<WithId<T>[]> {
      const idsToSearch = ids.map(id => new ObjectId(id))
      const query = { _id: { $in: idsToSearch } } as unknown as Filter<T>

      const documents = await COLLECTION.find(query).toArray()
      return documents
    },

    findSpecific: async function (id: string, attributes: (keyof T)[]) {
      type SelectedAttributes<T> = {
        [key in (keyof T)]?: 1 | 0;
      }

      const SelectedAttributesMap: SelectedAttributes<T> = {}

      for (let i = 0; i < attributes.length; i++) {
        SelectedAttributesMap[attributes[i]] = (attributes[i] === '_id' ? 0 : 1)
      }

      const query = new ObjectId(id)

      const documents = await COLLECTION.find(query as Filter<T>).project(SelectedAttributesMap).toArray()

      return documents
    },

    findByProperty: async function (fields: Partial<T>) {
      const documents = await COLLECTION.find(fields).toArray()

      return documents
    },

    insertOne: async function (document: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>> {
      const serverResponse = await COLLECTION.insertOne({ ...document })

      return serverResponse
    },

    deleteOne: async function (id: string): Promise<DeleteResult> {
      const query = ({ _id: new ObjectId(id) }) as unknown as Filter<T>

      const serverResponse = await COLLECTION.deleteOne(query)

      return serverResponse
    },

    updateOne: async function (id: string, document: MatchKeysAndValues<T>): Promise<UpdateResult> {
      const query = ({ _id: new ObjectId(id) }) as unknown as Filter<T>

      const serverResponse = await COLLECTION.updateOne(query, { $set: document })

      return serverResponse
    }
  }

  return repository
}

export { repositoryFactory }
