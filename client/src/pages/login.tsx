import { useFirebaseAuth } from '../contexts/firebase-app-context';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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
  const auth = useFirebaseAuth();
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
                <button
                  className="border-2 border-black p-1 rounded-lg hover:scale-105 duration-300"
                  onClick={() => {
                    auth.
                  }}
                >
                  Sign with Google
                </button>
              </div>
            </section>
          </div>
          {/* Right Side */}
          <div className="w-1/2">
            <ImageMarquee
              imageSrcs={['/login/0.jpeg', '/login/1.jpeg', '/login/2.jpeg']}
            ></ImageMarquee>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
