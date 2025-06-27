import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { FiCode, FiType, FiServer, FiDatabase, FiLayers } from 'react-icons/fi';

const progressSkills = [
    { name: 'HTML', percent: 70 },
    { name: 'CSS', percent: 70 },
    { name: 'JavaScript', percent: 80 },
    { name: 'Angular', percent: 80 },
];

const skillCategories = [
    // {
    //     name: 'Languages',
    //     icon: <FiCode />,
    //     items: [
    //         { skill: 'Javascript', percent: 50 },
    //         { skill: 'Python', percent: 70 },
    //         { skill: 'C', percent: 70 },
    //     ],
    // },
    {
        name: 'Frontend',
        icon: <FiCode />,
        items: [
            { skill: 'React', percent: 80 },
            { skill: 'JavaScript', percent: 80 },
            { skill: 'HTML/CSS', percent: 70 },
            { skill: 'Tailwind CSS', percent: 75 },
        ],
    },
    {
        name: 'Backend',
        icon: <FiServer />,
        items: [
            { skill: 'Node.js', percent: 75 },
            { skill: 'Express', percent: 70 },
            { skill: 'REST APIs', percent: 80 },
        ],
    },
    {
        name: 'Database',
        icon: <FiDatabase />,
        items: [
            { skill: 'MongoDB', percent: 80 },
            { skill: 'Mongoose', percent: 75 },
        ],
    },
    {
        name: 'Tools',
        icon: <FiLayers />,
        items: [
            { skill: 'Git', percent: 85 },
            { skill: 'VS Code', percent: 90 },
            { skill: 'Postman', percent: 80 },
        ],
    },
];

const About = () => {
    return (
        <section id="about" className="py-20 px-4 bg-[#ffffff] dark:bg-[#13072E] text-black dark:text-white relative">
            <div className="container-custom max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center md:justify-end"
                >
                    <img
                        src="/myimage.png"
                        alt="Indadul Hoque"
                        className="w-80 h-auto rounded-xl shadow-lg object-cover"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold mb-2">About Me</h2>
                    <p className="dark:text-purple-300 mb-6">My introduction</p>
                    <p className="dark:text-gray-300 leading-relaxed mb-6">
                        Full-Stack Developer, with extensive knowledge and year of experience,
                        working in latest web technologies, UI/UX design, delivering quality work.
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8 mb-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold dark:text-white">06+</h3>
                            <p className="text-sm dark:text-gray-400">Month experience</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold dark:text-white">04+</h3>
                            <p className="text-sm dark:text-gray-400">Completed project</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold dark:text-white">01+</h3>
                            <p className="text-sm dark:text-gray-400">Companies worked</p>
                        </div>
                    </div>

                    <a
                        href="/Indadul_Hoque.pdf"
                        download
                        className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-all"
                    >
                        Download CV <Download className="ml-2" size={18} />
                    </a>
                </motion.div>
            </div>
            {/* Skills Progress Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-20 max-w-3xl mx-auto px-4"
            >
                <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
            </motion.div>
            {/* Skill Category Cards */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-20 max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {skillCategories.map((category, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-[#1C0C40] p-6 rounded-xl shadow-md">
                        <div className="flex items-center gap-3 mb-4 text-purple-700 dark:text-purple-400 text-xl">
                            {category.icon}
                            <h3 className="font-semibold">{category.name}</h3>
                        </div>
                        <ul className="text-gray-800 dark:text-gray-300 space-y-4">
                            {category.items.map((item, i) => (
                                <li key={i}>
                                    <div className="flex justify-between mb-1 text-sm">
                                        <span>{item.skill}</span>
                                        <span>{item.percent}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-purple-200 dark:bg-purple-900 rounded-full">
                                        <div
                                            className="h-full bg-purple-600 dark:bg-purple-500 rounded-full"
                                            style={{ width: `${item.percent}%` }}
                                        ></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default About;
