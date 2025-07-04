import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  CircuitBoard, 
  MemoryStick, 
  HardDrive, 
  Fan, 
  Monitor, 
  Gamepad2 
} from 'lucide-react';
import { categories } from '../../data/products';
import { GlassCard } from '../ui/GlassCard';

// Icon mapping
const iconMap = {
  Zap,
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Fan,
  Monitor,
  Gamepad2
};

export const Categories: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="categories" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Product Categories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive collection of PC components and gaming accessories
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <GlassCard className="p-6 text-center h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center group-hover:shadow-lg"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-primary-500 font-medium">
                      {category.count} products
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};