import mongoose from 'mongoose';

class Database {
  private static connected = false;

  public static async connect(): Promise<void> {
    if (this.connected) return;

    try {
      if (!process.env.DB_URL) {
        throw new Error('Missing DB_URL');
      }

      await mongoose.connect(process.env.DB_URL);
      this.connected = true;
      console.log('✅ DB Connected');
      
    } catch (error) {
      console.error('❌ DB Connection failed:', error);
      throw error;
    }
  }
}

export default Database ;