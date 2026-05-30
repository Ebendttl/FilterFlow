import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const priorityConfig = {
  urgent: {
    label: "Urgent",
    icon: ArrowUp,
    iconColor: "text-red-500",
    textColor: "text-red-600",
    bg: "bg-red-50/50"
  },
  high: {
    label: "High",
    icon: ArrowUp,
    iconColor: "text-orange-500",
    textColor: "text-orange-600",
    bg: "bg-orange-50/50"
  },
  medium: {
    label: "Medium",
    icon: Minus,
    iconColor: "text-amber-400",
    textColor: "text-amber-600",
    bg: "bg-amber-50/50"
  },
  low: {
    label: "Low",
    icon: ArrowDown,
    iconColor: "text-sky-400",
    textColor: "text-sky-600",
    bg: "bg-sky-50/50"
  },
  none: {
    label: "–",
    icon: Minus,
    iconColor: "text-gray-300",
    textColor: "text-gray-400",
    bg: "bg-gray-50/50"
  }
};

export default function PriorityBadge({ priority }) {
  const config = priorityConfig[priority] || priorityConfig.none;
  const Icon = config.icon;

  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.textColor} ${config.bg} select-none`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} strokeWidth={2.5} />
      <span>{config.label}</span>
    </span>
  );
}
