import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiBookOpen } from 'react-icons/fi';
import React from 'react';


const educations = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'University Name',
    year: '2022-2025',
    description: 'Currently pursuing a degree in Computer Applications, focusing on programming, database management, and web development.',
    current: true
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'School Name',
    year: '2021',
    description: 'Completed higher secondary education with a focus on science and mathematics.',
    current: false
  },
  {
    degree: 'Secondary School (10th)',
    institution: 'School Name',
    year: '2019',
    description: 'Completed secondary education with distinction.',
    current: false
  }
];

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="education" ref={ref} className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-gray-900 dark:text-white">Education</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            My academic journey that has equipped me with the knowledge and skills 
            necessary for a career in software development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {educations.map((education, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {index < educations.length - 1 && (
                <div className="absolute top-0 left-3 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform translate-x-px"></div>
              )}

              {/* Timeline dot */}
              <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                education.current 
                  ? 'bg-primary-500 border-primary-200 dark:border-primary-800' 
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${education.current ? 'bg-white' : 'bg-primary-500'}`}></div>
              </div>

              {/* Content */}
              <div className="card p-6">
                <div className="flex flex-wrap items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {education.degree}
                  </h3>
                  <div className="flex items-center text-primary-500 mt-1 sm:mt-0">
                    <FiCalendar className="mr-1" />
                    <span className="text-sm font-medium">{education.year}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                  <FiBookOpen className="mr-2" />
                  <span>{education.institution}</span>
                  {education.current && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {education.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;