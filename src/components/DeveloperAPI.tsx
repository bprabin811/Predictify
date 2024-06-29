import React from 'react';
import { DialogContent } from './ui/dialog';

const APIIntegrationDialog = () => {
  return (
    <DialogContent className="max-w-[80vw] h-[90vh] overflow-auto">
      <div className="p-8 w-full">
        <h2 className="text-2xl font-semibold mb-4">API Integration</h2>
        <p className="mb-4 font-normal">
          You can integrate our models into your products using the following API endpoints. Below
          are some examples to get you started.
        </p>

        <h3 className="text-xl font-semibold mb-2">Authentication</h3>
        <p className="mb-4 font-normal">
          To use our API, you need to authenticate using an API key. You can obtain your API key
          from your account settings.
        </p>
        <pre className="bg-[#FBFAFB] dark:bg-[#252524] border-[#8fda8f] p-4 rounded-md mb-4 font-normal">
          <code>
            {`curl -X POST https://api.example.com/auth \\
-H "Content-Type: application/json" \\
-d '{
  "apiKey": "your_api_key_here"
}'`}
          </code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Model Prediction</h3>
        <p className="mb-4 font-normal">
          To get predictions from the model, send a POST request to the /predict endpoint with the
          required parameters.
        </p>
        <pre className="bg-[#FBFAFB] dark:bg-[#252524] border-[#e8e9e8] p-4 rounded-md mb-4">
          <code>
            {`curl -X POST https://api.example.com/predict \\
-H "Authorization: Bearer your_api_key_here" \\
-H "Content-Type: application/json" \\
-d '{
  "modelId": "model_123",
  "input": {
    "data": "your_input_data_here"
  }
}'`}
          </code>
        </pre>

        <h3 className="text-xl font-semibold mb-2">Example Response</h3>
        <p className="mb-4 font-normal">
          The response will contain the prediction results from the model.
        </p>
        <pre className="bg-[#FBFAFB] dark:bg-[#252524] border-[#e8e9e8] p-4 rounded-md mb-4">
          <code>
            {`{
"status": "success",
"prediction": {
  "result": "your_prediction_result_here",
  "confidence": 0.95
}
}`}
          </code>
        </pre>
      </div>
    </DialogContent>
  );
};

export default APIIntegrationDialog;
