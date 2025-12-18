
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import socket from "../socket"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PlaceDetails.css";
//hospital data
const nearbyHospitals = {
  "Baga Beach": [
    {
      id: 1,
      name: "Mathew Braganza Hospital",
      location: "Beside Fish Market, Calangute, Goa 403516",
      contact: "+91 832 226 0620",
      image: "https://content.jdmagicbox.com/comp/goa/dc/0832px832.x832.1223434237w9i5v1.dc/catalogue/mathew-braganza-hospital-calangute-goa-hospitals-0xvqtnpwwf.jpg"
    },
    {
      id: 2,
      name: "Manipal Hospitals Goa",
      location: "Dr E Borges Road, Dona Paula, Goa 403004",
      contact: "+91 832 246 0000",
      image: "https://www.addressguru.in/images/1627726899.png"
    },
    {
      id: 3,
      name: "Vrundavan Hospital & Research Centre",
      location: "Mapusa, Bardez, North Goa 403507",
      contact: "+91 832 226 1234",
      image: "https://i3c-medical-colleges-assets.blr1.digitaloceanspaces.com/2020/09/19/3335bede9a2a423698d199a1680bd0e7.jpg"
    },
    {
      id: 4,
      name: "Dr. L.H. Hiranandani Hospital",
      location: "Baga Road, North Goa, 403516",
      contact: "+91 832 245 1234",
      image: "https://www.bestdocapp.com/wp-content/uploads/2022/07/Dr.-L-H-hiranandani-hospital-768x539.jpg.webp"
    }
  ],
   "Fort Aguada": [
    {
      id: 1,
      name: "Dr Dukles Hospital & Research Centre",
      location: "Fort Aguada Road, Ximer / Candolim, Goa 403515",
      contact: "+91 95524 89333",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFDxbbnR1a3luz5hTu2ox1yUPdPx-atY7VfQ&s"  // replace with real valid image if you find one
    },
    {
      id: 2,
      name: "Primary Health Centre, Candolim",
      location: "Candolim, Goa 403515",
      contact: "0832‑2489035",  // from government health centre listing :contentReference[oaicite:2]{index=2}
      image: "https://image3.mouthshut.com/images/imagesp/l/926028051s.jpg"
    }
    // You can add more if you find them / verify them
  ],
  "Dudhsagar Waterfalls":[
    {
    id: 1,
    name: "Candolim Primary Health Centre (PHC Candolim)",
    location: "Candolim, North Goa, Goa (PHC under Goa Government)",
    contact: "0832-2489035",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfWnxHT7n9v-bsEbBGi1SMSbKuttowl3C4w&s"
    // image could be added if available
  },
  {
    id: 2,
    name: "North Goa District Hospital, Mapusa",
    location: "Mapusa, North Goa, Goa",
    contact: "0832-2253244", 
    image:"https://dhs.goa.gov.in/cms-gov-be/storage/app/public/uploads/galleryList/oPpCWFjtfgQWks50NBY35SEkVn1rxs52zwd0oouP.jpg" // one of the official phone numbers listed for North Goa hospital. :contentReference[oaicite:1]{index=1}
  },
  ],
  "Basilica of Bom Jesus": [
  {
    id: 1,
    name: "Healthway Hospital Old Goa",
    location: "Kadamba Plateau, Chimbel, Old Goa 403006",
    contact: "+91 832 246 2255",
    image: "http://joonsquare.com/usermanage/image/business/healthway-hospitals-north-goa-8552/healthway-hospitals-north-goa-3.jpg"
  },
  {
    id: 2,
    name: "Goa Medical College & Hospital (GMC)",
    location: "Bambolim, Goa 403202 (Approx 6–7 km from Old Goa)",
    contact: "+91 832 245 8700",
    image: "https://www.sotto.goa.gov.in/storage/2024/06/ssb.webp"
  },
  {
    id: 3,
    name: "Campal Clinic & Hospital",
    location: "Campal, Panaji, Goa 403001",
    contact: "+91 832 222 5704",
    image: "https://content3.jdmagicbox.com/comp/goa/66/0832p832std19366/catalogue/campal-clinic-panjim-goa-hospitals-plznrh9nxv.jpg"
  },
],
  "Anjuna Flea Market": [
    {
    id: 1,
    name: "St. Anthony’s Hospital",
    location: "Zor Vaddo, Anjuna, Goa 403509, India",
    contact: "+91 832 227 4308",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPcBzb8QzKzMaE5bg6KT2E9g___8mEYQwJQ&s",
    notes: "Local hospital in Anjuna — good for minor emergencies or consultation.",
  },
  {
    id: 2,
    name: "Vision Multispeciality Hospital",
    location: "Duler Ground Road, Mapusa, North Goa, Goa 403507, India",
    contact: "(0832) from Mapusa listings",
    image:"https://content.jdmagicbox.com/comp/goa/n4/0832px832.x832.121031130028.d4n4/catalogue/vision-multispeciality-pharmacy-mapusa-goa-chemists-zasnybmyha.jpg",
    notes: "Multi-specialty hospital about 6-10 km from Anjuna — serves the Bardez/Mapusa region. 24-hour services listed. " 
  },
  {
    id: 3,
    name: "Mapusa District Hospital",
    location: "Jamatkhana Road, Mapusa, Goa 403507, India",
    contact: "(0832) — Public hospital, 24-hour emergency services",
    image:"https://content.jdmagicbox.com/v2/comp/goa/e8/0832px832.x832.230209200602.g6e8/catalogue/asilo-district-hospital-mapusa-goa-dialysis-centres-SqJu9WXff8.jpg",
    notes: "Government district hospital for North Goa; useful for major emergencies or serious care." 
  },
],
"77-foot Lord Ram Statue & Ramayana Theme Park":[
  {
    id: 1,
    name: "Community Health Centre, Canacona",
    location: "Near Mamledar Office, Canacona 403702, Goa, India",
    contact: "(0832) 2643339 / 2643422",
    notes: "Public health-centre serving Canacona taluka. Useful for general care / emergencies. :contentReference[oaicite:2]{index=2}",
    image:"https://etimg.etb2bimg.com/thumb/111783503.cms?width=400&height=300",
  },
 {
    id: 2,
    name: "Canacona Government Hospital",
    location: "NH-66, Mastimol / Main road, Canacona 403702, Goa, India",
    contact: "(0832) 2643422",  
    notes: "24-hour public hospital for general treatment & emergencies. :contentReference[oaicite:4]{index=4}",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThl2MRv1LQ_QiurxGfweqjHKJFudb7LVBTtw&s",
  },
  {
    id: 3,
    name: "Canacona Clinical Centre",
    location: "Nagersem, Char Rasta, Canacona 403702, Goa, India",
    contact: "(0832) 2643367",
    notes: "Private clinic / hospital; another local option for medical consultations. :contentReference[oaicite:5]{index=5}",
    image:"https://content3.jdmagicbox.com/v2/comp/goa/28/0832p832std5828/catalogue/canacona-clinical-centre-canacona-goa-hospitals-9kp6h3b57d.jpg",

  }
],
"Calangute Beach":[
  {
  id: 1,
  name: "Mathew Braganza Hospital",
  location: "Calangute - Anjuna Rd, Naikawado, Gardez, Calangute, Goa 403516, India",
  contact: "0832-671-6666 (24-hour contacts) / +91-99230-89676 (alternate) ", // real contact numbers from listings :contentReference[oaicite:0]{index=0}
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-3zPC9N9rEXdbh8OGKmjiM_-1m7tzqAqe8g&s" 
},

{
  id: 2,
  name: "Dr. Dukle's Hospital & Research Centre",
  location: "Aguada – Calangute Road, Next to Bob’s Inn Hotel, Gauravaddo, Candolim, Goa 403515, India",
  contact: "0832-248-9333 (approx local number) ", // based on local source :contentReference[oaicite:1]{index=1}
  image: "https://content.jdmagicbox.com/comp/goa/71/0832P832STD20171/catalogue/dr-dukle-hospital-and-research-centre-candolim-goa-hospitals-1axokv8.jpg"
},
{
  id: 3,
  name: "Bosio Hospital",
  location: "Football Ground, Pilerne-Candolim Rd, Opposite Montero, Pintos Vaddo, Candolim, Goa 403515, India",
  contact: "0832-248-9034 (local contact) ", // real listing :contentReference[oaicite:2]{index=2}
  image: "https://pix3.agoda.net/hotelimages/251/251553/251553_14081119060021007880.jpg?s=312x"
},
],
"Chapora Fort":[
{
    "id": 1,
    "name": "Dr. Kolwalkar's Galaxy Hospital",
    "location": "Near S.P.G. Hall/Severina Gardens, Xelpem, Duler, Mapusa, Goa 403526, India",
    "contact": "0832-2266666/67/68/69 (main), 8380065970 (approx) ", // based on local business listing & website :contentReference[oaicite:0]{index=0}
    "image": "https://content.jdmagicbox.com/comp/goa/s9/0832px832.x832.140324213049.d4s9/catalogue/dr-ashok-sirsat-dr-kolwalkars-galaxy-hospital-mapusa-goa-general-surgeon-doctors-0roaqjhvaz.jpg"
  },
  {
    "id": 2,
    "name": "Vision Hospital Goa",
    "location": "Duler Ground Rd, Karaswada, Mapusa, Goa 403526, India",
    "contact": "+91-91122-46688 / 0832-2266188 (approx) ", // local directory info :contentReference[oaicite:1]{index=1}
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZjyzTjJ5vASdzmlt3ua4i_aX8us3bOalI2g&s"
  },
  {
    "id": 3,
    "name": "Mapusa District Hospital",
    "location": "Mapusa Jamatkhana Road, Peddem, Mapusa, Goa 403507, India",
    "contact": "0832-2254444 / 0832-2262372 (approx) ", // official gov list & local directory :contentReference[oaicite:2]{index=2}
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQkHeFHerBbVwqSmE6fpCcrvo7UZXqtVxPFA&s"
  },
  {
    "id": 4,
    "name": "Holy Cross General Remanso Hospital",
    "location": "Rajvaddo, near Alankar Theatre, Mapusa, Goa 403507, India",
    "contact": "0832-2262466 (approx) ", // local directory info :contentReference[oaicite:4]{index=4}
    "image": "https://lh4.googleusercontent.com/proxy/dYUogswN82M_RfIUojnAXg56QMbpG0NhY8X0eMYY2YrADOWORFc9dVpPOJEUPdwp0gM4WjbfhJ287t3zebRiw0RyVcLwELN0o7Ix5OFh5VIDZ6YW-1xplVB4Irrt8WcqSHblFien"
  },
],
"Morjim Beach":[
{
    "id": 1,
    "name": "Thera Nirvana Health Care Center",
    "contact": "+91‑73059‑09666", // local centre phone from website/listing :contentReference[oaicite:1]{index=1}
    "location": "H.No. 980, Kacholewada, Morjim, Pernem, Goa 403512, India",
    "image":"https://static.wixstatic.com/media/0839ad_a98fe57599a347dbb5b2e05f84485237~mv2.jpg/v1/fill/w_260,h_213,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-03-04%20at%201_45_edited.jpg"
  },
  {
    "id": 2,
    "name": "Niramaya Medical Hospital",
    "contact": "+91‑87807‑40550", // phone from hospital site and directory :contentReference[oaicite:2]{index=2}
    "location": "Shop No. 1, House No. 176, Chopdem Fish Market, Siolim, Goa 403517, India",
    "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyHh5MP2IsQAXUAtPc8Q7ugkC_yzcoloLjw&s"
  },
  {
    "id": 3,
    "name": "District Hospital Mapusa",
    "contact": "0832‑2253244 / 0832‑2262372 (approx)", // local government hospital contacts
    "location": "Mapusa Jamatkhana Road, Peddem, Mapusa, Goa 403507, India",
    "image":"https://dhs.goa.gov.in/cms-gov-be/storage/app/public/uploads/galleryList/oPpCWFjtfgQWks50NBY35SEkVn1rxs52zwd0oouP.jpg"
  }
],
"Se Cathedral":[
  {
    "id": 1,
    "name": "Healthway Hospital Old Goa",
    "contact": "0832‑2467666 / 09923478123", // main hospital contact :contentReference[oaicite:2]{index=2}
    "location": "Plot No 132/1 (Part), Ella Village, Kadamba Plateau, Old Goa, Goa 403402, India",
    "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvpEH4iESod1CIvEsZ25KtAYGN8gHUBQToKg&s"
  },
  {
    "id": 2,
    "name": "Sushruti Dr Dhulapkar’s Hospital, Corlim",
    "contact": "0832‑? (local hospital number — verify locally or on site listing)", // approximate/public directory
    "location": "Ponda‑Panaji Rd, Behind Indian Overseas Bank, Karmali, Corlim, Goa 403110, India",
    "image":"https://content3.jdmagicbox.com/comp/goa/99/0832p832std1899/catalogue/sushruti-dr-dhulapkars-hospital-corlim-goa-blood-testing-centres-7b22nczbgc.jpg"
  },
  {
    "id": 3,
    "name": "Savaikar Hospital, Ponda",
    "contact": "09579259359", // directory listing (approx) :contentReference[oaicite:13]{index=13}
    "location": "Warkhandem, Ponda, Goa 403401, India",
    "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tpTY-0bAfJ-DmpXgkixlGxDGkCRaTC-IPw&s",
  },
],
"Burj Khalifa":[
{
  id: 1,
  name: "Aster Royal Clinic Downtown",
  location: "Downtown, Burj Khalifa Residences - Burj Khalifa - Downtown Dubai, Dubai, UAE",
  contact: "+971 4 440 0500 / +971 50 862 5279", // real clinic contacts from listings :contentReference[oaicite:1]{index=1}
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUxRr_jcQApbv1z1b3DHq-A7b8zgoSOCRogA&s" // representative image
},

{
  id: 2,
  name: "Mediclinic Dubai Mall",
  location: "The Dubai Mall, Fashion Parking, Level 7, Downtown Dubai, Dubai, UAE",
  contact: "04-4495222 / 8001999", // real contact — official clinic info :contentReference[oaicite:2]{index=2}
  image: "https://mdsprodcdn.azureedge.net/mds/uploads/tms/2025/03/06/67c95b0b4ac86.jpeg"
},

{
  id: 3,
  name: "Emirates Hospital Clinic – Business Bay",
  location: "Block B, Mezzanine Floor, Bay Avenue, Business Bay, Dubai, UAE",
  contact: "+971 4 586 2048", // official clinic number :contentReference[oaicite:3]{index=3}
  image: "https://img.okadoc.com/uploads/photo/file/630/emirates-hospital-clinic-business-bay-dubai-20200206054038.jpg"
},
],
"Palm Jumeirah":[
  
  {
    id: 1,
    name: "Emirates Hospital Clinics – Palm Jumeirah",
    location: "Golden Mile Galleria Building 9, Palm Jumeirah, Dubai, UAE",
    contact: "+971 800 444444", // general contact number listed for clinic services :contentReference[oaicite:0]{index=0}
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQrm4XSZJWNzjqTKL7GssQInmOa_wi4xlyg&s"
  },
  {
    id: 2,
    name: "Medcare Medical Centre – Palm Jumeirah",
    location: "Seven Palm Hotel Building, The Palm Jumeirah, Jumeirah, Dubai, UAE",
    contact: "+971 4 380 6000", // central Medcare Dubai contact; branch specific contact available via Medcare site 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH65EcCTqsT2f3n76VICvX73m5wdvOR5w1ww&s"
  },
  {
    id: 3,
    name: "Emirates SportsMED – The Palm",
    location: "Building 9, Mezzanine, Golden Mile Galleria, Palm Jumeirah, Dubai, UAE",
    contact: "+971 800 444444", // shared Emirates Hospitals contact (clinic services) :contentReference[oaicite:2]{index=2}
    image: "https://img.okadoc.com/uploads/photo/file/6347/emirates-sportsmed-dubai-20191126132422.jpg"
  },
  {
    id: 4,
    name: "Al Das Medical Clinic",
    location: "Shoreline Building 10, Ground Floor, The Palm Jumeirah, Dubai, UAE",
    contact: "+971 4 240 4021", // local clinic phone listed in directories :contentReference[oaicite:3]{index=3}
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvP4vkYs_wYa_pFv2fvcJoq_XZQA6qPJi4Dw&s"
  },
],
"Mall of the Emirates":[
  {
    id: 1,
    name: "Saudi German Hospital Dubai",
    location: "Hessa Street 331 West, Al Barsha 3, Exit 36, Sheikh Zayed Rd, Dubai, UAE",
    contact: "+971 4 434 4444",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnw7rTeKWsCqfLKpuJkGODSd06ysBMTnihg&s"
  },
  {
    id: 2,
    name: "Al Zahra Hospital Dubai",
    location: "Sheikh Zayed Rd, Al Barsha First, Dubai, UAE",
    contact: "+971 4 389 0000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6hYjRNY4k5NZuuwOpy84132o3Gd-iH5HvIA&s"
  },
  {
    id: 3,
    name: "Mediclinic Parkview Hospital",
    location: "Umm Suqeim St, Al Barsha South Third, Dubai, UAE",
    contact: "+971 4 317 3000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7JJhyVthrQVvGzw3UTvVMh5SJBPOgisifSQ&s"
  },
],
"Desert Safari Dubai":[
  {
    id: 1,
    name: "Saudi German Hospital Dubai",
    location: "Hessa Street, Al Barsha 3, Dubai, UAE",
    contact: "+971 4 434 4444",
    image: "https://lyfboat-os.s3.fr-par.scw.cloud/lyfboat/uploads/hospitals/20-slider-saudi%20german%201%20slider%20image.jpg"
  },
  {
    id: 2,
    name: "Medeor 24x7 Hospital Dubai",
    location: "Al Safa 2, Sheikh Zayed Road, Dubai, UAE",
    contact: "+971 800 633367",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyoRpGz2OJSWU_fsYtaWaTRx5GPD9SY__ixQ&s"
  },
  {
    id: 3,
    name: "Mediclinic Parkview Hospital",
    location: "Umm Suqeim St, Al Barsha South Third, Dubai, UAE",
    contact: "+971 4 317 3000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7KcH8nFXZqhqhFzSRbE0PsDtAw9UFN1EkA&s"
  },
],
"Dubai Fountain":[
  {
    id: 2,
    name: "American Hospital Dubai",
    location: "Oud Metha Rd, Oud Metha, Dubai, UAE (≈10 min from Downtown Dubai)",
    contact: "+971 4 336 0000",
    image: "https://glbtranslations.com/wp-content/uploads/2023/10/American-Hospital-Dubai.jpg"
  },
  {
    id: 1,
    name: "Mediclinic City Centre",
    location: "Financial Center Rd, Downtown Dubai, Dubai, UAE",
    contact: "+971 4 428 4888",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ8rTQ1EoUMdngDhxPPslnTCRAnK2RA_P88A&s"
  },
  {
    id: 3,
    name: "Saudi German Hospital Dubai",
    location: "Hessa Street, Al Barsha 3, Dubai, UAE (≈15 min drive)",
    contact: "+971 4 434 4444",
    image: "https://lyfboat-os.s3.fr-par.scw.cloud/lyfboat/uploads/hospitals/20-slider-saudi%20german%201%20slider%20image.jpg"
  },
],
"Dubai Frame":[
    {
    id: 1,
    name: "Zulekha Hospital Dubai",
    location: "Al Nahda 2, Dubai, UAE (≈10–15 min drive from Dubai Frame)",
    contact: "+971 4 266 8866",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBW6aPNAw09H2vZDzbisTrNEpiHeHOkv1snA&s"
  },
  {
    id: 2,
    name: "American Hospital Dubai",
    location: "Oud Metha Rd, Oud Metha, Dubai, UAE (≈15 min drive)",
    contact: "+971 4 336 0000",
    image: "https://glbtranslations.com/wp-content/uploads/2023/10/American-Hospital-Dubai.jpg"
  
  },
  {
    id: 3,
    name: "Mediclinic City Hospital",
    location: "Dubai Healthcare City, Umm Hurair 2, Dubai, UAE (≈15–20 min drive)",
    contact: "+971 4 311 0000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ8rTQ1EoUMdngDhxPPslnTCRAnK2RA_P88A&s"
  },
],
"JBR Beach":[
  {
    id: 1,
    name: "Aster Hospital – Jumeirah",
    location: "Al Barsha, Sheikh Zayed Road, Dubai, UAE (≈15 min drive from JBR Beach)",
    contact: "+971 4 440 7777",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDz-XCBwEcjZFvxfsVR25wUIEXs2V95ZhAg&s"
  },
  {
    id: 2,
    name: "Medcare Medical Centre – Dubai Marina",
    location: "Al Marsa Street, Dubai Marina, Dubai, UAE (≈5 min drive)",
    contact: "+971 4 388 8833",
    image: "https://www.medcare.ae/fileadmin/user_upload/mchnewimg.jpg"
  },
  {
    id: 3,
    name: "Mediclinic Dubai Mall",
    location: "Financial Center Rd, Downtown Dubai, Dubai, UAE (≈20 min drive)",
    contact: "+971 4 428 4888",
    image: "https://mdsprodcdn.azureedge.net/mds/uploads/tms/2025/03/06/67c95b0b4ac86.jpeg"
  },
],
"Global Village":[
  {
    id: 4,
    name: "Fakeeh University Hospital",
    location: "Dubai Silicon Oasis, Dubai, UAE (≈25 min drive)",
    contact: "+971 4 414 2000",
    image: "https://clinicsoncall.com/wp-content/uploads/2024/10/fakeeh-university-hospital.png"
  },
  {
    id: 5,
    name: "Mediclinic City Hospital",
    location: "Dubai Healthcare City, Umm Hurair 2, Dubai, UAE (≈30 min drive)",
    contact: "+971 4 311 0000",
    image: "https://mediclinic.scene7.com/is/image/mediclinic/CCC:1-1?_ck=1616198690644&wid=525&hei=525&dpr=off"
  },
   {
    id: 2,
    name: "Saudi German Hospital Dubai",
    location: "Hessa Street, Al Barsha 3, Dubai, UAE (≈20 min drive)",
    contact: "+971 4 434 4444",
    image: "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/57c00d21-233a-4532-82ff-416c45c2106b/file.webp"
  },
],
"Al Fahidi Historical District":[
  {
    id: 1,
    name: "Aster Hospital – Mankhool",
    location: "Mankhool Rd, Bur Dubai, Dubai, UAE (≈5 min drive from Al Fahidi)",
    contact: "+971 4 440 0500",
    image: "https://www.vaidam.com/sites/default/files/aster_hospital_mankhool_building-min.jpg"
  },
  {
    id: 2,
    name: "LifeCare Hospital",
    location: "Near ADCB Metro Station, Al Karama, Dubai, UAE (≈5–7 min drive)",
    contact: "+971 4 377 0000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT_9UVKZzQ2g98aevvzuGl1R5mclQjDd-NSg&s"
  },
  {
    id: 3,
    name: "Iranian Hospital Dubai",
    location: "Al Wasl Rd, Jumeirah 1, Dubai, UAE (≈10 min drive)",
    contact: "+971 4 344 0250",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuSrMs5-RoDyCfkW0Gtk_VPyBTjTJFzRTwrA&s"
  },
],
"Dubai Creek":[
   {
    "id": 1,
    "name": "Iranian Hospital Dubai",
    "location": "Al Wasl Rd, Jumeirah 1, Dubai, UAE (≈15–20 min drive from Dubai Creek)",
    "contact": "+971 4 344 0250", 
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQofPzamPiCKymPtoZNMyvyrlwLkCCqXWLj2w&s"
  },
  {
    "id": 2,
    "name": "Rashid Hospital",
    "location": "315 Umm Hurair, Dubai (adjacent to Dubai Creek, Bur Dubai)",
    "contact": "+971 4 219 2000",
    "image": "https://images-ik.practo.com/tr:w-500,q-auto,f-auto,pr-true,dpr-auto/practices/1462221/rashid-hospital-dubai-67af0ecb93348.png"
  },
  {
    "id": 3,
    "name": "Medeor 24x7 Hospital",
    "location": "Consulates Area, Sheikh Khalifa Bin Zayed Rd, Bur Dubai, UAE (≈10–15 min drive)",
    "contact": "Check hospital reception locally",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReh2YUP4uiAhTp0SrkJUqK8TiFQJgQgr3Yug&s"
  },
],
"Ras Al Khor Wildlife Sanctuary":[
    {
    "id": 1,
    "name": "Aster Clinic, Ras Al Khor",
    "location": "Marhaba Mall, Ras Al Khor Rd, Ras Al Khor Industrial 3, Dubai, UAE (very close)",
    "contact": "Check clinic reception locally",
    "image": "https://wl-img-prd.s3-accelerate.amazonaws.com/554abe8b-6145-4f6e-b6b4-721574d42d09-h.jpeg"
  },
  {
    "id": 2,
    "name": "Dubai Hospital",
    "location": "Al Khaleej St, Al Baraha, Deira, Dubai, UAE (≈10–15 min drive)",
    "contact": "Check hospital reception locally",
    "image": "https://blog.sothebysrealty.ae/hubfs/Imported_Blog_Media/Best%20Government%20Hospitals%20in%20Dubai-2-Oct-12-2025-09-26-43-1714-AM.jpg"
  },
  {
    "id": 3,
    "name": "Canadian Specialist Hospital",
    "location": "Behind Ministry of Environment and Water, Abu Hail, Deira, Dubai, UAE (≈10–15 min drive)",
    "contact": "Check hospital reception locally",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKJWD2P9cA2uufsHlHY5ZXaMwBeHGUW8YiA&s"
  },
]
}
// --- Hotel Data (unique per place) ---
const hotelsNearPlace = {
  // 🏖 Goa
  1: [ // Baga Beach
    {
      id: 1,
      
  name: "Estrela Do Mar Beach Resort",
  image: "https://www.estrelahotels.com/img/webp/do-mar-hotel.webp",
  cost: {
    day: 4929,          // real per-day price
    week: 4929 * 7,     // 34503
    month: 4929 * 30    // 147870
  },
  location: "Khobra Vaddo, Baga / Calangute, North Goa 403516, India"
}
,
{      id: 2,
      name: "Acron Waterfront Resort",
      image:
        "https://assets.architecturaldigest.in/photos/600820d68f87dc05d00e22bb/master/w_1600%2Cc_limit/Acron-Waterfront-Resort-Night-2.jpg",
      cost: {
    day: 7250,            // approximate standard per-night rate (₹) :contentReference[oaicite:2]{index=2},
    week: 7250 * 7,        // ~ ₹50,750
    month: 7250 * 30       // ~ ₹2,17,500
  },
  location: "Baga Riverside, Baga 403515, North Goa, India"  // address from listing data :contentReference[oaicite:3]{index=3}
    },
  ],
  2: [ // Fort Aguada
    {
      id: 3,
      
  name: "Taj Fort Aguada Resort & Spa",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTibq5Ryu9YpqTQleNrZ4_rfhJ9shTE5ozA&s",
  cost: {
    day: 17000,    // ₹ per night/year (as lowest recent quoted by Expedia for 2 adults) :contentReference[oaicite:2]{index=2}
    // you can compute weekly/monthly if needed
    week: 17000 * 7,
    month: 17000 * 30
  },
  location: "Sinquerim / Candolim, North Goa 403515, Goa, India"  // resort address per listing metadata :contentReference[oaicite:3]{index=3}
    },
    {
      id: 4,
      name: "Whispering Palms Beach Resort",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1EeC6Nc7B3pQtllZO4udiaAxS0bp70G6upQ&s",
      cost: { day: 8999,              // ₹ per night — lowest recent nightly rate as per public listing :contentReference[oaicite:2]{index=2}
    week: 8999 * 7,         // ~ ₹62,993
    month: 8999 * 30   },
      location: "Candolim Beach Road, Goa",
    },
  ],
  3: [ // Dudhsagar Waterfalls
    {
      id: 5,
      name: "The Farm House India",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgd-tiOixuTWDG232jLCF01Kh4RnrZOkzqQ&s",
      cost: { day: 4000, week: 24000, month: 85000 },
      location: "Sinquerim / Candolim, North Goa 403515, Goa, India" // address as per listing :contentReference[oaicite:3]{index=3},
    },
  ],
  4: [ // Basilica of Bom Jesus
    {
      id: 6,
      name: "Old Goa Residency",
      image:
        "https://r1imghtlak.mmtcdn.com/gqh1n0ea4d0391vei6tqhjja001r.jpg",
      cost: {
    day: 1200,        // approximate standard per-night rate in INR (non-AC / off-season) :contentReference[oaicite:1]{index=1},
    week: 1200 * 7,   // ~ ₹8,400
    month: 1200 * 30  // ~ ₹36,000
  },
      location: "Near Old Goa Police Station / Fire Brigade, 403402 Old Goa, Goa, India", 
  contact: "+91 832 228 5327", 

    },
    {
  id: 7,
  name: "The Postcard Velha",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9GEq-KFqlD_gtH2up057W6JYgP2Sdc0UR-g&s",
  cost: {
    day: 8000,   // approximate per-night rate (in INR) — premium boutique stay :contentReference[oaicite:1]{index=1},
    week: 8000 * 7,  // ~ ₹56,000
    month: 8000 * 30 // ~ ₹240,000
  },
  location: "D-69/4/5, After Gandhi Circle, Old Goa 403402, Goa, India"  /* roughly 0.9 km from Basilica of Bom Jesus :contentReference[oaicite:2]{index=2} */
}
  ],
  5: [ // Anjuna Flea Market
    {
      id: 7,
      name: "Fairfield by Marriott Goa Anjuna",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRagA9XG3Byay6E5WxdyjkMyVxBP8QXm6uL2g&s",
      cost: {
    day: 4500,        // approximate base per-night rate (INR) — this may vary with season / room type :contentReference[oaicite:1]{index=1},
    week: 4500 * 7,   // ~ ₹31,500
    month: 4500 * 30  // ~ ₹135,000
  },
  location: "Survey No 11/14, Plot B C&E, Anjuna, Simvaddo, Goa 403509, India",
    },
    {
      id: 8,
      name: "The Ivy Anjuna",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzsBl75lv_gETudPCdH7DHoty3rkFGlNuXwA&s",
      cost: {
    day: 6000,       // typical base per-night rate (INR) for standard/double room (low-season / standard tariff) :contentReference[oaicite:1]{index=1},
    week: 6000 * 7,  // ~ ₹42,000  
    month: 6000 * 30 // ~ ₹180,000  
  },
  location: "649/3 Dmello Vaddo, Near Starco Junction, Anjuna, Goa 403509, India" 
}
  ],
  6:[
    // Hotels near “Ram Mandir / Canacona / South Goa”
  {
    id: 1,
    name: "The LaLiT Golf & Spa Resort Goa",
    image: "https://www.goaweddingvenues.com/uploads/resort/resort_pics/13_76_resort_1.jpg",  // replace with actual image url
   cost: {
    day: 9250,      // approximate starting per-night rate (INR) for a sea-view suite / standard room — may vary by season & room type :contentReference[oaicite:1]{index=1},
    week: 9250 * 7, // ~ ₹64,750
    month: 9250 * 30 // ~ ₹277,500
  },
  location: "Raj Baga Beach, Canacona, South Goa, Goa 403702, India" ,
  contact: "+91 7898539224 / +91 92143 14183",
  },
  {
    id: 2,
    name: "Gateway Goa, Palolem",
    image: "https://cdn.sanity.io/images/ocl5w36p/prod5/cee01176454afc313a1b5de9aa47c9604e06cd8c-1024x576.jpg?w=480&auto=format&dpr=2",
    cost: {
    day: 6750,     // typical starting per-night rate (INR) for a standard room (as seen in recent deals) :contentReference[oaicite:1]{index=1},
    week: 6750 * 7,   // ~ ₹47,250
    month: 6750 * 30  // ~ ₹202,500
  },
  location: "31-1/A, Tarir, Nagorcem, Palolem, Canacona, Goa 403702, India", 
  contact: "+91 83235 08900 / book.gatewaypalolem@gateway-hotels.com" ,
},
  {
    id: 3,
    name: "The Rose Goa Beach Resort",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/17/07/59/caption.jpg?w=900&h=500&s=1",
   cost: {
    day: 8000,        // approximate per‑night rate in INR — typical standard/double/twin room as seen on recent booking listings ([goibibo.com](https://www.goibibo.com/hotels/rose-goa-beach-resort-hotel-in-goa-3886300475960639825/?utm_source=chatgpt.com))
    week: 8000 * 7,   // ~ ₹56,000
    month: 8000 * 30 // ~ ₹240,000
  },
  location: "House No. 357, Igrejwada, Agonda, Canacona, South Goa 403702, Goa, India",  
  },
  {
    id: 4,
    name: "Sobit Sarovar Portico",
    image: "https://images.trvl-media.com/lodging/40000000/39660000/39659000/39658976/47dc5b3b.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    cost: {
    day: 4080,    // approximate base per‑night rate (INR) — based on recent listed rates (~₹4,080/night + taxes) :contentReference[oaicite:1]{index=1},
    week: 4080 * 7,  // ~ ₹28,560
    month: 4080 * 30 // ~ ₹122,400
  },
  location: "Nagarcem, Palolem, Canacona, Goa 403702, India",
  },
  {
    id: 5,
    name: "Kings Villa Resort",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/55/8e/e1/view-of-room-with-private.jpg?w=900&h=500&s=1",
     cost: {
    day: 1850,     // lowest nightly rate often found (INR) — may go higher depending on room type & season :contentReference[oaicite:1]{index=1},
    week: 1850 * 7,  // ~ ₹12,950
    month: 1850 * 30 // ~ ₹55,500
  },
  location: "Ourem Road, House No. 286, Palolem, Canacona 403702, Goa, India",
  }
  ],
