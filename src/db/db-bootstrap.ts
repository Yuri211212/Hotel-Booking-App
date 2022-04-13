import to from 'await-to-js';

import db from './db';
import dbAppModel from './models/application';
import dbHotelModel from './models/hotel';
import dbBookingModel from './models/booking';

//this script checks whether DB schema already exists or creates new
export default {
  createSchema: async (): Promise<boolean> => {
    const [existedSchemaErr, existedSchemaRes] = await to(
      db.query(dbAppModel.selectExistedSchema)
    );
    if (existedSchemaErr){
      throw new Error('Cannot get result from db');
    }
    const existedSchema = existedSchemaRes?.rows[0];
    if (!existedSchema){
      const createScript = dbAppModel.createAppSchema.concat(
        dbBookingModel.createBookingTable,
        dbHotelModel.createHotelTable
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
