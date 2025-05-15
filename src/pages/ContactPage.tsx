import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Fill out the form below or use our contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Our Address</p>
                  <p className="text-sm text-gray-600 mt-1">
                    123 Blog Street<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600 mt-1">contact@bloghub.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Working Hours</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday & Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.008 10.008 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.918 5.555c.48.063.918.267 1.137.737.203.427.077 1.008-.355 1.954-.86 1.889-2.828 3.729-5.403 3.959-.584.066-1.103.043-1.592-.033l-.156-.02c-.469 2.14-.964 3.86-2.641 5.305-.099 0-1.17-3.173-1.17-3.305 0-.707 2.028-1.503 2.887-4.111-.35-.107-.697-.223-1.116-.346-1.06-1.189-.608-3.096.768-3.823 1.055-.502 2.068-.129 3.117-.687 1.017-.564 1.759-1.773 2.975-1.773 1.287 0 1.616 1.057 1.549 2.143zm-3.434 1.545c-.251-.394-.616-.619-1.005-.624-.647-.012-1.224.699-1.602 1.609-.366.877-.608 1.862-.506 2.878.077.74.401 1.187.834 1.218.62.04 1.25-.705 1.707-1.42.541-.84.92-1.886.992-2.837.029-.394-.022-.695-.42-.824z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3.75c2.136 0 2.389.009 3.233.047.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.009 2.389-.047 3.233c-.036.78-.166 1.203-.276 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.389-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276-.374-.145-.64-.318-.92-.598-.28-.28-.453-.546-.598-.92-.11-.282-.24-.705-.276-1.485-.038-.844-.047-1.097-.047-3.233s.009-2.389.047-3.233c.036-.78.166-1.203.276-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.844-.038 1.097-.047 3.233-.047zm0 1.5c-2.101 0-2.341.01-3.174.047-.763.034-1.182.163-1.46.272-.335.13-.57.285-.819.535-.25.249-.405.484-.535.819-.109.277-.238.697-.273 1.46-.037.833-.046 1.073-.046 3.174s.01 2.341.046 3.174c.035.763.164 1.182.273 1.46.13.335.286.57.535.819.249.25.484.405.819.535.278.109.697.238 1.46.273.833.037 1.073.046 3.174.046s2.341-.01 3.174-.046c.763-.035 1.182-.164 1.46-.273.335-.13.57-.285.819-.535.25-.249.405-.484.535-.819.109-.278.238-.697.273-1.46.037-.833.046-1.073.046-3.174s-.01-2.341-.046-3.174c-.035-.763-.164-1.182-.273-1.46-.13-.335-.285-.57-.535-.819-.249-.25-.484-.405-.819-.535-.278-.109-.697-.238-1.46-.273-.833-.037-1.073-.046-3.174-.046zm0 4.166a2.592 2.592 0 100 5.184 2.592 2.592 0 000-5.184zm0 4.167a1.575 1.575 0 110-3.15 1.575 1.575 0 010 3.15zm4.01-5.167a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;