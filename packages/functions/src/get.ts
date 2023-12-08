import handler from "@click-count/core/handler";
import { getOrUpdateCount } from "@click-count/core/dynamodb";

export const main = handler(async (event) => {
    const count = await getOrUpdateCount();
    return JSON.stringify({count});
});