'use client';

import { useEffect, useRef, useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { tags } from '../../constants/tags';

const TagsMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const handleMenuToggle = () => setMenuIsOpen(!menuIsOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={css.menuContainer}>
      <button onClick={handleMenuToggle} className={css.menuButton}>
        Notes ▾
      </button>
      {menuIsOpen && (
        <ul className={css.menuList}>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
