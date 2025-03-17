// models/Income.js
import mongoose from 'mongoose';

// Verificar si el modelo ya existe para evitar error de redefinición
const IncomeSchema = new mongoose.Schema({
  invoice: {
    type: String,
    required: true,
    // unique: true
  },
  category: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'incomes' });

// Comprobar si el modelo ya está definido para evitar errores en desarrollo
const Income = mongoose.models.incomes || mongoose.model('incomes', IncomeSchema);

export default Income;