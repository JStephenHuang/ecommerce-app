const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-[#111111] h-3/4 w-1/2 m-auto rounded-[25px] shadow-lg">
        <div className="bg-[#ffffff] flex h-full w-1/2 rounded-[25px]">
          <div className="m-auto w-1/2">
            <div>
              <p className="text-[32px] text-[#111111]">Welcome back</p>
              <p className="text-[16px] text-[#111111]">
                Please enter your details.
              </p>
            </div>

            <br />
            <br />
            <div>
              <p className="text-[16px] text-[#111111]">Email</p>
              <input
                type="email"
                className="w-full h-10 border-2 border-[#dcdcdc] rounded-lg p-2"
              />
            </div>
            <br />
            <div>
              <p className="text-[16px] text-[#111111]">Password</p>
              <input
                type="password"
                className="w-full h-10 border-2 border-[#dcdcdc] rounded-lg p-2"
              />
            </div>
            <br />
            <br />
            <div>
              <button className="bg-[#111111] text-[#ffffff] w-full h-10 rounded-lg">
                Sign in
              </button>
            </div>
            <br />
            {/* https://stackoverflow.com/questions/70203473/creating-a-horizontal-rule-hr-divider-that-contains-text-with-tailwind-css START */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-[#111111]"></div>
              <span className="flex-shrink mx-2 text-[#111111]">or</span>
              <div className="flex-grow border-t border-[#111111]"></div>
            </div>
            {/* END */}
            <br />
            <div>
              <button className="bg-[#ffffff] text-[#111111] border-2 border-[#dcdcdc] w-full h-10 rounded-lg">
                <div className="flex">
                  <img
                    className="h-6 w-6 ml-9"
                    src="google_login_logo.png"
                  ></img>
                  <span className="ml-6">Sign in with Google</span>
                </div>
              </button>
            </div>
            <br />
            <div>
              <button className="bg-[#ffffff] text-[#111111] border-2 border-[#dcdcdc] w-full h-10 rounded-lg">
                <div className="grid grid-cols-12 m-2">
                  <div className="col-span-2">
                    <img className="m-auto" src="facebook_login_logo.png"></img>
                  </div>
                  <div className="col-span-10">
                    <span>Sign in with Facebook</span>
                  </div>
                </div>
              </button>
            </div>
            <br />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
