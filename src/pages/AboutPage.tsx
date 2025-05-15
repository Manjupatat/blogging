import React from 'react';
import { Users, BookOpen, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'John has over 15 years of experience in digital publishing and content creation.',
    },
    {
      name: 'Emily Johnson',
      role: 'Chief Editor',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Emily brings her expertise in content strategy and editorial excellence to the team.',
    },
    {
      name: 'Michael Wong',
      role: 'Lead Developer',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Michael is responsible for the technical infrastructure of BlogHub.',
    },
    {
      name: 'Sarah Patel',
      role: 'Marketing Director',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Sarah handles all aspects of marketing and community engagement.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About BlogHub</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover our story, mission, and the team behind BlogHub - where ideas come to life.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              BlogHub was founded in 2020 with a simple mission: to create a platform where writers, 
              thinkers, and storytellers could share their ideas with the world. What started as a 
              small community has grown into a thriving ecosystem of content creators and readers.
            </p>
            <p className="text-gray-600">
              We believe that everyone has a story worth telling and knowledge worth sharing. Our 
              platform is designed to empower writers of all backgrounds to find their voice and 
              connect with an audience who values their perspective.
            </p>
          </div>
          <div className="bg-blue-600">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Team collaborating"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
          <p className="text-gray-600">
            We prioritize building a supportive community where writers can grow and readers can discover new perspectives.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Content</h3>
          <p className="text-gray-600">
            We believe in the power of well-crafted content that educates, entertains, and inspires our readers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
          <p className="text-gray-600">
            We strive for excellence in everything we do, from our platform's design to our customer support.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Passion</h3>
          <p className="text-gray-600">
            We're passionate about giving everyone a platform to share their voice and connect with others.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 rounded-lg shadow-md p-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
          Become part of our growing community of writers and readers. Share your stories and connect with others.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-md hover:bg-gray-100 transition-colors">
            Start Writing
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white font-bold rounded-md hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;