const AWS = require('aws-sdk');
const https = require('https');
const { Client } = require("@notionhq/client");
const s3 = new AWS.S3();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.handler = async (event) => {
    const { downloadUrl, pageId } = JSON.parse(event.body);
    const pdfData = await downloadPdf(downloadUrl);
    const s3Url = await uploadPdfToS3(pdfData, "your-pdf-name.pdf");

    await addPdfLinkToNotion(pageId, s3Url);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "PDF processed and linked in Notion successfully." }),
    };
};

async function downloadPdf(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            const data = [];
            response.on('data', (chunk) => data.push(chunk));
            response.on('end', () => resolve(Buffer.concat(data)));
            response.on('error', reject);
        });
    });
}

async function uploadPdfToS3(pdfData, fileName) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: pdfData,
        ContentType: 'application/pdf',
    };
    const { Location } = await s3.upload(params).promise();
    return Location;
}

async function addPdfLinkToNotion(pageId, pdfUrl) {
    await notion.pages.update({
        page_id: pageId,
        children: [{
            object: 'block',
            type: 'bookmark',
            bookmark: {
                url: pdfUrl,
            },
        }],
    });
}
