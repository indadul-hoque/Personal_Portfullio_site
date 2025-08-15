import React, { useEffect, useState, useRef } from "react";
import { Download, Send } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const NUM_CIRCLES = 50;

const generateCircles = () =>
  Array.from({ length: NUM_CIRCLES }).map(() => ({
    id: crypto.randomUUID(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 6 + 4,
    color: ["#36C5F0", "#ECB22E", "#E01E5B", "#2EB67D"][
      Math.floor(Math.random() * 4)
    ],
    dx: Math.random() * 1 - 0.5,
    dy: Math.random() * 1 - 0.5,
  }));

const Hero = () => {
  const [circles, setCircles] = useState(generateCircles);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prev) =>
        prev.map((circle) => {
          let newX = circle.x + circle.dx * 2;
          let newY = circle.y + circle.dy * 2;

          if (newX < 0 || newX > window.innerWidth) circle.dx *= -1;
          if (newY < 0 || newY > window.innerHeight) circle.dy *= -1;

          return {
            ...circle,
            x: newX,
            y: newY,
          };
        })
      );
    }, 30); // movement speed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden md:p-3 bg-white dark:bg-gray-900"
    >
      {/* Background: Circles + Lines */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Lines between close circles */}
        {circles.map((a, i) =>
          circles.map((b, j) => {
            if (i < j) {
              const distance = Math.hypot(a.x - b.x, a.y - b.y);
              if (distance < 150) {
                return (
                  <line
                    key={`${a.id}-${b.id}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="gray"
                    strokeOpacity={0.2}
                    strokeWidth="1"
                  />
                );
              }
            }
            return null;
          })
        )}
      </svg>

      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          style={{
            width: circle.size,
            height: circle.size,
            borderRadius: "9999px",
            backgroundColor: circle.color,
            position: "absolute",
            top: circle.y,
            left: circle.x,
            opacity: 0.8,
            zIndex: 1,
          }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 0.1 }}
        />
      ))}

      {/* Main Content */}
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="sm:mt-4"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-sm font-medium mb-4">
              Full-Stack Developer
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Hello, I'm <br />
              <span className="text-primary-500">Indadul Hoque</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              A passionate MERN stack developer creating innovative web solutions.
              I specialize in building responsive and user-friendly <b>Fullstack</b> web applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary flex items-center gap-2">
                Contact Me
                <Send size={18} className="text-white" />
              </a>
              <a
                href="/Indadul_Hoque.pdf"
                download
                className="btn btn-secondary flex items-center gap-2"
              >
                <span>Download My CV</span>
                <Download size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:block p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative border-4 border-white dark:border-gray-800 mt-5">
                <img
                  src="/myimage.png"
                  alt="Profile portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-md bg-purple-700 hover:bg-purple-800 text-white shadow-md transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiArrowUp size={20} />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
};

export default Hero;
