import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto px-4 sm:px-6 py-12"
    >
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join our community and start sharing your stories</p>
        </div>
        <RegisterForm />
      </div>
    </motion.div>
  );
};

export default RegisterPage;