7:[
{
  id: 1,
  name: "Hard Rock Hotel Goa",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UgPx4ft3tOifk7HEFtQRyave58U6_mzLKw&s",
  cost: {
    day: 8500,
    week: 8500 * 7,
    month: 8500 * 30
  },
  location: "Porba Vaddo, Bardez, Calangute, Goa 403516, India"
},

// 2
{
  id: 2,
  name: "Zone Connect by The Park Calangute",
  image: "https://images.trvl-media.com/lodging/6000000/5370000/5360400/5360350/71df3110.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
  cost: {
    day: 5700,
    week: 5700 * 7,
    month: 5700 * 30
  },
  location: "Naika Vaddo, Calangute, Goa 403516, India"
},

// 3
{
  id: 3,
  name: "Bloomrooms @ Calangute",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sF_5mK3kW7x-9wK5C6i959t27F3voKnP8A&s",
  cost: {
    day: 2400,
    week: 2400 * 7,
    month: 2400 * 30
  },
  location: "Calangute-Candolim Road, Gauravaddo, Goa 403515, India"
},
// 5
{
  id: 4,
  name: "Chalston Beach Resort",
  image: "https://chalstoningoa.com/wp-content/uploads/2015/11/Delux-EX-4-653x410.jpg",
  cost: {
    day: 5000,
    week: 5000 * 7,
    month: 5000 * 30
  },
  location: "Khobra Waddo, Calangute, Goa 403516, India"
},

],
8:[
  {
  id: 1,
  name: "W Goa",
  image: "https://cache.marriott.com/content/dam/marriott-renditions/GOIWH/goiwh-rockpool-twilight-3537-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1300px:*",
  cost: {
    day: 22000,
    week: 22000 * 7,
    month: 22000 * 30
  },
  location: "Vagator Beach Rd, Bardez, Vagator, Goa 403509, India"
},

{
  id: 2,
  name: "Golden Tulip Goa Vagator",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLnJ7F_3kEV2p64_Lv6wtZq3iYpXta0D-0A&s",
  cost: {
    day: 6500,
    week: 6500 * 7,
    month: 6500 * 30
  },
  location: "Tembi Store, Vagator Beach Rd, Mazal Waddo, Vagator, Goa 403509, India"
},

{
  id: 3,
  name: "ibis Styles Goa Vagator",
  image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202308161314307614-17fba30a9ef111ee8a4b0a58a9feac02.jpg",
  cost: {
    day: 5200,
    week: 5200 * 7,
    month: 5200 * 30
  },
  location: "Chapora Fort Rd, Anjuna, Goa 403509, India"
},

{
  id: 4,
  name: "Ramada by Wyndham Goa Vagator",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrwWvXhuNzBBue6zZz7CVfgQi6yFKk4Umvw&s",
  cost: {
    day: 6000,
    week: 6000 * 7,
    month: 6000 * 30
  },
  location: "Survey No 245, 1-A, Coutinho Vaddo, Vagator, Goa 403509, India"
},

{
  id: 5,
  name: "Moustache Goa Luxuria",
  image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201008301457553185-570e400f-db50-4b20-978b-126fada538e7.jpg?&output-quality=75&downsize=520:350&crop=520:350;2,0&output-format=jpg&downsize=480:336&crop=480:336",
  cost: {
    day: 1800,
    week: 1800 * 7,
    month: 1800 * 30
  },
  location: "Plot No 399/7N, near St Anthony Hospital, Zorin Village, Vagator, Goa 403509, India"
},
],
9:[
{
    "id": 1,
    "name": "White Wharf Beach Resort Morjim Goa",
    "image": "https://gos3.ibcdn.com/274178f6-5e8e-4d52-b794-120816cc85cc.jpg",
    "cost": {
      "day": 12000,
      "week": 12000 * 7,
      "month": 12000 * 30
    },
    "location": "Vithaldas Wada, Beach, Morjim, Goa 403512, India",
    "contact": "9223594601 / 9819028633" // direct booking contacts :contentReference[oaicite:1]{index=1}
  },
  {
    "id": 2,
    "name": "jüSTa Morjim Beach Resort Goa",
    "image": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/328068417.jpg?k=4e141577267779c84eaf9e58c112750e8236ecc65e708a229d1d7c7eca1da4de&o=",
    "cost": {
      "day": 9000,
      "week": 9000 * 7,
      "month": 9000 * 30
    },
    "location": "Vithaldaswada, Morjim, Goa 403512, India",
    "contact": "+91‑9799‑361‑110" // reservations line :contentReference[oaicite:3]{index=3}
  },
    {
    "id": 3,
    "name": "Montego Bay Beach Village",
    "image": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/278271294.jpg?k=1b503d8840d6b0c4000025d1795d31ca6a9cb594263503bcaeac22ca2a511b01&o=",
    "cost": {
      "day": 6000,
      "week": 6000 * 7,
      "month": 6000 * 30
    },
    "location": "Vithaldas Waddo, Morjim, Goa 403512, India",
    "contact": "+91‑98221‑50847" // front desk number :contentReference[oaicite:5]{index=5}
  },
  {
    "id": 4,
    "name": "Turtle Beach Resort",
    "image": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261835964.jpg?k=840356c8172a9cc5c3ec9b34011f383d394a184960086bea3e789044d77df26e&o=",
    "cost": {
      "day": 7500,
      "week": 7500 * 7,
      "month": 7500 * 30
    },
    "location": "1435, Kannaikwada, Morjim, Goa 403512, India",
    "contact": "+91‑93072‑16942" // official contact
  }
],
10:[
  {
    "id": 1,
    "name": "The Postcard Velha",
    "image": "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201809011848584838-0ee88be0ace211e89e48026ce8268fba.jpg?&output-quality=75&downsize=520:350&crop=520:350;51,0&output-format=jpg&downsize=480:336&crop=480:336",
    "cost": {
      "day": 9000,
      "week": 9000 * 7,
      "month": 9000 * 30
    },
    "location": "D-69/4/5 After Gandhi Circle, Near Church of Our Lady of Mount, Velha, Old Goa, Goa 403402, India"
  },
  {
    "id": 2,
    "name": "The Fern Kadamba Hotel & Spa",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTomIYi533cVC1u6qmrmV1OM6L4AwiMBnwKUQ&s",
    "cost": {
      "day": 7500,
      "week": 7500 * 7,
      "month": 7500 * 30
    },
    "location": "Kadamba Plateau, Panjim Rd, Old Goa, Goa 403402, India"
  },
  {
    "id": 3,
    "name": "Old Goa Residency",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgxo_UYdgmCM2n7FKJnqX2y1WO0D5gxbF_tw&s",
    "cost": {
      "day": 2000,
      "week": 2000 * 7,
      "month": 2000 * 30
    },
    "location": "Near Fire Brigade, Near Old Goa Police Station, Old Goa, Goa 403402, India"
  },
  {
    "id": 4,
    "name": "The Hosteller Goa, Old Goa",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV2WodV8mhlAFoMTs95XUfH_3_wVODgW6AHQ&s",
    "cost": {
      "day": 1200,
      "week": 1200 * 7,
      "month": 1200 * 30
    },
    "location": "Behind St. Anthony Chapel, Near Star Restaurant, Panvelim, Old Goa, Goa 403402, India"
  },
],
  // 🏙 Dubai
  101: [
    {
  id: 9,
  name: "Atlantis The Palm",
  image:
   "https://images.trvl-media.com/lodging/3000000/2240000/2235400/2235336/c53f8609.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
  cost: {  // Approximate average nightly rate (base room)
    day: 69000,        // ₹69,000 per night (≈3000 AED)
    week: 69000 * 7,
    month: 69000 * 30
  },
  location: "Palm Jumeirah, Dubai"
},
{
  id: 1011,
  name: "Armani Hotel Dubai",
  image:
    "https://gos3.ibcdn.com/db47f6febd3c11eb87c30242ac110002.jpg",
  cost: {
    day: 91300,        // ₹91,300 per night (≈USD 1100)
    week: 91300 * 7,
    month: 91300 * 30
  },
  location: "Burj Khalifa, Downtown Dubai"
},
{
  id: 1012,
  name: "Address Downtown",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfyz0FTdWAdHFrTI6paPQoGlOk6923buEsCA&s",
  cost: {
    day: 56000,        // ₹56,000 per night (already INR)
    week: 56000 * 7,
    month: 56000 * 30
  },
  location: "Sheikh Mohammed bin Rashid Blvd, Downtown Dubai"
}
  ],
  102: [
    {
  id: 11,
  name: "Jumeirah Beach Hotel",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAnH3SPs6By_Ywud5rbGWlYWF0JfoAtdbKA&s",
  cost: {
    day: 50600,          // ₹50,600 per night (≈2200 AED)
    week: 50600 * 7,
    month: 50600 * 30
  },
  location: "Jumeirah Beach Road, Dubai"
},
{
  id: 12,
  name: "W Dubai – The Palm",
  image:
    "https://images.trvl-media.com/lodging/35000000/34040000/34039900/34039882/c735aebe.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
  cost: {
    day: 50600,          // ₹50,600 per night (≈2200 AED)
    week: 50600 * 7,
    month: 50600 * 30
  },
  location: "West Crescent, Palm Jumeirah, Dubai"
},
{
  id: 13,
  name: "Jumeirah Zabeel Saray",
  image:
    "https://www.binayah.com/wp-content/uploads/2023/11/Jumeirah-Zabeel-Saray-Banner.jpg",
  cost: {
    day: 48300,          // ₹48,300 per night (≈2100 AED)
    week: 48300 * 7,
    month: 48300 * 30
  },
  location: "West Crescent, Palm Jumeirah, Dubai"
},
{
  id: 14,
  name: "Marriott Resort Palm Jumeirah, Dubai",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQPaxE_N2XnZyD8iVS6FwwQoW6PEoDnc3qw&s",
  cost: {
    day: 27600,          // ₹27,600 per night (≈1200 AED)
    week: 27600 * 7,
    month: 27600 * 30
  },
  location: "Palm West Beach, Palm Jumeirah, Dubai"
}

  ],
  103: [
{
  id: 12,
  name: "Kempinski Hotel Mall of the Emirates",
  image:
   "https://storage.kempinski.com/cdn-cgi/image/w=1920,f=auto,fit=scale-down,g=auto/ki-cms-prod/images/8/1/4/6/1596418-1-eng-GB/57536572e60c-75390222_4K.jpg",
  cost: {
    day: 24000,     // approx ₹24,000 per night
    week: 145000,   // approx ₹1.45 lakh per week
    month: 520000   // approx ₹5.2 lakh per month
  },
  location: "Mall of the Emirates, Sheikh Zayed Road, Al Barsha, Dubai, UAE",
},
{
  id: 13,
  name: "Sheraton Mall of the Emirates Hotel, Dubai",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfh787a8hqg9FCqnBihIvWxJMIMZd8mn0HXg&s",
  cost: {
    day: 16000,     // approx ₹16,000 per night
    week: 96000,    // approx ₹96,000 per week
    month: 350000   // approx ₹3.5 lakh per month
  },
  location: "Mall of the Emirates, Sheikh Zayed Road, Al Barsha 1, Dubai, UAE",
},
{
  id: 14,
  name: "DoubleTree by Hilton Hotel & Residences Al Barsha",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_kyS5l7XGTXVAAAr7tCNzB_nd2-9oQlM1g&s",
  cost: {
    day: 12000,     // approx ₹12,000 per night
    week: 72000,    // approx ₹72,000 per week
    month: 270000   // approx ₹2.7 lakh per month
  },
  location: "Al Barsha Road, Behind Mall of the Emirates, Dubai, UAE",
},
  ],
