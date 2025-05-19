import React from "react";
import { Card } from "@/components/ui/card";

const RoomCardSkeleton = () => (
  <Card className="overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-52 bg-gray-300/70"></div>
    <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300/70 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300/70 rounded w-full"></div>
        <div className="h-4 bg-gray-300/70 rounded w-5/6"></div>
        <div className="h-10 bg-gray-300/70 rounded w-1/2 mt-2"></div>
    </div>
  </Card>
);

export default RoomCardSkeleton;