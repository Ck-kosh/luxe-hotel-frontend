import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert(
      "Your message has been submitted successfully!"
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-teal-700 mb-3">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-8">
          Have questions or need assistance?
          Reach out to our hotel team.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-2xl font-semibold mb-6">
              Hotel Information
            </h2>

            <div className="space-y-4">

              <div>
                <h3 className="font-semibold">
                  Address
                </h3>

                <p className="text-gray-600">
                  Ngong Lane Plaza,
                  Nairobi, Kenya
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +254 700 020 000
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Email
                </h3>

                <p className="text-gray-600">
                  luxehotel@gmail.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  24 Hours / 7 Days
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-2xl font-semibold mb-6">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                w-full
                border
                rounded-lg
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                "
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                w-full
                border
                rounded-lg
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                "
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="
                w-full
                border
                rounded-lg
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                "
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="
                w-full
                border
                rounded-lg
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                "
              />

              <button
                type="submit"
                className="
                w-full
                bg-teal-700
                text-white
                py-3
                rounded-lg
                hover:bg-teal-800
                transition
                "
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;