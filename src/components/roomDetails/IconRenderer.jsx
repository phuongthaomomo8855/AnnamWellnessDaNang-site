import React from 'react';
import * as LucideIcons from 'lucide-react';

const { HelpCircle } = LucideIcons;

const IconRenderer = ({ iconName, className }) => {
  const IconComponent = LucideIcons[iconName] || HelpCircle;
  return <IconComponent className={className} />;
};

export default IconRenderer;