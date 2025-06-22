import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiDatabase, FiServer, FiLayers } from 'react-icons/fi';

const skills = [
  { name: 'Frontend', icon: <FiCode />, items: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'] },
  { name: 'Backend', icon: <FiServer />, items: ['Node.js', 'Express', 'REST APIs'] },
  { name: 'Database', icon: <FiDatabase />, items: ['MongoDB', 'Mongoose'] },
  { name: 'Tools', icon: <FiLayers />, items: ['Git', 'VS Code', 'Postman', 'Figma'] },
];

const About = () => {
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
    <section id="about" ref={ref} className="section-padding py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-gray-900 dark:text-white">About Me</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            I'm a MERN stack developer with a passion for creating innovative and user-friendly web applications.
            My experience includes internships where I've built full-stack applications using modern technologies.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Approach</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            I focus on creating clean, efficient, and scalable code that delivers exceptional user experiences. My goal is to build applications that are not only functionally robust but also visually appealing and intuitive to use.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            I'm constantly learning and exploring new technologies to stay updated with the latest trends in web development. I enjoy solving complex problems and turning ideas into reality through code.
          </p>
        </motion.div>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12"
        >
          <h2 className="section-title text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            My Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-6 flex flex-col items-center shadow-md rounded-md bg-white dark:bg-gray-900"
              >
                <div className="w-14 h-14 flex items-center justify-center text-2xl bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
                <ul className="text-center">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>



      </div>
    </section>
  );
};

export default About;