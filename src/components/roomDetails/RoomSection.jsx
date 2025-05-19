import React from 'react';

const RoomSection = ({ title, children, titleClassName = "text-2xl md:text-3xl font-serif text-primary-dark mb-5 md:mb-6" }) => (
  <div className="mb-10 md:mb-12">
    <h3 className={titleClassName}>{title}</h3>
    {children}
  </div>
);

export default RoomSection;