104: [ // Desert Safari Dubai
 {
  id: 1041,
  name: "Meliá Desert Palm, Member of Meliá Collection",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FwtJwepjtRvqrVdGoBagkWYyZXSrhPDj2g&s",
  cost: {
    day: 18000,      // approx ₹18,000 per night
    week: 108000,    // approx ₹1.08 lakh per week
    month: 390000    // approx ₹3.9 lakh per month
  },
  location: "Al Awir Road, Dubai – near Desert Safari area, UAE",
},
{
  id: 1042,
  name: "Al Maha, a Luxury Collection Desert Resort & Spa",
  image:
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/5c/d9/12/al-maha-a-luxury-collection.jpg?w=900&h=500&s=1",
  cost: {
    day: 95000,      // approx ₹95,000 per night (ultra-luxury, all-inclusive)
    week: 665000,    // approx ₹6.65 lakh per week
    month: 2600000   // approx ₹26 lakh per month
  },
  location: "Dubai Desert Conservation Reserve, Dubai, UAE",
},
{
  id: 1043,
  name: "Arabian Ranches Golf Club Hotel",
  image:
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/64697076.jpg?k=2f3fb76553663a8834df6d9a976f532cbba5f2fb7c0f7241d0310a4f58f09a4d&o=",
  cost: {
    day: 12000,      // approx ₹12,000 per night
    week: 72000,     // approx ₹72,000 per week
    month: 260000    // approx ₹2.6 lakh per month
  },
  location: "Arabian Ranches, Emirates Road, Dubai, UAE",
},
],
104: [
{
  id: 2001,
  name: "Bab Al Shams Desert Resort & Spa",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRk9FHCGzsaqFbmHBayzICgOYJ2s7eVaSgw&s",
  cost: { day: 25000, week: 160000, month: 590000 },
  location: "Al Qudra Road, Dubai Desert (45–60 min from city center)",
  details: "Luxury 5★ desert resort with spa, multiple restaurants, camel rides, spa treatments, desert views and traditional desert dinner shows. ~45–60 min drive from central Dubai. Wi-Fi, pool, spa, large grounds. ~₹25k+/night typical for mid rooms." 
},
{
  id: 2003,
  name: "Hampton by Hilton Dubai Airport",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlvo16KssxK5vRA50ceqc8R_Y1j_Hu5eGmwA&s",
  cost: { day: 6000, week: 36000, month: 130000 },
  location: "Dubai Airport Area",
  details: "Good mid-range hotel with pool, gym, free breakfast, close to airport — many safari pickups available from airport/Dubai area hotels."
},
{
  id: 2002,
  name: "Al Maha, a Luxury Collection Desert Resort & Spa",
  image:
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/dc/e8/df/al-maha-spa-detail-shot.jpg?w=900&h=500&s=1",
  cost: { day: 95000, week: 665000, month: 2600000 },
  location: "Dubai Desert Conservation Reserve, Dubai",
  details: "Extreme luxury desert resort with private villas, plunge pools, camel rides, wellness programs, desert drives, horseback riding. Ultra-premium property — great for luxury desert safari base." 
},
{
  id: 2006,
  name: "The Tower Plaza Hotel Dubai",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/49/18/21/millennium-plaza-hotel.jpg?w=900&h=500&s=1",
  cost: { day: 12000, week: 72000, month: 250000 },
  location: "Sheikh Zayed Road, Dubai",
  details: "Good city hotel with excellent transport connectivity — strong base for morning pickups to the desert safari or evening return."
},
{
  id: 2005,
  name: "Al Waleed Holiday Homes",
  image: "https://pix10.agoda.net/hotelImages/150/150832/150832_16052415050042672639.jpg?ca=6&ce=1&s=414x232",
  cost: { day: 9000, week: 54000, month: 200000 },
  location: "Oud Metha, Dubai",
  details: "Apartment style hotel good for families, slightly further but versatile base for desert safari tours and city visit."
}
],
105: [
  {
    id: 3001,
    name: "Address Downtown",
    image:
      "https://www.guardianglass.com/content/guardianindustriesholdings/me-africa/me/en/projects/project-details/the-address-downtown/_jcr_content/root/responsivegrid/project_hero/image.coreimg.jpeg/1745311930923/29050-tad-gg-blue-hour-jpg.jpeg",    cost: { day: 30000, week: 180000, month: 650000 }, // INR
    location: "Downtown Dubai, opposite Dubai Mall & Dubai Fountain",
    details: "Luxury 5★ hotel with direct Burj Khalifa & Dubai Fountain views. Walking distance to Dubai Mall. Infinity pool, spa, fine dining. Premium stay for fountain viewing."
  },
  {
    id: 3002,
    name: "Palace Downtown",
    image:
      "https://static21.com-hotel.com/uploads/hotel/79261/photo/palace-downtown_16898743508.jpeg",
    cost: { day: 35000, week: 210000, month: 760000 }, // INR
    location: "Old Town Island, Downtown Dubai, near Dubai Fountain",
    details: "Luxury Arabian-style hotel overlooking Burj Lake & Dubai Fountain. Large rooms, lake-view restaurants, spa, classic Middle Eastern architecture."
  },
  {
    id: 3003,
    name: "Armani Hotel Dubai",
    image:
      "https://blogs-images.forbes.com/eustaciahuen/files/2016/12/armani-amal-terrace.jpg",
    cost: { day: 42000, week: 252000, month: 900000 }, // INR
    location: "Inside Burj Khalifa, Downtown Dubai",
    details: "Ultra-luxury hotel designed by Giorgio Armani. Direct access to Dubai Mall & fountain promenade. Premium rooms, spa, Michelin-level dining."
  },
  {
    id: 3004,
    name: "Vida Downtown",
    image:
      "https://pix10.agoda.net/hotelImages/96400/0/68aa7f8f19ef23f3d2d84513d8422b81.jpeg?ce=0&s=414x232",    cost: { day: 20000, week: 120000, month: 430000 }, // INR
    location: "Downtown Dubai, 5–7 min walk to Dubai Fountain",
    details: "Modern 4★ boutique hotel. Trendy design, pool, cafés. Popular with young travelers and couples wanting fountain access."
  },
  {
    id: 3005,
    name: "Rove Downtown Dubai",
    image:
      "https://gos3.ibcdn.com/b53bbe3c8a3711e795560a209fbd0127.jpg",
          cost: { day: 10000, week: 60000, month: 220000 }, // INR
    location: "Downtown Dubai, near Burj Khalifa & Dubai Fountain",
    details: "Budget-friendly hotel with clean rooms, café, gym, pool. Best value stay within walking distance of Dubai Fountain."
  }
],
106: [
  {
    id: 4001,
    name: "Hyatt Regency Dubai Creek Heights",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvl_9MIziijYAZ5cwIU9tdZihgML0ucktC4Q&s",
    cost: { day: 14000, week: 84000, month: 300000 }, // INR
    location: "Dubai Healthcare City, 10 min drive to Dubai Frame",
    details: "Luxury 5★ hotel near Dubai Frame and Zabeel Park. Spacious rooms, rooftop pool, spa, multiple restaurants. Ideal for sightseeing and family stays."
  },
  {
    id: 4002,
    name: "Grand Hyatt Dubai",
    image:
      "https://www.whitewaterwest.com/wp-content/uploads/2025/02/1-Grand-Hyatt-Dubai-Hero-Image.png",
    cost: { day: 18000, week: 108000, month: 390000 }, // INR
    location: "Oud Metha Road, 8–10 min from Dubai Frame",
    details: "Iconic luxury hotel with resort-style pools, gardens, spa and dining. Close to Dubai Frame, Old Dubai, and Healthcare City."
  },
  {
    id: 4003,
    name: "Novotel World Trade Centre Dubai",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnTjbM7lc_rK1ye9yWGnXRNVYFOjvF-XnQlg&s",
    cost: { day: 11000, week: 66000, month: 240000 }, // INR
    location: "Sheikh Zayed Road, near Zabeel Park & Dubai Frame",
    details: "Comfortable 4★ hotel close to Dubai Frame and metro. Good option for business and leisure travelers with pool, gym, and restaurants."
  },
  {
    id: 4004,
    name: "Ibis One Central Dubai",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyi_mMNJP2x7vDld-2qO4fTr8lIjALvxzmQ&s",
    cost: { day: 7000, week: 42000, month: 155000 }, // INR
    location: "World Trade Centre Area, 10 min drive to Dubai Frame",
    details: "Affordable budget hotel with clean rooms, café, and metro access. Best value stay near Dubai Frame and Zabeel Park."
  },
  {
    id: 4005,
    name: "Rove Trade Centre",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwNvYBGkN0sxd5VOATTbf4U4XFT5gcK2hzKA&s",
    cost: { day: 9000, week: 54000, month: 195000 }, // INR
    location: "Trade Centre District, close to Dubai Frame",
    details: "Trendy budget-friendly hotel popular with tourists. Modern rooms, pool, gym, and easy access to Dubai Frame and Downtown Dubai."
  }

],
107: [
  {
    id: 5001,
    name: "JA Ocean View Hotel",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/721252626.jpg?k=2544f27bd09c0db521f7154ba887f589a4b512325f06023c34d3c7f4922a6923&o=",
    cost: { day: 18000, week: 108000, month: 390000 }, // INR
    location: "The Walk, JBR Beach, Dubai",
    details: "Popular beachfront 5★ hotel with sea-view rooms. Direct access to JBR Beach and The Walk. Pool, gym, restaurants. Great for beach lovers."
  },
  {
    id: 5002,
    name: "Hilton Dubai Jumeirah",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZVRwHBor5dzrfJGDFu00H77JDebUp8cfwwQ&s",
    cost: { day: 25000, week: 150000, month: 540000 }, // INR
    location: "JBR Beach, Dubai",
    details: "Luxury beachfront hotel with private beach access. Large pool, spa, multiple restaurants. Direct access to JBR Walk and Marina."
  },
  {
    id: 5003,
    name: "Hilton Dubai The Walk",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeFGmgrCattAKqAM8hw2nmZL_YcueljNn4OA&s",
    cost: { day: 22000, week: 132000, month: 480000 }, // INR
    location: "The Walk, JBR, Dubai",
    details: "All-suite hotel with sea-view apartments. Ideal for families and long stays. Easy access to JBR Beach and shopping promenade."
  },
  {
    id: 5004,
    name: "Rixos Premium Dubai JBR",
    image:
      "https://images.trvl-media.com/lodging/19000000/18360000/18352700/18352604/9980fb20.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    cost: { day: 35000, week: 210000, month: 760000 }, // INR
    location: "JBR Beachfront, Dubai",
    details: "Ultra-luxury 5★ beachfront resort with private beach, infinity pool, spa, nightlife venues. Premium sea-view rooms and suites."
  },
  {
    id: 5005,
    name: "Amwaj Rotana, JBR",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnwVK5lws2F5tlp5KwAk3R_K8H7MYJiqEpw&s",
    cost: { day: 16000, week: 96000, month: 350000 }, // INR
    location: "JBR Beach, Dubai",
    details: "Well-rated 4★ hotel with spacious rooms, pool, gym, and beach access. Good balance of comfort and price near JBR Beach."
  }
],

