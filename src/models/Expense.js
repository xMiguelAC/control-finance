// models/Expense.js
import mongoose from 'mongoose';

// Verificar si el modelo ya existe para evitar error de redefinición
const ExpenseSchema = new mongoose.Schema({
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
}, { collection: 'Expenses' });

// Comprobar si el modelo ya está definido para evitar errores en desarrollo
const Expense = mongoose.models.Expenses || mongoose.model('Expenses', ExpenseSchema);

export default Expense;