import { MongoClient } from 'mongodb';

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);

const db = client.db('FileUploadingSystem');
cerateDatabase(db);

async function cerateDatabase(db) {
    await db.createCollection('uploads.files', 
        {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['filename', 'userId', 'length', 'chunkSize', 'uploadDate', 'contentType'],
                    properties: {
                        length: {
                            bsonType: 'int',
                            description: 'must be an int and is required'
                        },
                        chunkSize: {
                            bsonType: 'int',
                            description: 'must be an int and is required'
                        },
                        uploadDate: {
                            bsonType: 'date',
                            description: 'must be a date and is required'
                        },
                        filename: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        contentType: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                    }
                }
            }
        });
    await db.createCollection('uploads.chunks',
        {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['files_id', 'n', 'data'],
                    properties: {
                        files_id: {
                            bsonType: 'objectId',
                            description: 'must be an objectId and is required'
                        },
                        n: {
                            bsonType: 'int',
                            description: 'must be an int and is required'
                        },
                        data: {
                            bsonType: 'binData',
                            description: 'must be a binData and is required'
                        }
                    }
                }
            }
        });
    await db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['username', 'password'],
                properties: {
                    username: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    password: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    }
                }
            }
        }
    });
}