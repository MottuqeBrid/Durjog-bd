import { motion as Motion } from "framer-motion";

const WritersSpotlight = () => {
  const writers = [
    {
      name: "Rahim Uddin",
      bio: "Disaster researcher & writer of 20+ blogs",
      img: "https://famouswritingroutines.com/wp-content/uploads/2022/06/daily-word-counts-of-famous-authors-1140x761.jpg",
    },
    {
      name: "Salma Khatun",
      bio: "Climate activist and storyteller",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU_xdZINupuhwWQxBg3GEHdf8LsFvZ66Gl4g&s",
    },
    {
      name: "Mahin Hossain",
      bio: "Writes about community recovery & resilience",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1WQeQ6SN5jsG1XEWtSMCWVTvtumLz9AMVBKfXaTDeD0zZCaHYETUrftxD1FYZAocSrM&usqp=CAU",
    },
  ];

  return (
    <div className="px-6 py-12 ">
      <div className="neumorphic p-6 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          🌟 Writer’s Spotlight
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {writers.map((writer, idx) => (
            <Motion.div
              key={idx}
              className=" neumorphism p-6 rounded-xl shadow-inner text-center neumorphic"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={writer.img}
                alt={writer.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-white"
              />
              <h3 className="text-xl text-gray-600 font-semibold">
                {writer.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{writer.bio}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WritersSpotlight;
