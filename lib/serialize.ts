import { Types } from 'mongoose'

/**
 * Recursively serialize MongoDB data by converting ObjectIds to strings
 * and handling nested objects and arrays
 */
export function serializeMongoData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data
  }

  // Handle ObjectId conversion
  if (data instanceof Types.ObjectId) {
    return data.toString() as T
  }

  // Handle Date objects
  if (data instanceof Date) {
    return data
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeMongoData(item)) as T
  }

  // Handle plain objects
  if (typeof data === 'object' && data.constructor === Object) {
    const serialized: any = {}
    for (const [key, value] of Object.entries(data)) {
      // Convert _id fields to id and serialize the value
      if (key === '_id') {
        serialized.id = serializeMongoData(value)
        serialized._id = serializeMongoData(value) // Keep _id as well for compatibility
      } else {
        serialized[key] = serializeMongoData(value)
      }
    }
    return serialized as T
  }

  // Return primitive values as-is
  return data
}

/**
 * Serialize a MongoDB document or array of documents
 */
export function serializeDocument<T>(doc: any): T {
  if (!doc) return doc
  
  // Convert Mongoose document to plain object if needed
  const plainDoc = doc.toObject ? doc.toObject() : doc
  
  return serializeMongoData(plainDoc)
}

/**
 * Serialize an array of MongoDB documents
 */
export function serializeDocuments<T>(docs: any[]): T[] {
  if (!docs || !Array.isArray(docs)) return []
  
  return docs.map(doc => serializeDocument<T>(doc))
}
