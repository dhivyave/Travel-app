// import React from "react";
// import { Link } from "react-router-dom";
// import "./DubaiExplore.css"; // custom CSS for Dubai

// const dubaiPlaces = [
//   {
//     id: 101, // use 100+ IDs to distinguish from Goa
//     name: "Burj Khalifa",
//     description: "World’s tallest building with stunning city views.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjitkMQL2SNUDSVyvgr0sHl6mDYwAk-9NPiA&s",
//   },
//   {
//     id: 102,
//     name: "Palm Jumeirah",
//     description: "Artificial island shaped like a palm tree.",
//     image:
//       "https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/0d/3b/46.jpg",
//   },
//   {
//     id: 103,
//     name: "Dubai Mall",
//     description: "One of the world’s largest shopping malls.",
//     image:
//       "https://www.oasispalmdubai.com/blog/wp-content/uploads/2022/07/shops-1.jpg",
//   },
//   {
//     id: 104,
//     name: "Desert Safari",
//     description: "Adventure rides and cultural performances in the desert.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP3sjrRyMhI0pDTqjTF6FkSN79Y3Lv7c4PNH1naVTgEcbqEQTNVi49EbAdhZcA2kOuZs8&usqp=CAU",
//   }
// ];

// const DubaiExplore = () => {
//   return (
//     <div className="dubai-container">
//       {/* Banner */}
//       <div className="dubai-banner">
//         <img
//           src="https://tii.imgix.net/production/articles/12772/e6e279c7-c6bb-415e-8d1f-0eee12e8a4b9-alDhkb.png?auto=compress&fit=crop&auto=format"
//           alt="Dubai Banner"
//         />
//         <h1 className="banner-title">Explore Dubai</h1>
//       </div>
     
//       {/* Places */}
//       <h2 className="section-title">Top Attractions in Dubai</h2>
//       <div className="places-grid">
//         {dubaiPlaces.map((place) => (
//           <div key={place.id} className="place-card">
//             <img src={place.image} alt={place.name} className="place-image" />
//             <div className="place-info">
//               <h3>{place.name}</h3>
//               <p>{place.description}</p>
//               <Link to={`/dubai/${place.id}`}>
//                 <button className="view-btn">View More</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DubaiExplore;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DubaiExplore.css"; // custom CSS for Dubai

const dubaiPlaces = [
  {
    id: 101,
    name: "Burj Khalifa",
    description: "World’s tallest building with stunning city views.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjitkMQL2SNUDSVyvgr0sHl6mDYwAk-9NPiA&s",
    popularity: "top",
  },
  {
    id: 102,
    name: "Palm Jumeirah",
    description: "Artificial island shaped like a palm tree.",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/0d/3b/46.jpg",
    popularity: "top",
  },
  {
    id: 103,
    name: "Dubai Mall",
    description: "One of the world’s largest shopping malls.",
    image:
      "https://www.oasispalmdubai.com/blog/wp-content/uploads/2022/07/shops-1.jpg",
    popularity: "medium",
  },
  {
    id: 104,
    name: "Desert Safari",
    description: "Adventure rides and cultural performances in the desert.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP3sjrRyMhI0pDTqjTF6FkSN79Y3Lv7c4PNH1naVTgEcbqEQTNVi49EbAdhZcA2kOuZs8&usqp=CAU",
    popularity: "low",
  },
  {
    id: 105,
    name: "Dubai Fountain",
    description: "World’s largest choreographed fountain system.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHRf85gZsFEwbfH859g_awHnu45GWHTEp73w&s",
    popularity: "medium",
  },
  {
    id: 106,
    name: "Dubai Frame",
    description: "Iconic frame offering views of old and new Dubai.",
    image: "https://www.travalot.com/_next/image?url=https%3A%2F%2Fapi.travalot.com%2Fattachment%2F7ddd13d0-736f-11f0-83f8-e116b11710fb.jpg&w=3840&q=75",
    popularity: "medium",
  },
  {
    id: 107,
    name: "JBR Beach",
    description: "Popular beach with restaurants and water activities.",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/692692516.jpg?k=4f18322d7b05b1e40467b15119c015f5f386f6f9e1b77df946a185e44e37052b&o=",
    popularity: "medium",
  },
  {
    id: 108,
    name: "Global Village",
    description: "Cultural pavilions, shopping & entertainment.",
    image: "https://static.toiimg.com/thumb/msid-124533434,width-1070,height-580,imgsize-147832,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    popularity: "medium",
  },

  // 🌴 LOW / QUIET PLACES
  {
    id: 109,
    name: "Al Fahidi Historical District",
    description: "Traditional wind-tower houses and museums.",
    image: "https://www.visitdubai.com/-/media/gathercontent/poi/a/al-fahidi-historical-neighbourhood/fallback-image/al-fahidi-historical-neighbourhood.jpg",
    popularity: "low",
  },
  {
    id: 110,
    name: "Dubai Creek",
    description: "Historic area with abra rides.",
    image: "https://cdn.dxbproperties.ae/media/seo_images_property/dubai_creek_harbour_thumbnail_1_1200.webp?width=1200&height=630&format=jpeg&quality=15",
    popularity: "low",
  },
  {
    id: 111,
    name: "Ras Al Khor Wildlife Sanctuary",
    description: "Famous for flamingos and bird watching.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzFK0QY0js9t1dpSy34wVzboQk8sCiXzh8w&s",
    popularity: "low",
  }
];

const DubaiExplore = () => {
  const [filter, setFilter] = useState(""); // top / medium / low / "" = all

  // Filter places based on popularity
  const filteredPlaces = filter
    ? dubaiPlaces.filter((place) => place.popularity === filter)
    : dubaiPlaces;

  return (
    <div className="dubai-container">
      {/* Banner */}
      <div className="dubai-banner">
        <img
          src="https://tii.imgix.net/production/articles/12772/e6e279c7-c6bb-415e-8d1f-0eee12e8a4b9-alDhkb.png?auto=compress&fit=crop&auto=format"
          alt="Dubai Banner"
        />
        <h1 className="banner-title">Explore Dubai</h1>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["top", "medium", "low", ""].map((type, idx) => (
          <button
            key={idx}
            className={filter === type ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter(type)}
            title={type === "" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          >
            {type === "" ? "All" : type.charAt(0).toUpperCase()}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <h2 className="section-title">Top Attractions in Dubai</h2>
      <div className="places-grid">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <div key={place.id} className="place-card">
              <img src={place.image} alt={place.name} className="place-image" />
              <div className="place-info">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <Link to={`/dubai/${place.id}`}>
                  <button className="view-btn">View More</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#ff6f61" }}>
            No places found for this filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default DubaiExplore;
