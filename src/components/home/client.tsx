import React from 'react';

const clients = [
  {
    name: 'Allen Career Institute',
    logo: '/images/clients/allen.png',
  },
  {
    name: 'Chanakya IAS Academy',
    logo: '/images/clients/chanakya.png',
  },
  {
    name: 'Motion Education',
    logo: '/images/clients/motion.png',
  },
  {
    name: 'Drishti IAS',
    logo: '/images/clients/drishti.png',
  },
  {
    name: 'Vajirao IAS Academy',
    logo: '/images/clients/vajirao.png',
  },
  {
    name: 'Resonance',
    logo: '/images/clients/resonance.png',
  },
];

const ClientSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 relative inline-block">
            Our Esteemed Clients
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-blue-600"></span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            One98 Edusolutions takes pride in partnering with some of the most prestigious and successful coaching institutes in India. 
            Our commitment to delivering excellence and innovation is reflected in the trust and satisfaction of our esteemed clients.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <div key={index} className="text-center">
              <div className="p-6 h-full flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white rounded-lg h-[150px]">
                <div className="w-full h-20 max-w-[180px] mx-auto flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-logo.png';
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  {client.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSection;