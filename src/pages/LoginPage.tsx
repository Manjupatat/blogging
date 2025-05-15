import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto px-4 sm:px-6 py-12"
    >
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Log in to access your account</p>
        </div>
        <LoginForm />
      </div>
    </motion.div>
  );
};

export default LoginPage;