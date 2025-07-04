import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CircuitBoard, Zap, MemoryStick, HardDrive, Fan, Monitor, Check, X, AlertTriangle } from 'lucide-react';
import { Product } from '../../types';
import { products } from '../../data/products';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface PCBuildComponent {
  category: string;
  name: string;
  icon: React.ComponentType<any>;
  required: boolean;
  selected?: Product;
}

export const PCBuilder: React.FC = () => {
  const [buildComponents, setBuildComponents] = React.useState<PCBuildComponent[]>([
    { category: 'processors', name: 'Processor (CPU)', icon: Cpu, required: true },
    { category: 'motherboards', name: 'Motherboard', icon: CircuitBoard, required: true },
    { category: 'graphics-cards', name: 'Graphics Card (GPU)', icon: Zap, required: true },
    { category: 'ram', name: 'Memory (RAM)', icon: MemoryStick, required: true },
    { category: 'storage', name: 'Storage', icon: HardDrive, required: true },
    { category: 'cooling', name: 'Cooling', icon: Fan, required: false },
    { category: 'monitors', name: 'Monitor', icon: Monitor, required: false }
  ]);

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [compatibilityIssues, setCompatibilityIssues] = React.useState<string[]>([]);

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const selectComponent = (component: PCBuildComponent, product: Product) => {
    setBuildComponents(prev => 
      prev.map(comp => 
        comp.category === component.category 
          ? { ...comp, selected: product }
          : comp
      )
    );
    setSelectedCategory(null);
    checkCompatibility();
  };

  const removeComponent = (category: string) => {
    setBuildComponents(prev => 
      prev.map(comp => 
        comp.category === category 
          ? { ...comp, selected: undefined }
          : comp
      )
    );
    checkCompatibility();
  };

  const checkCompatibility = () => {
    const issues: string[] = [];
    const selectedComponents = buildComponents.filter(comp => comp.selected);
    
    // Simple compatibility checks (in a real app, this would be more sophisticated)
    const cpu = selectedComponents.find(comp => comp.category === 'processors')?.selected;
    const motherboard = selectedComponents.find(comp => comp.category === 'motherboards')?.selected;
    const gpu = selectedComponents.find(comp => comp.category === 'graphics-cards')?.selected;
    const ram = selectedComponents.find(comp => comp.category === 'ram')?.selected;

    if (cpu && motherboard) {
      // Check CPU-Motherboard compatibility (simplified)
      if (cpu.brand === 'Intel' && !motherboard.name.includes('Intel')) {
        issues.push('Intel CPU requires Intel-compatible motherboard');
      }
      if (cpu.brand === 'AMD' && !motherboard.name.includes('AMD')) {
        issues.push('AMD CPU requires AMD-compatible motherboard');
      }
    }

    if (gpu && motherboard) {
      // Check if motherboard has PCIe slot (simplified)
      if (!motherboard.specifications['PCIe Slots']) {
        issues.push('Motherboard may not have compatible PCIe slot for GPU');
      }
    }

    if (ram && motherboard) {
      // Check RAM compatibility (simplified)
      if (ram.name.includes('DDR5') && !motherboard.specifications['Memory']?.includes('DDR5')) {
        issues.push('DDR5 RAM requires DDR5-compatible motherboard');
      }
    }

    setCompatibilityIssues(issues);
  };

  const getTotalPrice = () => {
    return buildComponents
      .filter(comp => comp.selected)
      .reduce((total, comp) => total + comp.selected!.price, 0);
  };

  const getCompletionPercentage = () => {
    const requiredComponents = buildComponents.filter(comp => comp.required);
    const selectedRequired = requiredComponents.filter(comp => comp.selected);
    return Math.round((selectedRequired.length / requiredComponents.length) * 100);
  };

  return (
    <section id="pc-builder" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Build Your PC
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create your perfect PC build with our compatibility checker
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Select Components
              </h3>
              
              <div className="space-y-4">
                {buildComponents.map((component) => {
                  const IconComponent = component.icon;
                  return (
                    <motion.div
                      key={component.category}
                      layout
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-6 h-6 text-primary-500" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {component.name}
                              {component.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </h4>
                            {component.selected ? (
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {component.selected.name}
                                </span>
                                <span className="text-sm font-medium text-primary-500">
                                  ${component.selected.price}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">
                                Not selected
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {component.selected ? (
                            <>
                              <Check className="w-5 h-5 text-green-500" />
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={X}
                                onClick={() => removeComponent(component.category)}
                              />
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCategory(component.category)}
                            >
                              Select
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {/* Component Selection Modal */}
                      {selectedCategory === component.category && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                            {getProductsByCategory(component.category).map((product) => (
                              <motion.div
                                key={product.id}
                                whileHover={{ scale: 1.02 }}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 cursor-pointer hover:border-primary-500"
                                onClick={() => selectComponent(component, product)}
                              >
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                      {product.name}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {product.brand}
                                    </p>
                                    <p className="text-sm font-medium text-primary-500">
                                      ${product.price}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Build Summary */}
          <div className="space-y-6">
            {/* Progress */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Build Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Completion</span>
                    <span className="font-medium">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getCompletionPercentage()}%` }}
                      className="bg-primary-500 h-2 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${getTotalPrice().toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Build Cost
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Compatibility Check */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Compatibility Check
              </h3>
              
              {compatibilityIssues.length === 0 ? (
                <div className="flex items-center space-x-2 text-green-500">
                  <Check className="w-5 h-5" />
                  <span>No compatibility issues detected</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {compatibilityIssues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2 text-red-500">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                disabled={getCompletionPercentage() < 100 || compatibilityIssues.length > 0}
              >
                Add Build to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setBuildComponents(prev => 
                  prev.map(comp => ({ ...comp, selected: undefined }))
                )}
              >
                Clear Build
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};