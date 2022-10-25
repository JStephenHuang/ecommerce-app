interface MarqueeProperties {
  imageSrcs: string[];
}

const ImageMarquee = ({ imageSrcs }: MarqueeProperties) => {
  return (
    <div className="flex w-full h-full relative pb-[150%] overflow-hidden">
      {imageSrcs.map((value, index) => (
        <img
          key={index}
          className="absolute w-full h-full object-cover animate-marquee"
          src={value}
          style={{ animationDelay: `${index * 8}s` }}
        />
      ))}
    </div>
  );
};

const LoginPage = () => {
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center">
        {/* Login Container */}
        <div className="bg-white flex overflow-hidden rounded-2xl shadow-lg">
          {/* Left Side */}
          <div className="w-1/2">
            <section className="h-full flex items-center justify-center">
              {/* Email & Password Input */}
              <div className="flex flex-col gap-4 m-64">
                <input
                  type="email"
                  className="p-1 rounded-lg border"
                  placeholder="Email"
                />
                <input
                  type="password"
                  className="p-1 rounded-lg border"
                  placeholder="Password"
                />

                <button className="border-2 border-black bg-black rounded-lg text-white py-1 hover:scale-105 duration-300">
                  Login
                </button>

                <div className="grid grid-cols-3 items-center text-gray-400">
                  <hr className="border-gray-400" />
                  <p className="text-center text-sm">or</p>
                  <hr className="border-gray-400" />
                </div>

                <button className="border-2 border-black p-1 rounded-lg hover:scale-105 duration-300">
                  Sign with Google
                </button>

                <button className="border-2 border-black p-1 rounded-lg hover:scale-105 duration-300">
                  Sign with Google
                </button>
              </div>
            </section>
          </div>
          {/* Right Side */}
          <div className="w-1/2">
            <ImageMarquee
              imageSrcs={["/login/0.jpeg", "/login/1.jpeg", "/login/2.jpeg"]}
            ></ImageMarquee>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