108: [
  {
    id: 6001,
    name: "Studio One Hotel",
    image:
      "https://whatson.ae/wp-content/uploads/2019/01/studio-one-featured.jpg",
    cost: { day: 9000, week: 54000, month: 195000 }, // INR
    location: "Dubai Studio City, 10–15 min drive to Global Village",
    details: "Stylish mid-range hotel close to Global Village. Modern rooms, rooftop pool, gym, multiple dining options. Popular with tourists visiting attractions."
  },
  {
    id: 6002,
    name: "Ghaya Grand Hotel",
    image:
      "https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/https://media.iceportal.com/76482/photos/1028122_XL/Ghaya-Grand-Hotel-Pool.jpg?tr=w-780%2Ch-437%2Cfo-auto",
    cost: { day: 10000, week: 60000, month: 215000 }, // INR
    location: "Dubai Production City, 15 min drive to Global Village",
    details: "Comfortable 4★ hotel with large rooms, pool, spa, and restaurants. Good value stay near Global Village and Miracle Garden."
  },
  {
    id: 6003,
    name: "Aloft Me'aisam, Dubai",
    image:
      "",
    cost: { day: 8500, week: 51000, month: 185000 }, // INR
    location: "Dubai Production City, 15–20 min from Global Village",
    details: "Modern, budget-friendly 4★ hotel. Trendy rooms, pool, gym, lively vibe. Good connectivity to Global Village and Expo Road."
  },
  {
    id: 6004,
    name: "Park Inn by Radisson Motor City",
    image:
      "",
    cost: { day: 9500, week: 57000, month: 205000 }, // INR
    location: "Dubai Motor City, 10–15 min drive to Global Village",
    details: "Family-friendly 4★ hotel with outdoor pool, gym, restaurants. Calm area, good option for families visiting Global Village."
  },
  {
    id: 6005,
    name: "Treppan Hotel & Suites by Fakhruddin",
    image:
      "",
    cost: { day: 8000, week: 48000, month: 175000 }, // INR
    location: "Dubai Sports City, 15–20 min from Global Village",
    details: "Apartment-style hotel with kitchenettes, pool, gym. Suitable for long stays and families. Affordable option near Global Village."
  }
],
109: [
  {
    id: 7001,
    name: "Arabian Courtyard Hotel & Spa",
    image:
      "",
    cost: { day: 9000, week: 54000, month: 195000 }, // INR
    location: "Al Fahidi Street, Bur Dubai – walking distance to Al Fahidi Historical District",
    details: "Traditional Arabian-style 4★ hotel very close to Al Fahidi (Bastakiya). Spacious rooms, rooftop pool, spa, and multiple restaurants. Ideal for Old Dubai exploration."
  },
  {
    id: 7002,
    name: "XVA Art Hotel",
    image:
      "",
    cost: { day: 7500, week: 45000, month: 165000 }, // INR
    location: "Al Fahidi Historical District, Bur Dubai",
    details: "Boutique heritage hotel inside Al Fahidi district. Art-filled courtyard rooms, café, cultural vibe. Perfect for travelers who love history and traditional architecture."
  },
  {
    id: 7003,
    name: "Al Seef Heritage Hotel Dubai, Curio Collection by Hilton",
    image:
      "",
    cost: { day: 11000, week: 66000, month: 240000 }, // INR
    location: "Al Seef, Dubai Creek – 5 min from Al Fahidi",
    details: "Authentic heritage-style hotel with wind-tower architecture along Dubai Creek. Modern comfort blended with old-Dubai charm. Great for cultural stays."
  },
  {
    id: 7004,
    name: "Citymax Hotel Bur Dubai",
    image:
      "",
    cost: { day: 6000, week: 36000, month: 130000 }, // INR
    location: "Kuwait Street, Bur Dubai – near Al Fahidi",
    details: "Popular budget hotel with clean rooms, rooftop pool, gym, and restaurants. Best value stay close to Al Fahidi Historical District."
  },
  {
    id: 7005,
    name: "Fortune Karama Hotel",
    image:
      "",
    cost: { day: 5500, week: 33000, month: 120000 }, // INR
    location: "Karama, Bur Dubai – short drive to Al Fahidi",
    details: "Budget-friendly hotel with basic amenities. Suitable for travelers looking for affordable accommodation near Old Dubai attractions."
  }
],
110: [
  {
    id: 8001,
    name: "Al Seef Heritage Hotel Dubai, Curio Collection by Hilton",
    image:
      "",
    cost: { day: 11000, week: 66000, month: 240000 }, // INR
    location: "Al Seef, Dubai Creek, Bur Dubai",
    details: "Heritage-style 4★ hotel along Dubai Creek with traditional wind-tower architecture. Walking distance to Al Fahidi, creek promenade, and abra stations."
  },
  {
    id: 8002,
    name: "Hyatt Regency Dubai Creek Heights",
    image:
      "",
    cost: { day: 14000, week: 84000, month: 300000 }, // INR
    location: "Dubai Healthcare City, near Dubai Creek",
    details: "Luxury 5★ hotel with creek and skyline views. Rooftop pool, spa, restaurants. Easy access to Old Dubai, Deira, and Downtown."
  },
  {
    id: 8003,
    name: "Park Hyatt Dubai",
    image:
      "",
    cost: { day: 32000, week: 192000, month: 700000 }, // INR
    location: "Dubai Creek Golf & Yacht Club, Deira",
    details: "Premium waterfront resort overlooking Dubai Creek. Marina, golf course, lagoon-style pools, fine dining. Ideal for luxury creek-side stays."
  },
  {
    id: 8004,
    name: "Canopy by Hilton Dubai Al Seef",
    image:
      "",
    cost: { day: 12000, week: 72000, month: 260000 }, // INR
    location: "Al Seef, Dubai Creek, Bur Dubai",
    details: "Modern lifestyle hotel near Dubai Creek promenade. Rooftop pool, gym, cafés. Great mix of modern comfort and Old Dubai charm."
  },
  {
    id: 8005,
    name: "Radisson Blu Hotel, Dubai Deira Creek",
    image:
      "",
    cost: { day: 13000, week: 78000, month: 280000 }, // INR
    location: "Baniyas Road, Deira, overlooking Dubai Creek",
    details: "Classic 5★ hotel with direct creek views. Large rooms, multiple restaurants, close to Gold Souk, Spice Souk, and abra crossings."
  }
],
111: [
  {
    id: 9001,
    name: "",
    image: "",
    cost: { day: 11000, week: 66000, month: 240000 }, // INR
    location: "Oud Metha Rd, Al Jadaf - Dubai (~1.5 km from Ras Al Khor Wildlife Sanctuary)",
    details: "Comfortable 4★ hotel with modern rooms, gym, and restaurants. Very close to the sanctuary area and well connected by road and metro."
  },
  {
    id: 9002,
    name: "",
    image: "",
    cost: { day: 26000, week: 156000, month: 560000 }, // INR
    location: "Al Kheeran First, Dubai Creek Harbour (~2.8 km)",
    details: "Luxury waterfront hotel with excellent views, pool, spa, and premium dining. A short drive from the wildlife sanctuary and close to Dubai Creek Harbour attractions."
  },
  {
    id: 9003,
    name: "",
    image: "",
    cost: { day: 17000, week: 102000, month: 380000 }, // INR
    location: "Al Kheeran First, Dubai Creek Harbour (~2.8 km)",
    details: "Stylish boutique-style hotel with rooftop pool, great restaurants, and easy access to Creek Harbour views — excellent mid-luxury choice."
  },
  {
    id: 9004,
    name: "",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/264895340.jpg",
    cost: { day: 13000, week: 78000, month: 285000 }, // INR
    location: "Al Jadaf, Dubai (~3.0 km)",
    details: "Well-rated 4★ hotel with modern rooms, pool, fitness center, and good transport links — great value near the sanctuary area."
  },
  {
    id: 9005,
    name: "",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/263488973.jpg",
    cost: { day: 15000, week: 90000, month: 330000 }, // INR
    location: "Al Jaddaf, Dubai (~3.1 km)",
    details: "Comfortable 4★ hotel with pool, restaurants, and family-friendly environment. Short drive to the wildlife sanctuary and near metro access."
  }
],
  // 🏔 Manali
  500: [
   {
    id: 3,
    name: "Hadimba Regency",
    image:
      "https://hotel-images.example.com/hadimba_regency_photo.jpg", // sample
    cost: { day: 1500, week: 9000, month: 32000 },
    location: "Bajhogi Road / Hadimba Temple Road, Manali",
  },
  {
    id: 4,
    name: "Collection O Manali Near Hadimba Temple (Formerly The Valerian)",
    image:
      "https://example.com/collection_o_manali_photo.jpg",
    cost: { day: 1100, week: 6500, month: 25000 },
    location: "Opposite Ghatotkach Mandir, Hadimba Temple Road, Manali",
  },
  {
    id: 5,
    name: "Hotel Ocean Inn",
    image:
      "https://hotel-images.example.com/ocean_inn_photo.jpg",
    cost: { day: 900, week: 5500, month: 20000 },
    location: "Log Huts Area / near Hadimba Devi Temple, Manali",
  },
  ],
  501: [
     {
    id: 3,
    name: "Palchan Hotel & Spa – A Radisson Individuals Hotel",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/387648012.jpg",
    cost: { day: 6000, week: 36000, month: 120000 },
    location: "Palchan, Manali",
  },
  {
    id: 4,
    name: "Sky One Ski Resort",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/471062372.jpg",
    cost: { day: 4500, week: 27000, month: 95000 },
    location: "Solang Valley Road, Manali",
  },
  {
    id: 5,
    name: "OYO Solang Holiday Inn",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/245430802.jpg",
    cost: { day: 2500, week: 15000, month: 50000 },
    location: "Solang Valley, Manali",
  },
  ],
  502: [
    {
    id: 2,
    name: "Highland Park Resort",
    image: "https://example.com/highlandpark.jpg",
    cost: { day: 6000, week: 36000, month: 120000 },
    location: "Nehru Kund / Old Manali area (approx ~10-15 km from Rohtang Pass)",
  },
  {
    id: 3,
    name: "Kalista Resort",
    image: "https://example.com/kalista_resort.jpg",
    cost: { day: 7000, week: 42000, month: 140000 },
    location: "Old Manali (≈11-12 km from Rohtang Pass)",
  },
  {
    id: 4,
    name: "Snow Valley Resorts",
    image: "https://example.com/snowvalleyresorts.jpg",
    cost: { day: 5000, week: 30000, month: 100000 },
    location: "Log Hut Area / Manali (within driveable distance to Rohtang Pass)",
  },
  {
    id: 5,
    name: "The Orchards Green",
    image: "https://example.com/theorchardsgreen.jpg",
    cost: { day: 4000, week: 24000, month: 80000 },
    location: "Log Huts Area, Manali (close enough for Rohtang Pass transit)",
  }
  ],
  503:[
         {
    id: 1,
    name: "Hotel Shivalik",
    image: "https://example.com/hotel-shivalik-manikaran.jpg",
    cost: { day: 1848, week: 11088, month: 40000 },
    location: "Barsheni Road, Manikaran",
  },
  {
    id: 2,
    name: "Manikaran View Guest House",
    image: "https://example.com/manikaran-view.jpg",
    cost: { day: 1500, week: 9000, month: 30000 },
    location: "Manikaran, near Gurudwara",
  },
  {
    id: 3,
    name: "Hotel Country Charm",
    image: "https://example.com/country-charm.jpg",
    cost: { day: 2000, week: 12000, month: 42000 },
    location: "Manikaran, Kullu district",
  },
  ],
  // 🏙 Singapore
201: [ // Marina Bay Sands
  {
    id: 2011,
    name: "Marina Bay Sands Hotel",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCgEfP1g87p-RX2CZki8cBolrDmB4jWuwfw&s",
    cost: { day: 18000, week: 110000, month: 400000 },
    location: "10 Bayfront Avenue, Singapore 018956",
  },
  {
    id: 2012,
    name: "The Fullerton Hotel Singapore",
    image:
      "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2025/08/28144156/The-Fullerton-Hotel-Singapore-The-facades.jpg",
    cost: { day: 15000, week: 90000, month: 330000 },
    location: "1 Fullerton Square, Singapore 049178",
  },
],
202: [ // Gardens by the Bay
  {
    id: 2021,
    name: "PARKROYAL COLLECTION Marina Bay",
    image:
      "https://images.trvl-media.com/lodging/1000000/330000/328800/328749/d1562947.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    cost: { day: 12000, week: 72000, month: 260000 },
    location: "6 Raffles Blvd, Singapore 039594",
  },
  {
    id: 2022,
    name: "The Ritz-Carlton, Millenia Singapore",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBSIsSSTp4pvUOtvGVdZFffQ-R90N5FNMUQ&s",
    cost: { day: 16000, week: 96000, month: 350000 },
    location: "7 Raffles Avenue, Singapore 039799",
  },
],
203: [ // Sentosa Island
  {
    id: 2031,
    name: "Resorts World Sentosa – Equarius Hotel",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/2e/20/ce/equarius-ocean-suites.jpg?w=900&h=500&s=1",
    cost: { day: 13000, week: 78000, month: 290000 },
    location: "8 Sentosa Gateway, Sentosa Island, Singapore",
  },
  {
    id: 2032,
    name: "Capella Singapore",
    image:
      "https://images.squarespace-cdn.com/content/v1/5956050736e5d3e59a162d74/1573672155341-K08DMF4G8IH8IZRH2NEK/Singapore-466-20170522.jpg",
    cost: { day: 20000, week: 120000, month: 450000 },
    location: "1 The Knolls, Sentosa Island, Singapore 098297",
  },
],
204: [ // Merlion Park
  {
    id: 2041,
    name: "The Fullerton Bay Hotel Singapore",
    image:
      "https://d11p5pzap88ck9.cloudfront.net/sites/files/fullertonhotels-theme/images/products/202508/455x300/fulltertonbayhotel_4.jpg",
    cost: { day: 17000, week: 102000, month: 380000 },
    location: "80 Collyer Quay, Singapore 049326",
  },
  {
    id: 2042,
    name: "Hotel Telegraph Singapore",
    image:
      "https://savourblackbookasia.com/wp-content/uploads/2023/07/20230624_152921-500x375.jpg",
    cost: { day: 9000, week: 54000, month: 200000 },
    location: "35 Robinson Rd, Singapore 068876",
  },
],
205: [ // Singapore Zoo
  {
    id: 2051,
    name: "Orchid Country Club Hotel",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNYRWpJttSBULbxdgLb8LqytNRi11MMjg4HQ&s",
    cost: { day: 8000, week: 48000, month: 180000 },
    location: "1 Orchid Club Rd, Singapore 769162",
  },
  {
    id: 2052,
    name: "Mandai Lodge Hotel",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzrz3nCkcqL-JPMpit1Z-CCDGz_tPMgsNvuA&s",
    cost: { day: 7000, week: 42000, month: 150000 },
    location: "460 Mandai Rd, Singapore 729753",
  },
],
//paris
801: [ // Eiffel Tower
    {
      id: 1,
      name: "Hôtel Pullman Paris Tour Eiffel",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Wtef25HlG0YboSkvHlV1t2LwTrXieMO1zA&s",
      cost: { day: 20000, week: 120000, month: 450000 },
      location: "15th arrondissement, near Eiffel Tower, Paris",
    },
    {
      id: 2,
      name: "Mercure Paris Centre Tour Eiffel",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhjEIQ-8qq4iVCOfFgXpAbrqAjsz09r-dttw&s",
      cost: { day: 18000, week: 110000, month: 400000 },
      location: "Quai de Grenelle, 75015 Paris",
    },
  ],
  802: [ // Louvre Museum
    {
      id: 3,
      name: "Le Meurice",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj8scBfkpYfxKqcJSXQp7j-QhLu1DLrz9qww&s",
      cost: { day: 35000, week: 210000, month: 750000 },
      location: "Rue de Rivoli, 1st arrondissement, Paris",
    },
    {
      id: 4,
      name: "Hôtel Regina",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Hotel_Regina_Paris.jpg",
      cost: { day: 22000, week: 130000, month: 450000 },
      location: "Place des Pyramides / Rue de Rivoli, 1st arrondissement",
    },
  ],
  803: [ // Notre Dame
    {
      id: 5,
      name: "Hôtel de Lutece",
      image: "https://example.com/hotel-de-lutece.jpg",
      cost: { day: 12000, week: 72000, month: 250000 },
      location: "Île de la Cité / Quartier Latin, Paris",
    },
    {
      id: 6,
      name: "Hotel Esmeralda",
      image: "https://example.com/hotel-esmeralda-paris.jpg",
      cost: { day: 10000, week: 60000, month: 200000 },
      location: "Near Notre Dame Cathedral, Paris",
    },
  ],

  
  // 1️⃣ Uluwatu Temple
  901: [
    {
      id: 1,
      name: "Anantara Uluwatu Bali Resort",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxVxnWsF3lfoWjKDBYsqxq41yq5zn06j4_Qw&s",
      cost: { day: 11000, week: 70000, month: 260000 },
      location: "Jl. Pemutih, Uluwatu, Bali",
    },
    {
      id: 2,
      name: "Blue Point Bay Villas & Spa",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXzu5M_X6hU2Oe9ORUEVi6XGxOzZP81zAKA&s",
      cost: { day: 8000, week: 48000, month: 180000 },
      location: "Suluban Beach, Uluwatu",
    },
  ],

  // 2️⃣ Tegallalang Rice Terrace
  902: [
    {
      id: 3,
      name: "Alila Ubud",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcuuwHfkO2qERf22V7ShmIB7rvwlJ3pNRVdg&s",
      cost: { day: 9500, week: 62000, month: 220000 },
      location: "Rainforest area, Ubud",
    },
    {
      id: 4,
      name: "Tegal Sari Accommodation",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6tVdnNCX-in0SszPAT8s5tKWBtN1-rL7Ug&s",
      cost: { day: 4500, week: 26000, month: 98000 },
      location: "Tegallalang, Ubud",
    },
  ],

  // 3️⃣ Mount Batur
  903: [
    {
      id: 5,
      name: "Volcano Terrace Bali",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcYIciSDDWx5lTwatC3wNcA1u9gAp4Fya5lA&s",
      cost: { day: 6000, week: 35000, month: 125000 },
      location: "Kintamani, near Mount Batur",
    },
    {
      id: 6,
      name: "The Cave Hotel Batur",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDOAwhZIrLSevCBp8SQPpf29PA_R7eqCaMw&s",
      cost: { day: 5000, week: 30000, month: 110000 },
      location: "Lake Batur Viewpoint, Bali",
    },
  ],

  // 4️⃣ Ubud Monkey Forest
  904: [
    {
      id: 7,
      name: "Alaya Resort Ubud",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAhSUcOSp5v60By2t5__b801-J0NvE4rCpg&s",
      cost: { day: 9000, week: 55000, month: 200000 },
      location: "Jl. Hanoman, Ubud",
    },
    {
      id: 8,
      name: "Champlung Sari Hotel Ubud",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPppx_zp0FZzoHs1VXy7Zk2cJD9UA8zC0yJQ&s",
      cost: { day: 4000, week: 24000, month: 90000 },
      location: "Jl. Monkey Forest Road",
    },
  ],

  // 5️⃣ Seminyak Beach
  905: [
    {
      id: 9,
      name: "The Legian Bali",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMI425NzPXAC8YmpbOCjOFwyo0X0dWzb5pHw&s",
      cost: { day: 12000, week: 75000, month: 270000 },
      location: "Seminyak Beachfront",
    },
    {
      id: 10,
      name: "Hotel Indigo Bali Seminyak Beach",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCZMyTJtuyVfyOxAfRqMxR_jvD1nxExiaxTw&s",
      cost: { day: 8500, week: 50000, month: 190000 },
      location: "Seminyak, Bali",
    },
  ],

  // 6️⃣ Nusa Penida
  906: [
    {
      id: 11,
      name: "Semabu Hills Hotel",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgaU-t3sWkcAL2l9CYltUSI-Fqf3AkBQfs9Q&s",
      cost: { day: 5500, week: 30000, month: 115000 },
      location: "Nusa Penida Island",
    },
    {
      id: 12,
      name: "Adiwana Warnakali Resort",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlXn6iHk1i2H0EJH_cR8AYqrYD8h1iyYmWg&s",
      cost: { day: 9500, week: 59000, month: 205000 },
      location: "Nusa Penida Coastal Cliff",
    },
  ],
 
};


  // (your same hotel data here)


