import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, List, Grid, Heart, Zap, Leaf, Brain, Sparkles } from "lucide-react";

const categoryIcons = {
  'Signature Treatments': Heart,
  'Holistic Program': Leaf,
  'Wellness Workshop': Brain,
  'Wellness Packages': Zap,
  'default': Sparkles,
};

const WellnessFilterControls = ({ categories, activeCategory, setActiveCategory, viewMode, setViewMode }) => {
  return (
    <div className="mb-8 md:mb-12 p-4 bg-card/50 backdrop-blur-md rounded-xl shadow-lg border border-border/30">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-heading-foreground mb-3 sm:mb-0 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary" />
          Filter & View Options
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')} aria-label="Grid view">
            <Grid className="h-5 w-5" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')} aria-label="List view">
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => {
          const Icon = categoryIcons[category] || categoryIcons.default;
          return (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`transition-all duration-200 ease-in-out text-xs sm:text-sm px-3 py-1.5 h-auto rounded-full
                ${activeCategory === category ? 'bg-primary text-primary-foreground shadow-md' : 'bg-background/30 hover:bg-primary/10 border-border/50'}`}
            >
              <Icon className="w-3.5 h-3.5 mr-1.5 opacity-80" />
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default WellnessFilterControls;