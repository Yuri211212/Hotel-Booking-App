import to from 'await-to-js';

import db from './db';
import dbScript from './dp-scripts';

//this script checks whether DB schema already exists or creates new
export default {
  createSchema: async (): Promise<boolean> => {
    const [existedSchemaErr, existedSchemaRes] = await to(
      db.query(dbScript.selectExistedSchema)
    );
    if (existedSchemaErr){
      throw new Error('Cannot get result from db');
    }
    const existedSchema = existedSchemaRes?.rows[0];
    if (!existedSchema){
      const createScript = dbScript.createAppSchema.concat(
        dbScript.createBookingTable,
        dbScript.createHotelTable
      );
      const [createSchemaErr] = await to(
        db.query(createScript)
      )
      if (createSchemaErr) {
        throw new Error('Cannot get result from db');
      }
    }
    return Promise.resolve(true);
  }
};
