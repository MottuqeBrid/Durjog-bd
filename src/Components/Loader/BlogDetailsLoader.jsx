import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogDetailsLoader = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="p-6 rounded-2xl shadow-inner bg-[#ecf0f3] animate-pulse space-y-6">
        <Skeleton height={40} width={250} style={{ borderRadius: "12px" }} />

        <div className="flex justify-center">
          <Skeleton height={300} width={600} style={{ borderRadius: "24px" }} />
        </div>

        <div className="space-y-4">
          <Skeleton height={25} width={`60%`} />
          <Skeleton count={5} height={15} />
          <Skeleton height={100} width={`100%`} style={{ borderRadius: "16px" }} />
        </div>

        <div className="space-y-3 pt-6">
          <Skeleton height={20} width={120} />
          <Skeleton count={3} height={50} style={{ borderRadius: "10px" }} />
        </div>
      </div>
    </div>
    );
};

export default BlogDetailsLoader;