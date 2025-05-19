import React from 'react';
import { CheckCircle, Star } from 'lucide-react';


const FeatureList = ({ items, icon: DefaultIcon = CheckCircle, iconClass = "text-secondary" }) => {
  if (!items || items.length === 0) return null;
  return (
    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
      {items.map((item, index) => {
        const IconComponent = item.Icon || DefaultIcon;
        return (
          <li key={item.id || index} className={`flex items-start text-muted-foreground ${item.isKey ? 'font-semibold text-heading-foreground' : ''}`}>
            <IconComponent className={`w-4 h-4 mr-2.5 mt-0.5 ${item.isKey ? 'text-secondary' : 'text-primary/70'} flex-shrink-0`} />
            {item.text}
            {item.isKey && <Star className="w-3.5 h-3.5 ml-1.5 text-yellow-500 flex-shrink-0" />}
          </li>
        );
      })}
    </ul>
  );
};

export default FeatureList;