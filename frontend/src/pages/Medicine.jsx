import React, { useContext } from "react";
import img from "../assets/images/example.jpg";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
const Medicine = () => {
  const { user, role, token } = useContext(authContext);
  const addToCart = async (m) => {
    try {
      const response = await fetch(`${BASE_URL}/users/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productName: m.name, // Include the product name
          quantity: 1, // Assuming quantity is 1 for now, you can modify this if needed
          price: m.price,
          productphoto: m.photo,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        if (response.status == 200) {
          toast.success("Added to your cart", {
            autoClose: 600, // Toast duration in milliseconds
            position: "bottom-center",
            closeOnClick: true,
          });
        } else {
          toast.success("Item already exists in the cart", {
            autoClose: 600, // Toast duration in milliseconds
            position: "bottom-center",
          });
        }
        // Item added to cart successfully
      } else {
        // Handle error
        toast.error("Failed to add item to cart", {
          autoClose: 600, // Toast duration in milliseconds
          position: "bottom-center",
        });
        console.log(result);
      }
    } catch (error) {
      toast.error("Error adding item to cart:", error, {
        autoClose: 600, // Toast duration in milliseconds
        position: "bottom-center",
      });
    }
  };
  const navigate = useNavigate();
  const handleCart = (m) => {
    if (!user || !token) {
      navigate("/login");
    } else {
      addToCart(m);
    }
  };
  // Medicine data
  const medicines = [
    {
      id: 1,
      photo:
        "https://wellonapharma.com/admincms/product_img/product_resize_img/paracetamol-tablets_1618901822.jpg",
      name: "Paracetamol",
      price: 550,
      description:
        "Paracetamol, also known as acetaminophen, is a widely used over-the-counter pain reliever and fever reducer. It is typically used for mild to moderate pain relief, such as headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers. It is considered safe when used as directed, but it is important to avoid exceeding the recommended dose to prevent liver damage.",
    },
    {
      id: 2,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLP0wCySZkc86cyoW-6EbJPNd5y_qOmFow2A&s",
      name: "Ibuprofen",
      price: 400,
      description:
        "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) commonly used for relieving pain, reducing inflammation, and lowering fever. It is effective for conditions such as arthritis, menstrual pain, migraines, and various types of aches and pains. Ibuprofen works by blocking the production of prostaglandins, substances in the body that cause inflammation and pain.",
    },
    {
      id: 3,
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2023/7/330506870/UM/GZ/QO/135658020/aspirin-dispersible-tablets.jpg",
      name: "Aspirin",
      price: 500,
      description:
        "Aspirin, also known as acetylsalicylic acid (ASA), is a medication used to treat pain, fever, and inflammation. It is also used for preventing blood clots and reducing the risk of heart attacks and strokes in people at high risk. Aspirin works by inhibiting the production of certain natural substances that cause pain, fever, and inflammation. It is important to use aspirin as directed and be aware of potential side effects such as stomach irritation and bleeding.",
    },
    {
      id: 4,
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2022/7/TD/QU/VE/89635395/loratadine-tablet-500x500.jpg",
      name: "Loratadine",
      price: 400,
      description:
        "Loratadine is an antihistamine medication used to treat allergies such as hay fever, allergic rhinitis, and hives. It works by blocking the action of histamine in the body, thereby reducing symptoms such as sneezing, itching, watery eyes, and runny nose. Loratadine is known for being non-drowsy, making it a popular choice for daytime allergy relief. It is available over-the-counter and should be used as directed.",
    },
    {
      id: 5,
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2021/6/IO/OJ/PR/15699494/amoxicillin-500mg-capsule.jpg",
      name: "Amoxicillin",
      price: 650,
      description:
        "Amoxicillin is an antibiotic used to treat a wide variety of bacterial infections, including respiratory tract infections, urinary tract infections, skin infections, and infections of the ear, nose, and throat. It works by stopping the growth of bacteria. Amoxicillin is generally well-tolerated, but it is important to complete the full course of treatment to ensure the infection is fully eradicated and to prevent antibiotic resistance.",
    },
    {
      id: 6,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguTZiYwBIHpzVUSX1e7aDyxmAikrPPQ6DSw&s",
      name: "Cetirizine",
      price: 450,
      description:
        "Cetirizine is an antihistamine that reduces the natural chemical histamine in the body. It is used to treat cold or allergy symptoms such as sneezing, itching, watery eyes, or runny nose. Cetirizine is effective for seasonal allergies (hay fever) as well as chronic urticaria (hives). It is usually taken once daily and is known for causing less drowsiness compared to older antihistamines.",
    },
    {
      id: 7,
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2021/3/IL/GQ/RN/31683360/vitcipcin-500.jpeg",
      name: "Ciprofloxacin",
      price: 700,
      description:
        "Ciprofloxacin is an antibiotic that is used to treat a variety of bacterial infections, including urinary tract infections, respiratory infections, skin infections, and gastrointestinal infections. It works by stopping the growth of bacteria. Ciprofloxacin is part of a class of drugs known as fluoroquinolones and is typically used for more serious infections. Patients should be aware of potential side effects and follow dosing instructions carefully.",
    },
    {
      id: 8,
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2022/10/RC/RO/YT/5875610/metformin-hydrochloride-500-mg-tablet-500x500.jpg",
      name: "Metformin",
      price: 300,
      description:
        "Metformin is an oral diabetes medicine that helps control blood sugar levels. It is used together with diet and exercise to improve blood sugar control in adults with type 2 diabetes mellitus. Metformin works by reducing the amount of sugar your liver releases into your blood and improving your body's response to insulin. It is often the first medication prescribed for type 2 diabetes and can help prevent the complications associated with high blood sugar.",
    },
    {
      id: 9,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_2MQkc09ZqWkrj6B8bvOWBmZuZ6qpgLvig&s",
      name: "Omeprazole",
      price: 200,
      description:
        "Omeprazole is used to treat certain stomach and esophagus problems, such as acid reflux and ulcers. It works by decreasing the amount of acid your stomach makes. Omeprazole belongs to a class of drugs known as proton pump inhibitors (PPIs). It is effective in providing relief from symptoms like heartburn, difficulty swallowing, and persistent cough. Long-term use should be monitored by a healthcare provider due to potential side effects.",
    },
    {
      id: 10,
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2024/3/397131863/ZG/WB/JJ/209823746/prednisone-20-mg-tablet.png",
      name: "Prednisone",
      price: 600,
      description:
        "Prednisone is a corticosteroid that prevents the release of substances in the body that cause inflammation. It is used to treat a wide variety of conditions, such as allergic disorders, skin conditions, ulcerative colitis, arthritis, lupus, psoriasis, and breathing disorders. Prednisone is effective for reducing inflammation and suppressing the immune system. It is important to follow dosing instructions and taper off the medication under medical supervision to avoid withdrawal symptoms.",
    },
    {
      id: 11,
      photo:
        "https://5.imimg.com/data5/SELLER/Default/2024/3/397131863/ZG/WB/JJ/209823746/prednisone-20-mg-tablet.png",
      name: "Atorvastatin",
      price: 550,
      description:
        "Atorvastatin is used along with a proper diet to help lower 'bad' cholesterol and fats (such as LDL, triglycerides) and raise 'good' cholesterol (HDL) in the blood. It belongs to a group of drugs known as statins. By reducing cholesterol levels, atorvastatin helps prevent heart disease and stroke. It works by blocking an enzyme needed by the body to make cholesterol. Regular monitoring of cholesterol levels and liver function is recommended while on this medication.",
    },
    {
      id: 12,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhOBjwibEKK0iilVAdmQdxmAl-BSO_HXU9Ug&s",
      name: "Gabapentin",
      price: 800,
      description:
        "Gabapentin is used with other medications to prevent and control seizures. It is also used to relieve nerve pain following shingles (a painful rash due to herpes zoster infection) in adults. Gabapentin works by affecting the transmission of nerve signals in the brain. It is important to follow the prescribed dosing schedule and not abruptly discontinue the medication to avoid withdrawal symptoms and potential seizure recurrence.",
    },
  ];

  return (
    <div className="container">
      <h2 className="heading text-center">Order Medicine Now:</h2>
      <div>
        <div className="grid grid-col-1 bg-white">
          {medicines.map((item) => (
            <div
              key={item.id}
              className="lg:grid lg:grid-cols-4 p-6  justify-between gap-2"
            >
              <div className=" flex-shrink-0 object-cover p-2 mx-auto ">
                <img
                  src={item.photo}
                  className="h-48 w-38 rounded-xl object-cover "
                />
              </div>
              <div className="mt-3 lg:grid-cols-subgrid lg:col-span-3 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className=" font-serif text-2xl font-medium">
                    {item.name}
                  </span>
                  <span className=" font-normal ">
                    <p className="">
                      <u>Description</u>: {item.description}
                    </p>
                  </span>
                </div>
                <div className="flex">
                  <p className="font-bold">Price: </p>
                  <p className=" text-green-500 font-bold">₹ {item.price}</p>
                </div>
                <div className="flex justify-end ">
                  <button
                    className=" rounded-2xl bg-blue-600 p-2 text-white hover:text-cyan-300 font-serif hover:bg-blue-900 transition duration-300"
                    onClick={() =>handleCart(item)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medicine;
