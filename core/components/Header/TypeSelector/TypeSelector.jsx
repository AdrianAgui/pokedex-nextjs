import DropdownArrow from '../../Icons/DropdownArrow';
import Image from 'next/image';
import { useState, useRef, memo } from 'react';
import capitalize from 'core/utils/capitalize';
import useOutsideClick from 'core/hooks/useOutsideClick';
import { pokeTypes } from './pokeTypes';
import { useGlobalContext } from 'core/context/GlobalContext';

function TypeSelector() {
  const { setPokeType } = useGlobalContext();

  const [selectedType, setSelectedType] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setOpenDropdown(false));

  const onSelectItem = (value) => {
    setSelectedType(value);
    setPokeType(value);
    setOpenDropdown(false);
  };

  return (
    <div ref={wrapperRef} className='ml-5'>
      <div className='relative inline-block text-left'>
        <div>
          <button
            type='button'
            onClick={() => setOpenDropdown(!openDropdown)}
            className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
          >
            {selectedType ? (
              <div className='flex items-center'>
                <Image src={`/poketypes/${selectedType}.png`} alt={selectedType} width={24} height={24} layout='fixed'></Image>
                <span className='ml-2'>{capitalize(selectedType)}</span>
              </div>
            ) : (
              'Select a type...'
            )}
            <DropdownArrow />
          </button>
        </div>

        {openDropdown && (
          <div className='origin-top-right absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
            <div className='inline-grid gap-2 grid-cols-4 p-4'>
              {pokeTypes.map(({ key, image }) => (
                <div key={key} className='hover:bg-gray-300 cursor-pointer p-1 w-12 h-12 rounded-3xl' onClick={() => onSelectItem(key)}>
                  <Image src={image} alt={key} width={40} height={40} layout='fixed' title={capitalize(key)}></Image>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(TypeSelector);