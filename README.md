## AWS Lambda Function for Uploading PDF to Notion via S3

This AWS Lambda function automates the process of downloading a PDF from a provided URL, uploading it to an AWS S3 bucket, and then creating a link to this PDF in a specified Notion page. This documentation covers the setup, deployment, and usage of the function.

### Prerequisites all this was created in infra code

- AWS account with access to Lambda, API Gateway, and S3 services.
- Notion account with integration created for API access.
- An S3 bucket for storing PDF files.
- The target Notion page ID where the PDF link will be added.
- Download this install node packages with npm i , zip it and paste the link in lambda function pulumi

### Function Flow

1. **Receives an Event**: Triggered by an HTTP POST request via API Gateway.
2. **Downloads the PDF**: Fetches the PDF from the provided `downloadUrl`.
3. **Uploads PDF to S3**: Stores the PDF in the specified S3 bucket and retrieves the public URL.
4. **Links PDF in Notion**: Adds a bookmark to the Notion page linking to the PDF stored in S3.

### Troubleshooting

- Ensure the Lambda function has appropriate permissions to access S3 and Notion's API.
- Verify that the Notion API key and page ID are correct.
- Check the AWS Lambda and CloudWatch logs for error messages if the function fails.

---

Adapt this template to match the specifics of your project, including any additional setup steps or configurations. Providing clear, detailed instructions ensures others can successfully deploy and benefit from your Lambda function.