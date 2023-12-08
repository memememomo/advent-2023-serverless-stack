'use client';

import { useEffect, useState } from 'react';
import styles from './Page.module.css';
import { getCount, updateCount } from './api';

export default function Page() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getCount();
      setCount(data.count);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onClick = async () => {
    setIsLoading(true);
    const data = await updateCount();
    setCount(data.count);
    setIsLoading(false);
  };

  return (
    <div className={styles.App}>
      <>
        {count > 0 && <p className={styles.paragraph}>You clicked me {count} times.</p>}
        <button className={styles.button} onClick={onClick} disabled={isLoading}>Click Me!</button>
      </>
    </div>
  );
}

