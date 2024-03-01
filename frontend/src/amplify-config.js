import { Amplify } from 'aws-amplify';

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "MyAPIGatewayAPI",
                endpoint: "https://your-api-id.execute-api.region.amazonaws.com/prod",
                region: "us-west-1"
            },
        ]
    }
});
