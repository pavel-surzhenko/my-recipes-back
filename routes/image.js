const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});
const BUCKET = process.env.BUCKET;

router.post('/', async (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).json({ error: 'Bad request' });
    }

    const key = `${uuidv4()}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
    });

    try {
        await s3.send(command);

        return res
            .status(201)
            .json({ link: `https://${BUCKET}.s3.eu-north-1.amazonaws.com/${key}` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const command = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: id,
    });

    try {
        await s3.send(command);
        return res.status(204).json({ message: 'File deleted successfully from s3' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
