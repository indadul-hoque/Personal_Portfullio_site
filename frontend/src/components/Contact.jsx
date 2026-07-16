import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false });

    setTimeout(() => {
      setFormStatus({ isSubmitting: false, isSubmitted: true });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isSubmitted: false }));
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact" ref={ref} className="bg-[#0B0F19] text-gray-300">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
        className="border-2 border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-2xl pt-6 md:p-8"
      >
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#d8d8e0] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
            Get In Touch
          </h2>
          <span className="text-xs text-gray-500 font-mono hidden sm:inline-block">
            CONNECT // CONTACT
          </span>
        </div>

        {/* Info Strip (Email, Phone, Location) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs font-mono">
          <a
            href="mailto:indadul.hoque9735@gmail.com"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950/20 border border-gray-800/40 hover:text-white hover:border-gray-700 transition-colors"
          >
            <FiMail size={14} className="text-purple-400" />
            <span className="truncate">indadul.hoque9735@gmail.com</span>
          </a>
          <a
            href="tel:+919735088948"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950/20 border border-gray-800/40 hover:text-white hover:border-gray-700 transition-colors"
          >
            <FiPhone size={14} className="text-purple-400" />
            <span>+91 9735088948</span>
          </a>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950/20 border border-gray-800/40 select-none">
            <FiMapPin size={14} className="text-purple-400" />
            <span>Kolkata, India</span>
          </div>
        </div>

        {/* Success Feedback Message */}
        {formStatus.isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2 text-xs font-mono"
          >
            <FiCheckCircle size={14} className="flex-shrink-0" />
            <span>Message sent successfully! I'll reply soon.</span>
          </motion.div>
        )}

        {/* Simplified Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-xs font-mono bg-gray-950/40 border border-gray-800 rounded-xl focus:border-purple-500/50 text-white placeholder-gray-600 transition-colors outline-none"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-xs font-mono bg-gray-950/40 border border-gray-800 rounded-xl focus:border-purple-500/50 text-white placeholder-gray-600 transition-colors outline-none"
              placeholder="Email"
            />
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-xs font-mono bg-gray-950/40 border border-gray-800 rounded-xl focus:border-purple-500/50 text-white placeholder-gray-600 transition-colors outline-none"
            placeholder="Subject"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 text-xs font-mono bg-gray-950/40 border border-gray-800 rounded-xl focus:border-purple-500/50 text-white placeholder-gray-600 transition-colors outline-none resize-none"
            placeholder="Your message..."
          ></textarea>

          <button
            type="submit"
            disabled={formStatus.isSubmitting}
            className="w-full py-3 rounded-xl text-xs font-medium tracking-wide bg-gray-800 text-gray-200 hover:text-orange-400 hover:bg-orange-950/20 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 font-mono shadow-md"
          >
            {formStatus.isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#0B0F19] border-t-transparent rounded-full animate-spin"></div>
                <span>SENDING...</span>
              </>
            ) : (
              <>
                <FiSend size={13} />
                <span>SEND MESSAGE</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
