import { Api, Bucket, NextjsSite, StackContext, Table } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
    // DynamoDBテーブルを作成
    const table = new Table(stack, "counter", {
        fields: {
            counter: "string",
        },
        primaryIndex: {partitionKey: "counter"}, // パーティションキーを設定
    });

    // API GatewayエンドポイントとLambdaを作成
    const api = new Api(stack, "api", {
        // 全Lambda関数の共通設定
        defaults: {
            function: {
                bind: [table], // DynamoDBテーブルをバインド
                runtime: "nodejs20.x"
            },
        },
        // APIエンドポイントの設定
        routes: {
            "GET /count": "packages/functions/src/get.main",
            "POST /count": "packages/functions/src/put.main",
        },
    });

    const siteBucket = new Bucket(stack, "public");

    // Next.jsのデプロイ設定
    const site = new NextjsSite(stack, "NextSite", {
        bind: [siteBucket, api],
        path: "packages/frontend",
        environment: {
            NEXT_PUBLIC_API_ENDPOINT: api.url,
        },
    });

    // 値の出力
    stack.addOutputs({
        SiteUrl: site.url,
        ApiEndpoint: api.url,
    });

    return {
        table,
    }
}