import handler from "@click-count/core/handler"; // "@click-count/core/handler"からhandlerをインポートします
import { updateCount, getOrUpdateCount } from "@click-count/core/dynamodb"; // "@click-count/core/dynamodb"からupdateCountとgetOrUpdateCountをインポートします

export const main = handler(async (event) => { // 非同期のhandler関数をmainとしてエクスポートします
    let data; // dataを定義します

    if (event.body != null) { // イベントのbodyがnullでない場合
        data = JSON.parse(event.body); // bodyをJSON形式にパースします
    }

    const currentCount = await getOrUpdateCount(); // getOrUpdateCountから現在のカウントを取得します
    const newCount = currentCount + 1; // 現在のカウントに1を加えて新しいカウントを作成します
    await updateCount(newCount); // 新しいカウントをupdateCountに送ります

    return JSON.stringify({ count: newCount }); // 新しいカウントをJSON形式に変換して返します
});
