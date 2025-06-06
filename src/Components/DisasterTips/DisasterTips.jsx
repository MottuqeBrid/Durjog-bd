import { motion as Motion } from "framer-motion";
const DisasterTips = () => {
  const tips = [
    {
      id: 1,
      title: "🌪️ Know the Warning Signs",
      description:
        "Recognize early symptoms of natural disasters like storms, floods, or earthquakes. Stay alert to official warnings and unusual environmental changes.",
    },
    {
      id: 2,
      title: "📦 Prepare a Go-Bag",
      description:
        "Pack essential emergency supplies including water, non-perishable food, flashlight, batteries, first aid kit, masks, and important documents.",
    },
    {
      id: 3,
      title: "📱 Stay Connected",
      description:
        "Charge your phone, follow local disaster management channels, and have emergency contact numbers saved and accessible.",
    },
    {
      id: 4,
      title: "🚨 Evacuation Plan",
      description:
        "Create an emergency plan with your family. Know the nearest shelter locations and how to reach them safely.",
    },
    {
      id: 5,
      title: "🏠 Secure Your Home",
      description:
        "Anchor heavy furniture, seal roof leaks, and ensure your home is resilient to floods or high winds if you're in a vulnerable area.",
    },
    {
      id: 6,
      title: "🧯 Fire Safety",
      description:
        "Keep a fire extinguisher at home and learn how to use it. Avoid open flames during high-risk weather conditions.",
    },
  ];

  return (
    <div className="px-6 py-12 ">
      <div className="neumorphic p-6 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          📘 Disaster Facts & Tips
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, idx) => (
            <Motion.div
              key={idx}
              className=" neumorphism p-6 rounded-xl shadow-inner neumorphic"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
              <p className="text-sm ">{tip.description}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisasterTips;
