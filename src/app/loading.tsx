import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="relative w-12 h-12 animate-rotate">
        {/* Ball 1 */}
        <div className="absolute w-5 h-5 rounded-full bg-foreground animate-ball1"></div>
        {/* Ball 2 */}
        <div className="absolute w-5 h-5 rounded-full bg-foreground animate-ball2"></div>
      </div>
    </div>
  );
};

export default Loading;
