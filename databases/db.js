import { connect, connection } from 'mongoose';

const mongoURI =
  '  mongodb://127.0.0.1:27017/TodoList?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1';

connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;
