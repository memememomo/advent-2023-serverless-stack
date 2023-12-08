import { APIGatewayProxyEvent } from "aws-lambda";
import handler from "@click-count/core/handler";
import { updateCount, getOrUpdateCount } from "@click-count/core/dynamodb";

export const main = handler(async (event) => {
    let data;

    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const currentCount = await getOrUpdateCount();
    const newCount = currentCount + 1;
    await updateCount(newCount);

    return JSON.stringify({ count: newCount });
});
