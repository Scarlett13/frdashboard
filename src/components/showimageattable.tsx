import Image from 'next/image';
import React from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

interface ShowImageTableProps {
  path: string;
}

export default function ShowImageTable({ path }: ShowImageTableProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Image
        src={path}
        alt='alt'
        width={150}
        height={150}
        className='rounded-full'
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: path }]}
      />
    </button>
  );
}
