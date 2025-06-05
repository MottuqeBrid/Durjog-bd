import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomepageLoader = () => {
  return (
    <div>
      <div className="card bg-base-100 shadow-xl neumorphism p-4">
        <Skeleton height={180} borderRadius={16} />
        <div className="mt-4 space-y-2">
          <Skeleton height={20} width={`80%`} />
          <Skeleton height={14} count={2} />
          <div className="flex justify-between mt-4">
            <Skeleton width={80} height={32} />
            <Skeleton width={80} height={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageLoader;
