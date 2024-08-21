import articleImg1 from "../assets/images/anxiety_disorders.webp";
import articleImg2 from "../assets/images/stress.webp";
const MentalHealthPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-headingColor mb-4 text-center">
        Mental Health Resources
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Welcome to our mental health resources page. Here, you&apos;ll find
        helpful information, articles, and tools to support your mental
        well-being.
      </p>

      <section className="">
        <h2 className="text-2xl font-semibold text-headingColor mb-4">
          Articles
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li>
            <a
              className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out "
              href="https://www.example.com/article1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={articleImg1}
                alt="Anxiety_disorder"
                className="w-full h-50 object-cover rounded-md mb-4"
              />
              <span className="text-lg font-semibold">
                Understanding Anxiety Disorders
              </span>
            </a>
          </li>
          <li>
            <a
              className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              href="https://www.example.com/article2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={articleImg2}
                alt="Article 2"
                className="w-full h-50 object-cover rounded-md mb-4"
              />
              <span className="text-lg font-semibold">
                Managing Stress in Daily Life
              </span>
            </a>
          </li>
          {/* Add more articles */}
        </ul>
      </section>

      <section className="">
        <h2 className="text-2xl font-semibold text-headingColor mb-4">
          Self-Assessment Tools
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li>
            <a
              className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              href="https://www.example.com/assessment3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg font-semibold">Anxiety Test</span>
            </a>
          </li>
          <li>
            <a
              className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              href="https://www.example.com/assessment4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg font-semibold">Stress Assessment</span>
            </a>
          </li>
          <li>
            <a
              className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              href="https://www.example.com/assessment5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg font-semibold">
                Depression Inventory
              </span>
            </a>
          </li>
          <li>
            <a
              className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              href="https://www.example.com/assessment6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg font-semibold">PTSD Screening</span>
            </a>
          </li>
          {/* Add more assessment tools */}
        </ul>
      </section>

      <section className="">
        <h2 className="text-2xl font-semibold text-headingColor mb-4">
          Recommended Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <img
              src="/book1.webp"
              alt="Book 1"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-lg font-semibold mb-2">Book Title 1</p>
            <p className="text-gray-700">Author Name</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <img
              src="/book2.webp"
              alt="Book 2"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-lg font-semibold mb-2">Book Title 2</p>
            <p className="text-gray-700">Author Name</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <img
              src="/book3.webp"
              alt="Book 3"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-lg font-semibold mb-2">Book Title 3</p>
            <p className="text-gray-700">Author Name</p>
          </div>
          {/* Add more books */}
        </div>
      </section>

      <section className="">
        <h2 className="text-2xl font-semibold text-headingColor mb-4">
          Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/y6hk7er4fto?si=MWKnlo1PYaN7Z-rw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="w-full h-64"
            ></iframe>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/tsmPCi7NKrg?si=WurU_TBEK-LOrdZV"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="w-full h-64"
            ></iframe>
          </div>
          {/* Add more videos */}
        </div>
      </section>
    </div>
  );
};

export default MentalHealthPage;
