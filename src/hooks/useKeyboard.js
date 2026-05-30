import { useEffect } from 'react';

/**
 * Global keyboard shortcut handler
 * @param {Object} shortcuts - { 'Meta+k': handler, 'Control+k': handler, ... }
 */
export function useKeyboard(shortcuts) {
  useEffect(() => {
    function handleKeyDown(e) {
      // Don't fire when typing in inputs/textareas (except specific shortcuts)
      const tag = e.target.tagName.toLowerCase();
      const isEditing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

      for (const [combo, handler] of Object.entries(shortcuts)) {
        const parts = combo.split('+');
        const key = parts[parts.length - 1].toLowerCase();
        const requiresMeta = parts.includes('Meta');
        const requiresCtrl = parts.includes('Control');
        const requiresShift = parts.includes('Shift');
        const allowInInput = parts.includes('allowInInput');

        if (isEditing && !allowInInput && (requiresMeta || requiresCtrl)) {
          // Allow cmd/ctrl shortcuts even in inputs (for ⌘K, ⌘J, ⌘N)
        } else if (isEditing && !allowInInput && !requiresMeta && !requiresCtrl) {
          continue;
        }

        const keyMatches = e.key.toLowerCase() === key || e.code.toLowerCase() === `key${key}`;
        const metaMatches = requiresMeta ? (e.metaKey || e.ctrlKey) : true;
        const ctrlMatches = requiresCtrl ? (e.ctrlKey || e.metaKey) : true;
        const shiftMatches = requiresShift ? e.shiftKey : true;

        if (keyMatches && metaMatches && ctrlMatches && shiftMatches) {
          // Avoid double-firing for Meta+k and Control+k
          if ((requiresMeta || requiresCtrl) && !e.metaKey && !e.ctrlKey) continue;
          e.preventDefault();
          handler(e);
          break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