// --- Place Data (same as your original) ---
const placeDetails = {
  // (your same place details here)
  1: {
  name: "Baga Beach",
  images: [
    "https://s7ap1.scene7.com/is/image/incredibleindia/baga-beach-goa-goa-baga-beach-2-attr-hero?qlt=82"
  ],
  description: "Baga Beach is one of the most popular beaches in Goa, known for golden sands, vibrant nightlife, beach shacks, water-sports and nearby shopping & dining options.",
  timings: "Open daily from 06:00 AM to 10:00 PM (public beach access) ",
  entryFee: "Free (no entry fee)",
  noteOnCosts: "Paid services like water sports, sunbeds, beach-chairs, parking may cost extra. Typical sunbed/umbrella rent ₹100–₹300/day. Water-sports/activities ₹500–₹2,000 per activity depending on type & season.",
  activities: ["Water Sports", "Beach Parties & Nightlife", "Shopping (Flea market, stalls, boutiques)", "Sunset / Beach Walks", "Sea / Swim / Relaxing by the sea"],
  location: "Calangute / Baga, North Goa, Goa 403516, India (approx. 16 km from Panaji)",
  backLink: "/goa",
  },
  2: {
   
  name: "Fort Aguada",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJxJGlRKzRU9h1st5Z1OPTV-C_jW9qJwe-KA&s"
  ],
  description: "A 17th‑century Portuguese fort built in 1612, with a historic lighthouse, commanding sea views and rich colonial‑era history.",
  timings: "09:30 AM – 06:00 PM (all days)",
  entryFee: "Free (no entry fee for the fort)",
  noteOnCosts: "Fort entry is free. Lighthouse entry ~ ₹25 per Indian (higher for foreigners). Parking may cost ₹50–₹100. Paid services (food, souvenirs) are extra. Photography in open areas is free.",
  location: "Sinquerim / Candolim, North Goa, Goa 403515, India",
  activities: ["Sightseeing", "Photography", "Historical Tour", "Sea View / Sunset"],
  backLink: "/goa",
  },
  3: {
    name: "Dudhsagar Waterfalls",
    images: [
      "https://3.imimg.com/data3/CM/FG/MY-9863021/dudhsagar-waterfall-tambdi-surla-ancient-temple.jpeg",
    ],
    long: "Dudhsagar Waterfalls is one of India’s tallest waterfalls, cascading from a height of 310 meters. It’s especially beautiful during the monsoon and ideal for trekking.",
    timings: "Sanctuary gates around 07:00‑08:00 AM to ~05:00‑06:00 PM (jeep safaris / waterfall access depend on season & forest‑dept rules)",
    entryFee: ["forestEntry: 100",
            // ₹ per person, forest‑entry fee as per 2025 official listing :contentReference[oaicite:3]{index=3},
    "waterfallJeepOrAccess: 500–700"],
    noteOnCosts:["stillCamera: 300",      
    "lifeJacket: 40  "],
    activities: ["Trekking", "Photography", "Nature Walks"],
    location: "Bhagwan Mahavir Wildlife Sanctuary, Mollem / Collem, Goa, India",
    backLink: "/goa",
  },
  4: {
    name: "Basilica of Bom Jesus",
    images: [
      "https://www.tourmyindia.com/states/goa/image/basilica-of-bom-jesus-goa.webp",
    ],
    
    long: "The Basilica of Bom Jesus is a UNESCO-listed 16th-century church famous for its Baroque architecture and for housing the mortal remains of St. Francis Xavier. It is one of Goa’s most important heritage and pilgrimage landmarks.",
    timings: "Monday–Saturday: 09:00 AM – 06:30 PM; Sunday: 10:30 AM – 06:30 PM",
    entryFee: "No Entry Fee",
    noteOnCosts: ["Donations optional", "Guided tour prices may vary (not mandatory)"],
    activities: ["Sightseeing", "Heritage Walk", "Photography", "Architecture Tour"],
    location: "Old Goa Road, Bainguinim, Old Goa, Goa 403402, India",
    backLink: "/goa",
  },
  5: {
    name: "Anjuna Flea Market",
    images: [
      "https://www.tourmyindia.com/states/goa/image/anjuna-flea-market-do-goa.webp",
    ],
    long: "Anjuna Flea Market is a vibrant weekly open-air bazaar near Anjuna Beach in North Goa. Started during the 1960s hippie era, it offers a colourful mix of handicrafts, clothes, jewellery, souvenirs, antiques, street food and beach-vibe music — making it one of Goa’s iconic tourist & shopping spots.",
  timings: "Wednesday: ~07:30 / 08:00 AM – ~6:00 / 7:00 PM (market runs roughly October–April; closed other days and during monsoon season) ",
  entryFee: "No Entry Fee",
  noteOnCosts: ["Bring cash — bargaining expected", "Goods prices vary widely: small souvenirs ₹50–500, clothes & accessories ₹200–2500, antiques/art ₹2000+ depending on quality"],
  activities: ["Shopping (clothes, jewellery, handicrafts, souvenirs)", "Street food & local snacks", "Live music / street performances", "Beach visit nearby"],
  location: "Monteiro Vaddo, Anjuna, Goa 403509, India",
  backLink: "/goa",
  },
  6:{
    name: "77-foot Lord Ram Statue & Ramayana Theme Park",
    images: [
        "http://hindustantimes.com/ht-img/img/2025/11/28/550x309/PTI11-28-2025-000224B-0_1764330239924_1764330249482.jpg"
    ],
    long: "The 77-Foot Lord Ram Statue is a monumental bronze idol of Lord Rama — unveiled in November 2025 at the premises of the Shree Samsthan Gokarn Partagali Jeevottam Math in Canacona, South Goa. Alongside the statue, a new Ramayana Theme Park and landscaped garden-cum-spiritual complex have been established. This site reflects both spiritual revival and cultural tourism, combining devotion, heritage and public space for visitors.",
  timings: "Open daily — (public visiting hours not yet officially published; expect normal daylight hours; for special festivals/rituals check local notices)",
  entryFee: "Likely No Entry Fee / Donation-based (not yet publicly confirmed as paid attraction)",
  noteOnCosts: ["Donations welcome","Costs may vary on festival days"],  
  activities: ["Pilgrimage / Darshan", "Photography", "Spiritual walk", "Cultural / Heritage visit", "Nature / Garden stroll"],  
  location: "Partagali, Canacona, South Goa 403702, Goa, India",
  backLink: "/goa",
},
7:{

  name: "Calangute Beach",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfX7yW7MV5rUGo4LFs_hm3FXkfHTbCqh81ag&s"
  ],
  long: "Calangute Beach is one of the most famous and busiest beaches in North Goa, India, known as the “Queen of Beaches”. It stretches for several kilometres along the Arabian Sea and attracts tourists from across India and the world for its golden sands, lively atmosphere, shacks, water sports, and vibrant nightlife. Calangute is also well-connected to nearby beaches like Baga and Candolim, making it an ideal hub for beach hopping and fun activities. :contentReference[oaicite:0]{index=0}",
  timings: "Open daily • 24 hours (public beach, always accessible) :contentReference[oaicite:1]{index=1}",
  entryFee: "No entry fee (public access is free) :contentReference[oaicite:2]{index=2}",
  noteOnCosts: [
    "Donations or fees not required to access beach",
    "Water sports and beach facilities have separate charges (varies by operator) :contentReference[oaicite:3]{index=3}"
  ],
  activities: [
    "Sunbathing / Beach stroll",
    "Water sports (jet skiing, parasailing, banana boat rides, etc.) :contentReference[oaicite:4]{index=4}",
    "Beachside dining at shacks",
    "Shopping at nearby markets",
    "Sunset views & photography",
    "Nightlife / Bars & Clubs around the beach area"
  ],
  location: "Calangute, North Goa, Goa 403516, India :contentReference[oaicite:5]{index=5}",
  backLink: "/goa",
},
8:{
  name: "Chapora Fort",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLg-OSnrGeVeFmuqRm4skFgoVJt1wYLq81g&s"
  ],
  long: "Chapora Fort is a historic hilltop fort in North Goa that overlooks the Chapora River and the Arabian Sea. Originally built during the early 17th century and later rebuilt by the Portuguese, the fort changed hands multiple times between regional powers before being abandoned in 1892. Today its dramatic laterite ruins offer panoramic views of Vagator Beach, Morjim Beach and surrounding coastline. It also gained pop culture fame after being featured in the Bollywood film “Dil Chahta Hai”. :contentReference[oaicite:0]{index=0}",
  timings: "Open daily — usually ~9:30 AM to ~5:30 PM (closing around sunset; exact times can vary locally) :contentReference[oaicite:1]{index=1}",
  entryFee: "No entry fee (free public access) :contentReference[oaicite:2]{index=2}",
  noteOnCosts: [
    "Fort access is free, but activities like parking or local transport may have separate charges (check locally)",
    "Guided tours or professional photography permits (if required) may incur extra fees"
  ],
  activities: [
    "Exploring historical ruins & ramparts",
    "Panoramic coastal and river views",
    "Photography & sightseeing",
    "Sunset views (arrive before closing)",
    "Walk or short trek up from Vagator/Chapora Beach"
  ],
  location: "Chapora Fort Trail, Vagator, Chapora, North Goa, Goa 403509, India :contentReference[oaicite:3]{index=3}",
  backLink: "/goa",
},
9:{
  name: "Morjim Beach",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsYUwtHsaL8u0Yfy8uHe9VJIHr7fJdJRv5mA&s"
  ],
  long: "Morjim Beach is a scenic coastal stretch in North Goa, India, known for its relatively quiet ambience, natural beauty, and as an important nesting habitat for the endangered Olive Ridley sea turtles. The beach lies along the Arabian Sea and the Chapora River estuary and has become popular with international travellers, especially Russians — earning it the nickname “Little Russia”. Conservation efforts protect turtle nesting zones, and visitors can enjoy beach walks, lounging, watching nesting activities (seasonal), and dining at nearby shacks and cafes.",
  timings: "Open daily — public beach accessible 24 hours (no official restricted visiting hours for general access)",
  entryFee: "No entry fee (public access is free)",
  noteOnCosts: [
    "No entry fee, but water activities and cruises have separate charges depending on operators",
    "Parts of the beach may be restricted during turtle nesting season (approx. October–March) to protect wildlife, so some areas may be off-limits at times "],
  activities: [
    "Relaxing beach walks & sunbathing",
    "Swimming in shallow waters",
    "Watching Olive Ridley turtle nesting (seasonal wildlife observation) ",
    "Chapora River boat rides and dolphin watching ",
    "Beachside dining at shacks and cafes with local and international cuisine ",
    "Kayaking and paddle experiences in nearby estuary/mangroves ",
    "Nightlife & beach parties at selected shacks and resorts "
  ],
  location: "Morjim, North Goa, Goa 403512, India",
  backLink: "/goa",
},
10:{
  name: "Se Cathedral",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeLpLvp8NFUdkvfbsPP8tZu_HzSJ0xt8zQw&s"
  ],
  long: "Se Cathedral (Sé Catedral de Santa Catarina) is a historic Latin Catholic cathedral in Old Goa, India, and one of the largest churches in Asia. It was built by the Portuguese beginning in 1562 to commemorate their victory on the feast day of St. Catherine of Alexandria and was substantially completed by 1619, with consecration in 1640. The cathedral is famed for its grand Portuguese-Gothic architecture, impressive vaulted interiors, and the famous Golden Bell, one of the largest and richest sounding bells in Goa. It forms part of the UNESCO World Heritage Site ‘Churches and Convents of Goa’ and remains a major religious, cultural, and tourism landmark.",
  timings: "Open daily • 7:30 AM – 6:00 PM (approx- typical visiting hours) ",
  entryFee: "No entry fee (public access free) ",
  noteOnCosts: [
    "Entry to the cathedral itself is free — donations welcome at personal discretion",
    "Souvenir shop or camera/video camera usage may have nominal charges locally (varies by provider) "
  ],
  activities: [
    "Viewing Portuguese-Gothic cathedral architecture and historical interiors",
    "Admiring the Golden Bell and ornate altars",
    "Participating in or observing mass services and religious festivals",
    "Photography (exterior and respectful interior where permitted)",
    "Walking through the surrounding Old Goa heritage area"
  ],
  location: "Old Goa, North Goa, Goa 403402, India ",
  backLink: "/goa",
},

  101: {
    name: "Burj Khalifa",
images: [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjitkMQL2SNUDSVyvgr0sHl6mDYwAk-9NPiA&s",
],
long: "Burj Khalifa is the tallest building in the world, standing at a height of 828 meters (2,717 feet), and is the most iconic landmark of Dubai, United Arab Emirates. Located in Downtown Dubai, the skyscraper was officially opened in 2010 and symbolizes the city’s rapid growth and architectural innovation. The tower features luxury residences, corporate suites, fine-dining restaurants, and world-famous observation decks such as 'At The Top' on Levels 124, 125, and 148. Visitors are treated to breathtaking panoramic views of Dubai’s skyline, desert, and coastline, making it one of the most visited attractions globally.",
timings: "Observation Decks: Daily from approx. 9:00 AM to 11:00 PM (last entry around 10:30 PM). Timings may vary on public holidays and special occasions.",
entryFee: "Paid entry — ticket prices vary by level, time slot, and experience",
noteOnCosts: [
  "Level 124 & 125 tickets are generally the most affordable and popular",
  "Level 148 (At The Top SKY) offers a premium experience with lounge access and guided service",
  "Prime sunset hours are more expensive than non-peak times",
  "Dining at At.mosphere (Level 122) is separately priced and considered a luxury experience"
],
activities: [
  "Visiting 'At The Top' observation decks (Levels 124 & 125)",
  "Premium SKY experience at Level 148",
  "Sky-high dining at At.mosphere restaurant (Level 122)",
  "Photography of Dubai skyline and fountain views",
  "Watching the Dubai Fountain show from elevated viewpoints",
  "Shopping and leisure at nearby Dubai Mall",
  "Attending special events and exhibitions hosted inside the tower"
],
location: "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, Dubai, United Arab Emirates",
backLink: "/dubai",
  },
  102: {
    name: "Palm Jumeirah",
    images: [
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/0d/3b/46.jpg",
    ],
    long: "Palm Jumeirah is a man-made island in Dubai, United Arab Emirates, constructed in the shape of a palm tree and considered one of the world’s most ambitious engineering projects. Developed by Nakheel and completed in the mid-2000s, the island consists of a trunk, 16 fronds, and a surrounding crescent that acts as a breakwater. Palm Jumeirah is home to luxury residences, upscale hotels, private beaches, fine-dining restaurants, and major attractions such as Atlantis The Palm. It is one of Dubai’s most prestigious residential and tourist destinations, offering panoramic views of the Arabian Gulf and Dubai skyline.",
timings: "Open daily — Palm Jumeirah is a residential island accessible 24 hours. Individual attractions, beaches, and resorts operate on their own schedules.",
entryFee: "No entry fee to access Palm Jumeirah island; specific attractions and experiences are paid separately",
noteOnCosts: [
  "Access to Palm Jumeirah itself is free via road or Palm Monorail",
  "Atlantis Aquaventure Waterpark and The Lost Chambers Aquarium require paid tickets",
  "Private beach clubs, resorts, and dining experiences have varying prices",
  "The Palm Monorail charges a fare for travel along the island"
],
activities: [
  "Exploring the Palm Monorail with scenic island views",
  "Visiting Atlantis The Palm and Atlantis The Royal",
  "Aquaventure Waterpark rides and marine experiences",
  "Relaxing at private beach clubs and luxury resorts",
  "Fine dining at waterfront and rooftop restaurants",
  "Yacht cruises and boat tours around the crescent",
  "Beach walks and skyline photography"
],
location: "Palm Jumeirah, Dubai, United Arab Emirates",
backLink: "/dubai",
  },
  103: {
    name: "Mall of the Emirates",
    images: [
      "https://www.oasispalmdubai.com/blog/wp-content/uploads/2022/07/shops-1.jpg",
    ],
    long: "Mall of the Emirates is one of Dubai’s largest and most famous shopping malls, located in the Al Barsha district. Opened in 2005 and developed by Majid Al Futtaim Group, the mall is best known for housing Ski Dubai, the Middle East’s first indoor ski resort. The mall features hundreds of international retail brands, a wide range of dining options, family entertainment attractions, and direct connectivity to the Dubai Metro, making it a major shopping and leisure destination for both residents and tourists.",
timings: "Shops: Daily from approx. 10:00 AM to 12:00 AM (midnight). Restaurants, cinema, and entertainment venues may operate later, especially on weekends and public holidays.",
entryFee: "No entry fee to access the mall; individual attractions, shopping, dining, and entertainment experiences are paid separately",
noteOnCosts: [
  "Entry to the mall is free for all visitors",
  "Ski Dubai requires paid tickets, with prices varying by package and duration",
  "VOX Cinemas ticket prices depend on show type and seating category",
  "Dining costs vary widely from food courts to fine-dining restaurants",
  "Special attractions and seasonal events may have separate charges"
],
activities: [
  "Shopping at international and regional retail brands",
  "Indoor skiing, snowboarding, and snow park experiences at Ski Dubai",
  "Watching movies at VOX Cinemas",
  "Dining at food courts, cafés, and fine-dining restaurants",
  "Family entertainment and kids’ play areas",
  "Attending seasonal promotions and events",
  "Convenient metro access for shopping and leisure"
],
location: "Sheikh Zayed Road, Al Barsha, Dubai, United Arab Emirates",
 backLink: "/dubai",
  },
  104: {
  name: "Desert Safari Dubai",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP3sjrRyMhI0pDTqjTF6FkSN79Y3Lv7c4PNH1naVTgEcbqEQTNVi49EbAdhZcA2kOuZs8&usqp=CAU",
    ,
  ],
  long: "Desert Safari Dubai is one of the most popular outdoor adventure experiences in the United Arab Emirates, offering visitors an immersive journey into the Arabian Desert surrounding Dubai. Typically conducted in the Lahbab, Al Badayer, or Dubai Desert Conservation Reserve areas, the experience combines adrenaline-filled dune bashing in 4x4 vehicles with traditional Bedouin-style cultural activities.",
