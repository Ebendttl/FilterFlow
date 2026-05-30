import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickOutside } from '../../hooks/useClickOutside';

/**
 * Reusable dropdown wrapper with framer-motion scale-in animation
 */
export default function Dropdown({ trigger, isOpen, onClose, children, align = 'left', className = '' }) {
  const ref = useRef(null);
  useClickOutside(ref, onClose, isOpen);

  return (
    <div className="relative" ref={ref}>
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            style={{ originX: align === 'right' ? 1 : 0, originY: 0 }}
            className={`absolute z-50 mt-1.5 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black/50 ${
              align === 'right' ? 'right-0' : 'left-0'
            } ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
