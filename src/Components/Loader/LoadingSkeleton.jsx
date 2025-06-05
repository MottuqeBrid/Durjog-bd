import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({ count = 5 }) => {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-[#e0e0e0] shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff]"
        >
          <Skeleton height={30} width={`60%`} />
          <Skeleton height={20} width={`90%`} className="my-2" />
          <Skeleton height={15} count={3} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