timings: "Most desert safaris operate daily from approximately 3:00 PM to 9:00–10:00 PM. Morning and overnight safari options are also available depending on the tour operator.",
entryFee: "Paid experience — prices vary based on safari type, inclusions, and operator",
noteOnCosts: [
  "Standard evening desert safaris are the most common and moderately priced",
  "Premium safaris include private vehicles, luxury camps, or conservation reserve access",
  "Quad biking, dune buggies, and falcon photography may have additional charges",
  "Overnight safaris cost more and include camping and sunrise views",
  "Hotel pickup and drop-off are usually included in most packages"
],
activities: [
  "Dune bashing in 4x4 vehicles",
  "Camel riding and desert photography",
  "Sandboarding on desert dunes",
  "Quad biking and dune buggy rides (optional)",
  "Traditional BBQ dinner with vegetarian options",
  "Live entertainment including belly dance, Tanoura, and fire shows",
  "Henna painting and traditional Arabic dress photography",
  "Stargazing and desert camping (overnight safaris)"
],
location: "Arabian Desert (commonly Lahbab Desert, Al Badayer, or Dubai Desert Conservation Reserve), Dubai, United Arab Emirates",
  backLink: "/dubai",
},
105:{
  name: "Dubai Fountain",
  images: [  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHRf85gZsFEwbfH859g_awHnu45GWHTEp73w&s", ],
  long: "Dubai Fountain is the world’s largest choreographed fountain system, located on the 30-acre Burj Lake at the base of Burj Khalifa in Downtown Dubai, United Arab Emirates. Designed by WET Design, the same company behind the Bellagio Fountains in Las Vegas, the fountain features powerful water jets that shoot up to 150 meters (490 feet) high and perform synchronized shows set to Arabic, classical, and international music. Since its inauguration in 2009, the Dubai Fountain has become one of the city’s most iconic free attractions, drawing millions of visitors every year.",
timings: "Evening shows daily from approximately 6:00 PM to 11:00 PM, with performances every 30 minutes. Afternoon shows take place around 1:00 PM and 1:30 PM (Friday afternoons at 2:00 PM and 2:30 PM).",
entryFee: "No entry fee (fountain viewing is free for the public)",
noteOnCosts: [
  "Watching the fountain from public viewing areas is completely free",
  "Dubai Fountain Boardwalk and Lake Ride experiences require paid tickets",
  "Prices for boardwalk or lake rides vary by operator and time slot",
  "Dining at nearby restaurants with fountain views may have higher prices"
],
activities: [
  "Watching choreographed fountain shows with music",
  "Photography and videography of fountain performances",
  "Walking along the Dubai Fountain Boardwalk",
  "Taking a traditional abra lake ride during the show",
  "Dining at restaurants with fountain-facing seating",
  "Evening strolls around Burj Lake and Downtown Dubai",
  "Combining fountain viewing with Burj Khalifa or Dubai Mall visits"
],
location: "Burj Lake, Downtown Dubai, Dubai, United Arab Emirates",
  backLink: "/dubai",
},
106: {
name: "Dubai Frame",
images: [
  "https://www.travalot.com/_next/image?url=https%3A%2F%2Fapi.travalot.com%2Fattachment%2F7ddd13d0-736f-11f0-83f8-e116b11710fb.jpg&w=3840&q=75",
],
long: "Dubai Frame is an architectural landmark in Zabeel Park, Dubai, United Arab Emirates, designed to ‘frame’ impressive views of both old and new Dubai. Opened in January 2018, the structure is 150 meters tall and 93 meters wide, shaped like a giant picture frame. Visitors can take an elevator to the top for panoramic views from the Sky Deck, walk on the glass-floored bridge for a thrilling experience, and explore the museum area that showcases Dubai’s transformation from a small trading town to a global metropolis.",
timings: "Open daily from 9:00 AM to 9:00 PM (last entry at 8:30 PM). Timings may vary during public holidays or special events.",
entryFee: "Paid entry — Approx. AED 50 – AED 75 per adult, AED 20 – AED 40 for children (3–12 years), free for children under 3",
noteOnCosts: [
  "Adult ticket prices are around AED 50–75 depending on the time of day",
  "Children (3–12 years) have discounted tickets",
  "Tickets can be booked online or purchased at the site",
  "Photography and glass bridge access are included in standard ticket",
  "Special events or private bookings may have additional charges"
],
activities: [
  "Panoramic views of old and new Dubai from the Sky Deck",
  "Walking on the glass-floored bridge for a unique experience",
  "Exploring the museum showcasing Dubai’s history and future",
  "Photography and videography of the city skyline",
  "Learning about Dubai’s urban transformation and development",
  "Enjoying interactive exhibits and multimedia presentations",
  "Observing landmarks like Burj Khalifa and Zabeel Park from above"
],
location: "Zabeel Park, Sheikh Mohammed Bin Zayed Road, Dubai, United Arab Emirates",
  backLink: "/dubai",
},
107:{
name: "JBR Beach",
images: [
"https://cf.bstatic.com/xdata/images/hotel/max1024x768/692692516.jpg?k=4f18322d7b05b1e40467b15119c015f5f386f6f9e1b77df946a185e44e37052b&o=",
],
long: "JBR Beach, or Jumeirah Beach Residence Beach, is a popular public beach along the Persian Gulf in Dubai, United Arab Emirates. Stretching over 1.7 kilometers along the Jumeirah Beach Residence promenade, the beach is known for its golden sand, clear waters, and vibrant atmosphere. Visitors enjoy sunbathing, swimming, water sports, and beachfront dining. The adjacent 'The Walk at JBR' offers shops, restaurants, cafes, and entertainment, making it one of Dubai’s most visited leisure destinations.",
timings: "Open daily — public beach accessible 24 hours. Most beach facilities operate from approx. 7:00 AM to 10:00 PM.",
entryFee: "No entry fee (public access is free); individual facilities, water sports, and beach clubs may have separate charges",
noteOnCosts: [
  "Public beach access is free for all visitors",
  "Water sports (jet skiing, flyboarding, parasailing) are paid activities",
  "Beach club entry and sunbed rentals may have additional charges",
  "Dining at The Walk or beachfront restaurants varies by venue",
  "Events, concerts, and festivals may require separate tickets"
],
activities: [
  "Swimming and sunbathing",
  "Jet skiing, parasailing, and flyboarding",
  "Beach volleyball and other sports",
  "Dining and shopping at The Walk at JBR",
  "Strolling along the promenade",
  "Watching street performances and live entertainment",
  "Photography of sunsets and beachfront scenery"
],
location: "Jumeirah Beach Residence, Dubai Marina, Dubai, United Arab Emirates",
  backLink: "/dubai",
},
108:{
name: "Global Village",
images: [
  "https://static.toiimg.com/thumb/msid-124533434,width-1070,height-580,imgsize-147832,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
],
long: "Global Village is a seasonal cultural, entertainment, and shopping destination in Dubai, United Arab Emirates. Opened in 1997, it showcases pavilions representing countries from around the world, offering traditional food, handicrafts, performances, and cultural experiences. Located on Sheikh Mohammed Bin Zayed Road, Global Village combines international shopping, live shows, rides, and family entertainment, making it one of the largest cultural festivals and tourist attractions in the Middle East.",
timings: "Open seasonally from approximately October to April, daily from 4:00 PM to 12:00 AM. Timings may vary for special events and holidays.",
entryFee: "Paid entry — Approx. AED 15 per adult, AED 10 per child (3–12 years), free for children under 3",
noteOnCosts: [
  "Adult tickets are around AED 15",
  "Children (3–12 years) pay AED 10, under 3 years are free",
  "Rides, games, and shopping inside the pavilions have additional costs",
  "Dining prices vary depending on the pavilion and restaurant",
  "Seasonal events or shows may have separate ticketing"
],
activities: [
  "Exploring cultural pavilions representing over 75 countries",
  "Shopping for international handicrafts, souvenirs, and goods",
  "Sampling authentic international cuisines",
  "Rides and amusement attractions for children and families",
  "Watching live performances, concerts, and cultural shows",
  "Photography of themed pavilions and illuminated displays",
  "Attending seasonal events, festivals, and exhibitions"
],
location: "Sheikh Mohammed Bin Zayed Road, Dubailand, Dubai, United Arab Emirates",
  backLink: "/dubai",

},
109:{
name: "Al Fahidi Historical District",
images: [
 "https://www.visitdubai.com/-/media/gathercontent/poi/a/al-fahidi-historical-neighbourhood/fallback-image/al-fahidi-historical-neighbourhood.jpg",
],
long: "Al Fahidi Historical District, also known as Al Bastakiya, is one of the oldest heritage sites in Dubai, United Arab Emirates. Established in the late 19th century, it features traditional wind-tower (Barjeel) architecture, narrow winding alleys, and preserved courtyard houses. The district offers a glimpse into Dubai’s pre-oil era, with museums, art galleries, cultural exhibitions, and cafes. It is a popular destination for history enthusiasts, photographers, and visitors seeking an authentic cultural experience.",
timings: "Open daily from approximately 8:00 AM to 8:00 PM. Specific museums, galleries, and cafés within the district may have different operating hours.",
entryFee: "Free to explore the district; entry fees may apply for individual museums, exhibitions, or heritage sites",
noteOnCosts: [
  "Walking through the alleys and observing architecture is free",
  "Entry to the Dubai Museum, Sheikh Mohammed Centre for Cultural Understanding, or private exhibitions may have separate charges",
  "Guided tours are available for a fee",
  "Cafés, restaurants, and art workshops inside the district are separately priced"
],
activities: [
  "Exploring traditional wind-tower houses and courtyard homes",
  "Visiting museums and cultural heritage centers",
  "Photography of historic architecture and narrow alleys",
  "Participating in guided tours and cultural workshops",
  "Enjoying local art galleries and handicraft shops",
  "Dining at heritage cafés and sampling Emirati cuisine",
  "Learning about Dubai’s history and culture from pre-oil era to modern times"
],
location: "Al Fahidi Street, Bur Dubai, Dubai, United Arab Emirates",
  backLink: "/dubai",

},
110:{
name: "Dubai Creek",
images: [
  "https://cdn.dxbproperties.ae/media/seo_images_property/dubai_creek_harbour_thumbnail_1_1200.webp?width=1200&height=630&format=jpeg&quality=15",
],
long: "Dubai Creek is a natural saltwater inlet that divides the city into Deira and Bur Dubai, serving as the historic heart of Dubai, United Arab Emirates. Stretching approximately 14 kilometers, the creek was historically used for trade and transportation and remains an iconic waterway connecting modern Dubai to its heritage. Visitors can experience traditional abras (wooden boats) crossing the creek, explore bustling souks, and enjoy waterfront dining and sightseeing along the banks.",
timings: "Open daily — accessible 24 hours. Abra crossings typically operate from 6:00 AM to 12:00 AM. Souks and waterfront attractions follow their respective operating hours.",
entryFee: "No entry fee for the creek itself; abra rides and attractions are paid separately",
noteOnCosts: [
  "Abra rides across the creek cost approx. AED 1–2 per person",
  "Visiting traditional souks is free, but shopping costs vary",
  "Waterfront restaurants, cafes, and dhow cruises have separate charges",
  "Guided tours and private boat experiences cost extra"
],
activities: [
  "Riding traditional abras (wooden boats) across the creek",
  "Exploring Deira Gold Souk, Spice Souk, and Textile Souk",
  "Walking along the waterfront promenade",
  "Photography of historic and modern Dubai skylines",
  "Dhow cruises with dinner or sightseeing",
  "Learning about Dubai’s history as a trading hub",
  "Visiting museums and heritage sites along the creek"
],
location: "Dubai Creek, Deira & Bur Dubai, Dubai, United Arab Emirates"

},
111:{
name: "Ras Al Khor Wildlife Sanctuary",
images: [
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzFK0QY0js9t1dpSy34wVzboQk8sCiXzh8w&s",
],
long: "Ras Al Khor Wildlife Sanctuary is a protected wetland reserve located at the mouth of Dubai Creek, United Arab Emirates. Established in 1985, it covers an area of approximately 6.2 square kilometers and is home to over 450 species of wildlife, including migratory birds such as flamingos, herons, and gulls. The sanctuary features mangroves, mudflats, and salt flats, providing critical habitat for birds and other wildlife. It is one of the few urban wildlife sanctuaries in the world and offers an important educational and ecological experience.",
timings: "Open daily from 6:00 AM to 6:00 PM; bird hides are accessible during these hours. Timings may vary during public holidays or for maintenance.",
entryFee: "Free entry for all visitors",
noteOnCosts: [
  "Entry to the sanctuary and bird hides is completely free",
  "Guided tours or educational programs may have separate fees",
  "Photography is allowed; tripods and professional equipment may require permission",
  "Donations to support conservation are voluntary"
],
activities: [
  "Bird watching, especially flamingos during winter months",
  "Exploring mangroves, mudflats, and natural habitats",
  "Photography and wildlife observation",
  "Educational programs and guided tours",
  "Walking along designated trails and boardwalks",
  "Learning about conservation and biodiversity in an urban setting",
  "Family-friendly nature walks and eco-activities"
],
location: "Dubai Creek, Dubai, United Arab Emirates"

},
  500: {
    name: "Hadimba Temple",
    images: [
      "https://www.sushanttravels.com/uploads/Hadimba_Devi_Temple_2.jpg",
    ],
    long: "Hadimba Temple, also known as Hidimba Devi Temple, is an ancient cave temple located in Manali, Himachal Pradesh, India. Built in 1553 CE by Maharaja Bahadur Singh, the temple is dedicated to Hidimba Devi, a character from the Indian epic Mahabharata and the wife of Bhima. Nestled amid dense cedar (deodar) forests at the foothills of the Himalayas, the temple is known for its unique pagoda-style wooden architecture, intricately carved doors, and peaceful natural surroundings. It is one of the most important cultural and religious landmarks of Manali.",
timings: "Open daily from approximately 8:00 AM to 6:00 PM",
entryFee: "No entry fee (free for all visitors)",
noteOnCosts: [
  "Entry to the temple premises is completely free",
  "Photography may be restricted inside the sanctum area",
  "Local guides are optional and charge separately if hired",
  "Donations are voluntary and not mandatory"
],
activities: [
  "Temple darshan and prayer",
  "Exploring the surrounding deodar forest",
  "Photography of traditional Himalayan architecture",
  "Learning about Mahabharata legends and local history",
  "Quiet walks and relaxation in the temple परिसर",
  "Participating in local festivals such as the Hadimba Devi Fair"
],
location: "Hadimba Temple Road, Old Manali, Manali, Himachal Pradesh 175131, India",
    backLink: "/manali",
  },
  501: {
    name: "Solang Valley",
    images: [
      "https://img.indiahighlight.com/fit-in/1090x600/ih/uploads/1733894516.jpg"
    ],
    long: "Solang Valley is famous for adventure sports like skiing, paragliding, and zorbing. It’s surrounded by breathtaking snow-capped peaks.",
    timings: "10:00 AM – 5:00 PM",
    entryFee: "Free (Activities charged separately)",
    activities: ["Skiing", "Paragliding", "Snowboarding"],
    location: "14 km from Manali",
    backLink: "/manali",
  },
  502: {
    name: "Rohtang Pass",
    images: [
      "https://media1.thrillophilia.com/filestore/4016azmjxihdjzufjc1yoqqtmke8_manali-rohtang-pass-147612479498-orijgp.jpg?w=400&dpr=2",
    ],
    long: "Rohtang Pass offers stunning views of glaciers and valleys, remaining snow-covered for most of the year. It’s one of Manali’s must-visit spots.",
    timings: "6:00 AM – 6:00 PM",
    entryFee: "Free (Permit required)",
    activities: ["Snow Activities", "Photography", "Sightseeing"],
    location: "51 km from Manali",
    backLink: "/manali",
  },
  503: {
  name: "Manikaran",
  images: [
    "https://i.ytimg.com/vi/XZhXZdmrzpY/maxresdefault.jpg",
  ],
  long: "Manikaran, located in the Parvati Valley near Kullu, is famous for its natural hot springs and sacred Sikh Gurdwara. It’s a revered pilgrimage site for both Sikhs and Hindus, offering scenic mountain views and spiritual tranquility.",
  timings: "5:00 AM – 10:00 PM",
  entryFee: "Free",
  activities: ["Pilgrimage", "Hot Spring Bath", "Photography", "Sightseeing"],
  location: "Parvati Valley, near Kullu",
  backLink: "/manali",
},

  201: {
  name: "Marina Bay Sands",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhEWRQ1gaTwV8XT7Ads86YKdM0xJmoFLXTgw&s",
  ],
  long: "Marina Bay Sands is Singapore’s most iconic integrated resort featuring a luxury hotel, a sky park with a 150m infinity pool, and world-class dining and shopping.",
  timings: "Open 24 hours (Observation Deck: 11:30 AM – 8:00 PM)",
  entryFee: "Observation Deck: SGD 26",
  activities: ["Observation Deck", "Luxury Stay", "Shopping", "Fine Dining"],
  location: "10 Bayfront Avenue, Singapore 018956",
  backLink: "/singapore",
},
202: {
  name: "Gardens by the Bay",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeOcKDW58b0QYTWsoLjR7T690SqwNbE47UFg&s",
  ],
  long: "Gardens by the Bay is a futuristic nature park spanning 101 hectares. It features the Supertree Grove, Cloud Forest, and Flower Dome — iconic symbols of Singapore’s eco-architecture.",
  timings: "5:00 AM – 2:00 AM",
  entryFee: "SGD 28 (Cloud Forest + Flower Dome)",
  activities: ["Sightseeing", "Photography", "Night Light Show"],
  location: "18 Marina Gardens Dr, Singapore 018953",
  backLink: "/singapore",
},
203: {
  name: "Sentosa Island",
  images: [
    "https://images.squarespace-cdn.com/content/v1/5be172e38f513032e447734b/1558366937124-5ZJ9AAZ5Z721YPY0T588/Sentosa-Picture.jpg",
  ],
  long: "Sentosa Island is a resort destination packed with attractions like Universal Studios Singapore, Adventure Cove Waterpark, SEA Aquarium, and sandy beaches.",
  timings: "9:00 AM – 8:00 PM",
  entryFee: "Free Entry (Attractions vary in price)",
  activities: ["Beach Walks", "Theme Parks", "Water Sports"],
  location: "Sentosa Island, Singapore",
  backLink: "/singapore",
},
204: {
  name: "Merlion Park",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vj7BzxkIHbMQgVBCxSIEHI2CV2gxjuILMg&s",
  ],
  long: "Merlion Park houses Singapore’s national symbol — the Merlion. This half-lion, half-fish statue overlooks Marina Bay and is a popular photo spot.",
  timings: "Open 24 hours",
  entryFee: "Free",
  activities: ["Photography", "Sightseeing", "Walking"],
  location: "1 Fullerton Rd, Singapore 049213",
  backLink: "/singapore",
},
205: {
  name: "Singapore Zoo",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiBAmlvtJhplx8kUIByHu1xCHUYOtE7wjyQ&s",
  ],
  long: "The Singapore Zoo is world-renowned for its open-concept habitats and diverse wildlife. It’s home to over 2,800 animals and offers interactive experiences like breakfast with orangutans.",
  timings: "8:30 AM – 6:00 PM",
  entryFee: "SGD 49 (Adults), SGD 34 (Children)",
  activities: ["Wildlife Watching", "Photography", "Family Tours"],
  location: "80 Mandai Lake Rd, Singapore 729826",
  backLink: "/singapore",
},
801: {
  name: "Eiffel Tower",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHVfss8z_KHmkXBTe0cLOL44drTqFCx5em4tQlX7F9WO46JzwaOIISr7s0PpFobj8LkJg&usqp=CAU",
  ],
  long: "The Eiffel Tower is Paris' most iconic landmark, offering panoramic city views from its multiple levels. Visitors can dine in its restaurants or enjoy the light show at night.",
  timings: "9:00 AM – 12:45 AM",
  entryFee: "€16.60 (Adults), €8.30 (Children 4-11)",
  activities: ["Sightseeing", "Photography", "Dining", "Night Illumination"],
  location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
  backLink: "/paris",
},

