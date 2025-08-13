import mongoose from 'mongoose';

class Database {
  static connected = false;

  static async connect() {
    if (this.connected) return;

    try {
      if (!process.env.DB_URL) {
        throw new Error('Missing DB_URL');
      }
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.DB_URL);
      this.connected = true;
      console.log('✅ DB Connected');
      
    } catch (error) {
      console.error('❌ DB Connection failed:', error);
      throw error;
    }
  }

  static async disconnect() {
    if (!this.connected) return;

    try {
      await mongoose.disconnect();
      this.connected = false;
      console.log('🔌 DB Disconnected');
    } catch (error) {
      console.error('❌ DB Disconnection failed:', error);
      throw error;
    }
  }
}

export default Database;
