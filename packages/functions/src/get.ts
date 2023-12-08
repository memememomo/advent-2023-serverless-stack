import handler from "@click-count/core/handler"; // "@click-count/core/handler"からhandlerをインポートします
import { getOrUpdateCount } from "@click-count/core/dynamodb"; // "@click-count/core/dynamodb"からgetOrUpdateCountをインポートします

export const main = handler(async (event) => { // 非同期関数としてhandlerを使用してmainをエクスポートします
    const count = await getOrUpdateCount(); // getOrUpdateCountを非同期で実行し、結果をcountに格納します
    return JSON.stringify({count}); // countをJSON形式に変換して返します
});