802: {
  name: "Louvre Museum",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQrwqdR6-fZOkZQI3fFDnmVD-lycEWlCP8A&s",
  ],
  long: "The Louvre Museum is the world's largest art museum, home to the Mona Lisa, Venus de Milo, and thousands of masterpieces spanning centuries.",
  timings: "9:00 AM – 6:00 PM (Closed Tuesdays)",
  entryFee: "€17 (Online), €15 (On-site Adults), Free for under 18",
  activities: ["Art Viewing", "Guided Tours", "Photography"],
  location: "Rue de Rivoli, 75001 Paris",
  backLink: "/paris",
},

803: {
  name: "Notre Dame Cathedral",
  images: [
    "https://i.pinimg.com/736x/96/a1/68/96a168fdcdb1a71a569424aecdb4f789.jpg",
  ],
  long: "Notre Dame is a Gothic cathedral on the Île de la Cité. Known for its stunning architecture, stained glass windows, and historical significance.",
  timings: "8:00 AM – 6:45 PM",
  entryFee: "Free (Cathedral), Tower Visit €10",
  activities: ["Sightseeing", "Photography", "History Tours"],
  location: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris",
  backLink: "/paris",
},

804: {
  name: "Arc de Triomphe",
  images: [
    "https://cdn.britannica.com/66/80466-050-2E125F5C/Arc-de-Triomphe-Paris-France.jpg",
  ],
  long: "The Arc de Triomphe honors those who fought and died for France. Visitors can climb to the top for panoramic views of the Champs-Élysées.",
  timings: "10:00 AM – 11:00 PM",
  entryFee: "€13 (Adults), Free for under 18",
  activities: ["Sightseeing", "Photography", "City Views"],
  location: "Place Charles de Gaulle, 75008 Paris",
  backLink: "/paris",
},

901: {
    name: "Uluwatu Temple",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzi8G3SxTzYc6Y9hj5gFxR3v5Yt7F6V3EoWw&s",
    ],
    long: "Uluwatu Temple is a famous Balinese sea temple located on a steep cliff overlooking the Indian Ocean. Known for stunning sunsets and the Kecak fire dance performance.",
    timings: "7:00 AM – 7:00 PM",
    entryFee: "IDR 50,000 (approx ₹270)",
    activities: ["Sunset View", "Kecak Dance", "Photography"],
    location: "Pecatu, South Kuta, Bali",
    backLink: "/bali",
  },

  902: {
    name: "Tegallalang Rice Terrace",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVC230A3qwP0k6JAFgw9lCpP_q2m6yt4V0Hw&s",
    ],
    long: "One of Bali’s most iconic landscapes featuring lush green stepped rice fields. It’s a great spot for nature walks, swings, cafes, and photography.",
    timings: "8:00 AM – 6:00 PM",
    entryFee: "IDR 15,000 – 25,000 (₹80 – ₹130)",
    activities: ["Nature Walk", "Bali Swing", "Photography", "Coffee Shops"],
    location: "Ubud, Bali",
    backLink: "/bali",
  },

  903: {
    name: "Mount Batur",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDR72hAzPR4RjcQe7_ro3_0Ps4D35fsJvycA&s",
    ],
    long: "An active volcano famous for sunrise trekking adventures. The view of the lake and mountains during dawn is breathtaking.",
    timings: "Trekking usually 3:00 AM – 11:00 AM",
    entryFee: "Tour packages start from IDR 200,000 (₹1100+)",
    activities: ["Trekking", "Hot Springs", "Camping", "Photography"],
    location: "Kintamani, North Bali",
    backLink: "/bali",
  },

  904: {
    name: "Ubud Monkey Forest",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGpjXs7YSNzvz7cwuQWGmvbT8sYV1gs5H2g&s",
    ],
    long: "A sacred nature sanctuary home to more than 1,200 long-tailed monkeys. It features beautiful pathways, ancient statues, and temples inside the forest.",
    timings: "9:00 AM – 6:00 PM",
    entryFee: "IDR 80,000 (₹430)",
    activities: ["Wildlife Spotting", "Nature Trails", "Temple Visit"],
    location: "Ubud, Gianyar, Bali",
    backLink: "/bali",
  },

  905: {
    name: "Seminyak Beach",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmAmzpcjjwYfLL1ytcTmOaykJVpS0YyGc9Q&s",
    ],
    long: "A premium beach destination in Bali known for nightlife, luxury beach clubs, surfing, and beautiful sunsets.",
    timings: "Open 24 hours",
    entryFee: "Free",
    activities: ["Surfing", "Nightlife", "Beach Dining", "Shopping"],
    location: "Seminyak, Kuta, Bali",
    backLink: "/bali",
  },

  906: {
    name: "Nusa Penida",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPpocVXMr1g7MBlP1uR0V95uTmQB0OLM__yw&s",
    ],
    long: "A scenic island famous for Kelingking Beach, crystal waters, snorkeling with manta rays, and stunning cliffside views.",
    timings: "Open 24 hours (depending on ferry)",
    entryFee: "Some spots may require small fees (₹50–₹200)",
    activities: [
      "Boat Tours",
      "Snorkeling",
      "Cliff Viewpoints",
      "Beach Exploration"
    ],
    location: "Southeast of Bali, accessible by ferry",
    backLink: "/bali",
  },
};



// function PlaceDetails() {
//   const { id } = useParams();
//   const place = placeDetails[id];

//   const [showBooking, setShowBooking] = useState(false);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     guests: 1,
//     days: 1,
//     payment: "gpay",
//   });
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);

//   if (!place) {
//     return <h2>Place not found!</h2>;
//   }

//   const nearbyHotels = hotelsNearPlace[id];

//   // 🔹 Check if user is logged in
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   // 🔹 Open booking modal
//   const handleBookClick = (hotel) => {
//     if (!currentUser) {
//       alert("⚠ Please log in first to make a booking!");
//       return;
//     }
//     setSelectedHotel(hotel);
//     setShowBooking(true);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const totalCost =
//     selectedHotel && formData.days && formData.guests
//       ? selectedHotel.cost.day * formData.days * formData.guests
//       : 0;

//   const advancePayment = Math.floor(totalCost * 0.25);

//   const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!currentUser) {
//     alert("⚠ Please log in first to make a booking!");
//     return;
//   }

//   const bookingData = {
//     hotelName: selectedHotel.name,
//     placeName: place.name,
//     totalCost,
//     advancePayment,
//     guests: formData.guests,
//     days: formData.days,
//     date: new Date().toLocaleString(),
//     image: selectedHotel.image,
//   };

//   // ✅ Save bookings under user-specific key
//   const key = `bookings_${currentUser.email}`;
//   const existingBookings = JSON.parse(localStorage.getItem(key)) || [];
//   existingBookings.push(bookingData);
//   localStorage.setItem(key, JSON.stringify(existingBookings));

//   setBookingConfirmed(true);
// };


//   return (
//     <div className="details-container">
//       {/* 🏖 Place Details Section */}
//       <div className="place-section">
//         <div className="image-slider">
//           {place.images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`${place.name}-${index}`}
//               className="details-image"
//             />
//           ))}
//         </div>

//         <h1>{place.name}</h1>
// <p><strong>About:</strong> {place.long}</p>
// <p><strong>Timings:</strong> {place.timings}</p>

// <p><strong>Entry Fee:</strong></p>
// {Array.isArray(place.entryFee) ? (
//   place.entryFee.map((fee, index) => (
//     <span key={index}>
//       {fee} <br />
//     </span>
//   ))
// ) : (
//   <span>{place.entryFee}</span>
// )}

// <p><strong>Note on Costs:</strong></p>
// {Array.isArray(place.noteOnCosts) ? (
//   place.noteOnCosts.map((note, index) => (
//     <span key={index}>
//       {note} <br />
//     </span>
//   ))
// ) : (
//   <span>{place.noteOnCosts}</span>
// )}

// <p><strong>Location:</strong> {place.location}</p>
// <p><strong>Activities:</strong> {place.activities.join(", ")}</p>


//         {/* Google Map */}
//         <div className="map-container">
//           <h2>📍 Location Map</h2>
//           <iframe
//             title={place.name}
//             src={`https://www.google.com/maps?q=${encodeURIComponent(
//               place.location
//             )}&output=embed`}
//             width="100%"
//             height="300"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//           ></iframe>
//         </div>
//       </div>

//       {/* 🏨 Hotels Section */}
//       <div className="hotels-section">
//         <h2>🏨 Hotels Near {place.name}</h2>
//         {nearbyHotels && nearbyHotels.length > 0 ? (
//           <div className="hotels-grid">
//             {nearbyHotels.map((hotel) => (
//               <div key={hotel.id} className="hotel-card">
//                 <img src={hotel.image} alt={hotel.name} />
//                 <h3>{hotel.name}</h3>
//                 <p>{hotel.location}</p>
//                 <p>
//                   <strong>Cost:</strong> ₹{hotel.cost.day}/day | ₹{hotel.cost.week}/week
//                 </p>
//                 <button
//                   onClick={() => handleBookClick(hotel)}
//                   className="book-btn"
//                 >
//                   Book Hotel
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="no-hotels">❌ No hotels nearby.</p>
//         )}
//       </div>
//  {/* Hospitals Nearby */}
// <div className="hospitals-section">
//   <h2>🏥 Nearby Hospitals</h2>
//   <div className="hospital-grid">
//     {nearbyHospitals[place.name]?.length > 0 ? (
//       nearbyHospitals[place.name].map(hospital => (
//         <div key={hospital.id} className="hospital-card">
//           <img src={hospital.image} alt={hospital.name} />
//           <h3>{hospital.name}</h3>
//           <p>{hospital.location}</p>
//           <p>Contact: {hospital.contact}</p>
//         </div>
//       ))
//     ) : (
//       <p>No nearby hospitals listed.</p>
//     )}
//   </div>
// </div>


//       {/* 🔙 Back Button */}
//       <Link to={place.backLink}>
//         <button className="back-btn">⬅ Back</button>
//       </Link>
//       {/* 🧾 Booking Modal */}
//       {showBooking && selectedHotel && (
//         <div className="modal-overlay">
//           <div className="modal">
//             {!bookingConfirmed ? (
//               <>
//                 <h2>🛏 Book {selectedHotel.name}</h2>
//                 <form onSubmit={handleSubmit} className="booking-form">
//                   <label>
//                     Full Name:
//                     <input type="text" name="name" required onChange={handleChange} />
//                   </label>

//                   <label>
//                     Mobile Number:
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       pattern="[0-9]{10}"
//                       placeholder="10-digit number"
//                       onChange={handleChange}
//                     />
//                   </label>

//                   <label>
//                     Email ID:
//                     <input type="email" name="email" required onChange={handleChange} />
//                   </label>

//                   <label>
//                     Number of Guests:
//                     <input
//                       type="number"
//                       name="guests"
//                       min="1"
//                       value={formData.guests}
//                       onChange={handleChange}
//                     />
//                   </label>

//                   <label>
//                     Number of Days:
//                     <input
//                       type="number"
//                       name="days"
//                       min="1"
//                       value={formData.days}
//                       onChange={handleChange}
//                     />
//                   </label>

//                   <p><strong>Cost per Day:</strong> ₹{selectedHotel.cost.day}</p>
//                   <p><strong>Total Cost:</strong> ₹{totalCost}</p>
//                   <p><strong>Advance Payment (25%):</strong> ₹{advancePayment}</p>

//                   <label>
//                     Payment Method:
//                     <select
//                       name="payment"
//                       value={formData.payment}
//                       onChange={handleChange}
//                     >
//                       <option value="gpay">GPay / UPI</option>
//                       <option value="cash">Cash on Arrival</option>
//                     </select>
//                   </label>

//                   <button type="submit" className="confirm-btn">Confirm Booking</button>
//                   <button
//                     type="button"
//                     onClick={() => setShowBooking(false)}
//                     className="cancel-btn"
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </>
//             ) : (
//               <div className="confirmation">
//                 <h2>✅ Booking Confirmed!</h2>
//                 <p>Thank you, {formData.name}!</p>
//                 <p>Your booking for <strong>{selectedHotel.name}</strong> is confirmed.</p>
//                 <p>📩 Verification SMS sent to {formData.phone}</p>

//                 {formData.payment === "gpay" ? (
//                   <>
//                     <p>📱 Please scan to pay ₹{advancePayment} via GPay:</p>
//                     <img
//                       src="https://clickplus.co.in/assets/img/gpay.jpg"
//                       alt="GPay QR"
//                       className="gpay-img"
//                     />
//                   </>
//                 ) : (
//                   <p>💵 Pay ₹{advancePayment} on arrival.</p>
//                 )}

//                 <button
//                   onClick={() => {
//                     setShowBooking(false);
//                     setBookingConfirmed(false);
//                   }}
//                   className="close-btn"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PlaceDetails;



// function PlaceDetails() {
//   const { id } = useParams();
//   const place = placeDetails[id];

//   const [showBooking, setShowBooking] = useState(false);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     guests: 1,
//     days: 1,
//     payment: "gpay",
//   });
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);
//   if (!place) {
//     return <h2>Place not found!</h2>;
//   }

