<Fragment>
<div className="bg-white">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">

    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 bg-white text-lg font-semibold uppercase text-gray-600">Development Tools and Languages</span>
      </div>
    </div>

    {/* <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
      Development Tools and Languages
    </p> */}
    <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
      <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
        <img
          className="max-h-12"
          src={ReactLogo}
          alt="React"
        />
        <div className="pl-2 pt-2 text-3xl font-bold text-gray-400">React</div>
      </div>
      <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
        <img className="max-h-12" src={HTML5Logo} alt="HTML" />
        <div className="pl-2 pt-2 text-3xl font-bold text-gray-400">HTML</div>
      </div>
      <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
        <img className="max-h-12" src={CSS3Logo} alt="CSS" />
        <div className="pl-2 pt-2 text-3xl font-bold text-gray-400">CSS</div>
      </div>
      <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
        <img className="max-h-12" src={JSLogo} alt="JavaScript" />
        <div className="pl-2 pt-2 text-3xl font-bold text-gray-400">JS</div>
      </div>
      <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
        <img
          className="max-h-12"
          src={NodeLogo}
          alt="Node"
        />
        <div className="pl-2 pt-2 text-3xl font-bold text-gray-400">Node.js</div>
      </div>
      <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
        <img
          className="max-h-8 mt-2"
          src={TailwindLogo}
          alt="Tailwind"
        />
        <div className="pl-2 pt-2 text-3xl font-bold text-gray-400">Tailwind</div>
      </div>
    </div>
  </div>
</div>
</Fragment>
)