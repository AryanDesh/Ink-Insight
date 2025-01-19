import React from 'react';

const Topbar : React.FC = () => {
  return (
    <div className='pt-10 px-6 z-50 flex items-center justify-between '>
      <div className="text-primary-black text-xl font-extrabold">  
        INK & INSIGHT
      </div>
      <div className='flex items-start justify-between gap-4'>
        <button className='text-primary-black font-semibold'>Indulge</button>
        <button className='text-primary-black font-semibold'>Profile</button>
      </div>
    </div>
  );
};

export default Topbar;