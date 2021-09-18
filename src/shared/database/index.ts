import { createConnections } from 'typeorm';

const connect = async (): Promise<void> => {
  try {
    await createConnections();
  } catch (err) {
    console.error('ERROR when trying to create a connection:');
    console.error(err);
    process.exit(1);
  }
};

connect();
