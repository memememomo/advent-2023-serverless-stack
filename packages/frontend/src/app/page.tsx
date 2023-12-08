'use client'; // クライアントを使用します

import { useEffect, useState } from 'react'; // reactからuseEffectとuseStateをインポートします
import styles from './Page.module.css'; // スタイルをインポートします
import { getCount, updateCount } from './api'; // apiからgetCountとupdateCountをインポートします

export default function Page() { // Page関数をエクスポートします
  const [count, setCount] = useState(0); // countとsetCountのstateを設定します
  const [isLoading, setIsLoading] = useState(false); // isLoadingとsetIsLoadingのstateを設定します

  useEffect(() => { // useEffectを使用します
    const fetchData = async () => { // fetchData関数を非同期で定義します
      setIsLoading(true); // データ取得中にisLoadingをtrueに設定します
      const data = await getCount(); // getCountからデータを取得します
      setCount(data.count); // 取得したデータをsetCountで設定します
      setIsLoading(false); // データ取得が完了したらisLoadingをfalseに設定します
    };
    fetchData(); // fetchData関数を呼び出します
  }, []);

  const onClick = async () => { // onClick関数を非同期で定義します
    setIsLoading(true); // データ更新中にisLoadingをtrueに設定します
    const data = await updateCount(); // updateCountからデータを取得します
    setCount(data.count); // 取得したデータをsetCountで設定します
    setIsLoading(false); // データ更新が完了したらisLoadingをfalseに設定します
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

