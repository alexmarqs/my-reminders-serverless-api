# My reminders using Vercel API serverless functions

This repository contains some serverless functions that I'm using to periodically remind me about personal stuff. I'm deploying these functions with the cloud platform Vercel.

Current API endpoints:

- `api/reminder`: Read expenses from my **private google sheet** and send by **sms (twilio)** to my phone number;

## How to create a scheduled/cron job to call my API endpoints?

There are multiple options for this. You can create your own scheduler job system or use one of the existing online cron services: easycron, cron-job.org, etc. to call the API endpoints. The main cloud providers (AWS, Google Cloud, Azure) also have cron services available.

## Prerequisites

Install Vercel globally to be able to run the project and deploy it later.

```
npm install -g vercel
```

The required environemnt variables (see `.env.example`) must be set.

## Deployment

To replicate the Vercel deployment environment locally, allowing you to test your Serverless Functions, without requiring you to deploy each time a change is made, execute:

```
vercel dev
```

To test the cron jobs against your functions during the development you can use the [ngrok](https://ngrok.com/) in order to expose your local API serverless functions endpoints to the world :).

To create a deployment for a production environemnt, execute:

```
vercel --prod
```
