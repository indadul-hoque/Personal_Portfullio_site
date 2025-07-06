import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiBookOpen } from 'react-icons/fi';
import React from 'react';

const educations = [
  {
    degree: 'Bachelor of Computer Applications (H)',
    institution: 'West Bengal University of Technology',
    year: '2022 - 2025',
    description: 'Currently pursuing a degree in Computer Applications, focusing on programming, database management, and web development.',
    current: true
  },
  // {
  //   degree: 'Higher Secondary (12th)',
  //   institution: 'School Name',
  //   year: '2021',
  //   description: 'Completed higher secondary education with a focus on science and mathematics.',
  //   current: false
  // },
  
];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" ref={ref} className="pt-4 bg-white dark:bg-gray-900">
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
            My academic journey that has equipped me with the knowledge and skills necessary for a career in software development.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-0 left-0 md:left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform md:translate-x-px"></div>

          <div className="relative z-10">
            {educations.map((education, index) => (
              <motion.div
                key={index}
                className="mb-12 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 mt-6 md:mt-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900"></div>

                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right md:self-end' : 'md:pl-12 md:self-start md:ml-auto'
                    } pl-10 md:pl-0`}
                  >
                    <div className={`card p-6 text-start ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      <h3 className="text-xl font-bold text-gray-900 text-start dark:text-white mb-1">{education.degree}</h3>
                      <h4 className="text-lg text-primary-500 text-start mb-2">{education.institution}</h4>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                        <FiCalendar className="mr-2" />
                        <span>{education.year}</span>
                        {education.current && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      {/* <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                        <FiBookOpen className="mr-2" />
                        <span>{education.institution}</span>
                      </div> */}
                      <p className="text-gray-600 dark:text-gray-300">{education.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
