import axios from 'axios';

export const http = axios.create({
    baseURL: "http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com"
});