//   const nearbyHotels = hotelsNearPlace[id];

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const handleBookClick = (hotel) => {
//     if (!currentUser) {
//       alert("⚠ Please log in first to make a booking!");
//       return;
//     }
//     setSelectedHotel(hotel);
//     setShowBooking(true);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const totalCost =
//     selectedHotel && formData.days && formData.guests
//       ? selectedHotel.cost.day * formData.days * formData.guests
//       : 0;

//   const advancePayment = Math.floor(totalCost * 0.25);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (!currentUser) {
//   //     alert("⚠ Please log in first to make a booking!");
//   //     return;
//   //   }

//   //   const bookingData = {
//   //     hotelName: selectedHotel.name,
//   //     placeName: place.name,
//   //     totalCost,
//   //     advancePayment,
//   //     guests: formData.guests,
//   //     days: formData.days,
//   //     date: new Date().toLocaleString(),
//   //     image: selectedHotel.image,
//   //     user: currentUser.email,
//   //   };

//   //   // ---------------- SOCKET EMIT ----------------
//   //   socket.emit("new_booking", bookingData);  
//   //   // ---------------------------------------------

//   //   // Save booking locally
//   //   const key = `bookings_${currentUser.email}`;
//   //   const existingBookings = JSON.parse(localStorage.getItem(key)) || [];
//   //   existingBookings.push(bookingData);
//   //   localStorage.setItem(key, JSON.stringify(existingBookings));

//   //   setBookingConfirmed(true);
//   // };

  
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const bookingData = {
//       hotelName: selectedHotel.name,
//       placeName: place.name,
//       totalCost,
//       advancePayment,
//       guests: formData.guests,
//       days: formData.days,
//       date: new Date().toLocaleString(),
//       image: selectedHotel.image,
//       user: currentUser.email,
//     };

//     // ✅ Emit booking event to backend
//     socket.emit("new_booking", bookingData);  

//     // Save booking locally
//     const key = `bookings_${currentUser.email}`;
//     const existingBookings = JSON.parse(localStorage.getItem(key)) || [];
//     existingBookings.push(bookingData);
//     localStorage.setItem(key, JSON.stringify(existingBookings));

//     setBookingConfirmed(true);
//   };

//   // Optional: Listen for real-time updates (anywhere in component)
//   useEffect(() => {
//     socket.on("booking_update", (data) => {
//       console.log("📢 Live booking update:", data);
//     });

//     return () => {
//       socket.off("booking_update");
//     };
//   }, []);

//   return (
//     <div className="details-container">
//       {/* Place Details */}
//       <div className="place-section">
//         <div className="image-slider">
//           {place.images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`${place.name}-${index}`}
//               className="details-image"
//             />
//           ))}
//         </div>

//         <h1>{place.name}</h1>
//         <p><strong>About:</strong> {place.long}</p>
//         <p><strong>Timings:</strong> {place.timings}</p>

//         <p><strong>Entry Fee:</strong></p>
//         {Array.isArray(place.entryFee) ? (
//           place.entryFee.map((fee, index) => (
//             <span key={index}>{fee}<br /></span>
//           ))
//         ) : (
//           <span>{place.entryFee}</span>
//         )}

//         <p><strong>Note on Costs:</strong></p>
//         {Array.isArray(place.noteOnCosts) ? (
//           place.noteOnCosts.map((note, index) => (
//             <span key={index}>{note}<br /></span>
//           ))
//         ) : (
//           <span>{place.noteOnCosts}</span>
//         )}

//         <p><strong>Location:</strong> {place.location}</p>
//         <p><strong>Activities:</strong> {place.activities.join(", ")}</p>

//         {/* Map */}
//         <div className="map-container">
//           <h2>📍 Location Map</h2>
//           <iframe
//             title={place.name}
//             src={`https://www.google.com/maps?q=${encodeURIComponent(
//               place.location
//             )}&output=embed`}
//             width="100%"
//             height="300"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//           ></iframe>
//         </div>
//       </div>

//       {/* Hotels Nearby */}
//       <div className="hotels-section">
//         <h2>🏨 Hotels Near {place.name}</h2>
//         {nearbyHotels && nearbyHotels.length > 0 ? (
//           <div className="hotels-grid">
//             {nearbyHotels.map((hotel) => (
//               <div key={hotel.id} className="hotel-card">
//                 <img src={hotel.image} alt={hotel.name} />
//                 <h3>{hotel.name}</h3>
//                 <p>{hotel.location}</p>
//                 <p>
//                   <strong>Cost:</strong> ₹{hotel.cost.day}/day | ₹{hotel.cost.week}/week
//                 </p>
//                 <button
//                   onClick={() => handleBookClick(hotel)}
//                   className="book-btn"
//                 >
//                   Book Hotel
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="no-hotels">❌ No hotels nearby.</p>
//         )}
//       </div>

//       {/* Hospitals Nearby */}
//       <div className="hospitals-section">
//         <h2>🏥 Nearby Hospitals</h2>
//         <div className="hospital-grid">
//           {nearbyHospitals[place.name]?.length > 0 ? (
//             nearbyHospitals[place.name].map((hospital) => (
//               <div key={hospital.id} className="hospital-card">
//                 <img src={hospital.image} alt={hospital.name} />
//                 <h3>{hospital.name}</h3>
//                 <p>{hospital.location}</p>
//                 <p>Contact: {hospital.contact}</p>
//               </div>
//             ))
//           ) : (
//             <p>No nearby hospitals listed.</p>
//           )}
//         </div>
//       </div>

//       <Link to={place.backLink}>
//         <button className="back-btn">⬅ Back</button>
//       </Link>

//       {/* Booking Modal */}
//       {showBooking && selectedHotel && (
//         <div className="modal-overlay">
//           <div className="modal">
//             {!bookingConfirmed ? (
//               <>
//                 <h2>🛏 Book {selectedHotel.name}</h2>
//                 <form onSubmit={handleSubmit} className="booking-form">
//                   {/* All your fields stay same */}
//                   <label>
//                     Full Name:
//                     <input type="text" name="name" required onChange={handleChange} />
//                   </label>

//                   <label>
//                     Mobile Number:
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       pattern="[0-9]{10}"
//                       placeholder="10-digit number"
//                       onChange={handleChange}
//                     />
//                   </label>

//                   <label>
//                     Email ID:
//                     <input type="email" name="email" required onChange={handleChange} />
//                   </label>

//                   <label>
//                     Number of Guests:
//                     <input
//                       type="number"
//                       name="guests"
//                       min="1"
//                       value={formData.guests}
//                       onChange={handleChange}
//                     />
//                   </label>

//                   <label>
//                     Number of Days:
//                     <input
//                       type="number"
//                       name="days"
//                       min="1"
//                       value={formData.days}
//                       onChange={handleChange}
//                     />
//                   </label>

//                   <p><strong>Cost per Day:</strong> ₹{selectedHotel.cost.day}</p>
//                   <p><strong>Total Cost:</strong> ₹{totalCost}</p>
//                   <p><strong>Advance Payment (25%):</strong> ₹{advancePayment}</p>

//                   <label>
//                     Payment Method:
//                     <select
//                       name="payment"
//                       value={formData.payment}
//                       onChange={handleChange}
//                     >
//                       <option value="gpay">GPay / UPI</option>
//                       <option value="cash">Cash on Arrival</option>
//                     </select>
//                   </label>

//                   <button type="submit" className="confirm-btn">Confirm Booking</button>
//                   <button
//                     type="button"
//                     onClick={() => setShowBooking(false)}
//                     className="cancel-btn"
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </>
//             ) : (
//               <div className="confirmation">
//                 <h2>✅ Booking Confirmed!</h2>
//                 <p>Thank you, {formData.name}!</p>
//                 <p>Your booking for <strong>{selectedHotel.name}</strong> is confirmed.</p>
//                 <p>📩 Verification SMS sent to {formData.phone}</p>

//                 {formData.payment === "gpay" ? (
//                   <>
//                     <p>📱 Please scan to pay ₹{advancePayment} via GPay:</p>
//                     <img
//                       src="https://clickplus.co.in/assets/img/gpay.jpg"
//                       alt="GPay QR"
//                       className="gpay-img"
//                     />
//                   </>
//                 ) : (
//                   <p>💵 Pay ₹{advancePayment} on arrival.</p>
//                 )}

//                 <button
//                   onClick={() => {
//                     setShowBooking(false);
//                     setBookingConfirmed(false);
//                   }}
//                   className="close-btn"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PlaceDetails;



//socket 
// function PlaceDetails() {
//   const { id } = useParams();
//   const place = placeDetails[id];

//   const [showBooking, setShowBooking] = useState(false);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     guests: 1,
//     days: 1,
//     payment: "gpay",
//   });
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);

//   if (!place) return <h2>Place not found!</h2>;

//   const nearbyHotels = hotelsNearPlace[id];
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const totalCost =
//     selectedHotel && formData.days && formData.guests
//       ? selectedHotel.cost.day * formData.days * formData.guests
//       : 0;
//   const advancePayment = Math.floor(totalCost * 0.25);

//   const handleBookClick = (hotel) => {
//     if (!currentUser) return alert("⚠ Please log in first to make a booking!");
//     setSelectedHotel(hotel);
//     setShowBooking(true);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const bookingData = {
//       hotelName: selectedHotel.name,
//       placeName: place.name,
//       totalCost,
//       advancePayment,
//       guests: formData.guests,
//       days: formData.days,
//       date: new Date().toLocaleString(),
//       image: selectedHotel.image,
//       user: currentUser.email,
//     };

//     // Emit booking event to backend
//     socket.emit("new_booking", bookingData);

//     // Save locally
//     const key = `bookings_${currentUser.email}`;
//     const existingBookings = JSON.parse(localStorage.getItem(key)) || [];
//     existingBookings.push(bookingData);
//     localStorage.setItem(key, JSON.stringify(existingBookings));

//     setBookingConfirmed(true);

//     // Toast notification for current user
//     toast.success(`✅ Booking confirmed for ${selectedHotel.name}!`);
//   };
// useEffect(() => {
//   const handleLiveBooking = (data) => {
//     if (data.user !== currentUser.email) {
//       toast.info(`📢 ${data.user} booked ${data.hotelName} at ${data.placeName}`);
//     }
//   };

//   // Listen to the correct event name
//   socket.on("booking_update", handleLiveBooking);

//   return () => {
//     // Cleanup for the same event
//     socket.off("booking_update", handleLiveBooking);
//   };
// }, [currentUser.email]);

//   return (
//     <div className="details-container">
//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={4000} />

//       {/* Place Details */}
//       <div className="place-section">
//         <div className="image-slider">
//           {place.images.map((img, idx) => (
//             <img key={idx} src={img} alt={`${place.name}-${idx}`} className="details-image" />
//           ))}
//         </div>

//         <h1>{place.name}</h1>
//         <p><strong>About:</strong> {place.long}</p>
//         <p><strong>Timings:</strong> {place.timings}</p>
//         <p><strong>Entry Fee:</strong> {Array.isArray(place.entryFee) ? place.entryFee.join(", ") : place.entryFee}</p>
//         <p><strong>Location:</strong> {place.location}</p>
//         <p><strong>Activities:</strong> {place.activities.join(", ")}</p>

//         <div className="map-container">
//           <h2>📍 Location Map</h2>
//           <iframe
//             title={place.name}
//             src={`https://www.google.com/maps?q=${encodeURIComponent(place.location)}&output=embed`}
//             width="100%"
//             height="300"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//           />
//         </div>
//       </div>

//       {/* Hotels Nearby */}
//       <div className="hotels-section">
//         <h2>🏨 Hotels Near {place.name}</h2>
//         {nearbyHotels?.length > 0 ? (
//           <div className="hotels-grid">
//             {nearbyHotels.map((hotel) => (
//               <div key={hotel.id} className="hotel-card">
//                 <img src={hotel.image} alt={hotel.name} />
//                 <h3>{hotel.name}</h3>
//                 <p>{hotel.location}</p>
//                 <p><strong>Cost:</strong> ₹{hotel.cost.day}/day</p>
//                 <button onClick={() => handleBookClick(hotel)} className="book-btn">Book Hotel</button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="no-hotels">❌ No hotels nearby.</p>
//         )}
//       </div>
//   {/* Hospitals Nearby */}
//      <div className="hospitals-section">
//         <h2>🏥 Nearby Hospitals</h2>
//         <div className="hospital-grid">
//            {nearbyHospitals[place.name]?.length > 0 ? (
//             nearbyHospitals[place.name].map((hospital) => (
//               <div key={hospital.id} className="hospital-card">
//                 <img src={hospital.image} alt={hospital.name} />
//                 <h3>{hospital.name}</h3>
//                 <p>{hospital.location}</p>
//                 <p>Contact: {hospital.contact}</p>
//               </div>
//             ))
//           ) : (
//             <p>No nearby hospitals listed.</p>
//           )}
//         </div>
//       </div>

//       <Link to={place.backLink}>
//         <button className="back-btn">⬅ Back</button>
//       </Link>

//       {/* Booking Modal */}
//       {showBooking && selectedHotel && (
//         <div className="modal-overlay">
//           <div className="modal">
//             {!bookingConfirmed ? (
//               <form onSubmit={handleSubmit} className="booking-form">
//                 <h2>🛏 Book {selectedHotel.name}</h2>
//                 <label>Full Name: <input type="text" name="name" required onChange={handleChange} /></label>
//                 <label>Mobile Number: <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit number" onChange={handleChange} /></label>
//                 <label>Email ID: <input type="email" name="email" required onChange={handleChange} /></label>
//                 <label>Guests: <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} /></label>
//                 <label>Days: <input type="number" name="days" min="1" value={formData.days} onChange={handleChange} /></label>
//                 <p><strong>Total Cost:</strong> ₹{totalCost}</p>
//                 <p><strong>Advance Payment:</strong> ₹{advancePayment}</p>
//                 <label>Payment Method:
//                   <select name="payment" value={formData.payment} onChange={handleChange}>
//                     <option value="gpay">GPay / UPI</option>
//                     <option value="cash">Cash on Arrival</option>
//                   </select>
//                 </label>
//                 <button type="submit" className="confirm-btn">Confirm Booking</button>
//                 <button type="button" onClick={() => setShowBooking(false)} className="cancel-btn">Cancel</button>
//               </form>
//             ) : (
//               <div className="confirmation">
//                 <h2>✅ Booking Confirmed!</h2>
//                 <button onClick={() => { setShowBooking(false); setBookingConfirmed(false); }} className="close-btn">Close</button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PlaceDetails;




//new email.js

function PlaceDetails() {
 const { id } = useParams();
  const place = placeDetails[id];

  const [showBooking, setShowBooking] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: 1,
    days: 1,
    payment: "gpay",
  });

  if (!place) return <h2>Place not found!</h2>;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const nearbyHotels = hotelsNearPlace[id];

  const totalCost =
    selectedHotel && formData.days && formData.guests
      ? selectedHotel.cost.day * formData.days * formData.guests
      : 0;

  const advancePayment = Math.floor(totalCost * 0.25);

  // ------------ HANDLE BOOK CLICK ------------
  const handleBookClick = (hotel) => {
    if (!currentUser)
      return alert("⚠ Please log in first to make a booking!");

    setSelectedHotel(hotel);
    setShowBooking(true);
  };

  // ------------ FORM INPUT CHANGE ------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------------ SUBMIT BOOKING ------------
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const bookingData = {
  //     hotelName: selectedHotel.name,
  //     placeName: place.name,
  //     totalCost,
  //     advancePayment,
  //     guests: formData.guests,
  //     days: formData.days,
  //     date: new Date().toLocaleString(),
  //     image: selectedHotel.image,
  //     user: currentUser.email,
  //   };

  //   // 🔥 Send booking to backend
  //   socket.emit("new_booking", bookingData);

  //   // Save to localStorage
  //   const key = `bookings_${currentUser.email}`;
  //   const existing = JSON.parse(localStorage.getItem(key)) || [];
  //   existing.push(bookingData);
  //   localStorage.setItem(key, JSON.stringify(existing));

  //   setBookingConfirmed(true);

  //   toast.success(`✅ Booking confirmed for ${selectedHotel.name}!`);
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const bookingData = {
    name: formData.name,
    email: currentUser.email,
    hotelName: selectedHotel.name,
    hotelLocation: selectedHotel.location,
    guests: Number(formData.guests),
    days: Number(formData.days),
    price: selectedHotel.cost.day * formData.days,
  };

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    console.log("Booking Saved:", data);

    toast.success(`Booking confirmed for ${selectedHotel.name}!`);

    setBookingConfirmed(true);

  } catch (error) {
    console.error("Booking Error:", error);
    toast.error("Booking failed!");
  }
};

  // ------------ LISTEN FOR LIVE BOOKING (OTHERS) ------------
  useEffect(() => {
    if (!currentUser) return;

    const handleLiveBooking = (data) => {
      if (data.user !== currentUser.email) {
        toast.info(
          `📢 ${data.user} booked ${data.hotelName} at ${data.placeName}`
        );
      }
    };

    socket.on("booking_update", handleLiveBooking);

    return () => {
      socket.off("booking_update", handleLiveBooking);
    };
  }, [currentUser?.email]);

  return (
    <div className="details-container">

      <ToastContainer position="top-right" autoClose={4000} />

      {/* ----------- PLACE DETAILS ----------- */}
      <div className="place-section">
        <div className="image-slider">
          {place.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${place.name}-${idx}`} className="details-image" />
          ))}
        </div>

        <h1>{place.name}</h1>
        <p><strong>About:</strong> {place.long}</p>
        <p><strong>Timings:</strong> {place.timings}</p>
        <p><strong>Entry Fee:</strong> 
          {Array.isArray(place.entryFee) ? place.entryFee.join(", ") : place.entryFee}
        </p>
        <p><strong>Location:</strong> {place.location}</p>
        <p><strong>Activities:</strong> {place.activities.join(", ")}</p>

        <div className="map-container">
          <h2>📍 Location Map</h2>
          <iframe
            title={place.name}
            src={`https://www.google.com/maps?q=${encodeURIComponent(place.location)}&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>

      {/* ----------- HOTELS NEARBY ----------- */}
      <div className="hotels-section">
        <h2>🏨 Hotels Near {place.name}</h2>

        {nearbyHotels?.length > 0 ? (
          <div className="hotels-grid">
            {nearbyHotels.map((hotel) => (
              <div key={hotel.id} className="hotel-card">
                <img src={hotel.image} alt={hotel.name} />
                <h3>{hotel.name}</h3>
                <p>{hotel.location}</p>
                <p><strong>Cost:</strong> ₹{hotel.cost.day}/day</p>
                <button onClick={() => handleBookClick(hotel)} className="book-btn">
                  Book Hotel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No hotels nearby.</p>
        )}
      </div>

      {/* ----------- HOSPITALS NEARBY ----------- */}
      <div className="hospitals-section">
        <h2>🏥 Nearby Hospitals</h2>
        <div className="hospital-grid">
          {nearbyHospitals[place.name]?.length > 0 ? (
            nearbyHospitals[place.name].map((hospital) => (
              <div key={hospital.id} className="hospital-card">
                <img src={hospital.image} alt={hospital.name} />
                <h3>{hospital.name}</h3>
                <p>{hospital.location}</p>
                <p>Contact: {hospital.contact}</p>
              </div>
            ))
          ) : (
            <p>No nearby hospitals listed.</p>
          )}
        </div>
      </div>

      <Link to={place.backLink}>
        <button className="back-btn">⬅ Back</button>
      </Link>
 {/* ----------- BOOKING POPUP ----------- */}
      {showBooking && selectedHotel && (
        <div className="modal-overlay">
          <div className="modal">
            {!bookingConfirmed ? (
              <form onSubmit={handleSubmit} className="booking-form">
                <h2>🛏 Book {selectedHotel.name}</h2>

                <label>Full Name:
                  <input type="text" name="name" required onChange={handleChange} />
                </label>

                <label>Mobile Number:
                  <input type="tel" name="phone" required pattern="[0-9]{10}" onChange={handleChange} />
                </label>

                <label>Email ID:
                  <input type="email" name="email" required onChange={handleChange} />
                </label>

                <label>Guests:
                  <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} />
                </label>

                <label>Days:
                  <input type="number" name="days" min="1" value={formData.days} onChange={handleChange} />
                </label>

                <p><strong>Total Cost:</strong> ₹{totalCost}</p>
                <p><strong>Advance Payment:</strong> ₹{advancePayment}</p>

                <label>Payment Method:
                  <select name="payment" value={formData.payment} onChange={handleChange}>
                    <option value="gpay">GPay / UPI</option>
                    <option value="cash">Cash on Arrival</option>
                  </select>
                </label>

                <button type="submit" className="confirm-btn">Confirm Booking</button>
                <button type="button" onClick={() => setShowBooking(false)} className="cancel-btn">
                  Cancel
                </button>
              </form>
            ) : (
              <div className="confirmation">
                <h2>✅ Booking Confirmed!</h2>
                <button
                  onClick={() => {
                    setShowBooking(false);
                    setBookingConfirmed(false);
                  }}
                  className="close-btn"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default PlaceDetails;