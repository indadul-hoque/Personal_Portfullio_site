import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import React from 'react';

const experiences = [
  {
    title: 'MERN Stack Intern',
    company: 'Company Name',
    duration: '3 months',
    date: 'May 2023 - July 2023',
    description: [
      'Developed responsive user interfaces using React and Tailwind CSS',
      'Built RESTful APIs using Node.js and Express',
      'Worked with MongoDB databases for data storage and retrieval',
      'Collaborated with a team of developers using Git for version control'
    ]
  },
  {
    title: 'MERN Stack Intern',
    company: 'Another Company',
    duration: '1 month',
    date: 'January 2023 - February 2023',
    description: [
      'Assisted in developing web applications using the MERN stack',
      'Implemented frontend components with React',
      'Created backend routes and controllers with Express',
      'Gained hands-on experience with MongoDB and Mongoose'
    ]
  }
];

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" ref={ref} className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-gray-900 dark:text-white">My Experience</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            My professional journey as a MERN stack developer includes valuable internship experiences 
            where I've honed my skills in building full-stack web applications.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-0 md:left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform md:translate-x-px"></div>

          {/* Experience items */}
          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="mb-12 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 mt-6 md:mt-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900"></div>

                  {/* Timeline content */}
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0
                        ? 'md:pr-12 md:text-right md:self-end'
                        : 'md:pl-12 md:self-start md:ml-auto'
                    } pl-10 md:pl-0`}
                  >
                    <div
                      className={`card p-6 ${
                        index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-medium text-primary-500 mb-2">
                        {exp.company}
                      </h4>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                        <FiCalendar className="mr-2" />
                        <span className="text-sm">{exp.date}</span>
                        <span className="mx-2">•</span>
                        <FiBriefcase className="mr-2" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="text-gray-600 dark:text-gray-300 flex items-start"
                          >
                            <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
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

export default Experience;